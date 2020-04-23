import React from 'react';

import classes from './Order.module.css';

const order = (props) => {

    let ingredients = [];
    for (let ingredient in props.ingredients) {
        ingredients.push(<span key={ingredient.toString()} style={{textTransform: 'capitalize', display: 'inline-block', margin: '0 8px', border: '1px solid #ccc', padding: '5px'}}>
                {ingredient.toString()} ({props.ingredients[ingredient].toString()})</span>)
    }

    return (
        <div className={classes.Order}>
            <p>Ingredients: </p>
                {ingredients}
            <p>Price: <strong>USD {props.totalPrice.toFixed(2)}</strong></p>
        </div>
    );

};

export default order;