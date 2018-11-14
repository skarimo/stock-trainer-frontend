import React from 'react'
import TradeModal from '../containers/TradePage'
// import { connect } from 'react-redux'
// import { createBrowserHistory } from "history";
//
// const history = createBrowserHistory();


const SoldStockCard = ({ stock, history, addMessageToHomeScreen, cancelSale }) => {

  if(stock) {
    return (
      <div className="soldStockCard" >
        <div className="ownedStockSymbol" style={{display: 'flex', flexWrap: 'wrap', flexDirection: 'column', paddingRight:'3%' }}>
          <h5 style={{color:'#A7F432'}}>{stock.stock.symbol}</h5>
          <b>{statusShow(stock.status, stock.status_id)}</b>
          {stock.status.name === "PENDING" ? <button className="ui inverted red button" onClick={() => cancelSale(stock.id)}>Cancel</button> : <button className="ui grey button" onClick={console.log}>Remove</button>}
        </div>
        <div className="stockCardDetail" style={{textAlign: 'left'}} onClick={() => history.push(`/stock/${stock.stock.id}`, stock)}>
          <div>
            <div style={{paddingBottom:'20px'}}><h3>{stock.stock.name}</h3></div>
            <div>
              <div className="stockSharesDetail">
                <div>
                  <p>Sale Price: <b style={{color:'white'}}>${parseFloat(stock.sale_price)}</b></p>
                  <p>Date Created: <b style={{color:'white'}}>{new Date(stock.created_at).toLocaleString()}</b></p>
                </div>
                <div style={{paddingLeft:'10px'}}>
                  <p>Sold Shares: <b style={{color:'white'}}>{stock.sold_shares}</b></p>
                  <p>Pending Sale Shares: <b style={{color:'white'}}>{stock.pending_sale_shares}</b></p>
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

function statusShow(status, status_id) {
  if (status.name === "PENDING" || status_id === 2) {
    return null
  } else if (status.name === "CANCELED" || status_id === 3) {
    return <b style={{color: 'red'}}>CANCELED</b>
  } else if (status.name === "COMPLETED" || status_id === 1) {
    return <b style={{color: 'green'}}>COMPLETED</b>
  }
}



export default SoldStockCard
