import React from 'react';
import axios from 'axios';
import '../../css/Header.css';

import {store} from "react-notifications-component"


export default class Login extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = {
            username: "",
            password: "",
        }

        this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
        this.handleRegisterSubmit = this.handleRegisterSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    async handleLoginSubmit(event) {
        event.preventDefault();
        const result = await axios({
            method: 'post',
            url: 'http://localhost:3000/login',
            withCredentials: true,
            data: {
              username: this.state.username,
              password: this.state.password
            },
           }); 
        if (result.data.username !== undefined) {
            this.props.handleSuccessfulAuth(result.data.username, result.data.contributioncount, result.data.admin)
            store.addNotification({
                title: "Success!",
                message: "You are now logged in",
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
            })
        } else if (result.data === "User not found" || result.data === "Incorrect password") {
            store.addNotification({
                title: "Failure",
                message: "Incorrect username or password",
                type: "danger",
                container: "top-center",
                insert: "top",
                animationIn: ["animate__animated animate__fadeIn"],
                animationOut: ["animate__animated animate__fadeOut"],
                dismiss: {
                    duration: 2000,
                    showIcon: true
                },
                width:270
            })
        }
    
    }

    async handleRegisterSubmit(event) {
        event.preventDefault();
        const result = await axios({
            method: 'post',
            url: 'http://localhost:3000/createuser',
            withCredentials: true,
            data: {
              username: this.state.username,
              password: this.state.password
            },
           }); 
        if (result.data === "User successfully created") {
            store.addNotification({
                title: "Success!",
                message: "You are now registered",
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
            })
        } else if (result.data === "User already exists") {
            store.addNotification({
                title: "Failure",
                message: "User already exists",
                type: "danger",
                container: "top-center",
                insert: "top",
                animationIn: ["animate__animated animate__fadeIn"],
                animationOut: ["animate__animated animate__fadeOut"],
                dismiss: {
                    duration: 2000,
                    showIcon: true
                },
                width:270
            })
        } else if (result.data === "Password must be at least 5 characters, user must be at least 2 characters") {
            store.addNotification({
                title: "Failure",
                message: "Password must be 5 characters, username must be 2 characters",
                type: "danger",
                container: "top-center",
                insert: "top",
                animationIn: ["animate__animated animate__fadeIn"],
                animationOut: ["animate__animated animate__fadeOut"],
                dismiss: {
                    duration: 2000,
                    showIcon: true
                },
                width:270
            })
        }
    
    }

    render() {
        return (
            <div id="registration">
                <form>
                    <input className="username" type="username" name="username" placeholder="Username" defaultValue={this.state.username} onChange={this.handleChange} required />
                    <input className="password" type="password" name="password" placeholder="Password" defaultValue={this.state.password} onChange={this.handleChange} required />
                    <button className="header-link" type="submit" onClick={this.handleLoginSubmit}>Login</button>
                    <button className="header-link" type="submit" onClick={this.handleRegisterSubmit}>Register</button>
                </form>
            </div>
        )
    }
}