import React, {Component} from "react";
import Button from "../../../components/UI/Button/Button";

import classes from './ContectData.module.css';
import axios from "../../../axios-orders";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";
import {connect} from "react-redux";
import * as actions from "../../../store/actions/actionsIndex";
import withErrorHandler from "../../../hoc/withErrorHandler/withErrorHandler";

class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation:{
                    required: true
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your Email'
                },
                value: '',
                validation:{
                    required: true
                },
                valid: false,
                touched: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Street Name'
                },
                value: '',
                validation:{
                    required: true
                },
                valid: false,
                touched: false
            },
            postalCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Zip Code'
                },
                value: '',
                validation:{
                    required: true,
                    minLength: 5,
                    maxLength: 5
                },
                valid: false,
                touched: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Country'
                },
                value: '',
                validation:{
                    required: true
                },
                valid: false,
                touched: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [{value: 'fastest', displayValue: 'Fastest'},
                        {value: 'cheapest', displayValue: 'Cheapest'}
                    ]
                },
                value: 'fastest',
                valid: true,
                validation: {}
            }
        },
        formIsValid: false
    }

    componentDidMount() {

    }

    formValueHandler = (event, inputId) => {
        let orderFormElement = {...this.state.orderForm};
        let updatedFormElement = {...orderFormElement[inputId]};
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation)
        updatedFormElement.touched = true;
        orderFormElement[inputId] = updatedFormElement;

        let formIsValid = true;
        for(let inputId in orderFormElement){
           formIsValid = orderFormElement[inputId].valid && formIsValid;
        }
        this.setState({orderForm: orderFormElement, formIsValid: formIsValid});
    }

    orderHandler = (event) => {
        event.preventDefault(); //Se coloca para que el submit no refresque la pag
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.totalPrice,
            customer: {
                name: this.state.orderForm.name.value,
                address: {
                    street: this.state.orderForm.street.value,
                    zipCode: this.state.orderForm.postalCode.value,
                    country: this.state.orderForm.country.value
                },
                email: this.state.orderForm.email.value
            },
            deliveryMethod: this.state.orderForm.deliveryMethod.value
        };

        this.props.purchaseBurger(order, this.props.token);
    }

    checkValidity(value, rules) {

        let isValid = true;

        if(rules.required){
            isValid = value.trim() !== '' && isValid;
        }

        if(rules.minLength){
            isValid = value.length >= rules.minLength && isValid;
        }

        if(rules.maxLength){
            isValid = value.length <= rules.maxLength && isValid;
        }

        return isValid;
    }


    render() {
        let formElements = [];
        for(let key in this.state.orderForm){
            formElements.push({id: key, config: this.state.orderForm[key]});
        }

        let form = (<form onSubmit={this.orderHandler}>
            {formElements.map (formElement => {
               return <Input id={formElement.id}
                             inputtype={formElement.config.elementType}
                             elementConfig={formElement.config.elementConfig}
                             invalid={!formElement.config.valid}
                             shouldValidate={formElement.config.validation}
                             touched={formElement.config.touched}
                             value={formElement.config.value}
                             onChange={(event) =>  this.formValueHandler(event, formElement.id)} />
            })}
            <Button btnType="Success" disabled={!this.state.formIsValid}>ORDER</Button>
        </form>);
        if (this.props.loading) {
            form = <Spinner/>
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.burguerBuilderRed.ingredients,
        totalPrice: state.burguerBuilderRed.totalPrice,
        loadingOrder: state.ordersRed.loadingOrder,
        token: state.authRed.token
    };
}

const mapDispatchToProps = dispatch => {
    return {
        purchaseBurger: (orderData, token) => dispatch(actions.purchaseBurger(orderData, token))
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));