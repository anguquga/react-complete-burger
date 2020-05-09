import React, {Component} from 'react';

import Aux from '../Aux/Aux';

import classes from './Layout.module.css';
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";
import {connect} from "react-redux";

class Layout extends Component {

    state = {
        showSideDrawer: false
    }

    sideDrawerClosedHandler = () => {
        this.setState({showSideDrawer: false})
    }

    sideDrawerToggleHandler = () => {
        this.setState((prevState) => {
            return {showSideDrawer: !this.state.showSideDrawer};
        });
    }

    render() {
        return (
            <Aux>
                <div>
                    <Toolbar isAuthenticated={this.props.isAuthenticated} drawerToggleClicked={this.sideDrawerToggleHandler}/>
                    <SideDrawer isAuthenticated={this.props.isAuthenticated} open={this.state.showSideDrawer} closed={this.sideDrawerClosedHandler}/>
                    Backdrop
                </div>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        )
    };
};

const mapStateToProps = state => {
    return {
        isAuthenticated: state.authRed.token ? true:false
    };
}

export default connect(mapStateToProps, null)(Layout);