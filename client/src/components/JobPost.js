import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import moment from 'moment';
import { toast } from 'react-toastify';

import Loading from './Loading';
import Card from './Card';
import Modal from './Modal';
import NotFound from './NotFound';
import JobPostMenu from './JobPostMenu';

import { findJobPost, fetchJobApplications } from '../actions/jobPost';

class JobPost extends Component{
    constructor(){
        super();
        this.state = { activeModal: false }
        this.toggleModal = this.toggleModal.bind(this);
    }

    componentDidMount(){
        if(this.props.match.params.id){
            this.props.findJobPost(this.props.match.params.id);
            this.props.fetchJobApplications();
        }
    }

    toggleModal(){        
        this.setState({ activeModal: !this.state.activeModal })
    }

    renderButtons(internalButton, externalButton, activeClass){
        const { user, jobApplications } = this.props;
        // User not logged in, don't display the apply button
        if(Object.keys(user).length === 0) return null
        // Employer shouldn't see the apply button
        if(user.role === 'employer') return null
        // Check if user is a candidate and eligible to apply        
        if(user.role === 'candidate' && !user.candidate.candidateProfile) return <button className="btn btn-error btn-block mb8 disabled">Complete Your Profile!</button>
        // Check for confirmation component
        if(!jobApplications) return <button className="btn btn-primary btn-block mb8 disabled">Apply</button>
        
        const jobApplicationIds = jobApplications.map(jobApplication => jobApplication._jobPostId)
        const newJobApplicationIds = new Set(jobApplicationIds);
        const jobPostId = this.props.match.params.id;

        // Check if already applied
        if(!newJobApplicationIds.has(jobPostId)){
            if(Object.keys(internalButton).length !== 0){
                return <button onClick={internalButton.target} className={activeClass}>{internalButton.label}</button>
            }else{
                return <a href={`http://${externalButton.target}`} target="_blank" className={activeClass}>{externalButton.label}</a>
            }
        }else{
            return <button className="btn btn-primary btn-block mb8 disabled">Applied</button>
        }
    }

    render(){                     
        if(!this.props.job && !this.props.formValues) return <NotFound />;        
        
        let details, activeClass, buttonTarget, buttonLabel;
        let internalButton = {};
        let externalButton = {};

        if(this.props.formValues){
            details = this.props.formValues;
            // in render, the company info is nested under employer key but formValues are flat. That's why
            const employer = {
                companyName: details.companyName,
                companyWebsite: details.companyWebsite
            }
            details.employer = employer;
            activeClass = 'btn btn-primary btn-block mb8 disabled';
        }else{
            details = this.props.job;
            activeClass = 'btn btn-primary btn-block mb8'
        }

        if(details){
            if(details.applyThrough === 'internal'){
                internalButton = {
                    target: this.toggleModal,
                    label: 'Apply on Hirejr'
                }
            }else{
                externalButton = {
                    target: details.external,
                    label: 'Apply on Company Website'
                }
            }            
        }

        return(
            <div className="columns">
                <div className="column col-8">
                    <Card title={details.position}
                        subtitle={details.employer.companyName}>
                        <div className="job-post-description">{details.description}</div>
                    </Card>
                </div>
                <div className="column col-4">
                     { this.renderButtons(internalButton, externalButton, activeClass) }
                    <JobPostMenu job={details} />
                </div>
                { this.state.activeModal ? 
                    <Modal {...this.props} 
                        active={this.state.activeModal}
                        toggleModal={this.toggleModal}
                        questions={details.questions}
                        toggleModal={this.toggleModal} /> : null }
            </div>
        );
    }
}

const mapStateToProps = state => {
    return{
        job: state.job.jobPost,
        jobApplications: state.job.jobApplications,
        user: state.user
    };
}

export default withRouter(
    connect(mapStateToProps, { findJobPost, fetchJobApplications })(JobPost)
);
