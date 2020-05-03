import React, {Component} from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import {Redirect, Route} from "react-router-dom";
import ContactData from "./ContactData/ContactData";
import {connect} from "react-redux";

class Checkout extends Component{

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    render(){
        let redirect = <Redirect to="/burgerBuilder" />;

        if(Object.keys(this.props.ingredients).length > 0){
            redirect = null;
        }

        return(
            <React.Fragment>
                {redirect}
                <CheckoutSummary onCheckoutCancelled={this.checkoutCancelledHandler}
                                 onCheckoutContinued={this.checkoutContinuedHandler}/>
                 <Route path={this.props.match.url + '/contact-data'} render={(props) => (<ContactData {...props} />)} />
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.ingredientsRed.ingredients,
        totalPrice: state.ingredientsRed.totalPrice
    };
}


export default connect(mapStateToProps)(Checkout);