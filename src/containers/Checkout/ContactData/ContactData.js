import React, {Component} from "react";
import Button from "../../../components/UI/Button/Button";

import classes from './ContectData.module.css';
import axios from "../../../axios-orders";
import Spinner from "../../../components/UI/Spinner/Spinner";

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: '',
            country: ''
        },
        ingredients: [],
        totalPrice: 0,
        loading: false
    }

    componentDidMount() {
        this.setState({ingredients: this.props.ingredients, totalPrice: this.props.totalPrice});
    }

    orderHandler = (event) => {
        event.preventDefault(); //Se coloca para que el submit no refresque la pag
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: this.state.name,
                address: {
                    street: this.state.address.street,
                    zipCode: this.state.address.postalCode,
                    country: this.state.address.country
                },
                email: this.state.email
            },
            deliveryMethod: 'fastest'
        };
        axios.post('/orders.json', order)
            .then(response => {
                this.setState({loading: false});
                this.props.history.push('/');
            })
            .catch(response => {
                this.setState({loading: false});
            });
    }


    render() {
        let form = (<form>
            <input className={classes.Input} type="text" name="name" placeholder="Enter your Name"
                   onChange={(event) => this.setState({name: event.target.value})}/>
            <input className={classes.Input} type="email" name="email" placeholder="Enter your Email"
                   onChange={(event) => this.setState({email: event.target.value})}/>
            <input className={classes.Input} type="text" name="streetAddress" placeholder="Enter your Street Address"
                   onChange={(event) => this.setState({address: {...this.state.address, street: event.target.value}})}/>
            <input className={classes.Input} type="text" name="postalCode" placeholder="Enter your Postal Code"
                   onChange={(event) => {this.setState({address: {...this.state.address, postalCode: event.target.value}})}}/>
            <input className={classes.Input} type="text" name="country" placeholder="Enter your Country"
                   onChange={(event) => this.setState({address: {...this.state.address, country: event.target.value}})}/>
            <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
        </form>);
        if (this.state.loading) {
            form = <Spinner/>
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Date</h4>
                {form}
            </div>
        );
    }
}

export default ContactData;