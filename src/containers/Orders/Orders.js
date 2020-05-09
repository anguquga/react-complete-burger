import React, {Component} from "react";
import axios from "../../axios-orders";
import Order from "./Order/Order";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import {connect} from "react-redux";
import * as actions from "../../store/actions/actionsIndex";
import Spinner from "../../components/UI/Spinner/Spinner";

class Orders extends Component {

    componentDidMount() {
        this.props.getOrders(this.props.token, this.props.userId);
    }

    render() {
        let orders = <p style={{textAlign: 'center'}}>Something went wrong!</p>;

        if (this.props.loadingOrder) {
            orders = <Spinner/>
        }

        if (!this.props.errorOrder && !this.props.loadingOrder) {
            let tempOrders = [];
                for(let order in this.props.orders) {
                    tempOrders.push(
                        <Order key={order.toString()} ingredients={this.props.orders[order].ingredients} totalPrice={this.props.orders[order].price}
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

const mapStateToProps = state => {
    return {
        orders: state.ordersRed.orders,
        errorOrder: state.ordersRed.error,
        loadingOrder: state.ordersRed.loading,
        token: state.authRed.token,
        userId: state.authRed.userId
    };
}

const mapDispatchToProps = dispatch => {
    return {
        getOrders: (token, userId) => dispatch(actions.fetchOrders(token, userId)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));