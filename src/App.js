import React, { Component } from 'react';
import './App.module.css';

import Layout from './hoc/Layout/Layout';
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Checkout from "./containers/Checkout/Checkout";
import {Route} from "react-router-dom";
import Orders from "./containers/Orders/Orders";
import Auth from "./containers/Auth/Auth";
import Logout from "./containers/Auth/Logout/Logout";
import {Redirect} from "react-router-dom";


class App extends Component {
  render() {
    return (
      <div>
        <Layout>
            <Route path='/auth' component={Auth} />
            <Route path="/burgerBuilder" component={BurgerBuilder}/>
            <Route path="/checkout"component={Checkout}/>
            <Route path="/orders" component={Orders}/>
            <Route path="/logout" component={Logout}/>
            <Redirect to="/burgerBuilder" />
        </Layout>
      </div>
    );
  }
}

export default App;