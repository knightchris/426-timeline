import React from 'react';
import axios from 'axios';

import {store} from "react-notifications-component"


export default class Registration extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = {
            username: "",
            password: "",
            registrationErrors: ""
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
            url: 'http://localhost:3000/createuser',
            withCredentials: true,
            data: {
              username: this.state.username,
              password: this.state.password
            },
           }); 
        console.log(result);
        if (result.data == "User successfully created") {
            this.props.handleSuccessfulAuth(this.state.username);
            store.addNotification({
                title: "Success!",
                message: "You are now registered",
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
        } else if (result.data == "User already exists") {
            store.addNotification({
                title: "Failure",
                message: "User already exists",
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
        } else if (result.data == "Password must be at least 5 characters, user must be at least 2 characters") {
            store.addNotification({
                title: "Failure",
                message: "Password must be 5 characters, username must be 2 characters",
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
                    <button type="submit">Register</button>
                </form>
            </div>
        )
    }
}