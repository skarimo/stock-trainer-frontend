import React, { Component } from 'react'
import { connect } from 'react-redux'
import { buyStock } from '../actions/stockActions'


class Buy extends Component {
    constructor({ stock, user }) {
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

    submitShareBuy = (e) => {
      e.preventDefault()
      console.log(this.state)
      if (this.state.shares_amount > 0 && this.state.share_price > 0 && (this.state.shares_amount * this.state.share_price < this.props.user.account_balance)) {
        this.props.buyStock(this.state)
        this.props.handleModalClose()
        this.props.addMessageToHomeScreen(`${this.state.shares_amount} shares of ${this.state.symbol} bought successfully`)
      } else {
        this.props.addMessageToModal("Invalid Amount. Try again.")
      }
    }


    render() {
      return (
        <form onSubmit={this.submitShareBuy} className="ui form" style={{color: 'black'}}>
          <h2>Current Price per share: ${this.props.liveData.latestPrice}</h2>
            <label>Shares of {this.props.stock.symbol}</label>
            <input onChange={this.onChangeHandler} type="number" name="shares_amount" placeholder="Shares to buy" />

            <label>Price per share</label>
            <input onChange={this.onChangeHandler} type="number" step="0.001" name="share_price" placeholder={"Available Balance $"+this.props.user.account_balance} />
            <p>Total: ${this.state.shares_amount * this.state.share_price}</p>
          <button className="ui button" type="submit">Submit</button>
        </form>
      )
    }
  }

const mapStateToProps = (state) => {
  return {
    stockList: {owned_stocks: state.user.owned_stocks},
    user: state.user,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    buyStock: (stockData) => dispatch(buyStock(stockData))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Buy)
