import React, {Component} from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import {Redirect, Route} from "react-router-dom";
import ContactData from "./ContactData/ContactData";

class Checkout extends Component{
    state={
        ingredients: null,
        totalPrice: ''
    }

    componentDidMount() {
       if(this.props.location.state && this.props.location.state.ingredients){
           this.setState({
               ingredients: this.props.location.state.ingredients,
               totalPrice: this.props.location.state.totalPrice
           });
       }
    }

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    render(){
        let redirect = <Redirect to="/burgerBuilder" />;

        if((this.props.location.state && this.props.location.state.ingredients) || this.state.ingredients){
            redirect = null;
        }

        return(
            <React.Fragment>
                {redirect}
                <CheckoutSummary ingredients={this.state.ingredients ? this.state.ingredients:[]}
                                 onCheckoutCancelled={this.checkoutCancelledHandler}
                                 onCheckoutContinued={this.checkoutContinuedHandler}/>
                 <Route path={this.props.match.url + '/contact-data'} render={(props) => (<ContactData {...props} ingredients={this.state.ingredients} totalPrice={this.state.totalPrice} />)} />
            </React.Fragment>
        );
    }
}

export default Checkout;