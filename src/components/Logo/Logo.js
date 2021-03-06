import React from "react";

import logoBurger from '../../assets/images/27.1 burger-logo.png';

import classes from './Logo.module.css';

const logo = (props) => (
  <div className={classes.Logo} style={{height:props.height}}>
      <img src={logoBurger} alt="My Burger" />
  </div>
);

export default logo;

