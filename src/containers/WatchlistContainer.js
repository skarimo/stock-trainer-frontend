import React, { Component } from 'react'
import { connect } from 'react-redux'
import WatchlistStockCard from '../components/WatchlistStockCard'
import { updateSingleLiveStockData } from '../actions/stockActions'



class WatchlistContainer extends Component {
  constructor() {
    super()
    this.state = {
      test: ''
    }
  }

  handleRefresh = (stock) => {
    this.props.updateSingleLiveStockData(stock, "WATCHLISTS")
  }

  mainRender = () => {
    let watchlistStockCardList;
    if (this.props.watchlists) {
      watchlistStockCardList = this.props.watchlists.map(stock => <WatchlistStockCard cancelSale={this.props.cancelSale} addMessageToHomeScreen={this.props.addMessageToHomeScreen} removeFromWatchlist={this.props.removeFromWatchlist} history={this.props.history} key={stock.id} stock={stock} buyStock={this.props.buyStock} sellStock={this.props.sellStock} handleRefresh={this.handleRefresh}/>)
    }
    if (watchlistStockCardList != false) {
      return (
        <div style={{overflowY: 'scroll', display: 'flex', flexDirection: 'column', maxHeight:'600px', width: '700px', alignItems: 'center'}}>
          {watchlistStockCardList.length > 0 ? <h1>Watchlisted Stocks:</h1> : null}
          {watchlistStockCardList}
        </div>
      )
    } else {
      return null
    }
  }

  render() {
    return (
      <React.Fragment>{this.mainRender()}</React.Fragment>
  )
}
}

const mapStateToProps = (state) => {
  return {
    user_id: state.user.id,
    watchlists: state.user.watchlists,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateSingleLiveStockData: (stock, location) => dispatch(updateSingleLiveStockData(stock, location))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WatchlistContainer)
