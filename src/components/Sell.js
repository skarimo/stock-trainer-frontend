import React, { Component } from 'react'
import { connect } from 'react-redux'
import { sellStock } from '../actions/stockActions'


class Sell extends Component {
    constructor({ stock, liveData, user }) {
      super()
      this.state = {
        user_id: user.id,
        shares_amount: 0,
        share_price: 0,
        symbol: stock.symbol
      }
    }

    onChangeHandler = (e) => {
      this.setState({ [e.target.name]: e.target.value })
    }

    submitShareSell = (e, ownedStockShare) => {
      e.preventDefault()
      if (ownedStockShare.owned_shares >= this.state.shares_amount && this.state.shares_amount > 0 && this.state.share_price > 0) {
        this.props.sellStock(this.state)
        this.props.handleModalClose()
        this.props.addMessageToHomeScreen(`${this.state.shares_amount} shares of ${this.state.symbol} pending sale`)
      } else {
        this.props.addMessageToModal("Invalid Amount. Try again.")
      }
    }

    showForm = () => {
      let ownedStockShares = null
      let ownedCurrentStockCard = null
      ownedStockShares = this.props.stockList.owned_stock_shares
      if (ownedStockShares) {
         ownedCurrentStockCard = ownedStockShares.filter(stock => stock.stock.symbol === this.props.stock.symbol)[0]
      }
      if (ownedCurrentStockCard && ownedCurrentStockCard.owned_shares > 0) {
        return (
          <form onSubmit={(e) => this.submitShareSell(e, ownedCurrentStockCard)} className="ui form" style={{color: 'black'}}>
            <h2>Current Price per share: ${ownedCurrentStockCard.liveStockData.quote.latestPrice}</h2>
              <label>Shares of {this.props.stock.symbol} to sell</label>
              <input onChange={this.onChangeHandler} type="number" name="shares_amount" placeholder={"Shares owned " + ownedCurrentStockCard.owned_shares} />

              <label>Price per share</label>
              <input onChange={this.onChangeHandler} type="number" step="0.001" name="share_price" placeholder={"Enter an amount"} />
              <p>Total: ${this.state.shares_amount * this.state.share_price}</p>
            <button className="ui button" type="submit">Submit</button>
          </form>
        )
      } else {
        return (
          <h1 style={{color: 'black'}}>You do not have any shares to sell</h1>
          )
      }
    }

  render() {
    return (
      <React.Fragment>{this.showForm()}</React.Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    stockList: {owned_stock_shares: state.user.owned_stock_shares},
    user: state.user,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    sellStock: (stockData) => dispatch(sellStock(stockData))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Sell)
