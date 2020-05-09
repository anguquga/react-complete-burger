import * as actionTypes from '../actions/actionsTypes';

const initialState = {
    token: null,
    userId: null,
    error: null,
    loading: false,
    timer: null,
    authRedirectPath: '/'
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_START: {
            return {
                ...state,
                error: null,
                loading: true,
                token: null,
                userId: null
            };

        }
        case actionTypes.AUTH_SUCCESS: {
            return {
                ...state,
                error: null,
                loading: false,
                token: action.authData.idToken,
                userId: action.authData.localId
            };
        }
        case actionTypes.AUTH_FAIL: {
            return {
                ...state,
                error: action.error,
                loading: false,
                token: null,
                userId: null
            };
        }
        case actionTypes.AUTH_LOGOUT: {
            clearTimeout(state.timer);
            return {
                ...state,
                userId: null,
                token: null
            }
        }
        case actionTypes.AUTH_TIMER: {
            return {
                ...state,
                timer: action.timer
            }
        }
        case actionTypes.SET_AUTH_REDIRECT: {
            return {
                ...state,
                authRedirectPath: action.path
            }
        }
        default:
            return state;
    }
}

export default reducer;