import React from 'react';
import axios from 'axios';

import {store} from "react-notifications-component"


export default class Login extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = {
            username: "",
            password: "",
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    async handleSubmit(event) {
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
        if (result.data.username != undefined) {
            this.props.handleSuccessfulAuth(result.data.username, result.data.contributioncount, result.data.admin)
            store.addNotification({
                title: "Success!",
                message: "You are now logged in",
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
        } else if (result.data == "User not found" || result.data == "Incorrect password") {
            store.addNotification({
                title: "Failure",
                message: "Incorrect username or password",
                type: "danger",
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
        }
    
    }

    render() {
        return (
            <div id="registration">
                <form onSubmit={this.handleSubmit}>
                    <input type="username" name="username" placeholder="Username" defaultValue={this.state.username} onChange={this.handleChange} required />
                    <input type="password" name="password" placeholder="Password" defaultValue={this.state.password} onChange={this.handleChange} required />
                    <button type="submit" className="menu-button">Login</button>
                </form>
            </div>
        )
    }
}