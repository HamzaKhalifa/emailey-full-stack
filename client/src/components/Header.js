import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Payments from './Payments';

function Header() {
    const { loading, user } = useSelector(state => state.auth);

    const renderContent = () => {
        if (loading) {
            return;
        } else if (user) {
            return <>
                <li><Payments /></li>
                <li style={{ margin: '0px 10px' }}>Credits: {user.credits}</li>
                <li><a href='/api/auth/logout'>Logout</a></li>
            </>
        } else {
            return <a href="/api/auth/google">Login With Google</a>
        }
    }

    return (
        <nav>
            <div className="nav-wrapper">
                <Link to={user ? '/surveys' : '/'} className="left brand-logo">Emailey</Link>
                <ul className="right">
                    {renderContent()}
                </ul>
            </div>
        </nav>
    )
}

export default Header
