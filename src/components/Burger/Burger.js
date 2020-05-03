import React from "react";
import BurgerIngredient from "./BurgerIngredients/BurgerIngredient";

import classes from './Burger.module.css';
import {connect} from "react-redux";

const burger = (props) => {

    console.log("Burger Ingredients: ", props.ingredients);
    let transformedIngredients = Object.keys(props.ingredients)
        .map(igKey => {
            return [...Array(props.ingredients[igKey])].map((_,i) => {
                return <BurgerIngredient key={igKey + i} type={igKey} />
            });
        })
        .reduce((arr, el) => {
            return arr.concat(el) ;
        }, []);

    if(transformedIngredients.length === 0){
        transformedIngredients = <p>Please start adding ingredients!</p>
    }

    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top" />
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom" />
        </div>
    );
};

const mapStateToProps = state => {
    return {
        ingredients: state.ingredientsRed.ingredients
    };
}


export default connect(mapStateToProps, null)(burger);