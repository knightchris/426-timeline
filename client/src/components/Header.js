import React from 'react';
import '../css/Header.css';
import { Link } from 'react-router-dom';

function Header() {

    const linkStyle = {
        color: 'white'
    };

    return (
        <nav>
            <ul className="nav-links">
                <Link style={linkStyle} to='/'>
                    <li>Timeline</li>
                </Link>
                <Link style={linkStyle} to='/admin'>
                    <li>Admin</li>
                </Link>
            </ul>
        </nav>
    );
}

export default Header;