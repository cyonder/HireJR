import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { Link } from 'react-router-dom';

import { toast } from 'react-toastify';

import CandidateApplications from './CandidateBoard/CandidateApplications';
import Profile from './CandidateBoard/Profile';
import Education from './CandidateBoard/Education';
import WorkExperience from './CandidateBoard/WorkExperience';
import Projects from './CandidateBoard/Projects';
import Resume from './CandidateBoard/Resume';

import {
    createEducation,
    updateEducation,
    deleteEducation,
    createWorkExperience,
    updateWorkExperience,
    deleteWorkExperience,
    createProject,
    updateProject,
    deleteProject,
    updateCandidateProfile
} from '../../actions/candidate';

class CandidateBoard extends Component{
    notify = (text) => toast.success(text);

    renderMenu(){
        const { candidate, user } = this.props;
        const { pathname } = this.props.location;
        return[
            <ul className="menu" key={1}>
                <li className="menu-item">
                    <div className="menu-header">My Resume</div>
                </li>
                <li className="divider"></li>
                <li className="menu-item">
                    <Link to="/dashboard/profile" className={`${pathname === '/dashboard/profile' ? 'active' : null }`}>Profile</Link>
                </li>
                <li className="menu-item">
                    <Link to="/dashboard/education" className={`${pathname === '/dashboard/education' ? 'active' : null }`}>Education</Link>
                </li>
                <li className="menu-item">
                    <Link to="/dashboard/experience" className={`${pathname === '/dashboard/experience' ? 'active' : null }`}>Work Experience</Link>
                </li>
                <li className="menu-item">
                    <Link to="/dashboard/projects" className={`${pathname === '/dashboard/projects' ? 'active' : null }`}>Projects</Link>
                </li>
                <li className="menu-item">
                    <Link to="/dashboard/resume" className={`${pathname === '/dashboard/resume' ? 'active' : null }`}>Resume</Link>
                </li>
            </ul>,
            <div className="info-box mt8" key={2}>
                Tip: Use <span>*</span> to add points to summary
            </div>,
            <Link to={`/jr/${user.username ? user.username : candidate._userId}`} className="btn btn-block mt8" key={3}>My Profile</Link>
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
                        <Route exact path="/dashboard" render={
                            () => <CandidateApplications {...this.props}
                                    notify={this.notify}/>
                        }/>
                        <Route exact path="/dashboard/profile" render={
                            () => <Profile {...this.props}
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
        createEducation,
        updateEducation,
        deleteEducation,
        createWorkExperience,
        updateWorkExperience,
        deleteWorkExperience,
        createProject,
        updateProject,
        deleteProject,
        updateCandidateProfile
    }, dispatch)
}

const mapStateToProps = state => {
    return {
        candidate: state.user.candidate,
        user: state.user
    }
}

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(CandidateBoard)
)
