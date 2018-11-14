import React, { Component } from 'react'
import { connect } from 'react-redux'
import SoldStockCard from '../components/SoldStockCard'
import PurchasedStockCard from '../components/PurchasedStockCard'


class HistoryContainer extends Component {
  constructor() {
    super()
    this.state = {
      test: ''
    }
  }

  mainRender = () => {
    let purchasedStockCardList;
    let soldStockCardList;
      if (this.props.purchased_stocks) {
        purchasedStockCardList = this.props.purchased_stocks.map(stock => <PurchasedStockCard cancelPurchase={this.props.cancelPurchase} addMessageToHomeScreen={this.props.addMessageToHomeScreen} history={this.props.history} key={stock.id} stock={stock} buyStock={this.props.buyStock} sellStock={this.props.sellStock} />)
      }
      if (this.props.sold_stocks) {
        soldStockCardList = this.props.sold_stocks.map(stock => <SoldStockCard cancelSale={this.props.cancelSale} addMessageToHomeScreen={this.props.addMessageToHomeScreen} history={this.props.history} key={stock.id} stock={stock} buyStock={this.props.buyStock} sellStock={this.props.sellStock} />)
      }

    if (soldStockCardList != false || purchasedStockCardList != false) {
      return (
        <div style={{display: 'flex', maxHeight: '700px', flexDirection: 'column', width: '600px'}}>

          {purchasedStockCardList.length > 0 ? <h3>Purchase History:</h3> : null}
          <div style={{overflowY: 'scroll', maxHeight:'300px'}}>
            {purchasedStockCardList}
          </div>

          {soldStockCardList.length > 0 ? <h3>Sale History:</h3> : null}
          <div style={{overflowY: 'scroll', maxHeight:'300px'}}>
            {soldStockCardList}
          </div>

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
    sold_stocks: state.user.sold_stocks,
    purchased_stocks: state.user.purchased_stocks,
  }
}

export default connect(mapStateToProps)(HistoryContainer)
