const initialState = {
 user: {
   id: null,
   username: null,
   first_name: null,
   last_name: null,
   email: null,
   account_balance: null,
   purchased_stocks: {},
   watchlists: {},
   owned_stock_shares: {},
  },
  loading: false,
  will: "be needed later"
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case "SET_USER_DATA":
      return {user:{...action.payload}, loading: false}
    case "LOADING_CHANGE":
      return {...state, loading: action.payload}
    case "REFRESH_STOCK_DATA":
      return {...state, user:{...state.user, ...action.payload}}
    case "ADD_BALANCE":
      return {...state, user:{...state.user, ...action.payload}}
    case "BUY_STOCK":
      let purchased_stocks = [...state.user.purchased_stocks, action.payload.stock_card]
        let buyState = {...state, user: {...state.user, account_balance: action.payload.total_balance, purchased_stocks:[...purchased_stocks]}}
      return buyState
    case "SELL_STOCK":
      let sold_stock = [...state.user.sold_stocks, action.payload.new_stock_sale]
      return {...state, user: {...state.user, sold_stocks: sold_stock}}
    case "ADD_WATCHLIST":
      let newWatchlist = state.user.watchlists.slice()
      newWatchlist.push(action.payload.stock_card)
      return {...state, user: {...state.user, watchlists:[...newWatchlist]}}
    case "REMOVE_WATCHLIST":
      newWatchlist = state.user.watchlists.filter(stock => stock.stock.symbol !== action.payload.stock_symbol)
      return {...state, user: {...state.user, watchlists:[...newWatchlist]}}
    case "REMOVE_SOLD_STOCK":
      let newSoldStocks = state.user.sold_stocks.filter(stock => stock.id !== action.payload.id)
      return {...state, user: {...state.user, sold_stocks:[...newSoldStocks]}}
    case "REMOVE_PURCHASED_STOCK":
      let newPurchasedStocks = state.user.purchased_stocks.filter(stock => stock.id !== action.payload.id)
      return {...state, user: {...state.user, purchased_stocks:[...newPurchasedStocks]}}
    case "LIVE_DATA_SINGLE_STOCK":
        if (action.payload.location === "WATCHLISTS") {
          let newWatchlistedStocks = [...state.user.watchlists]
            for (let stock in newWatchlistedStocks) {
              if (newWatchlistedStocks[stock].id === action.payload.stock.id) {
                newWatchlistedStocks[stock] = action.payload.stock
              }
            }
          return {...state, user: {...state.user, watchlists:[...newWatchlistedStocks]}}
        } else if (action.payload.location === "OWNED_STOCK_SHARES") {
          let newOwnedStockShares = [...state.user.owned_stock_shares]
            for (let stock in newOwnedStockShares) {
              if (newOwnedStockShares[stock].id === action.payload.stock.id) {
                newOwnedStockShares[stock] = action.payload.stock
              }
            }
          return {...state, user: {...state.user, owned_stock_shares:[...newOwnedStockShares]}}
        }
        return {...state}
    case "CANCEL_SALE":
      let sold_stocks = state.user.sold_stocks.map(stock => {
        if (stock.id === action.payload.stock_card.id) {
          return {...stock, ...action.payload.stock_card}
        } else {
          return stock
        }})
      let owned_stock_shares = state.user.owned_stock_shares.map(stock => {
        if (stock.stock.symbol === action.payload.stock_card.stock.symbol) {
          return {...stock, owned_shares: action.payload.new_owned_shares}
        } else {
          return stock
        }})
      return {...state, user: {...state.user, sold_stocks:[...sold_stocks], owned_stock_shares:[...owned_stock_shares]}}
    case "CANCEL_PURCHASE":
    purchased_stocks = state.user.purchased_stocks.map(stock => {
      if (stock.id === action.payload.stock_card.id) {
        return {...stock, ...action.payload.stock_card}
      } else {
        return stock
      }
    })
    return {...state, user: {...state.user, account_balance: action.payload.new_balance, purchased_stocks:[...purchased_stocks]}}
    case "ACTION_CABLE_STOCK_UPDATE":
      if (action.payload.action === "CREATED") {
        if (action.payload.location === "OWNED_STOCK_SHARES") {
          owned_stock_shares = [...state.user.owned_stock_shares, action.payload.stock]
          return {...state, user: {...state.user, owned_stock_shares:[...owned_stock_shares]}}
        }
      } else if (action.payload.action === "UPDATED") {
          if (action.payload.location === "OWNED_STOCK_SHARES") {
            owned_stock_shares = [...state.user.owned_stock_shares]
             for (let stock in owned_stock_shares) {
               if (owned_stock_shares[stock].id === action.payload.stock.id) {
                 owned_stock_shares[stock] = {...owned_stock_shares[stock], ...action.payload.stock}
               }
             }
             return {...state, user: {...state.user, owned_stock_shares:[...owned_stock_shares]}}
          } else if (action.payload.location === "PURCHASED_STOCKS") {
             purchased_stocks = [...state.user.purchased_stocks]
              for (let stock in purchased_stocks) {
                if (purchased_stocks[stock].id === action.payload.stock.id) {
                  purchased_stocks[stock] = {...purchased_stocks[stock], ...action.payload.stock}
                }
              }
              return {...state, user: {...state.user, purchased_stocks:[...purchased_stocks]}}
          } else if (action.payload.location === "SOLD_STOCKS") {
            sold_stocks = [...state.user.sold_stocks]
             for (let stock in sold_stocks) {
               if (sold_stocks[stock].id === action.payload.stock.id) {
                 sold_stocks[stock] = {...sold_stocks[stock], ...action.payload.stock}
               }
             }
             return {...state, user: {...state.user, sold_stocks:[...sold_stocks]}}
          }
      }  else if (action.payload.action === "DESTROYED") {
          if (action.payload.location === "OWNED_STOCK_SHARES") {
            owned_stock_shares = state.user.owned_stock_shares.filter((owned_stock) => {
              return owned_stock.id !== action.payload.stock.id
            })
            return {...state, user: {...state.user, owned_stock_shares:[...owned_stock_shares]}}
          }
        } else if (action.payload.action === "UPDATE_BALANCE") {
          return {...state, user: {...state.user, account_balance: action.payload.account_balance}}
        }
    return {...state}

    default:
      return state
  }
}
