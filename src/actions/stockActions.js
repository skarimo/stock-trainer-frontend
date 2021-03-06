const refreshStockData = (userObj) => ({type: 'REFRESH_STOCK_DATA', payload: userObj})
const buyStockAction = (stock_card) => ({type: 'BUY_STOCK', payload: stock_card})
const sellStockAction = (stock_card) => ({type: 'SELL_STOCK', payload: stock_card})
const addToWatchlistAction = (stock_card) => ({type: 'ADD_WATCHLIST', payload: stock_card})
const removeFromWatchlistAction = (stock_card) => ({type: 'REMOVE_WATCHLIST', payload: stock_card})
const cancelSaleAction = (soldStockID) => ({type: 'CANCEL_SALE', payload: soldStockID})
const cancelPurchaseAction = (purchaseStockID) => ({type: 'CANCEL_PURCHASE', payload: purchaseStockID})
const updateSingleLiveStockDataAction = (payloadObj) => ({type: 'LIVE_DATA_SINGLE_STOCK', payload: payloadObj})

const removeSoldStockAction = (id) => ({type: 'REMOVE_SOLD_STOCK', payload: id})
const removePurchasedStockAction = (id) => ({type: 'REMOVE_PURCHASED_STOCK', payload: id})

//fetch single stock info
const fetchStockInfo = (stockList) => {
    if (stockList) {
      const stockSymbols = stockList.map((stock) => stock.stock.symbol).join(',')
       return fetch(`https://api.iextrading.com/1.0/stock/market/batch?symbols=${stockSymbols}&types=quote`).then(res => res.json())
      .then(stockObj => {
        const newStockCard = stockList.map((stock) => {
          const liveStockData = stockObj[stock.stock.symbol]
            return {...stock, liveStockData: liveStockData}
          })
          return newStockCard
        })
    }
}

//fetch multiple stocks in single array
async function fetchAllStocksList(stocksToFetch) {
    let allFetchedStocks = {}
    for (let stockList in stocksToFetch) {
      await fetchStockInfo(stocksToFetch[stockList]).then((fetchedList) => {
          allFetchedStocks[stockList] = fetchedList
        })
      }
      return(allFetchedStocks)
  }


//fetch all passed in stocks in multiple arrays and dispatch action
export const updateStockInfoOnState = (stocksToFetch) => {
  const newStateObjPromise = fetchAllStocksList(stocksToFetch)
  return (dispatch) => {
    newStateObjPromise.then((newStateObj) => {
      dispatch(refreshStockData(newStateObj))
    })
  }
}

//update a single passed in stock
export const updateSingleLiveStockData = (stock, location) => {
  return (dispatch) => {
  fetch(`https://api.iextrading.com/1.0/stock/${stock.stock.symbol}/quote`).then(res => res.json())
 .then(liveStockData => {
     const newStockObj = {...stock, liveStockData: {quote: liveStockData}}
     dispatch(updateSingleLiveStockDataAction({stock: newStockObj, location: location}))
   })
 }
}

//purchase a stock
export const buyStock = (stockCard) => {
  const token = localStorage.getItem("token")
  return (dispatch) => {
    fetch(`http://localhost:3000/buy_stock`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `${token}`
    },
    body: JSON.stringify(stockCard)
  })
  .then(r => r.json())
  .then((stockInfo) => {
    let stock_card = {...stockInfo.stock_card, stock:{...stockInfo.stock}, status:{...stockInfo.status}}
    dispatch(buyStockAction({stock_card: stock_card, total_balance: stockInfo.new_balance}))
  })
  }
}

//sell a stock
export const sellStock = (stockCard) => {
  const token = localStorage.getItem("token")
  return (dispatch) => {
    fetch(`http://localhost:3000/sell_stock`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `${token}`
    },
    body: JSON.stringify(stockCard)
  })
  .then(r => r.json())
  .then((stockInfo) => {
    if (stockInfo) {
      dispatch(sellStockAction({new_stock_sale: stockInfo, old_stock_card: stockCard}))
    }
  })
  }
}

//add to watchlsit
export const addToWatchlist = (load) => {
  const token = localStorage.getItem("token")
  return (dispatch) => {
    fetch(`http://localhost:3000/add_watchlist`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `${token}`
    },
    body: JSON.stringify(load)
  })
  .then(r => r.json())
  .then((stockInfo) => {
    if (!stockInfo.already_added) {
      let stock_card = {...stockInfo.stock_card, stock:{...stockInfo.stock}, liveStockData:{quote:{...stockInfo.liveStockData}}}
      dispatch(addToWatchlistAction({stock_card: stock_card}))
    }
  })
  }
}

//remove from watchlist
export const removeFromWatchlist = (load) => {
  const token = localStorage.getItem("token")
  return (dispatch) => {
    fetch(`http://localhost:3000/remove_watchlist`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `${token}`
    },
    body: JSON.stringify(load)
  })
  .then(r => r.json())
  .then((stockInfo) => {
    dispatch(removeFromWatchlistAction({stock_symbol: load.stock_symbol}))
  })
  }
}

// cancel sale transection
export const cancelSale = (soldStockID) => {
  const token = localStorage.getItem("token")
  return (dispatch) => {
    fetch(`http://localhost:3000/cancel_sale/${soldStockID}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `${token}`
    }
  })
  .then(r => r.json())
  .then(res => {
    let stock_card = {...res.stock_card, status: {...res.status}, stock: {...res.stock}}
    dispatch(cancelSaleAction({stock_card: stock_card, new_owned_shares: res.new_owned_shares}))
  })
  }
}

//cancel purchase transation
export const cancelPurchase = (purchaseStockID) => {
  const token = localStorage.getItem("token")
  return (dispatch) => {
    fetch(`http://localhost:3000/cancel_purchase/${purchaseStockID}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `${token}`
    }
  })
  .then(r => r.json())
  .then(res => {
    let stock_card = {...res.stock_card, status: {...res.status}, stock: {...res.stock}}
    dispatch(cancelPurchaseAction({stock_card: stock_card, new_balance: res.new_balance}))
  })
  }
}

//remove/delete sold stock card
export const removeSoldStock = (id) => {
  const token = localStorage.getItem("token")
  return (dispatch) => {
    fetch(`http://localhost:3000/sold_stocks/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `${token}`
    }
  })
  .then(r => r.json())
  .then((res) => {
    dispatch(removeSoldStockAction({id: id}))
  })
  }
}

//remove/delete purchased stock card
export const removePurchasedStock = (id) => {
  const token = localStorage.getItem("token")
  return (dispatch) => {
    fetch(`http://localhost:3000/purchased_stocks/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `${token}`
    }
  })
  .then(r => r.json())
  .then((res) => {
    dispatch(removePurchasedStockAction({id: id}))
  })
  }
}
