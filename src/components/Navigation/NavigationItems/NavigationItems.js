import React from "react";

import classes from './NavigationItems.module.css';
import NavigationItem from "./NavigationItem/NavigationItem";

const navigationItems = (props) => {
    return (
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/burgerBuilder" isMobile={props.isMobile} closeSideDrawer={props.closeSideDrawer}>Burger Builder</NavigationItem>
        {props.isAuthenticated ? <NavigationItem link="/orders" isMobile={props.isMobile} closeSideDrawer={props.closeSideDrawer}>Orders</NavigationItem> : null}
        {props.isAuthenticated ?
            <NavigationItem link="/logout" isMobile={props.isMobile} closeSideDrawer={props.closeSideDrawer}>Logout</NavigationItem>
            : <NavigationItem link="/auth" isMobile={props.isMobile} closeSideDrawer={props.closeSideDrawer}>Login</NavigationItem>}

    </ul>)
};

export default navigationItems;