import React from 'react';

import classes from './Input.module.css';

const input = (props) => {

    let inputElement = null;

    const inputClasses = [classes.InputElement];

    if(props.invalid && props.shouldValidate && props.touched){
        inputClasses.push(classes.Invalid);
    }

    switch(props.inputtype){
        case ('input'):
            inputElement = <input id={props.key} className={inputClasses.join(' ')} {...props.elementConfig} value={props.value} onChange={props.onChange}/>
            break;
        case ('textarea'):
            inputElement = <textarea id={props.key} className={inputClasses.join(' ')} {...props.elementConfig} value={props.value} onChange={props.onChange}/>
            break;
        case 'select':
            inputElement = <select id={props.key} className={inputClasses.join(' ')} value={props.value} onChange={props.onChange}>
                            {props.elementConfig.options.map(option => (
                               <option id={option.value} key={option.value} value={option.value}>{option.displayValue}</option>
                            ))}
                           </select>
            break;
        default:
            inputElement= <input id={props.key} className={inputClasses.join(' ')} {...props.elementConfig} value={props.value} onChange={props.onChange}/>
    }

    return(
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
        </div>
    );
}

export default  input;