import React, { Component } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import StocksContainer from './StocksContainer'
import Navbar from '../components/Navbar'
// import TradePage from './TradePage'
import StockShowPage from './StockShowPage'

import ActionCable from 'action-cable-react-jwt'
import { actionCableRecievedStock } from '../actions/actionCableActions'

import { updateStockInfoOnState} from '../actions/stockActions'

class HomePage extends Component {

  state = {
    message: null
  }

  componentWillMount() {
    this.props.updateStockInfoOnState(this.props.state)
  }

  componentDidMount () {
  this.createSocket()
  }

   createSocket = () => {
    // get your JWT token
    // this is an example using localStorage
    const token = localStorage.getItem('token')

    let App = {}
    App.cable = ActionCable.createConsumer(`ws://stock-trainer-backend.herokuapp.com/cable`, token)
    const subscription = App.cable.subscriptions.create({channel: `StocksChannel`}, {
      received: this.handleBroadcast
    })
  }

 handleBroadcast = (data) => {
   this.props.actionCableRecievedStock(data)
 }


  componentWillUnmount() {
   clearInterval(this.refreshInterval)
   this.subscription &&
    this.context.cable.subscriptions.remove(this.subscription)
 }

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
    actionCableRecievedStock: (obj) => dispatch(actionCableRecievedStock(obj))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(HomePage)
