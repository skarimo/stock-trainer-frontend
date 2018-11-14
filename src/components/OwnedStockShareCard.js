import React from 'react'
import TradeModal from '../containers/TradePage'
// import { connect } from 'react-redux'
// import { createBrowserHistory } from "history";
//
// const history = createBrowserHistory();

const OwnedStockShareCard = ({ stock, history, addMessageToHomeScreen }) => {
  if(stock.liveStockData) {
    return (
      <div className="ownedStockCard" >
        <div className="ownedStockSymbol" style={{display: 'flex', flexWrap: 'wrap', flexDirection: 'column', paddingRight:'3%' }}>
          <h1 style={{color:'#A7F432'}}>{stock.stock.symbol}</h1>
          <TradeModal addMessageToHomeScreen={addMessageToHomeScreen} stock={stock.stock} liveData={stock.liveStockData.quote}/>
        </div>
        <div className="stockCardDetail" style={{textAlign: 'left'}} onClick={() => history.push(`/stock/${stock.stock.id}`, stock)}>
          <div>
            <div style={{paddingBottom:'20px'}}><h3>{stock.stock.name}</h3></div>
            <div>
              <div className="stockSharesDetail">
                <div>
                  <h5>Average Buy Price: <b style={{color:'white'}}>${stock.avg_buy_price}</b></h5>
                  <h5>Owned Shares: <b style={{color:'white'}}>{stock.owned_shares}</b></h5>
                </div>
                <div style={{paddingLeft:'10px'}}>
                  <h5>Current Price: <b style={{color:'white'}}>{stock.liveStockData.quote.latestPrice}</b></h5>
                  <h5>Latest Volume: <b style={{color:'white'}}>{stock.liveStockData.quote.latestVolume}</b></h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  } else {
    return (<React.Fragment>Loading</React.Fragment>)
  }
}



export default OwnedStockShareCard
