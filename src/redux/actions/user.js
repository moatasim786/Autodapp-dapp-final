const Actions = {
    setUserData: (data) => ({
        type: "USER:SET_DATA",
        payload: data
    }),
    setIsAuth: (bool) => ({
        type: "USER:SET_IS_AUTH",
        payload: bool
    }),
    fetchUserLogin: (postData) => (dispatch) => {
        dispatch(Actions.setIsAuth(true));
    },
    changeUserPack: (data) => ({
        type: "USER:CHANGE_PACK_OF_SERVICES",
        payload: data
    }),
    setUserBalance: (data) => ({
        type: "USER:SET_BALANCE",
        payload: data
    })
}

export default Actions;