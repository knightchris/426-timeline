import React from 'react';
import '../css/Header.css';
import { Link } from 'react-router-dom';
import Registration from './Registration.js'

class Header extends React.Component {

    constructor(props) {
        super(props);

        this.handleSuccessfulAuth = this.handleSuccessfulAuth.bind(this);
    }

    handleSuccessfulAuth(username) {
        this.props.handleLogin(username)

    }
        

    render() {
        return (
            <nav>
                <ul className="nav-links">
                    <Link to='/'>
                        <li>Timeline</li>
                    </Link>
                    <Link to='/admin'>
                        <li>Admin</li>
                    </Link>
                    <Registration handleSuccessfulAuth={this.handleSuccessfulAuth}/>
                    <li>Status: {this.props.loggedInStatus}</li>
                </ul>
            </nav>
        );
    }
    
}

export default Header;