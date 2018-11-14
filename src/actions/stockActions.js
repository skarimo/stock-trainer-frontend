const refreshStockData = (userObj) => ({type: 'REFRESH_STOCK_DATA', payload: userObj})
const buyStockAction = (stock_card) => ({type: 'BUY_STOCK', payload: stock_card})
const sellStockAction = (stock_card) => ({type: 'SELL_STOCK', payload: stock_card})
const addToWatchlistAction = (stock_card) => ({type: 'ADD_WATCHLIST', payload: stock_card})
const removeFromWatchlistAction = (stock_card) => ({type: 'REMOVE_WATCHLIST', payload: stock_card})
const updateUserStocksAction = (stockObj) => ({type: 'UPDATE_STOCKS', payload: stockObj})
const updateOwnedSharesAction = (stockObj) => ({type: 'UPDATE_OWNED_SHARES', payload: stockObj})
const cancelSaleAction = (soldStockID) => ({type: 'CANCEL_SALE', payload: soldStockID})
const cancelPurchaseAction = (purchaseStockID) => ({type: 'CANCEL_PURCHASE', payload: purchaseStockID})
// const updatePreviousDayStocks = (stockList) => ({type: 'PREVIOUS_DAY_STOCK_DATA', payload: stockList})


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

async function fetchAllStocksList(stocksToFetch) {
    let allFetchedStocks = {}
    for (let stockList in stocksToFetch) {
      await fetchStockInfo(stocksToFetch[stockList]).then((fetchedList) => {
          allFetchedStocks[stockList] = fetchedList
        })
      }
      return(allFetchedStocks)
  }


  export const updateStockInfoOnState = (stocksToFetch) => {
    const newStateObjPromise = fetchAllStocksList(stocksToFetch)
    return (dispatch) => {
      newStateObjPromise.then((newStateObj) => {
        dispatch(refreshStockData(newStateObj))
      })
    }
  }


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
        console.log(stockInfo)
        dispatch(sellStockAction({new_stock_sale: stockInfo, old_stock_card: stockCard}))
      }
    })
    }
  }

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

  export const updateUserStocks = (userID) => {
    const token = localStorage.getItem("token")
    return (dispatch) => {
      fetch(`http://localhost:3000/update_user_stocks/${userID}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `${token}`
      }
    })
    .then(r => r.json())
    .then(newStocksInfo => {
      dispatch(updateUserStocksAction(newStocksInfo))
    })
    }
  }

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

  export const updateOwnedShares = (userID, owned_stock_shares) => {
    const token = localStorage.getItem("token")
    return (dispatch) => {
      fetch(`http://localhost:3000/update_owned/${userID}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `${token}`
      }
    })
    .then(r => r.json())
    .then(newStocksInfo => {
        dispatch(updateOwnedSharesAction(newStocksInfo))
    })
    }
  }



// ???????????????????////////////////////////////////////////////////////////////////
