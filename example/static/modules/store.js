/**
 * Actions
 */

const UPDATE_ACCESS_TOKEN   = "UPDATE_ACCESS_TOKEN";
const UPDATE_REFRESH_TOKEN  = "UPDATE_REFRESH_TOKEN";

export function setRefreshToken(value) {
    return {
        type: UPDATE_REFRESH_TOKEN,
        value
    }
}

export function setAccessToken(value) {
    return {
        type: UPDATE_ACCESS_TOKEN,
        value
    }
}

/**
 * Reducer
 */

const initialState = {
    access: null,
    refresh: null,
};

function root(state = initialState, action) {
    switch(action.type) {
        case UPDATE_ACCESS_TOKEN:
            return {
                ...state,
                access: action.value
            };
        case UPDATE_REFRESH_TOKEN:
            return {
                ...state,
                refresh: action.value
            };
        default:
            return state;
    }
}

export default Redux.createStore(root, Redux.applyMiddleware(ReduxThunk.default));