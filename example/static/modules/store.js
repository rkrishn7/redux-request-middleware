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

export function getInitialAccessToken() {
    return {
        request: {
            url: "http://localhost:3000/api/access",
            method: "get"
        },
        auth: false,
    };
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

const REDUX_REQUEST_MIDDLEWARE_OPTIONS = {
    resolveToken: function(store) {
        return "sdsdf";
    }
};

export default Redux.createStore(root, 
    Redux.applyMiddleware(
        ReduxThunk.default,
        ReduxReqMW.createRequestMiddleware(REDUX_REQUEST_MIDDLEWARE_OPTIONS)
    )
);