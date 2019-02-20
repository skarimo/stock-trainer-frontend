import React, { Component } from 'react'
import Chart from "./BarChart";

class SectionBalanceGraph extends Component {
  state = {
    data: null
  }

  componentDidMount() {
    fetch(`https://api.iextrading.com/1.0/stock/market/sector-performance`).then(res => res.json())
    .then(resList => {
      let data = resList.map((result) => {
          return {x: result.name, y: [result.performance]}
        })
        this.setState({ data: data })
    })
  }

  render() {
        if (this.state.data) {
          return (
            <div style={{fontFamily:'sans-serif',fontSize:'0.8em'}}>
              {<Chart type='hybrid' data={this.state.data} />}
            </div> )
        } else {
          return (<h1>Loading</h1>)
        }
    }
}


export default SectionBalanceGraph
