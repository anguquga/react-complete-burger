import React, { Component } from 'react';
import './App.module.css';

import Layout from './hoc/Layout/Layout';
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Checkout from "./containers/Checkout/Checkout";
import {Route, withRouter, Redirect} from "react-router-dom";
import Orders from "./containers/Orders/Orders";
import Auth from "./containers/Auth/Auth";
import Logout from "./containers/Auth/Logout/Logout";
import * as actions from "./store/actions/actionsIndex";
import {connect} from "react-redux";

class App extends Component {
    componentDidMount() {
        this.props.authCheckState();
    }

    render() {

        let routes = [
                <Route path='/auth' component={Auth} />,
                <Route path="/burgerBuilder" component={BurgerBuilder}/>,
                <Route path="/" exact component={BurgerBuilder} />,
        ];

        if(this.props.isAuthenticated){
            routes.push(<Route path="/checkout"component={Checkout}/>);
            routes.push(<Route path="/orders" component={Orders}/>);
            routes.push(<Route path="/logout" component={Logout}/>);
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