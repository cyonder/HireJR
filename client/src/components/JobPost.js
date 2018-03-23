import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

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
            <div className="card no-bg">
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
        return(
            <ul className="menu">
                <li className="divider" data-content="SHORT"></li>
                <li className="menu-item">
                    <i className="icon icon-location"></i>{`${job.city}, ${job.province}`}
                </li>
                <li className="menu-item">
                    <i className="icon icon-time"></i>{job.schedule}
                </li>
                <li className="divider"></li>
                <li className="menu-item">
                    <a href={job.companyWebsite}>Company Website</a>
                </li>
            </ul>
        )
    }

    render(){
        console.log(this.props);
        let details;

        if(this.props.formValues){
            details = this.props.formValues;
        }else{
            details = this.props.job;
        }

        return(
            <div className="container">
                <div className="columns">
                    <div className="column col-8">{ this.renderDescription(details) }</div>
                    <div className="column col-4">{ this.renderMenu(details) }</div>
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
