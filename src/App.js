import React, { Component } from 'react';
import './App.module.css';

import Layout from './hoc/Layout/Layout';
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import {Route, withRouter, Redirect} from "react-router-dom";
import Logout from "./containers/Auth/Logout/Logout";
import * as actions from "./store/actions/actionsIndex";
import {connect} from "react-redux";
import asyncComponent from "./hoc/asyncComponent/asyncComponent";

const asyncCheckout = asyncComponent(() => {
    return import('./containers/Checkout/Checkout');
});

const asyncOrders = asyncComponent(() => {
    return import('./containers/Orders/Orders');
});

const asyncAuth = asyncComponent(() => {
    return import('./containers/Auth/Auth');
});

class App extends Component {
    componentDidMount() {
        this.props.authCheckState();
    }

    render() {

        let routes = [
                <Route key="auth" path='/auth' component={asyncAuth} />,
                <Route key="bugerBuild" path="/burgerBuilder" component={BurgerBuilder}/>,
                <Route key="root" path="/" exact component={BurgerBuilder} />,
        ];

        if(this.props.isAuthenticated){
            routes.push(<Route key="checkout" path="/checkout"component={asyncCheckout}/>);
            routes.push(<Route key="orders" path="/orders" component={asyncOrders}/>);
            routes.push(<Route key="logout" path="/logout" component={Logout}/>);
        }
    return (
      <div>
        <Layout>
            {routes}
            <Redirect to="/" />
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.authRed.token !== null
    };
}

const mapDispatchToProps = dispatch => {
    return {
        authCheckState: () => dispatch(actions.authCheckState())
    };
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(App));