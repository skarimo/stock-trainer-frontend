import React, { Component } from 'react'
import { connect } from 'react-redux'
import OwnedStockShareCard from '../components/OwnedStockShareCard'
import { updateSingleLiveStockData } from '../actions/stockActions'


class OwnedStockSharesContainer extends Component {
  constructor() {
    super()
    this.state = {
      test: ''
    }
  }

  componentDidUpdate() {
    for (let stock in this.props.owned_stock_shares) {
      if (!this.props.owned_stock_shares[stock].liveStockData) {
        this.props.updateSingleLiveStockData(this.props.owned_stock_shares[stock], "OWNED_STOCK_SHARES")
      }
    }
  }

  handleRefresh = (stock) => {
    this.props.updateSingleLiveStockData(stock, "OWNED_STOCK_SHARES")
  }


  mainRender = (ownedStockShareCardList) => {
    return (
      <div style={{display: 'flex', maxHeight: '700px', flexDirection: 'column'}}>
        <h1>Owned Stocks:</h1>
        <div style={{overflowY: 'scroll', maxHeight:'600px', width:'730px'}}>{ownedStockShareCardList}</div>
      </div>
    )
  }

  render() {
    let ownedStockShareCardList;
      if (this.props.owned_stock_shares) {
        ownedStockShareCardList = this.props.owned_stock_shares.map(stock => <OwnedStockShareCard addMessageToHomeScreen={this.props.addMessageToHomeScreen} history={this.props.history} key={stock.id} stock={stock} buyStock={this.props.buyStock} sellStock={this.props.sellStock} handleRefresh={this.handleRefresh} />)
      }

    return (
      <React.Fragment>{ownedStockShareCardList != false ? this.mainRender(ownedStockShareCardList) : null}</React.Fragment>
  )
}
}

const mapStateToProps = (state) => {
  return {
    user_id: state.user.id,
    owned_stock_shares: state.user.owned_stock_shares,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateSingleLiveStockData: (stock, location) => dispatch(updateSingleLiveStockData(stock, location))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OwnedStockSharesContainer)
