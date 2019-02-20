const changeLoadingAction = (status) => ({type: 'LOADING_CHANGE', payload: status})

//set state to loading or not
export const changeLoading = (status) => {
    return (dispatch) => dispatch(changeLoadingAction(status))
}
