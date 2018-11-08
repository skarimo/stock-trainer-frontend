import React, { Component } from 'react'
import Chart from '../components/Chart';
import { withRouter } from 'react-router-dom';

import TradeModal from '../containers/TradePage'

import StockData from '../components/StockData'

import { connect } from 'react-redux'
import { addToWatchlist, removeFromWatchlist } from '../actions/stockActions'


class StockShowPage extends Component {
  state = {
    stockIntraday: null,
    stockLiveData: null
  }

  symbol = () => {
    let symbol = this.props.history.location.state.symbol
    if (symbol == null) {
      symbol = this.props.history.location.state.stock.symbol
    }
    return symbol
  }

  getStockData = () => {
    const symbol = this.symbol()
    let stockIntraday;
    fetch(`https://api.iextrading.com/1.0/stock/${symbol}/chart/1d`).then(res => res.json())
    .then(resList => {

      stockIntraday = resList.filter(res1 => (res1.date && res1.minute))
      stockIntraday = stockIntraday.map((result) => {
          let date = new Date(result.date.slice(0,4) + '-' + result.date.slice(4,6) + '-' + result.date.slice(6,8) + 'T' + result.minute)
          return {date: date, high: result.high, low: result.low, open: result.open, close: result.close, volume: result.volume}
        })
        if (stockIntraday === undefined || stockIntraday === null || stockIntraday === false) {
          stockIntraday = null
        }
    }).then(() => fetch(`https://api.iextrading.com/1.0/stock/${symbol}/quote`)).then(res2=>res2.json()).then(stockLiveData => this.setState({ stockIntraday: stockIntraday, stockLiveData: stockLiveData }))
  }

  addToWatchlist = () => {
    this.props.addMessageToHomeScreen("Added to watchlist")
    this.props.addToWatchlist({user_id :this.props.user_id, stock_symbol: this.symbol()})
  }

  removeFromWatchlist = () => {
    this.props.addMessageToHomeScreen("Removed from watchlist")
    this.props.removeFromWatchlist({user_id :this.props.user_id, stock_symbol: this.symbol()})
  }

	componentDidMount() {
		this.getStockData()
	}

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.id !== this.props.match.params.id) {
    this.getStockData()
    }
  }

	render() {
    // const d = new Date();
    // const h = d.getHours();
    // const m = d.getMinutes()
    let stock = this.props.location.state.stock
    if (stock === undefined) {
      stock = this.props.location.state
    }

    const checkWatchlist = this.props.watchlists.filter((stock) => stock.stock.symbol === this.symbol())
		if (this.state.stockIntraday != null && this.state.stockIntraday.length) {
			return (
      <div className="stockContainer" style={{marginBottom: '5%'}}>
        <h1 style={{width: '100%', textAlign: 'center'}}>{this.symbol()} <TradeModal addMessageToHomeScreen={this.props.addMessageToHomeScreen} stock={{...stock}} liveData={this.state.stockLiveData}/> {checkWatchlist.length > 0 ? <button onClick={this.removeFromWatchlist} className="ui red inverted button">Remove from Watchlist</button> : <button onClick={this.addToWatchlist} className="ui yellow inverted button">Add To Watchlist</button>} </h1>
        <div style={{backgroundColor:'lightgreen', marginRight:'5%'}}>
          <h3>Daily Gain Chart</h3>
          <Chart type={'hybrid'} data={this.state.stockIntraday} />
        </div>
        <StockData symbol={this.symbol()} />
      </div>
    )
		}
		return (
       <div>No data to show for this stock</div>
		)
	}
}

const mapStateToProps = (state) => {
  return {
    user_id: state.user.id,
    watchlists: state.user.watchlists
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addToWatchlist: (stockId) => dispatch(addToWatchlist(stockId)),
    removeFromWatchlist: (stockId) => dispatch(removeFromWatchlist(stockId))
  }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(StockShowPage))
