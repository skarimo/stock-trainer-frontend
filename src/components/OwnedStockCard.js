import React from 'react'
import TradeModal from '../containers/TradePage'
// import { connect } from 'react-redux'
// import { createBrowserHistory } from "history";
//
// const history = createBrowserHistory();

const OwnedStockCard = ({ stock, history, addMessageToHomeScreen }) => {
  if(stock.liveStockData) {
    return (
      <div className="ownedStockCard" >
        <div className="ownedStockSymbol" style={{display: 'flex', flexWrap: 'wrap', flexDirection: 'column', paddingRight:'3%' }}>
          <h1 style={{color:'#A7F432'}}>{stock.liveStockData.quote.symbol}</h1>
          <TradeModal addMessageToHomeScreen={addMessageToHomeScreen} stock={stock.stock} liveData={stock.liveStockData.quote}/>
        </div>
        <div className="stockCardDetail" style={{textAlign: 'left'}} onClick={() => history.push(`/stock/${stock.stock.id}`, stock)}>
          <div>
            <div style={{paddingBottom:'20px'}}><h3>{stock.stock.name}</h3></div>
            <div>
              <div className="stockSharesDetail">
                <div>
                  <h5>Latest Price: ${stock.liveStockData.quote.latestPrice}</h5>
                  <h5>Today's Change: {(stock.liveStockData.quote.change < 0) ? <b style={{color:'red'}}>{stock.liveStockData.quote.change}</b> : <b style={{color:'Lime'}}>{stock.liveStockData.quote.change}</b>}</h5>
                </div>
                <div style={{paddingLeft:'10px'}}>
                  <h5>Shares Owned: {stock.owned_shares}</h5>
                  <h5>Pending Shares: {stock.pending_buy_shares}</h5>
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



export default OwnedStockCard
