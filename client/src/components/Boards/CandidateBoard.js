import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { Link } from 'react-router-dom';

import { toast } from 'react-toastify';

import About from './CandidateBoard/About';
import Education from './CandidateBoard/Education';
import WorkExperience from './CandidateBoard/WorkExperience';
import Projects from './CandidateBoard/Projects';
import Resume from './CandidateBoard/Resume';

import {
    createProject,
    createWorkExperience,
    createEducation,
    updateCandidateProfile
} from '../../actions/candidate';

class CandidateBoard extends Component{
    notify = () => toast.success("Saved successfully!");

    renderMenu(){
        return[
            <ul className="menu" key={1}>
                <li className="menu-item">
                    <div className="menu-header">My Resume</div>
                </li>
                <li className="divider"></li>
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
                    <Link to="/dashboard/projects">Projects</Link>
                </li>
                <li className="menu-item">
                    <Link to="/dashboard/resume">Resume</Link>
                </li>
            </ul>,
            <button type="button" className="btn btn-block mt8" key={2}>My Profile</button>
        ]
    }

    render(){
        let initialValues;

        if(typeof this.props.candidate !== "undefined"){
            initialValues = this.props.candidate.candidateProfile;
        }else{
            initialValues = null;
        }

        return(
            <div className="columns">
                <div className="column col-4">
                    { this.renderMenu() }
                </div>
                <div className="column col-8">
                    <Switch>
                        <Route exact path="/dashboard/about" render={
                            () => <About {...this.props}
                                    initialValues={initialValues}
                                    notify={this.notify}/>
                        }/>
                        <Route exact path="/dashboard/education" render={
                            () => <Education {...this.props}
                                    notify={this.notify}/>
                        }/>
                        <Route exact path="/dashboard/experience" render={
                            () => <WorkExperience {...this.props}
                                    notify={this.notify}/>
                        }/>
                        <Route exact path="/dashboard/projects" render={
                            () => <Projects {...this.props}
                                    notify={this.notify}/>
                        }/>
                        <Route exact path="/dashboard/resume" render={
                            () => <Resume {...this.props}
                                    notify={this.notify}/>
                        }/>
                    </Switch>
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        createProject,
        createWorkExperience,
        createEducation,
        updateCandidateProfile
    }, dispatch)
}

const mapStateToProps = state => {
    return {
        candidate: state.user.candidate
    }
}

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(CandidateBoard)
)
