import React, { Component } from 'react';
import { Route, Redirect, Switch, withRouter } from 'react-router-dom';

import { ToastContainer, style } from 'react-toastify';

import Home from './Home';
import JobPostIndex from './JobPostIndex';
import PostJobForm from './PostJobForm/PostJobForm';
import JobPost from './JobPost';
import Signup from './Signup';
import Signin from './Signin';
import Signout from './Signout';
import Settings from './Settings';
import Header from './Header';
import Footer from './Footer';
import Dashboard from './Boards/Dashboard';
import EmployerApplicants from './EmployerApplicants';
import CandidateIndex from './CandidateIndex';
import CandidateProfile from './CandidateProfile';
import NotFound from './NotFound';

style({
    colorSuccess: "#37AC46"
})

class App extends Component{
    render(){
        return(
            <div className="app">
                <Header {...this.props} />
                <ToastContainer autoClose={1500} />
                <main>
                    <Switch>
                        <Route exact path="/" render={
                            () => <div className="container grid-lg"><Home {...this.props} /></div>
                        }/>
                        <Route exact path="/jr/:id" render={
                            (props) => <div className="container grid-md"><CandidateProfile {...props} /></div>
                        }/>
                        <Route exact path="/candidates" render={
                            () => <div className="container grid-lg"><CandidateIndex {...this.props} /></div>
                        }/>
                        <Route exact path="/jobs" render={
                            () => <div className="container grid-lg"><JobPostIndex {...this.props} /></div>
                        }/>
                        <Route path="/jobs/new" render={
                            () => <PostJobForm {...this.props} />
                        }/>
                        <Route path="/jobs/:id" render={
                            (props) => <div className="container grid-md"><JobPost {...props} /></div>
                        }/>
                        <Route exact path="/signup" render={
                            () => <div className="container grid-xs"><Signup {...this.props} /></div>
                        }/>
                        <Route exact path="/signin" render={
                            () => <div className="container grid-xs"><Signin {...this.props} /></div>
                        }/>
                        <Route exact path="/signout" render={
                            () => <div className="container grid-xs"><Signout {...this.props} /></div>
                        }/>
                        <Route exact path="/settings" render={
                            () => <div className="container grid-xs"><Settings {...this.props} /></div>
                        }/>
                        <Route path="/dashboard" render={
                            () => <Dashboard {...this.props} />
                        }/>
                        <Route path="*" component={NotFound} />
                    </Switch>
                </main>
                <Footer />
            </div>
        );
    }
}

export default withRouter(App);
