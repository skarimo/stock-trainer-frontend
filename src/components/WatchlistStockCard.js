import React from 'react'
import TradeModal from '../containers/TradePage'
// import { connect } from 'react-redux'


const WatchlistStockCard = ({ stock, history, removeFromWatchlist, addMessageToHomeScreen }) => {
  if(stock.liveStockData) {
    return (
      <div className="watchlistStockCard" style={{width: '600px'}}>
        <div className="watchlistStockSymbol"><h1 style={{color:'#A7F432'}}>{stock.liveStockData.quote.symbol}</h1>
        <TradeModal addMessageToHomeScreen={addMessageToHomeScreen} stock={stock.stock} liveData={stock.liveStockData.quote}/>
        </div>
        <div className="stockCardDetail" onClick={() => history.push(`/stock/${stock.stock.id}`, stock)} style={{textAlign: 'left'}}>
          <h3>{stock.stock.name}</h3>
          <h5>Latest Price: <b style={{color:'white'}}>${stock.liveStockData.quote.latestPrice}</b> | Today's Change: {(stock.liveStockData.quote.change < 0) ? <b style={{color:'red'}}>{stock.liveStockData.quote.change}</b> : <b style={{color:'Lime'}}>+{stock.liveStockData.quote.change}</b>}</h5>
        </div>
        <div>
          <button onClick={() => removeFromWatchlist(stock.stock.symbol)} className="ui red basic button" style={{float: 'right'}}>X</button>
        </div>
      </div>
    )
    } else {
      return (<React.Fragment>Loading</React.Fragment>)
    }
}



export default WatchlistStockCard
