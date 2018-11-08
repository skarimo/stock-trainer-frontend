import React, { Component } from 'react'
import Chart from '../components/Chart';
import { withRouter } from 'react-router-dom';

import TradeModal from '../containers/TradePage'

import StockData from '../components/StockData'

// import { connect } from 'react-redux'


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

      stockIntraday = resList.map((result) => {
        if (result.date && result.minute) {
          let date = new Date(result.date.slice(0,4) + '-' + result.date.slice(4,6) + '-' + result.date.slice(6,8) + 'T' + result.minute)
          return {date: date, high: result.high, low: result.low, open: result.open, close: result.close, volume: result.volume}
        } else {
          return null
        }
        })
        if (stockIntraday === undefined || stockIntraday === null || stockIntraday === false) {
          stockIntraday = null
        }
    }).then(() => fetch(`https://api.iextrading.com/1.0/stock/${symbol}/quote`)).then(res2=>res2.json()).then(stockLiveData => this.setState({ stockIntraday: stockIntraday, stockLiveData: stockLiveData }))
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

		if (this.state.stockIntraday != null && this.state.stockIntraday.length) {
			return (
      <div className="stockContainer" style={{marginBottom: '5%'}}>
        <h1 style={{width: '100%', textAlign: 'center'}}>{this.symbol()} <TradeModal stock={{...this.props.location.state.stock}} liveData={this.state.stockLiveData}/> </h1>
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



export default withRouter(StockShowPage)
