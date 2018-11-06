import React, { Component } from 'react'
// import { connect } from 'react-redux'


class StockData extends Component {
  state = {
    stockData: ''
  }

  componentDidMount() {
    fetch(`https://api.iextrading.com/1.0/stock/${this.props.symbol}/quote`).then(res => res.json())
    .then(stockData => this.setState({ stockData }))
  }
  //
  render() {
    console.log(this.state.stockData)
    const stockData = this.state.stockData
    return (
      <div>
        <h2>{stockData.companyName}</h2>
        <div>
            <ul style={{listStyleType:'none'}}>
              <li style={{marginBottom: '1%'}}>
                <h3><b style={{color:'lightgreen'}}>Primary Exchange:</b> {stockData.primaryExchange}</h3>
              </li>
            <li style={{marginBottom: '1%'}}>
                <h3><b style={{color:'lightgreen'}}>Sector:</b> {stockData.sector}</h3>
              </li>
            <li style={{marginBottom: '1%'}}>
                <h3><b style={{color:'lightgreen'}}>High:</b> ${stockData.high}</h3>
              </li>
            <li style={{marginBottom: '1%'}}>
                <h3><b style={{color:'lightgreen'}}>Low:</b> ${stockData.low}</h3>
              </li>
            <li style={{marginBottom: '1%'}}>
                <h3><b style={{color:'lightgreen'}}>Previous Close:</b> ${stockData.previousClose}</h3>
              </li>
            <li style={{marginBottom: '1%'}}>
                <h3><b style={{color:'lightgreen'}}>Change:</b> %{stockData.change}</h3>
              </li>
            <li style={{marginBottom: '1%'}}>
                <h3><b style={{color:'lightgreen'}}>Week 52 High:</b> ${stockData.week52High}</h3>
              </li>
            <li style={{marginBottom: '1%'}}>
                <h3><b style={{color:'lightgreen'}}>Week 52 Low:</b> ${stockData.week52Low}</h3>
              </li>
            <li style={{marginBottom: '1%'}}>
                <h3><b style={{color:'lightgreen'}}>YTD Change:</b> %{stockData.ytdChange}</h3>
              </li>
            </ul>
        </div>
      </div>
    )
  }
}



export default StockData
