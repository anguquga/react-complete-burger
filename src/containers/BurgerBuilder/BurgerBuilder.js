import React, {Component} from 'react';
import Aux from "../../hoc/Aux/Aux";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";


import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import * as actions from "../../store/actions/actionsIndex";
import {connect} from "react-redux";

export class BurgerBuilder extends Component{

    state = {
        purchasable: false,
        purchasing: false,
    }

    componentDidMount() {
        if(this.props.purchasedOrder || !this.props.ingredients) {
            this.props.purchaseBurgerFinished();
            this.props.setBasicIngredients();
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

    purchaseHandler = (event) => {
        event.preventDefault();
        if(this.props.isAuthenticated){
            this.setState({purchasing: true});
        }else{
            this.props.setAuthRedirect('/checkout');
            this.props.history.push("/auth");
        }
    }

    purchaseCancelHandler = (event) => {
        event.preventDefault();
        this.setState({purchasing: false});
    }

    checkout = (event) => {
        event.preventDefault();
        this.props.setAuthRedirect('/checkout');
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

        let burger = this.props.error ? <p>Ingredients can't be loaded!</p>:null;

        if (this.props.ingredients) {
            burger = (<Aux><Burger />
            <BuildControls
                ingredientAdded={this.props.onAddIngredient}
                ingredientRemoved={this.props.onRemoveIngredient}
                disabled={disabledInfo}
                price={this.props.totalPrice}
                purchasable={this.updatePurchase(this.props.ingredients)}
                purchasing={this.purchaseHandler}
                isAuthenticated={this.props.isAuthenticated}
            /></Aux>);
            orderSummary = <OrderSummary
                          cancel={this.purchaseCancelHandler}
                          checkout={this.checkout} />;

        }

        if (this.props.loading) {
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
        ingredients: state.burgerBuilderRed.ingredients,
        totalPrice: state.burgerBuilderRed.totalPrice,
        error: state.burgerBuilderRed.burgerBuilderError,
        loading: state.burgerBuilderRed.burgerBuilderLoading,
        isAuthenticated: state.authRed.token !== null,
        purchasedOrder: state.ordersRed.purchasedOrder
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onAddIngredient: (ingredientType) => dispatch(actions.addIngredient(ingredientType)),
        onRemoveIngredient: (ingredientType) => dispatch(actions.removeIngredient(ingredientType)),
        setBasicIngredients: () => dispatch(actions.fetchIngredients()),
        setAuthRedirect: (path) => dispatch(actions.setAuthRedirectPath(path)),
        purchaseBurgerFinished: () => dispatch(actions.purchaseBurgerFinished())
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));