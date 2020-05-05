import * as actionTypes from '../actions/actionsTypes';

const initialState = {
    orders: [],
    error: false,
    loading: false
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.FETCH_ORDERS_COMPLETE: {
            return{
                ...state,
                error: false,
                orders: action.payload,
                loading: false
            };
        }
        case actionTypes.FETCH_ORDERS_START: {
            return{
                ...state,
                error: false,
                loading: true
            };
        }
        case actionTypes.FETCH_ORDERS_FAIL: {
            return{
                ...state,
                error: true,
                orders: null,
                loading: false
            };
        }
        case actionTypes.PURCHASE_BURGER_SUCCESS: {
            const newOrder = {
                ...action.orderData,
                id: action.orderId
            }
            return{
                ...state,
                loading: false,
                orders: state.orders.concat(newOrder)
            };
        }
        case actionTypes.PURCHASE_BURGER_FAIL: {
            return{
                ...state,
                loading: false
            };
        }
        case actionTypes.PURCHASE_BURGER_START: {
            return{
                ...state,
                loading: false
            };
        }
        default:
            break;
    }

    return state;
}

export default reducer;