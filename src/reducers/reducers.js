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
      console.log(action.payload)
      return state
    case "SELL_STOCK":
      console.log(action.payload)
      return state
    default:
      return state
  }
}
