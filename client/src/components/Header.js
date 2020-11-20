import React from 'react';
import '../css/Header.css';
import { Link } from 'react-router-dom';
import Registration from './auth/Registration.js'
import Login from './auth/Login.js'
import axios from 'axios';
import {store} from "react-notifications-component"

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
            url: 'http://localhost:3000/logout',
            withCredentials: true,
           }); 
        store.addNotification({
            title: "Success!",
            message: "You are now logged out",
            type: "success",
            container: "top-right",
            insert: "top",
            animationIn: ["animate__animated animate__fadeIn"],
            animationOut: ["animate__animated animate__fadeOut"],
            dismiss: {
                duration: 5000,
                showIcon: true
            },
            width:270
        })
        this.props.handleLogout();
    }
        

    render() {
       
       if (this.props.loggedInStatus == "LOGGED_IN") {
        return (
            <nav>
                <ul className="nav-links">
                    <Link to='/'>
                        <li>Timeline</li>
                    </Link>
                    {this.props.admin ? <Link to='/admin'><li>Admin</li></Link> : null}
                    <button onClick={this.handleLogoutClick} className="menu-button">Logout</button>
                    <li>Hello, {this.props.user}!</li>
                    <li>Lifetime total contributions: {this.props.contributioncount}</li>
                </ul>
            </nav>
        );
       }
       
        return (
            <nav>
                <ul className="nav-links">
                    <Link to='/'>
                        <li className="timeline-link">Timeline</li>
                    </Link>
                    <Registration />
                    <Login handleSuccessfulAuth={this.handleSuccessfulAuth}/>
                </ul>
            </nav>
        );
    }
    
}

export default Header;