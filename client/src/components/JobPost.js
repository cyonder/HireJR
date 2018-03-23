import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import mongoose from 'mongoose';
import moment from 'moment';

import { findJob } from '../actions/job';

class JobPost extends Component{
    componentDidMount(){
        if(this.props.match.params.id){
            this.props.findJob(this.props.match.params.id);
        }
    }

    renderDescription(details){
        if(!details) return false;
        return(
            <div className="card">
                <div className="card-header">
                    <div className="card-title h3">{details.position}</div>
                    <div className="card-subtitle text-gray">{details.companyName}</div>
                </div>
                <div className="card-body">
                    {details.description}
                </div>
            </div>
        )
    }

    renderMenu(job){
        if(!job)return false
        let active;
        let timeStamp = mongoose.Types.ObjectId(job._id).getTimestamp();
        let createdAt = moment(timeStamp).fromNow(true);

        if(job.isActive){
            active = 'Active'
        }else{
            active = 'Non-active'
        }

        return(
            <ul className="menu">
                <li className="divider" data-content="SHORT"></li>
                <li className="menu-item">
                    <i className="icon icon-shutdown"></i>{`${active} since ${createdAt}`}
                </li>
                <li className="menu-item">
                    <i className="icon icon-location"></i>{`${job.city}, ${job.province}`}
                </li>
                <li className="menu-item">
                    <i className="icon icon-time"></i>{job.schedule}
                </li>
                <li className="divider" data-content="SKILLS"></li>
                { this.renderSkills(job.skills) }
                <li className="divider"></li>
                <li className="menu-item">
                    <a href={job.companyWebsite}>Company Website</a>
                </li>
            </ul>
        )
    }

    renderSkills(skills){
        if(!skills) return false;

        let skillArray;

        if(!Array.isArray(skills)){
            skillArray = skills.split(',').map(skill => skill.trim());
        }else{
            skillArray = skills;
        }

        return skillArray.map((skill, index) => {
            return <li className="chip" key={index}>{skill}</li>
        });
    }

    render(){
        let details, activeClass, buttonTarget, buttonLabel;

        if(this.props.formValues){
            details = this.props.formValues;
            activeClass = 'btn btn-primary btn-block mb4rem disabled';
        }else{
            details = this.props.job;
            activeClass = 'btn btn-primary btn-block mb4rem'
        }

        if(details){
            if(details.applyThrough === 'internal'){
                buttonTarget = details.internal; // This should trigger modal
                buttonLabel = 'Apply on Hirejr';
            }else{
                buttonTarget = details.external;
                buttonLabel = 'Apply on Website';
            }
        }

        return(
            <div className="columns">
                <div className="column col-8">{ this.renderDescription(details) }</div>
                <div className="column col-4">
                    <a href={buttonTarget} target="_BLANK" className={activeClass}>{buttonLabel}</a>
                    { this.renderMenu(details) }
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return{
        job: state.jobs.job
    };
}

export default withRouter(
    connect(mapStateToProps, { findJob })(JobPost)
);
