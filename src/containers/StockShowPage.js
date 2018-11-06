import React, { Component } from 'react'
import Chart from '../components/Chart';
import { withRouter } from 'react-router-dom';

import StockData from '../components/StockData'

// import { connect } from 'react-redux'


class StockShowPage extends Component {
  state = {
    data: null
  }

  symbol = () => {
    let symbol = this.props.history.location.state.symbol
    if (symbol == null) {
      symbol = this.props.history.location.state.stock.symbol
    }
    return symbol
  }

  getStockData = () => {
    fetch(`https://api.iextrading.com/1.0/stock/${this.symbol()}/chart/1d`).then(res => res.json())
    .then(resList => {
      let data = resList.map((result) => {
          let date = new Date(result.date.slice(0,4) + '-' + result.date.slice(4,6) + '-' + result.date.slice(6,8) + 'T' + result.minute)
          return {date: date, high: result.high, low: result.low, open: result.open, close: result.close, volume: result.volume}
        })
        this.setState({ data: data })
    })
  }

	componentDidMount() {
		this.getStockData()
	}

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.id !== this.props.match.params.id) {
    this.getStockData()
    }
  }

	render() {
		if (this.state.data != null && this.state.data.length > 0) {
			return (
      <div className="stockContainer" style={{marginBottom: '5%'}}>
        <h1 style={{width: '100%', textAlign: 'center'}}>{this.symbol()} <button className='ui inverted green button' onClick={() => this.props.history.push(`/trade/${this.symbol()}`)}>Trade</button></h1>
        <div style={{backgroundColor:'lightgreen', marginRight:'5%'}}>
          <Chart type={'hybrid'} data={this.state.data} />
        </div>
        <StockData symbol={this.symbol()}/>
      </div>
    )
		}
		return (
       <div>No data to show for this stock</div>
		)
	}
}



export default withRouter(StockShowPage)
