import * as actionTypes from './actionsTypes';
import axios from 'axios';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
}

export const authSuccess = (authData) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        authData: authData
    };
}

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
}

export const logout = () => {
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const setTimer = (timer) => {
    return {
        type: actionTypes.AUTH_TIMER,
        timer: timer
    }
}

export const checkAuthTimeout = (expiresIn) =>{
    return dispatch => {
        let timer = setTimeout(() => {
            dispatch(logout())
        }, expiresIn * 1000);
        dispatch(setTimer(timer));
    };

}

export const authenticate = (email, password, isSignUp) => {
    console.log('Email: ', email, 'Password: ', password);
    return dispatch => {
        //...
        dispatch(authStart());
        let apiKey = 'AIzaSyBqyTcORCbvjABe6T50V62rA2WBEyK1vdY';
        let url = isSignUp ? 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' : 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=';

        axios.post(url + apiKey,
            {
                email: email,
                password: password,
                returnSecureToken: true
            }).then(response =>{
                console.log(response);
                dispatch(authSuccess(response.data));
                dispatch(checkAuthTimeout(response.data.expiresIn));
            }).catch(error => {
                //console.log(error.response.data.error);
                dispatch(authFail(null));
            });

    }
}

export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT,
        path: path
    }
}


