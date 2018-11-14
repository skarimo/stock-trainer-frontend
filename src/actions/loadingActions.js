const changeLoadingAction = (status) => ({type: 'LOADING_CHANGE', payload: status})


export const changeLoading = (status) => {
    return (dispatch) => dispatch(changeLoadingAction(status))
}
