import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Card from './Card';
import Loading from './Loading';
import EmptyState from './EmptyState';

import { fetchJobApplications } from '../actions/jobPost';

class CandidateApplications extends Component{
    componentDidMount(){
        this.props.fetchJobApplications();
    }

    renderJobApplications(){
        const { jobApplications } = this.props;
        return Object.keys(jobApplications).map((key, index) => {            
            return(
                <div className="tile tile-centered" key={index}>
                    <div className="tile-content">
                        <div className="tile-title">
                            <Link to={`jobs/${jobApplications[key].jobPost._id}`}>
                                {jobApplications[key].jobPost.position}
                            </Link>
                            <span className={`ml4 label ${jobApplications[key].jobPost.isActive ? 'label-success' : 'label-error'}`}>{jobApplications[key].jobPost.isActive ? 'Active' : 'Non-active'}</span>
                        </div>
                        <div className="tile-subtitle">
                            {`${jobApplications[key].jobPost.city}, ${jobApplications[key].jobPost.province}`}
                        </div>
                        <div className="tile-subtitle">
                            {jobApplications[key].jobPost.applyThrough === 'internal' ?
                            `Apply Through: ${jobApplications[key].jobPost.internal}` :
                            jobApplications[key].jobPost.external}
                        </div>
                    </div>
                    <div className="tile-action">
                        <button className="btn btn-link btn-action btn-lg tooltip tooltip-left"
                            data-tooltip="Edit"><i className="fas fa-pencil-alt"></i></button>
                    </div>
                </div>
            );
        })
    }

    renderApplicationsPanel(){
        const { jobApplications } = this.props;

        return(
            <div className="panel">
                <div className="panel-header text-center">
                    <div className="panel-title h5 mt-10">My Job Applications</div>
                </div>
                <div className="panel-body">
                    { !jobApplications.length > 0 ?
                    <div className="mt8 mb8"><EmptyState title="You haven't applied to a job" icon="icon-edit"/></div> :
                    this.renderJobApplications() }
                </div>
            </div>
        )
    }
    
    render(){ 
        const { jobApplications } = this.props;
        if(!jobApplications) return <Loading />       
        return this.renderApplicationsPanel();
    }
}

const mapStateToProps = state => {
    return {
        jobApplications: state.job.jobApplications
    }
}

export default connect(mapStateToProps, { fetchJobApplications })(CandidateApplications);
