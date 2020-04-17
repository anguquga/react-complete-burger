import React from "react";

import classes from './NavigationItems.module.css';
import NavigationItem from "./NavigationItem/NavigationItem";

const navigationItems = () => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/burgerBuilder" active={true}>Burger Builder</NavigationItem>
        <NavigationItem link="/checkout">CheckOut</NavigationItem>
    </ul>
);

export default navigationItems;