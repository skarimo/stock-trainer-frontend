import React, { Component } from 'react'
import { connect } from 'react-redux'

import AddBalance from './AddBalance'


class TodaysGain extends Component {

  state = {
    change: ''
  }

  componentDidMount() {
    const myTimer = () => {
      const d = new Date();
      document.getElementById("clock").innerText = d.toLocaleTimeString();
    }
    this.clockInterval = setInterval(function() {myTimer()}, 1000);
  }

  componentWillUnmount =() => {
   clearInterval(this.clockInterval);
 }


  yesterdaysPercentage = () => {
    let previousDaytotal = parseFloat(this.props.total_balance)
    let currentDayTotal = parseFloat(this.props.total_balance)
    this.props.stockList.owned_stocks.forEach((stock) => {
      previousDaytotal += (stock.owned_shares*parseFloat(stock.liveStockData.quote.previousClose))
      currentDayTotal += (stock.owned_shares*parseFloat(stock.liveStockData.quote.latestPrice))
    })
    return ((currentDayTotal-previousDaytotal)/previousDaytotal*100)
  }

  yesterdaysDollarAmount = () => {
    let previousDaytotal = parseFloat(this.props.total_balance)
    let currentDayTotal = parseFloat(this.props.total_balance)
    this.props.stockList.owned_stocks.forEach((stock) => {
      previousDaytotal += (stock.owned_shares*parseFloat(stock.liveStockData.quote.previousClose))
      currentDayTotal += (stock.owned_shares*parseFloat(stock.liveStockData.quote.latestPrice))
    })
    return (currentDayTotal-previousDaytotal)
  }


  render() {
        let percentChange;
        let dollarChange;
        if (this.props.stockList.owned_stocks != false) {
          if (this.props.stockList.owned_stocks[0].liveStockData) {
             percentChange = parseFloat(this.yesterdaysPercentage().toFixed(2))
             dollarChange = parseFloat(this.yesterdaysDollarAmount().toFixed(2))
          } else {
             percentChange = "Loading"
             dollarChange = "Loading"
          }
      } else {
        percentChange = 0
        dollarChange = 0
      }
      return (
        <React.Fragment>
          <div className="circleHolder">
            <h3>Account Balance: <b style={{color: 'Lime', paddingRight:'1%'}}>${this.props.total_balance}</b><AddBalance /></h3>
            <div className="circle-text" style={{borderColor: '#A7F432', marginRight:'5px'}}>
              <div id="clock"></div>
            </div>
            <div className="circle-text" style={percentChange < 0 ? {borderColor: 'red'} : {borderColor: 'Lime'}}>
              {percentChange < 0 ? (<React.Fragment><b style={{color:'Red '}}> ↓ {percentChange}%</b><p style={{fontSize:'20px', color:'Red'}}>${dollarChange}</p></React.Fragment>) : (<React.Fragment><b style={{color:'Lime '}}>↑ +{percentChange}%</b><p style={{fontSize:'20px', color:'Lime '}}>+${dollarChange}</p></React.Fragment>)}
            </div>
          </div>
        </React.Fragment>
      )
    }
}


const mapStateToProps = (state) => {
  return {
    stockList: {owned_stocks: state.user.owned_stocks, sold_stocks: state.user.sold_stocks, watchlists: state.user.watchlists},
    total_balance: state.user.account_balance
  }
}


export default connect(mapStateToProps)(TodaysGain)
