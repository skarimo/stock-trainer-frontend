import React from 'react'
// import { connect } from 'react-redux'


const WatchlistStockCard = ({ stock, history }) => {

  if(stock.liveStockData) {
    return (
      <div className="watchlistStockCard">
        <div className="watchlistStockSymbol"><h1 style={{color:'#A7F432'}}>{stock.liveStockData.quote.symbol}</h1><button className='ui inverted green button' style={{paddingLeft:'20%'}} onClick={() => history.push(`/trade/${stock.stock.symbol}`)}>Trade</button>

        </div>
        <div className="stockCardDetail" onClick={() => history.push(`/stock/${stock.id}`, stock)} style={{textAlign: 'left'}}>
          <h3>{stock.stock.name}</h3>
          <h5>Latest Price: ${stock.liveStockData.quote.latestPrice} | Today's Change: {(stock.liveStockData.quote.change < 0) ? <b style={{color:'red'}}>{stock.liveStockData.quote.change}</b> : <b style={{color:'Lime'}}>{stock.liveStockData.quote.change}</b>}</h5>
        </div>
      </div>
    )
    } else {
      return (<React.Fragment>Loading</React.Fragment>)
    }
}



export default WatchlistStockCard
