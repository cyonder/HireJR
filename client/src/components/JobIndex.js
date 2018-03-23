import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import mongoose from 'mongoose';
import moment from 'moment';

import { fetchJobs } from '../actions/job';

class JobIndex extends Component{
    componentDidMount(){
        this.props.fetchJobs();
    }

    renderSkills(skills){
        return skills.map((skill, index) => {
            return <span className="chip" key={index}>{skill}</span>
        });
    }

    renderJobs(){
        const jobs = this.props.jobs;

        return Object.keys(jobs).map((key, index) => {
            let timeStamp = mongoose.Types.ObjectId(jobs[key]._id).getTimestamp();
            let createdAt = moment(timeStamp).fromNow();

            return(
                <div className="card" key={index}>
                    <div className="card-header">
                        <div className="fcs">
                            <span className="card-title h5">
                                <Link to={`/jobs/${jobs[key]._id}`}>{jobs[key].position}</Link>
                            </span>
                            <span>{`${jobs[key].city}, ${jobs[key].province}`}</span>
                        </div>
                        <div className="card-subtitle text-gray">
                            <span>{`${createdAt} by `}</span>
                            <span>
                                <a href={jobs[key].companyWebsite} target="_blank">{jobs[key].companyName}</a>
                            </span>
                        </div>
                    </div>
                    <div className="card-body hne">
                        {jobs[key].description}
                    </div>
                    <div className="card-footer">
                        { this.renderSkills(jobs[key].skills) }
                    </div>
                </div>
            );
        });
    }

    render(){
        return(
            <div>{this.renderJobs()}</div>
        );
    }
}

const mapStateToProps = state => {
    return {
        jobs: state.jobs.index
    };
}

export default connect(mapStateToProps, { fetchJobs })(JobIndex);
