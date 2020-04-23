import React, {Component} from "react";
import axios from "../../axios-orders";
import Order from "./Order/Order";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

class Orders extends Component {
    state = {
        orders: [],
        error: false,
        loading: true
    }

    componentDidMount() {
        axios.get('/orders.json')
            .then(response => {
                this.setState({orders: response.data, loading: false});
                console.log(this.state.orders);
            })
            .catch(response => {
                this.setState({error: true, loading: false});
            });
    }


    render() {
        let orders = <p style={{textAlign: 'center'}}>Something went wrong!</p>;
        if (!this.state.error) {
            let tempOrders = [];
                for(let order in this.state.orders) {
                    tempOrders.push(
                        <Order key={order.toString()} ingredients={this.state.orders[order].ingredients} totalPrice={this.state.orders[order].price}
                               customer={order.customer}/>
                    );
                };
             orders = [...tempOrders];
        }

        return (
            <section>
                {orders}
            </section>
        );
    }
}

export default withErrorHandler(Orders, axios);