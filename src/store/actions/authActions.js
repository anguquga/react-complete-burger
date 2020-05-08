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

export const authFail = () => {
    return {
        type: actionTypes.AUTH_FAIL
    };
}

export const authenticate = (email, password, isSignUp) => {
    console.log('Email: ', email, 'Password: ', password);
    return dispatch => {
        //...
        dispatch(authStart());
        let apiKey = 'AIzaSyBqyTcORCbvjABe6T50V62rA2WBEyK1vdY';
        let url = isSignUp ? 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=':'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=';
        axios.post(url+apiKey,
            {
                email: email,
                password: password,
                returnSecureToken: true
            }).then(response => {
                console.log(response);
                dispatch(authSuccess(response.data));
            })
            .catch(err => {
                console.log(err);
                dispatch(authFail());
            });
    }
}


