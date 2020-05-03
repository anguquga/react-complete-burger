import * as actionTypes from '../actions';

const INGREDIENT_PRICES = {
    salad: 0.5,
    bacon: 0.7,
    cheese: 0.4,
    meat: 1.3
};

const initialState = {
    ingredients: {},
    totalPrice: 0
}

const reducer = (state = initialState, action) => {

    switch(action.type) {
        case actionTypes.ADD_INGREDIENT: {
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
                ingredients: updatedIngredients
            }
        }
        case actionTypes.REMOVE_INGREDIENT: {
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
                    ingredients: updatedIngredients
                }
            }
        }
        case actionTypes.BASIC_INGREDIENTS: {
            console.log("BASIC INGREDIENTS ", action.payload, " Lenght: ", Object.keys(state.ingredients).length);
            if(Object.keys(state.ingredients).length === 0){
                return {
                    ...state,
                    ingredients: action.payload
                }
            }
            break;
        }
        default:
            break;

    }

    return state;
};

export default reducer;