import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import moment from 'moment';

import Loading from './Loading';
import Card from './Card';

import { findJobPost } from '../actions/jobPost';

class JobPost extends Component{
    componentDidMount(){
        if(this.props.match.params.id){
            this.props.findJobPost(this.props.match.params.id);
        }
    }

    renderDescription(details){
        return(
            <Card title={details.position}
                    subtitle={details.employer.companyName}>
                    <div className="job-post-description">{details.description}</div>
            </Card>
        )
    }


    renderMenu(job){
        let active;
        let createdAt = moment(job.createdAt).fromNow(true);

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
                    <a href={job.employer.companyWebsite}>Company Website</a>
                </li>
            </ul>
        )
    }

    renderSkills(skills){
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
        if(!this.props.job && !this.props.formValues) return <Loading />;

        let details, activeClass, buttonTarget, buttonLabel;

        if(this.props.formValues){
            details = this.props.formValues;
            // in render, the company info is nested under employer key but formValues are flat.
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
                buttonTarget = details.internal; // This should trigger modal
                buttonLabel = 'Apply on Hirejr';
            }else{
                buttonTarget = details.external;
                buttonLabel = 'Apply on Website';
            }
        }

        return(
            <div className="columns">
                <div className="column col-8">
                    { this.renderDescription(details) }
                </div>
                <div className="column col-4">
                    <a href={buttonTarget} target="_blank" className={activeClass}>{buttonLabel}</a>
                    { this.renderMenu(details) }
                </div>
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
