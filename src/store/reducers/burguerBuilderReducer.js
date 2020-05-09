import * as actionTypes from '../actions/actionsTypes';

const INGREDIENT_PRICES = {
    salad: 0.5,
    bacon: 0.7,
    cheese: 0.4,
    meat: 1.3
};

const initialState = {
    ingredients: null,
    totalPrice: 0,
    burgerBuilderError: false,
    burgerBuilderLoading: false,
    building: true
}

const addIngredient = (state, action) => {
    console.log("ADD INGREDIENTS ", state.ingredients);
    const oldCount = state.ingredients[action.ingredientType];
    const updatedCount = oldCount + 1;
    const updatedIngredients = {
        ...state.ingredients
    };
    updatedIngredients[action.ingredientType] = updatedCount;
    const priceAddition = INGREDIENT_PRICES[action.ingredientType];
    const oldPrice = state.totalPrice;
    const newPrice = oldPrice + priceAddition;
    console.log("UpdateD INGREDIENTS ", updatedIngredients);

    return {
        ...state,
        totalPrice: newPrice,
        ingredients: updatedIngredients,
        building: true
    }
}

const removeIngredient = (state, action) => {
    const oldCount = state.ingredients[action.ingredientType];
    if (oldCount <= 0) {
        return;
    } else {
        let updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...state.ingredients
        };
        updatedIngredients[action.ingredientType] = updatedCount;
        const priceDeduction = INGREDIENT_PRICES[action.ingredientType];
        const oldPrice = state.totalPrice;
        const newPrice = oldPrice - priceDeduction;
        return {
            ...state,
            totalPrice: newPrice,
            ingredients: updatedIngredients,
            building: true
        }
    }
}

const reducer = (state = initialState, action) => {

    switch (action.type) {
        case actionTypes.ADD_INGREDIENT: {
            return addIngredient(state, action);
        }
        case actionTypes.REMOVE_INGREDIENT: {
            return removeIngredient(state, action);
        }
        case actionTypes.FETCH_INGREDIENTS_SUCCESS: {
            return {
                ...state,
                ingredients: action.payload,
                burgerBuilderError: false,
                burgerBuilderLoading: false
            };
        }
        case actionTypes.FETCH_INGREDIENTS_FAILED: {
            return {
                ...state,
                burgerBuilderError: true,
                ingredients: null,
                burgerBuilderLoading: false
            };
        }
        case actionTypes.FETCH_INGREDIENTS_START: {
            return {
                ...state,
                burgerBuilderError: false,
                ingredients: null,
                burgerBuilderLoading: true,
                totalPrice: 0,
                building: false
            };
        }
        default:
            break;

    }

    return state;
};

export default reducer;