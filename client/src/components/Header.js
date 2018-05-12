import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { signoutUser } from '../actions/authentication';

class Header extends Component{
    renderNavLinks(){
        const { pathname } = this.props.location;
        if(this.props.role === 'employer'){
            return [
                <Link to="/dashboard" className={`${pathname === '/dashboard' ? 'active btn btn-link' : 'btn btn-link' }`} key={1}>Dashboard</Link>,
                <Link to="/candidates" className={`${pathname === '/candidates' ? 'active btn btn-link' : 'btn btn-link' }`} key={2}>Find Candidates</Link>,
                <Link to="/jobs/new" className={`${pathname === '/jobs/new' ? 'active btn btn-link' : 'btn btn-link' }`} key={3}>Post a Job</Link>
            ];
        }else if(this.props.role === 'candidate'){
            return [
                <Link to="/dashboard" className={`${pathname === '/dashboard' ? 'active btn btn-link' : 'btn btn-link' }`} key={1}>Dashboard</Link>,
                <Link to="/jobs" className={`${pathname === '/jobs' ? 'active btn btn-link' : 'btn btn-link' }`} key={2}>Find Jobs</Link>
            ];
        }else{
            return [
                <Link to="/jobs" className={`${pathname === '/jobs' ? 'active btn btn-link' : 'btn btn-link' }`} key={1}>Find Jobs</Link>,
                <Link to="/jobs/new" className={`${pathname === '/jobs/new' ? 'active btn btn-link' : 'btn btn-link' }`} key={2}>Post a Job</Link>
            ];
        }
    }

    renderAuthLinks(){
        if(this.props.authenticated){
            return [
                <Link to="/settings" className="btn btn-link" key={1}>Settings</Link>,
                <a onClick={this.props.signoutUser} className="btn btn-link" key={2}>Sign out</a>
            ];
        }else{
            return [
                <Link to="/signup" className="btn btn-link" key={1}>Sign up</Link>,
                <Link to="/signin" className="btn btn-link" key={2}>Sign in</Link>
            ];
        }
    }

    render(){
        return(
            <header>
                <div className="navbar container grid-lg">
                    <div className="navbar-section">
                        { this.renderNavLinks() }
                    </div>
                    <div className="navbar-center">
                        <Link to="/" className="d-flex">
                            <img id="logo" src="/images/hirejr_logo.svg" alt="Hirejr Logo"/>
                        </Link>
                    </div>
                    <div className="navbar-section">
                        { this.renderAuthLinks() }
                    </div>
                </div>
            </header>
        );
    }
}

const mapStateToProps = state => {
    return{
        authenticated: state.authentication.authenticated,
        role: state.user.role
    };
};

export default connect(mapStateToProps, { signoutUser })(Header);
