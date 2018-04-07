import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';

import { ToastContainer, style } from 'react-toastify';

import Home from './Home';
import JobIndex from './JobIndex';
import PostJobForm from './PostJobForm/PostJobForm';
import JobPost from './JobPost';
import Signup from './Signup';
import Signin from './Signin';
import Signout from './Signout';
import Header from './Header';
import Footer from './Footer';
import Dashboard from './Boards/Dashboard';
import CandidateIndex from './CandidateIndex';

import EmptyState from './EmptyState';

style({
    colorSuccess: "#37AC46"
})

const NoMatch = () => (
    <div className="container grid-sm">
        <EmptyState title="404 Page not found!" subtitle="We can't seem to find the page you are looking for!" icon="icon-cross"/>
    </div>
)

class App extends Component{
    render(){
        return(
            <div className="app">
                <Header />
                <ToastContainer autoClose={1500} />
                <main>
                    <Switch>
                        <Route exact path="/" render={
                            () => <div className="container grid-lg"><Home {...this.props} /></div>
                        }/>
                        <Route exact path="/jobs" render={
                            () => <div className="container grid-lg"><JobIndex {...this.props} /></div>
                        }/>
                        <Route exact path="/candidates" render={
                            () => <div className="container grid-lg"><CandidateIndex {...this.props} /></div>
                        }/>
                        <Route path="/jobs/new" render={
                            () => <PostJobForm {...this.props} />
                        }/>
                        <Route path="/jobs/:id" render={
                            () => <div className="container grid-md"><JobPost {...this.props} /></div>
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
                        <Route path="/dashboard" render={
                            () => <Dashboard {...this.props} />
                        }/>
                        <Route component={NoMatch} />
                    </Switch>
                </main>
                <Footer />
            </div>
        );
    }
}

export default withRouter(App);
