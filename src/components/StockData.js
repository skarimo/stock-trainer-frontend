import React, { Component } from 'react'
import { connect } from 'react-redux'


class StockData extends Component {
    state = {
      stockData: ''
    }

  componentDidUpdate(prevProps) {
    if (prevProps.symbol !== this.props.symbol) {
      this.getData()
    }
  }

  getData = () => {
    fetch(`https://api.iextrading.com/1.0/stock/${this.props.symbol}/quote`).then(res => res.json())
    .then(stockData => this.setState({ stockData }))
  }

  componentDidMount() {
    this.getData()
  }

  showOwnedCard(owned_stock) {
    let status = null
    if (owned_stock.status_id === 2) {
      status = "PENDING"
    } else if (owned_stock.status_id === 1) {
      status = "COMPLETED"
    }

    return (
      <div className="ownedStockCard">
        <ul style={{listStyleType:'none'}}>
          <li style={{marginBottom: '1%'}}>
            <h3><b style={{color:'lightgreen'}}>Owned Shares:</b> {owned_stock.owned_shares}</h3>
          </li>
          <li style={{marginBottom: '1%'}}>
            <h3><b style={{color:'lightgreen'}}>Status:</b> {status ? status : owned_stock.status.name}</h3>
          </li>
          <li style={{marginBottom: '1%'}}>
            <h3><b style={{color:'lightgreen'}}>Average buy price:</b> {owned_stock.buy_price}</h3>
          </li>
        </ul>
      </div>
    )
  }

  render() {
    const stockData = this.state.stockData
    const owned_stock = this.props.owned_stocks.filter(stock => stock.stock.symbol === stockData.symbol)[0]

    return (
      <div>
        <h2 style={{maxWidth: '500px'}}>{stockData.companyName}</h2>
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
                <h3><b style={{color:'lightgreen'}}>Latest Volume:</b>{stockData.latestVolume}</h3>
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
        <div>
          {owned_stock ? this.showOwnedCard(owned_stock) : null}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    owned_stocks: state.user.owned_stocks
  }
}


export default connect(mapStateToProps)(StockData)
