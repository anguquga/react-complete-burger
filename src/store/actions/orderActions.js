import * as actionTypes from './actionsTypes';
import axios from "../../axios-orders";

export const fetchOrdersStart = () => {
    return {
        type: actionTypes.FETCH_ORDERS_START
    };
}

export const fetchOrdersFailed = (error) => {
    return {
        type: actionTypes.FETCH_ORDERS_FAIL
    };
}

export const fetchOrdersCompleted = (orders) => {
    return {
        type: actionTypes.FETCH_ORDERS_COMPLETE,
        payload: orders
    };
}

export const fetchOrders = (token) => {
    return dispatch => {
        dispatch(fetchOrdersStart());
        axios.get('/orders.json?auth='+token)
            .then(response => {
                dispatch(fetchOrdersCompleted(response.data));
            })
            .catch(error => {
                dispatch(fetchOrdersFailed(error));
            });
    };
}

export const purchaseBurgerSuccess = (id, orderData) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: orderData
    };
}

export const purchaseBurgerFail = (error) => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAIL,
        error: error
    };
}

export const purchaseBurgerStart = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_START
    };
}

export const purchaseBurger = (orderData, token) => {
    return dispatch => {
        dispatch(purchaseBurgerStart());
        axios.post('/orders.json?auth=' + token, orderData)
            .then(response => {
                dispatch(purchaseBurgerSuccess(response.data, orderData))
            })
            .catch(response => {
                dispatch(purchaseBurgerFail(response.error));
            });
    };
}