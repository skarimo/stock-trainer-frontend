import React from 'react'
import TradeModal from '../containers/TradePage'
// import { connect } from 'react-redux'
// import { createBrowserHistory } from "history";
//
// const history = createBrowserHistory();

const SoldStockCard = ({ stock, history, addMessageToHomeScreen, cancelSale }) => {
  if(stock) {
    return (
      <div className="ownedStockCard" >
        <div className="ownedStockSymbol" style={{display: 'flex', flexWrap: 'wrap', flexDirection: 'column', paddingRight:'3%' }}>
          <h1 style={{color:'#A7F432'}}>{stock.stock.symbol}</h1>
          <button onClick={() => cancelSale(stock.id)}>Cancel</button>
        </div>
        <div className="stockCardDetail" style={{textAlign: 'left'}} onClick={() => history.push(`/stock/${stock.stock.id}`, stock)}>
          <div>
            <div style={{paddingBottom:'20px'}}><h3>{stock.stock.name}</h3></div>
            <div>
              <div className="stockSharesDetail">
                <div>
                  <h5>Sale Price: ${parseFloat(stock.sale_price)}</h5>
                  <h5>Date Created: {stock.stock.created_at}</h5>
                </div>
                <div style={{paddingLeft:'10px'}}>
                  <h5>Sold Shares: {stock.sold_shares}</h5>
                  <h5>Pending Sale Shares: {stock.pending_sale_shares}</h5>
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



export default SoldStockCard
