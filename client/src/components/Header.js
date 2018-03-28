import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Header extends Component{
    renderNavLinks(){
        if(this.props.role === 'employer'){
            return [
                <Link to="/dashboard" className="btn btn-link" key={1}>Dashboard</Link>,
                <Link to="/candidates" className="btn btn-link" key={2}>All Candidates</Link>,
                <Link to="/jobs/new" className="btn btn-link" key={3}>Post a Job</Link>
            ];
        }else{
            return [
                <Link to="/dashboard" className="btn btn-link" key={1}>Dashboard</Link>,
                <Link to="/jobs" className="btn btn-link" key={2}>All Jobs</Link>,
            ];
        }
    }

    renderAuthLinks(){
        if(this.props.authenticated){
            return [
                <Link to="/signout" className="btn btn-link" key={1}>Sign out</Link>
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
