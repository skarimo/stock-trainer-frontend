import React, { Component } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import StocksContainer from './StocksContainer'
import Navbar from '../components/Navbar'
// import TradePage from './TradePage'
import StockShowPage from './StockShowPage'

import { updateStockInfoOnState, updateUserStocks } from '../actions/stockActions'
// import { updateUserStocks, updateOwnedShares } from '../actions/stockActions'

class HomePage extends Component {

  state = {
    message: null
  }

  componentWillMount() {
    this.props.updateUserStocks(this.props.user_id)
    this.props.updateStockInfoOnState(this.props.state)
    //
    this.refreshInterval = setInterval(() => {
      this.props.updateUserStocks(this.props.user_id)
      // this.props.updateStockInfoOnState(this.props.state)
      // this.props.updateOwnedShares(this.props.user_id, [...this.props.state.owned_stock_shares])
    }, 4500);
  }

  componentWillUnmount() {
   clearInterval(this.refreshInterval)
 }
 // <div style={{width:'100%', paddingBottom: '5%'}}><Navbar /></div>
 // <div><StocksContainer /></div>
// <Route exact path="/signup" render={(props) => <SignUp history={props.history} adapter={this.adapter} handleSignUp={this.handleSignUp} />} />

  addMessageToHomeScreen = (message) => {this.setState({ message })}

  renderMessage = () => {
    if (this.state.message) {
      return 'block'
    } else {
      return 'none'
    }
  }

  render() {
    return (
      <div style={{flexDirection:'column'}}>
        <div className="ui success message" style={{display: this.renderMessage()}}>
          <i className="close icon" onClick={() => this.setState({ message: null })}></i>
          <div className="header">
            {this.state.message}
          </div>
        </div>
        <BrowserRouter>
          <React.Fragment>
            <Route path="/" render={(props) => <Navbar history={props.history}/>} />
          <Switch>
            <Route exact path="/stock/:id" render={(props) => <StockShowPage addMessageToHomeScreen={this.addMessageToHomeScreen} history={props.history}/>} />
            <Route path="/" render={(props) => <StocksContainer addMessageToHomeScreen={this.addMessageToHomeScreen} history={props.history}/>} />
          </Switch>
          </React.Fragment>
        </BrowserRouter>

      </div>
    )
  }

}


const mapStateToProps = (state) => {
  return {
    state: {owned_stock_shares: state.user.owned_stock_shares, watchlists: state.user.watchlists},
    user_id: state.user.id
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateStockInfoOnState: (stockLists) => dispatch(updateStockInfoOnState(stockLists)),
    // updateOwnedShares: (userID, owned_stock_shares) => dispatch(updateOwnedShares(userID, owned_stock_shares)),
    updateUserStocks: (userID) => dispatch(updateUserStocks(userID))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(HomePage)
