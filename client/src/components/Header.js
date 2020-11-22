import React from 'react';
import '../css/Header.css';
import { Link } from 'react-router-dom';
import Login from './auth/Login.js'
import axios from 'axios';
import {store} from "react-notifications-component"
require('dotenv').config();

class Header extends React.Component {

    constructor(props) {
        super(props);

        this.handleSuccessfulAuth = this.handleSuccessfulAuth.bind(this);
        this.handleLogoutClick = this.handleLogoutClick.bind(this);
    }

    handleSuccessfulAuth(username, contributioncount, admin) {
        this.props.handleLogin(username, contributioncount, admin)

    }

    async handleLogoutClick() {
        const result = await axios({
            method: 'post',
            url: `${process.env.REACT_APP_REQUEST_SERVER}/logout`,
            withCredentials: true,
           }); 
        store.addNotification({
            title: "Success!",
            message: "You are now logged out",
            type: "success",
            container: "top-center",
            insert: "top",
            animationIn: ["animate__animated animate__fadeIn"],
            animationOut: ["animate__animated animate__fadeOut"],
            dismiss: {
                duration: 2000,
                showIcon: true
            },
            width:270
        });
        if (!result.data) {console.log("error")};
        this.props.handleLogout();
    }
        

    render() {
       
       if (this.props.loggedInStatus === "LOGGED_IN") {
        return (
            <nav>
                <div id="nav-left">
                    <Link to='/'>
                        <li className="header-link">Timeline</li>
                    </Link>
                    {this.props.admin ? <Link to='/admin'><li className="header-link">Admin</li></Link> : null}
                </div>
                <div id="nav-right">
                    <div id="nav-right-name">
                        <li>Hello, {this.props.user}!</li>
                    </div>
                    <div id="nav-right-contributions">
                        <li>Lifetime total contributions: {this.props.contributioncount}</li>
                    </div>
                    <button onClick={this.handleLogoutClick} className="header-link">Logout</button>
                </div>
            </nav>
        );
       }
       
        return (
            <nav>
                <div id="nav-left">
                    <Link style={{ textDecoration: 'none'}} to='/'>
                        <li className="header-link">Timeline</li>
                    </Link>
                </div>
                <div id="nav-right">
                    <Login handleSuccessfulAuth={this.handleSuccessfulAuth}/>
                </div>
            </nav>
        );
    }
    
}

export default Header;