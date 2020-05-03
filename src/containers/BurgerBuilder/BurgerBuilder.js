import React, {Component} from 'react';
import Aux from "../../hoc/Aux/Aux";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";


import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import * as actionTypes from "../../store/actions";
import {connect} from "react-redux";

class BurgerBuilder extends Component{

    state = {
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false,
    }

    componentDidMount() {
        if(Object.keys(this.props.ingredients).length === 0) {
            axios.get('/ingredients.json')
                .then(response => {
                    this.props.setBasicIngredients(response.data);
                }).catch(error => {
                this.setState({error: error})
            });
        }
    }

    updatePurchase (ingredients){
        const sum = Object.keys(ingredients).map(igKey => {
            return ingredients[igKey];
        })
        .reduce((sum, el) => {
               return sum + el;
        }, 0);
        return sum > 0;
    }

    purchaseHandler = () => {
        this.setState({purchasing: true});
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }

    checkout = () => {
        this.setState({loading: true});
        this.props.history.push('/checkout');
    }

    render() {
        const disabledInfo = {
            ...this.props.ingredients
        }
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }

        let orderSummary = null;

        let burger = this.state.error ? <p>Ingredients can't be loaded!</p>:null;

        if (this.props.ingredients) {
            burger = (<Aux><Burger />
            <BuildControls
                ingredientAdded={this.props.onAddIngredient}
                ingredientRemoved={this.props.onRemoveIngredient}
                disabled={disabledInfo}
                price={this.props.totalPrice}
                purchasable={this.updatePurchase(this.props.ingredients)}
                purchasing={this.purchaseHandler}
            /></Aux>);
            orderSummary = <OrderSummary
                          cancel={this.purchaseCancelHandler}
                          checkout={this.checkout} />;

        }
        if (this.state.loading) {
            orderSummary = <Spinner/>
        }

        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.ingredientsRed.ingredients,
        totalPrice: state.ingredientsRed.totalPrice
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onAddIngredient: (ingredientType) => dispatch({type: actionTypes.ADD_INGREDIENT, ingredientType: ingredientType}),
        onRemoveIngredient: (ingredientType) => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientType: ingredientType}),
        setBasicIngredients: (data) => dispatch({type: actionTypes.BASIC_INGREDIENTS, payload: data})
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));