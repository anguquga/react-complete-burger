import React from "react";

import classes from './NavigationItems.module.css';
import NavigationItem from "./NavigationItem/NavigationItem";
import {connect} from "react-redux";


const navigationItems = (props) => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/burgerBuilder">Burger Builder</NavigationItem>
        {props.token ? <NavigationItem link="/orders">Orders</NavigationItem>:null}
        {props.token ? <NavigationItem link="/auth?logout=1">Logout</NavigationItem>:<NavigationItem link="/auth">Login</NavigationItem>}
    </ul>
);

const mapStateToProps = state => {
    return {
        token: state.authRed.token
    };
}

export default connect(mapStateToProps, null)(navigationItems);