const initialState = {
    data: null,
    isAuth: false,
    packageOfServices: 0,
    userBalance: 0
};

const userReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case "USER:SET_DATA": {
            return {
                ...state,
                data: payload,
                isAuth: true
            }
        }
        case "USER:SET_IS_AUTH": {
            return {
                ...state,
                isAuth: payload
            }
        }
        case "USER:SET_BALANCE": {
            return {
                ...state,
                userBalance: payload
            }
        }
        case "USER:CHANGE_PACK_OF_SERVICES":
            return {
                ...state,
                packageOfServices: payload
            }
        default: return state;
    }
};

export default userReducer;