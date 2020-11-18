import React from 'react';
import axios from 'axios';

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
        } else if (result.data == "User already exists") {
            // TODO
        } else if (result.data == "Password must be at least 5 characters, user must be at least 2 characters") {
            // TODO
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