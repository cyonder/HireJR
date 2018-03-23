import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Header extends Component{
    renderLinks(){
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
                        <Link to="/jobs" className="btn btn-link">All Jobs</Link>
                        <Link to="/jobs/new" className="btn btn-link">Post a Job</Link>
                        <Link to="/insights" className="btn btn-link disabled">Insights</Link>
                        <Link to="/companies" className="btn btn-link disabled">Companies</Link>
                    </div>
                    <div className="navbar-center">
                        <img src="/images/spectre-logo.svg" alt="Spectre Logo"/>
                    </div>
                    <div className="navbar-section">
                        { this.renderLinks() }
                    </div>
                </div>
            </header>
        );
    }
}

const mapStateToProps = state => {
    return{
        authenticated: state.authentication.authenticated
    };
};

export default connect(mapStateToProps)(Header);
