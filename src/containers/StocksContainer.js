import React, { Component } from 'react'
import { connect } from 'react-redux'

import OwnedStockCard from '../components/OwnedStockCard'
import WatchlistStockCard from '../components/WatchlistStockCard'
import SectionBalanceGraph from '../components/SectionBalanceGraph'
import TodaysGain from '../components/TodaysGain'
import NewsSection from '../components/NewsSection'

import { buyStock, sellStock, removeFromWatchlist } from '../actions/stockActions'



class StocksContainer extends Component {
  state = {
    previousDayStocks: []
  }

  removeFromWatchlist = (stockSymbol) => {
    this.props.removeFromWatchlist({user_id :this.props.user_id, stock_symbol: stockSymbol})
    this.props.addMessageToHomeScreen("Removed from watchlist")
  }

  render() {
    let ownedStockCardList = "You have no Owned Stocks"
    let watchlistStockCardList = "You have no Stocks on your Watchlist"

    const { owned_stocks, watchlists } = this.props.stockList
    if (owned_stocks) {
      ownedStockCardList = owned_stocks.map(stock => <OwnedStockCard addMessageToHomeScreen={this.props.addMessageToHomeScreen} history={this.props.history} key={stock.id} stock={stock} buyStock={this.props.buyStock} sellStock={this.props.sellStock} />)
    }
    if (watchlists) {
      watchlistStockCardList = watchlists.map(stock => <WatchlistStockCard addMessageToHomeScreen={this.props.addMessageToHomeScreen} history={this.props.history} removeFromWatchlist={this.removeFromWatchlist} key={stock.id} stock={stock} />)
    }

    return (
      <div className="stockContainer" style={{textAlign: 'center'}}>
        <div className="chartContainer">
            <TodaysGain />
            {/* <h1>Sector Performance</h1>
            <SectionBalanceGraph /> */}
        </div>
        <div style={{overflowY: 'scroll', maxHeight:'600px'}}>
          {ownedStockCardList.length > 0 ? <h1>Owned Stocks:</h1> : null}
          {ownedStockCardList}
        </div>
        <div style={{overflowY: 'scroll', maxHeight:'600px'}}>
          {watchlistStockCardList.length > 0 ? <h1>Watchlisted Stocks:</h1> : null}
          {watchlistStockCardList}
        </div>

        <div style={{/*overflowY: 'scroll', maxHeight:'600px'*/}}>
          <h1>News Section</h1>
          <NewsSection />
        </div>
      </div>
    )
  }
}



const mapStateToProps = (state) => {
  return {
    user_id: state.user.id,
    stockList: {owned_stocks: state.user.owned_stocks, sold_stocks: state.user.sold_stocks, watchlists: state.user.watchlists},
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    buyStock: (stockData) => dispatch(buyStock(stockData)),
    sellStock: (stockData) => dispatch(sellStock(stockData)),
    removeFromWatchlist: (stockId) => dispatch(removeFromWatchlist(stockId))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(StocksContainer)
