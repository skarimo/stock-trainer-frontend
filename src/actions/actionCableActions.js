const recievedStockAction = (obj) => ({type: 'ACTION_CABLE_STOCK_UPDATE', payload: obj})

//action cable dispatch action
export const actionCableRecievedStock = (obj) => {
  return (dispatch) => {
    dispatch(recievedStockAction(obj))
  }
}
