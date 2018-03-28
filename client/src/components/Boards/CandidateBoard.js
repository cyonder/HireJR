import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import About from './CandidateBoard/About';
import Education from './CandidateBoard/Education';
import Experience from './CandidateBoard/Experience';
import Resume from './CandidateBoard/Resume';

class CandidateBoard extends Component{
    renderMenu(){
        return(
            <ul className="menu">
                <li className="menu-item">
                    <Link to="/dashboard/about">About Me</Link>
                </li>
                <li className="menu-item">
                    <Link to="/dashboard/education">Education</Link>
                </li>
                <li className="menu-item">
                    <Link to="/dashboard/experience">Work Experience</Link>
                </li>
                <li className="menu-item">
                    <Link to="/dashboard/resume">Resume</Link>
                </li>
            </ul>
        )
    }

    render(){
        return(
            <div className="columns">
                <div className="column col-4">
                    { this.renderMenu() }
                </div>
                <div className="column col-8">
                    <Switch>
                        <Route exact path="/dashboard/about" render={
                            () => <About {...this.props} />
                        }/>
                        <Route exact path="/dashboard/education" render={
                            () => <Education {...this.props} />
                        }/>
                        <Route exact path="/dashboard/experience" render={
                            () => <Experience {...this.props} />
                        }/>
                        <Route exact path="/dashboard/resume" render={
                            () => <Resume {...this.props} />
                        }/>
                    </Switch>
                </div>
            </div>
        );
    }
}

export default withRouter(CandidateBoard);
