import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import moment from 'moment';

import Loading from './Loading';
import EmptyState from './EmptyState';

import { fetchJobPosts } from '../actions/jobPost';

class JobPostIndex extends Component{
    componentDidMount(){
        this.props.fetchJobPosts();
    }

    renderSkills(skills){
        return skills.map((skill, index) => {
            return <span className="chip" key={index}>{skill}</span>
        });
    }

    renderJobs(){
        const jobs = this.props.jobs;
        if(!jobs) return <Loading />;

        return Object.keys(jobs).map((key, index) => {
            let createdAt = moment(jobs[key].createdAt).fromNow(true);

            return(
                <div className="card mb8" key={index}>
                    <div className="card-header">
                        <div className="card-title flex-center-between">
                            <span className="h5">
                                <Link to={`/jobs/${jobs[key]._id}`}>{jobs[key].position}</Link>
                            </span>
                            <span>{`${jobs[key].city}, ${jobs[key].province}`}</span>
                        </div>
                        <div className="card-subtitle text-gray">
                            <span>{`${createdAt} by ${jobs[key].employer.companyName}`}</span>
                            <span>
                                <a href={jobs[key].companyWebsite} target="_blank">{jobs[key].companyName}</a>
                            </span>
                        </div>
                    </div>
                    <div className="card-body text-ellipsis">
                        { jobs[key].description }
                    </div>
                    <div className="card-footer">
                        { this.renderSkills(jobs[key].skills) }
                    </div>
                </div>
            );
        });
    }

    render(){
        if(!this.props.jobs) return <EmptyState title="There is no job post to display" subtitle="Maybe something went wrong =)" icon="icon-edit"/>
        return this.renderJobs();
    }
}

const mapStateToProps = state => {
    return {
        jobs: state.job.jobPosts
    };
}

export default connect(mapStateToProps, { fetchJobPosts })(JobPostIndex);