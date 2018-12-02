const recievedStockAction = (obj) => ({type: 'ACTION_CABLE_STOCK_UPDATE', payload: obj})


export const actionCableRecievedStock = (obj) => {
  return (dispatch) => {
    dispatch(recievedStockAction(obj))
  }
}
