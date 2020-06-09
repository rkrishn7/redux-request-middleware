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
    return dispatch => {
        return dispatch({
            request: {
                url: "http://localhost:3000/api/login",
                method: "get"
            },
            auth: false,
        }).then((response) => {

            if(response.status === 200) {
                dispatch(setRefreshToken(response.data.refresh));
                dispatch(setAccessToken(response.data.access));

                return Promise.resolve();
            }

            return Promise.reject(new Error("Unable to login"));
        });
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

const REDUX_REQUEST_MIDDLEWARE_OPTIONS = {
    resolveToken: function(store) {

        const {
            getState,
            dispatch
        } = store;

        const state = getState();
        const access = state.access, refresh = state.refresh;

        



        return "sdsdf";
    }
};

export default Redux.createStore(root, 
    Redux.applyMiddleware(
        ReduxThunk.default,
        ReduxReqMW.createRequestMiddleware(REDUX_REQUEST_MIDDLEWARE_OPTIONS)
    )
);