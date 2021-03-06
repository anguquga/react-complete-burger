import React from 'react';
import Burger from "../../Burger/Burger";
import Button from "../../UI/Button/Button";

import classes from './CheckoutSummary.module.css';
import {connect} from "react-redux";

const checkoutSummary = (props) => {
    return (
        <div className={classes.CheckoutSummary}>
            <h1>We hope it tasts well!</h1>
            <div style={{width: '100%', margin: 'auto'}}>
                <Burger ingredients={props.ingredients}/>
            </div>
            <Button btnType="Danger" clicked={props.onCheckoutCancelled}>CANCEL</Button>
            <Button btnType="Success" clicked={props.onCheckoutContinued}>CONTINUE</Button>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        ingredients: state.burgerBuilderRed.ingredients
    };
}


export default connect(mapStateToProps, null)(checkoutSummary);