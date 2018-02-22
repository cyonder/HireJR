import React, { Component } from 'react';
import { Route, Switch, Link, withRouter } from 'react-router-dom';

import Index from './Index';
import JobIndex from './JobIndex';
import JobPostProcess from './JobPostProcess';
import Signup from './Signup';
import Signin from './Signin';

const NoMatch = () => {
    return <span>Page Not Found</span>
}

const Header = () => {
    return(
        <header>
            <div className="navbar">
                <div className="navbar-section">
                    <Link to="/jobs" className="btn btn-link">All Jobs</Link>
                    <Link to="/jobs/new" className="btn btn-link">Post a Job</Link>
                    <Link to="/insights" className="btn btn-link">Insights</Link>
                    <Link to="/companies" className="btn btn-link">Companies</Link>
                </div>
                <div className="navbar-center">
                    <img src="/images/spectre-logo.svg" alt="Spectre Logo"/>
                </div>
                <div className="navbar-section">
                    <Link to="/signup" className="btn btn-link">Sign up</Link>
                    <Link to="/signin" className="btn btn-link">Sign in</Link>
                </div>
            </div>
        </header>
    );
}

const Hero = () => {
    return(
        <div className="splash">
            <div className="hero">
                <div className="text-center">
                    <div className="h2">Find Your First Developer Job</div>
                    <div className="h5">Jobs for Junior/Entry Level Programmers</div>
                </div>
                <div>
                    <div className="input-group">
                        <input type="text" className="form-input input-lg" placeholder="Search jobs by; Title, Skills, City, State, Company..."/>
                        <button className="btn btn-primary input-group-btn btn-lg">
                            <i className="icon icon-search"></i> Search
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

class App extends Component{
    render(){
        return(
            <div className="app">
                <Header />
                <Route exact path="/" render={
                    () => <Hero />
                }/>
                <main className="main">
                    <Switch>
                        <Route exact path="/" render={
                            () => <Index {...this.props} />
                        }/>
                        <Route exact path="/jobs" render={
                            () => <JobIndex {...this.props} />
                        }/>
                        <Route path="/jobs/new" render={
                            () => <JobPostProcess {...this.props} />
                        }/>
                        <Route exact path="/signup" render={
                            () => <Signup {...this.props} />
                        }/>
                        <Route exact path="/signin" render={
                            () => <Signin {...this.props} />
                        }/>
                        <Route component={NoMatch} />
                    </Switch>
                </main>
            </div>
        );
    }
}

export default withRouter(App);
