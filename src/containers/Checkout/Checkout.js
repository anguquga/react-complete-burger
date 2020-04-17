import React, {Component} from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import {Redirect} from "react-router-dom";

class Checkout extends Component{
    state={
        ingredients: {}
    }

    render(){

        let redirect = <Redirect to="/burgerBuilder" />;
        let ingredients = {};

        if(this.props.location.state && this.props.location.state.ingredients){
            redirect = null;
            ingredients = this.props.location.state.ingredients;
        }

        return(
            <React.Fragment>
            {redirect}
            <CheckoutSummary ingredients={ingredients}/>
            </React.Fragment>
        );
    }
}

export default Checkout;