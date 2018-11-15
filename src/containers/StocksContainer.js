import React, { Component } from 'react'
import { connect } from 'react-redux'

import TodaysGain from '../components/TodaysGain'
import NewsSection from '../components/NewsSection'

import OwnedStockSharesContainer from './OwnedStockSharesContainer'
import HistoryContainer from './HistoryContainer'
import WatchlistContainer from './WatchlistContainer'

import { buyStock, sellStock, removeFromWatchlist, cancelSale, cancelPurchase } from '../actions/stockActions'



class StocksContainer extends Component {
  state = {
    previousDayStocks: []
  }

  removeFromWatchlist = (stockSymbol) => {
    this.props.removeFromWatchlist({user_id :this.props.user_id, stock_symbol: stockSymbol})
    this.props.addMessageToHomeScreen("Removed from watchlist")
  }

  render() {

    return (
      <div className="stockContainer" style={{textAlign: 'center'}}>
        <div className="chartContainer">
            <TodaysGain addMessageToHomeScreen={this.props.addMessageToHomeScreen} />
            {/* <h1>Sector Performance</h1>
            <SectionBalanceGraph /> */}
        </div>

        <OwnedStockSharesContainer addMessageToHomeScreen={this.props.addMessageToHomeScreen} history={this.props.history} buyStock={this.props.buyStock} sellStock={this.props.sellStock} />

        <HistoryContainer cancelSale={this.props.cancelSale} cancelPurchase={this.props.cancelPurchase} addMessageToHomeScreen={this.props.addMessageToHomeScreen} history={this.props.history} buyStock={this.props.buyStock} sellStock={this.props.sellStock} />

        <WatchlistContainer addMessageToHomeScreen={this.props.addMessageToHomeScreen} history={this.props.history} removeFromWatchlist={this.removeFromWatchlist} />

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
    stockList: {purchased_stocks: state.user.purchased_stocks, sold_stocks: state.user.sold_stocks, watchlists: state.user.watchlists, owned_stock_shares: state.user.owned_stock_shares},
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    buyStock: (stockData) => dispatch(buyStock(stockData)),
    sellStock: (stockData) => dispatch(sellStock(stockData)),
    removeFromWatchlist: (stockId) => dispatch(removeFromWatchlist(stockId)),
    cancelSale: (stock_card_id) => dispatch(cancelSale(stock_card_id)),
    cancelPurchase: (stock_card_id) => dispatch(cancelPurchase(stock_card_id))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(StocksContainer)
