const refreshStockData = (userObj) => ({type: 'REFRESH_STOCK_DATA', payload: userObj})
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
    return (dispatch) => {
      fetch(`http://localhost:3000/api/v1/owned_stocks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(stockCard)
    })
    .then(r => r.json())
    .then(stockInfo => dispatch({type: 'BUY_STOCK', payload: stockCard}))
    }
  }


  export const sellStock = (stockInfo) => {
    return (dispatch) => {
      fetch(`http://localhost:3000/api/v1/owned_stocks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(stockInfo)
    })
    .then(r => r.json())
    .then(stockCard => dispatch({type: 'SELL_STOCK', payload: stockInfo}))
    }
  }

  // export const searchStock = (name) => {
  //   return (dispatch) => {
  //     fetch(`http://localhost:3000/api/v1/owned_stocks`, {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'Accept': 'application/json'
  //     },
  //     body: JSON.stringify(name)
  //   })
  //   .then(r => r.json())
  //   .then(stockCard => dispatch({type: 'SEARCH_STOCK_RESULT', payload: stockInfo}))
  //   }
  // }


// ???????????????????////////////////////////////////////////////////////////////////
