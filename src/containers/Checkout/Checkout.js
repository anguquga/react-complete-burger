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
        let summary = <Redirect to="/burgerBuilder" />;

        if(this.props.ingredients){
            summary = (
                <div>
                    <CheckoutSummary onCheckoutCancelled={this.checkoutCancelledHandler}
                                        onCheckoutContinued={this.checkoutContinuedHandler}/>
                    <Route path={this.props.match.url + '/contact-data'} render={(props) => (<ContactData {...props} />)} />
                </div>
            );
        }

        return(
            <React.Fragment>
                {summary}
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.burguerBuilderRed.ingredients,
        totalPrice: state.burguerBuilderRed.totalPrice
    };
}


export default connect(mapStateToProps)(Checkout);