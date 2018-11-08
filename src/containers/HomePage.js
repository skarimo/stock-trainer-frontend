import React, { Component } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import StocksContainer from './StocksContainer'
import Navbar from '../components/Navbar'
import TradePage from './TradePage'
import StockShowPage from './StockShowPage'

import { updateStockInfoOnState } from '../actions/stockActions'

class HomePage extends Component {

  componentWillMount() {
    this.props.updateStockInfoOnState(this.props.state)
    // this.refreshInterval = setInterval(() => this.props.updateStockInfoOnState(this.props.state), 1000, true);
  }

  componentWillUnmount() {
 //   clearInterval(this.refreshInterval)
 }
 // <div style={{width:'100%', paddingBottom: '5%'}}><Navbar /></div>
 // <div><StocksContainer /></div>
// <Route exact path="/signup" render={(props) => <SignUp history={props.history} adapter={this.adapter} handleSignUp={this.handleSignUp} />} />


  render() {
    return (
      <div style={{flexDirection:'column'}}>
        <BrowserRouter>
          <React.Fragment>
            <Route path="/" render={(props) => <Navbar history={props.history}/>} />
          <Switch>
            <Route exact path="/trade" render={(props) => <TradePage history={props.history}/>} />
            <Route exact path="/stock/:id" render={(props) => <StockShowPage history={props.history}/>} />
            <Route exact path="/trade/:symbol" render={(props) => <TradePage history={props.history}/>} />
            <Route path="/" render={(props) => <StocksContainer history={props.history}/>} />
          </Switch>
          </React.Fragment>
        </BrowserRouter>

      </div>
    )
  }

}




const mapStateToProps = (state) => {
  return {
    state: {owned_stocks: state.user.owned_stocks, sold_stocks: state.user.sold_stocks, watchlists: state.user.watchlists}
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateStockInfoOnState: (stockLists) => dispatch(updateStockInfoOnState(stockLists))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(HomePage)
