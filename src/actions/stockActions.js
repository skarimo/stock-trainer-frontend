const refreshStockData = (userObj) => ({type: 'REFRESH_STOCK_DATA', payload: userObj})
const buyStockAction = (stock_card) => ({type: 'BUY_STOCK', payload: stock_card})
const sellStockAction = (stock_card) => ({type: 'SELL_STOCK', payload: stock_card})
const addToWatchlistAction = (stock_card) => ({type: 'ADD_WATCHLIST', payload: stock_card})
const removeFromWatchlistAction = (stock_card) => ({type: 'REMOVE_WATCHLIST', payload: stock_card})
const updateUserStocksAction = (stockObj) => ({type: 'UPDATE_STOCKS', payload: stockObj})
const cancelSaleAction = (soldStockID) => ({type: 'CANCEL_PURCHASE', payload: soldStockID})
// const updatePreviousDayStocks = (stockList) => ({type: 'PREVIOUS_DAY_STOCK_DATA', payload: stockList})

const token = localStorage.getItem("token")

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
      let stock_card = {...stockInfo.stock_card, stock:{...stockInfo.stock}, liveStockData:{quote:{...stockInfo.liveStockData}}}
      dispatch(buyStockAction({stock_card: stock_card, total_balance: stockInfo.new_balance}))
    })
    }
  }


  export const sellStock = (stockCard) => {
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
      if (stockInfo.message) {
        dispatch(sellStockAction({deleted: true, total_balance: stockInfo.new_balance, stockSymbol: stockCard.symbol}))
      } else {
      let stock_card = {...stockInfo.stock_card, stock:{...stockInfo.stock}, liveStockData:{quote:{...stockInfo.liveStockData}}}
      dispatch(sellStockAction({stock_card: stock_card, total_balance: stockInfo.new_balance, sold_stock_card: stockInfo.sold_stock_card}))
    }
    })
    }
  }

  export const addToWatchlist = (load) => {
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
    return (dispatch) => {
      fetch(`http://localhost:3000/sold_stocks/${soldStockID}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `${token}`
      }
    })
    .then(r => r.json())
    .then(res => {
      dispatch(cancelSaleAction({sold_stock_id: soldStockID}))
    })
    }
  }



// ???????????????????////////////////////////////////////////////////////////////////
