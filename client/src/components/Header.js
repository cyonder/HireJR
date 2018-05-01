import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Header extends Component{
    renderNavLinks(){
        const { pathname } = this.props.location;
        if(this.props.role === 'employer'){
            return [
                <Link to="/dashboard" className={`${pathname === '/dashboard' ? 'active btn btn-link' : 'btn btn-link' }`} key={1}>Dashboard</Link>,
                <Link to="/candidates" className={`${pathname === '/candidates' ? 'active btn btn-link' : 'btn btn-link' }`} key={2}>All Candidates</Link>,
                <Link to="/applicants" className={`${pathname === '/applicants' ? 'active btn btn-link' : 'btn btn-link' }`} key={3}>All Applicants</Link>,
                <Link to="/jobs/new" className={`${pathname === '/jobs/new' ? 'active btn btn-link' : 'btn btn-link' }`} key={4}>Post a Job</Link>
            ];
        }else if(this.props.role === 'candidate'){
            return [
                <Link to="/dashboard" className={`${pathname === '/dashboard' ? 'active btn btn-link' : 'btn btn-link' }`} key={1}>Dashboard</Link>,
                <Link to="/jobs" className={`${pathname === '/jobs' ? 'active btn btn-link' : 'btn btn-link' }`} key={2}>All Jobs</Link>
            ];
        }else{
            return [
                <Link to="/jobs" className={`${pathname === '/jobs' ? 'active btn btn-link' : 'btn btn-link' }`} key={1}>All Jobs</Link>,
                <Link to="/jobs/new" className={`${pathname === '/jobs/new' ? 'active btn btn-link' : 'btn btn-link' }`} key={2}>Post a Job</Link>
            ];
        }
    }

    renderAuthLinks(){
        if(this.props.authenticated){
            return [
                <Link to="/settings" className="btn btn-link" key={1}>Settings</Link>,
                <Link to="/signout" className="btn btn-link" key={2}>Sign out</Link>
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
                        <img id="logo" src="/images/spectre-logo.svg" alt="Spectre Logo"/>
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

export default connect(mapStateToProps)(Header);
