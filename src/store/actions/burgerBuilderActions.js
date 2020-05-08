import * as actionTypes from './actionsTypes';
import axios from "../../axios-orders";

export const addIngredient = (type) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientType: type
    };
}

export const removeIngredient = (type) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientType: type
    };
}

export const fetchIngredientsSuccess = (ingredients) => {
    return {
        type: actionTypes.FETCH_INGREDIENTS_SUCCESS,
        payload: ingredients
    };
}

export const fetchIngredientsFailed = () => {
    return {
        type: actionTypes.FETCH_INGREDIENTS_FAILED
    };
}
export const fetchIngredientsStart = () => {
    return {
        type: actionTypes.FETCH_INGREDIENTS_START
    };
}

export const fetchIngredients = () => {
    return dispatch => {
        dispatch(fetchIngredientsStart());
        axios.get('/ingredients.json')
            .then(response => {
                dispatch(fetchIngredientsSuccess(response.data));
            }).catch(error => {
                dispatch(fetchIngredientsFailed());
        });
    };
}
