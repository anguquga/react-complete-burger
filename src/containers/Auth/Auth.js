import React, {Component} from 'react';
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import classes from './Auth.module.css';
import {connect} from "react-redux";
import * as actions from "../../store/actions/actionsIndex";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import axios from "axios";
import {Redirect} from "react-router-dom";

class Auth extends Component {

    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'E-Mail'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            }
        },
        isSignUp: false
    }

    componentDidMount() {
        if(!this.props.buildingBurger && this.props.authRedirectPath !== '/burgerBuilder'){
            this.props.setAuthRedirect();
        }
    }

    checkValidity(value, rules) {

        let isValid = true;

        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;
        }

        if (rules.isEmail) {
            //const pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            //isValid = pattern.test(value) && isValid;
        }

        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid;
        }

        return isValid;
    }

    formValueHandler = (event, inputId) => {
        let orderFormElement = {
            ...this.state.controls,
            [inputId]: {
                ...this.state.controls[inputId],
                value: event.target.value,
                valid: this.checkValidity(event.target.value, this.state.controls[inputId].validation),
                touched: true
            }
        };

        this.setState({controls: orderFormElement});
    }

    authenticate = (event) => {
        event.preventDefault();
        this.props.authenticate(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignUp);
    }

    switchAuthModeHandler = () => {
        this.setState(prevState => {
            return {isSignUp: !prevState.isSignUp};
        });
    }

    render() {
        let formElements = [];
        for (let key in this.state.controls) {
            formElements.push({id: key, config: this.state.controls[key]});
        }

        let form = (
            formElements.map((formElement, key) => {
                return <Input id={formElement.id} key={key}
                              inputtype={formElement.config.elementType}
                              elementConfig={formElement.config.elementConfig}
                              invalid={!formElement.config.valid}
                              shouldValidate={formElement.config.validation}
                              touched={formElement.config.touched}
                              value={formElement.config.value}
                              onChange={(event) => this.formValueHandler(event, formElement.id)}/>
            }));

        if(this.props.loading){
            form = <Spinner />
        }

        let errorMessage = null;
        if(this.props.error){
            errorMessage = (
              <p>{this.props.error.message}</p>
            );
        }

        let authRedirect = null;
        if(this.props.isAuthenticated){
            authRedirect = <Redirect to={this.props.authRedirectPath} />
        }

        return (
            <div className={classes.Auth}>
                {authRedirect}
                {errorMessage}
                <form onSubmit={this.authenticate}>
                    {form}
                    <Button btnType="Success">SUBMIT</Button>
                </form>
                <Button clicked={this.switchAuthModeHandler} btnType="Danger">Switch to {!this.state.isSignUp ? 'SIGN UP':'LOG IN'}</Button>
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        loading: state.authRed.loading,
        error: state.authRed.error,
        isAuthenticated: state.authRed.token !== null,
        buildingBurger: state.burgerBuilderRed.building,
        authRedirectPath: state.authRed.authRedirectPath
    };
}

const mapDispatchToProps = dispatch => {
    return {
        authenticate: (email, password, isSignUp) => dispatch(actions.authenticate(email, password, isSignUp)),
        setAuthRedirect: () => dispatch(actions.setAuthRedirectPath('/burgerBuilder'))
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Auth, axios));