import * as actionTypes from './actionsTypes';
import axios from 'axios';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
}

export const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token: token,
        userId: userId
    };
}

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
}

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
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
                const expirationDate = new Date(new Date().getTime() + (response.data.expiresIn * 1000))
                localStorage.setItem('token', response.data.idToken);
                localStorage.setItem('expirationDate', expirationDate);
                localStorage.setItem('userId', response.data.localId);
                dispatch(authSuccess(response.data.idToken, response.data.localId));
                dispatch(checkAuthTimeout(response.data.expiresIn));
            }).catch(error => {
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

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if(!token){
            dispatch(logout());
        }else{
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if(expirationDate < new Date()){
                dispatch(logout());
            }else{
                const userId = localStorage.getItem('userId');
                dispatch(authSuccess(token, userId));
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime())/1000));
            }
        }
    }
}