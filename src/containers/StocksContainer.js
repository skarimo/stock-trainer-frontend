import React, { Component } from 'react'
import { connect } from 'react-redux'

import OwnedStockCard from '../components/OwnedStockCard'
import WatchlistStockCard from '../components/WatchlistStockCard'
import SectionBalanceGraph from '../components/SectionBalanceGraph'
import TodaysGain from '../components/TodaysGain'

import { buyStock, sellStock } from '../actions/stockActions'



class StocksContainer extends Component {
  state = {
    previousDayStocks: []
  }

  render() {
    const { owned_stocks, watchlists } = this.props.stockList
    const ownedStockCardList = owned_stocks.map(stock => <OwnedStockCard history={this.props.history} key={stock.id} stock={stock} buyStock={this.props.buyStock} sellStock={this.props.sellStock} />)
    const watchlistStockCardList = watchlists.map(stock => <WatchlistStockCard history={this.props.history} key={stock.id} stock={stock} />)
    return (
      <div className="stockContainer" style={{textAlign: 'center'}}>
        <div className="chartContainer">
            <h1>Daily Change</h1>
            <TodaysGain />
            <h1>Sector Performance</h1>
            <SectionBalanceGraph />
        </div>
        <div style={{overflowY: 'scroll', height:'700px'}}>
          <h1>Owned Stocks</h1>
          {ownedStockCardList}
        </div>
        <div style={{overflowY: 'scroll', height:'700px'}}>
          <h1>Watchlisted Stocks:</h1>
          {watchlistStockCardList}
        </div>
      </div>
    )
  }
}



const mapStateToProps = (state) => {
  return {
    stockList: {owned_stocks: state.user.owned_stocks, sold_stocks: state.user.sold_stocks, watchlists: state.user.watchlists},
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    buyStock: (stockData) => dispatch(buyStock(stockData)),
    sellStock: (stockData) => dispatch(sellStock(stockData))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(StocksContainer)
