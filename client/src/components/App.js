import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';

import Index from './Index';
import JobIndex from './JobIndex';
import WizardForm from './WizardForm';
import JobPost from './JobPost';
import Signup from './Signup';
import Signin from './Signin';
import Signout from './Signout';
import Header from './Header';
import Dashboard from './Dashboard';

import RequireAuthentication from './RequireAuthentication'; // HOC
const AuthDashboard = RequireAuthentication(Dashboard);

const NoMatch = () => {
    return <span>Page Not Found</span>
}

const Hero = () => {
    return(
        <div className="splash">
            <div className="hero container grid-lg">
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
                <main className="main container grid-lg">
                    <Switch>
                        <Route exact path="/" render={
                            () => <Index {...this.props} />
                        }/>
                        <Route exact path="/jobs" render={
                            () => <JobIndex {...this.props} />
                        }/>
                        <Route path="/jobs/new" render={
                            () => <WizardForm {...this.props} />
                        }/>
                        <Route path="/jobs/:id" render={
                            () => <JobPost {...this.props} />
                        }/>
                        <Route exact path="/signup" render={
                            () => <Signup {...this.props} />
                        }/>
                        <Route exact path="/signin" render={
                            () => <Signin {...this.props} />
                        }/>
                        <Route exact path="/signout" render={
                            () => <Signout {...this.props} />
                        }/>
                        <Route exact path="/dashboard" render={
                            () => <AuthDashboard {...this.props} />
                        }/>
                        <Route component={NoMatch} />
                    </Switch>
                </main>
            </div>
        );
    }
}

export default withRouter(App);
