const initialState = {
 user: {
   id: null,
   username: null,
   first_name: null,
   last_name: null,
   email: null,
   account_balance: null,
   owned_stocks: {},
   watchlists: {}
  },
  will: "be needed later"

}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case "SET_USER_DATA":
      return {...state, user:{...action.payload}}
    case "REFRESH_STOCK_DATA":
      return {...state, user:{...state.user, ...action.payload}}
    case "ADD_BALANCE":
      return {...state, user:{...state.user, ...action.payload}}
    case "BUY_STOCK":
      let exist = false
      let owned_stocks = state.user.owned_stocks.map((owned_stock)=> {
          if (owned_stock.id === action.payload.stock_card.id) {
            exist = true
            return {...owned_stock, ...action.payload.stock_card}
          } else {
            return owned_stock
          }
        })
        if (exist === false) {
          owned_stocks.push(action.payload.stock_card)
        }
        let buyState = {...state, user: {...state.user, account_balance: action.payload.total_balance, owned_stocks:[...owned_stocks]}}
      return buyState
    case "SELL_STOCK":
      let sellState;
      sold_stocks = [...state.user.sold_stocks, action.payload.sold_stock_card]
      if (action.payload.deleted === true) {
        let owned_stocks = state.user.owned_stocks.filter((owned_stock)=> {
            return owned_stock.stock.symbol !== action.payload.stockSymbol
          })
        sellState = {...state, user: {...state.user, account_balance: action.payload.total_balance, owned_stocks:[...owned_stocks], sold_stocks:[...sold_stocks]}}
      } else {
        let owned_stocks = state.user.owned_stocks.map((owned_stock)=> {
            if (owned_stock.id === action.payload.stock_card.id) {
              exist = true
              return {...owned_stock, ...action.payload.stock_card}
            } else {
              return owned_stock
            }
          })
        sellState = {...state, user: {...state.user, account_balance: action.payload.total_balance, owned_stocks:[...owned_stocks], sold_stocks:[...sold_stocks]}}
      }
      return sellState
    case "ADD_WATCHLIST":
      let newWatchlist = state.user.watchlists.slice()
      newWatchlist.push(action.payload.stock_card)
      return {...state, user: {...state.user, watchlists:[...newWatchlist]}}
    case "REMOVE_WATCHLIST":
      newWatchlist = state.user.watchlists.filter(stock => stock.stock.symbol !== action.payload.stock_symbol)
      return {...state, user: {...state.user, watchlists:[...newWatchlist]}}
    case "UPDATE_STOCKS":
      // let updatedStockState = {...state, user: {...state.user, owned_stocks:[...action.payload.owned_stocks], sold_stocks:[...action.payload.sold_stocks]}}
      // owned_stock_exist = false
      // sold_stock_exist = false
      owned_stocks = state.user.owned_stocks.map((owned_stock) => {
        for (let newStock in action.payload.owned_stocks) {
          if (owned_stock.id === action.payload.owned_stocks[newStock].id) {
            return {...owned_stock, ...action.payload.owned_stocks[newStock]}
          }
        }
      })
      let sold_stocks = state.user.sold_stocks.map((sold_stock) => {
        for (let newStock in action.payload.sold_stocks) {
          if (sold_stock.id === action.payload.sold_stocks[newStock].id) {
            return {...sold_stock, ...action.payload.sold_stocks[newStock]}
          }
        }
      })
      return {...state, user: {...state.user, owned_stocks:[...owned_stocks], sold_stocks:[...sold_stocks]}}
    case "CANCEL_PURCHASE":
      sold_stocks = state.user.sold_stocks.filter(stock => stock.id !== action.payload.sold_stock_id)
      return {...state, user: {...state.user, sold_stocks:[...sold_stocks]}}

    default:
      return state
  }
}























//
