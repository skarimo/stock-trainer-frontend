import React, { Component } from 'react'
import { connect } from 'react-redux'
import RTChart from 'react-rt-chart';
import { previousDayStocks } from '../actions/stockActions'


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


  render() {
        let percentChange;
        if (this.props.stockList.owned_stocks[0].liveStockData) {
           percentChange = parseFloat(this.yesterdaysPercentage().toFixed(2))
        } else {
           percentChange = "fix this later"
        }
      return (
        <div className="circleHolder" style={{}}>
          <div className="circle-text" style={{borderColor: 'black', marginRight:'5px'}}>
            <div id="clock"></div>
          </div>
          <div className="circle-text" style={percentChange < 0 ? {borderColor: 'red'} : {borderColor: 'Lime'}}>
            {percentChange < 0 ? <b style={{color:'red'}}>↓{percentChange}%</b> : <b style={{color:'Lime '}}>↑ +{percentChange}%</b>}
          </div>
        </div>
      )
    }
}


const mapStateToProps = (state) => {
  let data
  return {
    stockList: {owned_stocks: state.user.owned_stocks, sold_stocks: state.user.sold_stocks, watchlists: state.user.watchlists},
    total_balance: state.user.account_balance
  }
}


export default connect(mapStateToProps)(TodaysGain)
