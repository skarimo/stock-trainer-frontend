const addBalanceAction = (amount) => ({type: 'ADD_BALANCE', payload: amount})

//add balance to user obj contains user_id and amount
export const addBalance = (obj) => {
  const token = localStorage.getItem("token")
  return (dispatch) => {
    fetch(`http://localhost:3000/add_balance`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `${token}`
    },
    body: JSON.stringify(obj)
  })
  .then(r => r.json())
  .then(newBalance => {
    dispatch(addBalanceAction(newBalance))
  })
  }
}
