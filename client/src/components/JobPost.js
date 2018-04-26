import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import moment from 'moment';

import Loading from './Loading';
import Card from './Card';
import Modal from './Modal';
import JobPostMenu from './JobPostMenu';

import { findJobPost } from '../actions/jobPost';

class JobPost extends Component{
    constructor(){
        super();
        this.state = { activeModal: false }
        this.toggleModal = this.toggleModal.bind(this);
    }

    componentDidMount(){
        if(this.props.match.params.id){
            this.props.findJobPost(this.props.match.params.id);
        }
    }

    toggleModal(){        
        this.setState({ activeModal: !this.state.activeModal })
    }

    render(){        
        if(!this.props.job && !this.props.formValues) return <Loading />;

        let details, activeClass, buttonTarget, buttonLabel;

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
                buttonTarget = this.toggleModal;
                buttonLabel = 'Apply on Hirejr';
            }else{ // Needs fix for confirmation comp
                buttonTarget = details.external;
                buttonLabel = 'Apply on Website';
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
                    <a onClick={buttonTarget} target="_blank" className={activeClass}>{buttonLabel}</a>
                    <JobPostMenu job={details} />
                </div>
                { this.state.activeModal ? 
                    <Modal active={this.state.activeModal}
                    questions={details.questions}
                    toggleModal={this.toggleModal} /> : null }
            </div>
        );
    }
}

const mapStateToProps = state => {
    return{
        job: state.jobPost.jobPost
    };
}

export default withRouter(
    connect(mapStateToProps, { findJobPost })(JobPost)
);
