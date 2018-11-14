import React, { Component } from 'react'
import { connect } from 'react-redux'
import OwnedStockShareCard from '../components/OwnedStockShareCard'


class OwnedStockSharesContainer extends Component {
  constructor() {
    super()
    this.state = {
      test: ''
    }
  }

  mainRender = (ownedStockShareCardList) => {
    return (
      <div style={{display:'flex', flexDirection: 'column', alignItems: 'center', overflowY: 'scroll', maxHeight:'600px', width: '700px'}}>
        <h1>Owned Stocks:</h1>
        {ownedStockShareCardList}
      </div>
    )
  }

  render() {
    let ownedStockShareCardList;
      if (this.props.owned_stock_shares) {
        ownedStockShareCardList = this.props.owned_stock_shares.map(stock => <OwnedStockShareCard addMessageToHomeScreen={this.props.addMessageToHomeScreen} history={this.props.history} key={stock.id} stock={stock} buyStock={this.props.buyStock} sellStock={this.props.sellStock} />)
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

export default connect(mapStateToProps)(OwnedStockSharesContainer)
