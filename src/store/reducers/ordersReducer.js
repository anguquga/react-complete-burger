import * as actionTypes from '../actions/actionsTypes';

const initialState = {
    orders: [],
    errorOrder: false,
    loadingOrder: false,
    purchasedOrder: false
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.FETCH_ORDERS_COMPLETE: {
            return{
                ...state,
                errorOrder: false,
                orders: action.payload,
                loadingOrder: false
            };
        }
        case actionTypes.FETCH_ORDERS_START: {
            return{
                ...state,
                errorOrder: false,
                loadingOrder: true
            };
        }
        case actionTypes.FETCH_ORDERS_FAIL: {
            return{
                ...state,
                errorOrder: true,
                orders: null,
                loadingOrder: false
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
                orders: state.orders.concat(newOrder),
                purchasedOrder: true
            };
        }
        case actionTypes.PURCHASE_BURGER_FAIL: {
            return{
                ...state,
                loadingOrder: false,
                purchasedOrder: false
            };
        }
        case actionTypes.PURCHASE_BURGER_START: {
            return{
                ...state,
                loadingOrder: true,
                purchasedOrder: false
            };
        }
        default:
            break;
    }

    return state;
}

export default reducer;