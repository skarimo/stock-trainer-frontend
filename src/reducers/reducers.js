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
  will: "be needed later"

}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case "SET_USER_DATA":
      return {user:{...action.payload}}
    case "REFRESH_STOCK_DATA":
      return {...state, user:{...state.user, ...action.payload}}
    case "ADD_BALANCE":
      return {...state, user:{...state.user, ...action.payload}}
    case "BUY_STOCK":
      let purchased_stocks = [...state.user.purchased_stocks, action.payload.stock_card]
        let buyState = {...state, user: {...state.user, account_balance: action.payload.total_balance, purchased_stocks:[...purchased_stocks]}}
      return buyState
    case "SELL_STOCK":
      let owned_stock_shares = state.user.owned_stock_shares.map((owned_stock_share) => {
        if(owned_stock_share.stock.symbol === action.payload.old_stock_card.symbol) {
          return {...owned_stock_share, owned_shares: (owned_stock_share.owned_shares - action.payload.old_stock_card.shares_amount)}
        } else {
          return owned_stock_share
        }
      })
      let sold_stock = [...state.user.sold_stocks, action.payload.new_stock_sale]
      return {...state, user: {...state.user, owned_stock_shares:[...owned_stock_shares], sold_stocks: sold_stock}}
    case "ADD_WATCHLIST":
      let newWatchlist = state.user.watchlists.slice()
      newWatchlist.push(action.payload.stock_card)
      return {...state, user: {...state.user, watchlists:[...newWatchlist]}}
    case "REMOVE_WATCHLIST":
      newWatchlist = state.user.watchlists.filter(stock => stock.stock.symbol !== action.payload.stock_symbol)
      return {...state, user: {...state.user, watchlists:[...newWatchlist]}}
    case "UPDATE_STOCKS":
    case "REMOVE_SOLD_STOCK":
      let newSoldStocks = state.user.sold_stocks.filter(stock => stock.id !== action.payload.id)
      return {...state, user: {...state.user, sold_stocks:[...newSoldStocks]}}
    case "REMOVE_PURCHASED_STOCK":
      let newPurchasedStocks = state.user.purchased_stocks.filter(stock => stock.id !== action.payload.id)
      return {...state, user: {...state.user, purchased_stocks:[...newPurchasedStocks]}}
    case "UPDATE_STOCKS":
      // let updatedStockState = {...state, user: {...state.user, purchased_stocks:[...action.payload.purchased_stocks], sold_stocks:[...action.payload.sold_stocks]}}
      // purchased_stock_exist = false
      // sold_stock_exist = false
      purchased_stocks = state.user.purchased_stocks.map((purchased_stock) => {
        let found = false
        for (let newStock in action.payload.purchased_stocks) {
          if (purchased_stock.id === action.payload.purchased_stocks[newStock].id) {
            found = true
            return {...purchased_stock, ...action.payload.purchased_stocks[newStock]}
          }
        } if (found = false) {
          return {...purchased_stock}
        }
      })
      let sold_stocks = state.user.sold_stocks.map((sold_stock) => {
        let found = false
        for (let newStock in action.payload.sold_stocks) {
          if (sold_stock.id === action.payload.sold_stocks[newStock].id) {
            found = true
            return {...sold_stock, ...action.payload.sold_stocks[newStock]}
          }
        } if (found = false) {
          return {...sold_stock}
        }
      })
      return {...state, user: {...state.user, account_balance: action.payload.account_balance, purchased_stocks:[...purchased_stocks], sold_stocks:[...sold_stocks]}}
    case "CANCEL_SALE":
      sold_stocks = state.user.sold_stocks.map(stock => {
        if (stock.id === action.payload.stock_card.id) {
          return {...stock, ...action.payload.stock_card}
        } else {
          return stock
        }})
      owned_stock_shares = state.user.owned_stock_shares.map(stock => {
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
    case "UPDATE_OWNED_SHARES":
      // let owned_stock_share = [...state.user.owned_stock_shares, ...action.payload]
      let new_array = []
      action.payload.map((new_owned_stock) => {
        let found;
        state.user.owned_stock_shares.forEach((owned_stock) => {
          if (new_owned_stock.id === owned_stock.id) {

             found = {...owned_stock, ...new_owned_stock}
          }
        })
        if (found) {
          new_array.push({...found})
        } else {
          new_array.push({...new_owned_stock})
        }
      })
    return {...state, user: {...state.user, owned_stock_shares:[...new_array]}}
    return state
    default:
      return state
  }
}























//
