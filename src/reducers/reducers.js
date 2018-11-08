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
      console.log(action.payload)
      if (action.payload.deleted === true) {
        let owned_stocks = state.user.owned_stocks.filter((owned_stock)=> {
          debugger
            return owned_stock.stock.symbol !== action.payload.stockSymbol
          })
        sellState = {...state, user: {...state.user, account_balance: action.payload.total_balance, owned_stocks:[...owned_stocks]}}
      } else {
        let owned_stocks = state.user.owned_stocks.map((owned_stock)=> {
            if (owned_stock.id === action.payload.stock_card.id) {
              exist = true
              return {...owned_stock, ...action.payload.stock_card}
            } else {
              return owned_stock
            }
          })
        sellState = {...state, user: {...state.user, account_balance: action.payload.total_balance, owned_stocks:[...owned_stocks]}}
      }
      return sellState
    default:
      return state
  }
}
