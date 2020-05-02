import React, {Component} from 'react';
import Aux from "../../../hoc/Aux/Aux";
import Button from "../../UI/Button/Button";
import {connect} from "react-redux";

class OrderSummary extends Component {
    render(){
        const ingredientSummary = Object.keys(this.props.ingredients)
            .map(igKey => {
                return <li key={igKey}>
                    <span style={{textTransform: 'capitalize'}}>{igKey}</span>: {this.props.ingredients[igKey]}
                </li>
            });

        return (
            <Aux>
                <h3>Your Order</h3>
                <p>A delicious burger with the following ingredients:</p>
                <ul>
                    {ingredientSummary}
                </ul>
                <p><strong>Total Price: </strong>{this.props.totalPrice.toFixed(2)}</p>
                <p>Continue to Checkout?</p>
                <Button clicked={this.props.cancel} btnType="Danger">CANCEL</Button>
                <Button btnType="Success" clicked={this.props.checkout}>CONTINUE</Button>
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


export default connect(mapStateToProps, null)(OrderSummary);