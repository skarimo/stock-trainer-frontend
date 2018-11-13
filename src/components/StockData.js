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

  showOwnedCard(owned_stock_share) {
    return (
      <div className="ownedStockCard">
        <ul style={{listStyleType:'none'}}>
          <li style={{marginBottom: '1%'}}>
            <h3><b style={{color:'lightgreen'}}>Owned Shares:</b> {owned_stock_share.owned_shares}</h3>
          </li>
          <li style={{marginBottom: '1%'}}>
            <h3><b style={{color:'lightgreen'}}>Average buy price:</b> {owned_stock_share.avg_buy_price}</h3>
          </li>
        </ul>
      </div>
    )
  }

  render() {
    const stockData = this.state.stockData
    const owned_stock_share = this.props.owned_stock_shares.filter(stock => stock.stock.symbol === stockData.symbol)[0]

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
          {owned_stock_share ? this.showOwnedCard(owned_stock_share) : null}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    owned_stock_shares: state.user.owned_stock_shares
  }
}


export default connect(mapStateToProps)(StockData)
