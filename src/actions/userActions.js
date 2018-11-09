const addBalanceAction = (amount) => ({type: 'ADD_BALANCE', payload: amount})

const token = localStorage.getItem("token")

export const addBalance = (stockCard) => {
  return (dispatch) => {
    fetch(`http://localhost:3000/add_balance`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `${token}`
    },
    body: JSON.stringify(stockCard)
  })
  .then(r => r.json())
  .then(newBalance => {
    dispatch(addBalanceAction(newBalance))
  })
  }
  }