import reducer from './authReducer';
import * as actionTypes from '../actions/actionsTypes';

describe('Auth Reducer', () => {
    it('Should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual({
            token: null,
            userId: null,
            error: null,
            loading: false,
            timer: null,
            authRedirectPath: '/'
        });
    });

    it('Should store the token upon login', () => {
        expect(reducer({
            token: null,
            userId: null,
            error: null,
            loading: false,
            timer: null,
            authRedirectPath: '/'
        },{
            type: actionTypes.AUTH_SUCCESS,
            token: 'some-token',
            userId: 'some user-id'
        })).toEqual({
            token: 'some-token',
            userId: 'some user-id',
            error: null,
            loading: false,
            timer: null,
            authRedirectPath: '/'
        });            
    })
});