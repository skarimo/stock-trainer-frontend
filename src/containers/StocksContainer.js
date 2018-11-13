import React, { Component } from 'react'
import { connect } from 'react-redux'

import PurchasedStockCard from '../components/PurchasedStockCard'
import WatchlistStockCard from '../components/WatchlistStockCard'
import OwnedStockShareCard from '../components/OwnedStockShareCard'
// import SectionBalanceGraph from '../components/SectionBalanceGraph'
import SoldStockCard from '../components/SoldStockCard'
import TodaysGain from '../components/TodaysGain'
import NewsSection from '../components/NewsSection'

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
    let purchasedStockCardList = "You have no Purchased Stocks"
    let ownedStockShareCardList = "You have no Purchased Stocks"
    let watchlistStockCardList = "You have no Stocks on your Watchlist"
    let soldStockCardList = "You have no Stocks pending sale"

    const { purchased_stocks, watchlists, sold_stocks, owned_stock_shares } = this.props.stockList
    if (purchased_stocks) {
      purchasedStockCardList = purchased_stocks.map(stock => <PurchasedStockCard cancelPurchase={this.props.cancelPurchase} addMessageToHomeScreen={this.props.addMessageToHomeScreen} history={this.props.history} key={stock.id} stock={stock} buyStock={this.props.buyStock} sellStock={this.props.sellStock} />)
    }
    if (watchlists) {
      watchlistStockCardList = watchlists.map(stock => <WatchlistStockCard addMessageToHomeScreen={this.props.addMessageToHomeScreen} history={this.props.history} removeFromWatchlist={this.removeFromWatchlist} key={stock.id} stock={stock} />)
    }
    if (sold_stocks) {
      soldStockCardList = sold_stocks.map(stock => <SoldStockCard cancelSale={this.props.cancelSale} addMessageToHomeScreen={this.props.addMessageToHomeScreen} history={this.props.history} key={stock.id} stock={stock} buyStock={this.props.buyStock} sellStock={this.props.sellStock} />)
    }
    if (owned_stock_shares) {
      ownedStockShareCardList = owned_stock_shares.map(stock => <OwnedStockShareCard addMessageToHomeScreen={this.props.addMessageToHomeScreen} history={this.props.history} key={stock.id} stock={stock} buyStock={this.props.buyStock} sellStock={this.props.sellStock} />)
    }

    return (
      <div className="stockContainer" style={{textAlign: 'center'}}>
        <div className="chartContainer">
            <TodaysGain />
            {/* <h1>Sector Performance</h1>
            <SectionBalanceGraph /> */}
        </div>
        <div style={{overflowY: 'scroll', maxHeight:'600px', width: '700px'}}>
          {ownedStockShareCardList.length > 0 ? <h1>Owned Stocks:</h1> : null}
          {ownedStockShareCardList}
        </div>
          <div style={{display: 'flex', maxHeight: '700px', flexDirection: 'column', width: '500px'}}>
            {purchasedStockCardList.length > 0 ? <h3>Purchase History:</h3> : null}
            <div style={{overflowY: 'scroll', maxHeight:'300px'}}>
              {purchasedStockCardList}
            </div>
            {soldStockCardList.length > 0 ? <h3>Sale History:</h3> : null}
            <div style={{overflowY: 'scroll', maxHeight:'300px'}}>
              {soldStockCardList}
            </div>
          </div>
        <div style={{overflowY: 'scroll'}}>
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
