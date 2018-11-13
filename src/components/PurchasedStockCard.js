import React from 'react'
import TradeModal from '../containers/TradePage'
// import { connect } from 'react-redux'
// import { createBrowserHistory } from "history";
//
// const history = createBrowserHistory();

const PurchasedStockCard = ({ stock, history, addMessageToHomeScreen, cancelPurchase }) => {
    return (
      <div className="purchasedStockCard" >
        <div className="ownedStockSymbol" style={{display: 'flex', flexWrap: 'wrap', flexDirection: 'column', paddingRight:'3%' }}>
          <h5 style={{color:'#A7F432'}}>{stock.stock.symbol}</h5>
            <b>{statusShow(stock.status, stock.status_id)}</b>
            {stock.status.name === "PENDING" ? <button className="ui inverted red button" onClick={() => cancelPurchase(stock.id)}>Cancel</button> : <button className="ui grey button" onClick={console.log}>Remove</button>}
        </div>
        <div className="stockCardDetail" style={{textAlign: 'left'}} onClick={() => history.push(`/stock/${stock.stock.id}`, stock)}>
          <div>
            <div style={{paddingBottom:'20px'}}><h3>{stock.stock.name}</h3></div>
            <div>
              <div className="stockSharesDetail">
                <div>
                  <p>Buy Price: ${stock.buy_price}</p>
                  <p>Purchase Date: {new Date(stock.created_at).toLocaleString()}</p>
                </div>
                <div style={{paddingLeft:'10px'}}>
                  <p>Shares Purchased: {stock.owned_shares}</p>
                  <p>Pending Shares: {stock.pending_buy_shares}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
}

function statusShow(status, status_id) {
  if (status.name === "PENDING" || status_id === "2") {
    return <b style={{color: 'yellow'}}>PENDING</b>
  } else if (status.name === "CANCELED" || status_id === "3") {
    return <b style={{color: 'red'}}>CANCELED</b>
  } else if (status.name === "COMPLETED" || status_id === "1") {
    return <b style={{color: 'green'}}>COMPLETED</b>
  }
}


export default PurchasedStockCard
