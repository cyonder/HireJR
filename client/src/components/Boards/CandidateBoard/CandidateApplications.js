import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import moment from 'moment'

import Card from '../../Card';
import Loading from '../../Loading';
import EmptyState from '../../EmptyState';

import { fetchJobApplications, deleteJobApplication } from '../../../actions/jobPost';

const deleteButtonIcon = { color: '#E6561C' }

class CandidateApplications extends Component{
    componentDidMount(){
        this.props.fetchJobApplications();
    }

    renderJobApplications(){
        const { jobApplications } = this.props;
        return Object.keys(jobApplications).map((key, index) => {     
            let appliedAt = moment(jobApplications[key].createdAt).fromNow(true);
            let createdAt = moment(jobApplications[key].jobPost.createdAt).fromNow(true);
            let companyName = jobApplications[key].employer.companyName;
            let position = jobApplications[key].jobPost.position;
            let jobPostId = jobApplications[key].jobPost._id;

            return(
                <div className="tile tile-centered" key={index}>
                    <div className="tile-content">
                        <div className="tile-title">
                            <Link to={`jobs/${jobPostId}`}>{position}</Link>
                        </div> 
                        <div className="tile-subtitle">
                            <span className="" style={{fontSize: '.7rem'}}>
                                Posted by 
                                <span className="ml4 label">{companyName}</span>
                                <span className="ml4">{`${createdAt} ago`}</span>
                            </span>
                        </div>
                    </div>
                    <div className="tile-action">
                        <button className="btn btn-link btn-action btn-lg tooltip tooltip-left"
                            data-tooltip="Withdraw"
                            onClick={() => {
                                let confirmed = window.confirm('Are you sure you want to withdraw this application?')
                                if(confirmed){
                                    this.props.deleteJobApplication(jobApplications[key]._id, () => {
                                        this.props.notify('Job application withdrawn successfully'); 
                                    })
                                }
                            }}><i className="fas fa-trash-alt" style={deleteButtonIcon}></i></button>
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
                    <div className="mt8 mb8">
                        <EmptyState title="You haven't applied to a job" 
                            subtitle="at least, not via hirejr =)" 
                            icon="icon-edit"/>
                    </div> : this.renderJobApplications() }
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

export default connect(mapStateToProps, { fetchJobApplications, deleteJobApplication })(CandidateApplications);
