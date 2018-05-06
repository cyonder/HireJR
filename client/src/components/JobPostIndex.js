import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import moment from 'moment';

import Loading from './Loading';
import EmptyState from './EmptyState';

import { fetchJobPosts } from '../actions/jobPost';

class JobPostIndex extends Component{
    constructor(){
        super();
        this.state={
            search: ''
        }
        this.handleSearch = this.handleSearch.bind(this);
    }

    componentDidMount(){
        this.props.fetchJobPosts();
    }

    renderSkills(skills){
        return skills.map((skill, index) => {
            return <span className="chip" key={index}>{skill}</span>
        });
    }

    computeFilteredJobPosts(jobPost){
        if( jobPost.position.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1 ){
            return true;
        }else if( jobPost.city.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1 ){
            return true;
        }else if( jobPost.province.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1 ){
            return true;
        }else if( jobPost.employer.companyName.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1 ){
            return true;
        }
    }

    handleSearch(event){
        this.setState({ search: event.target.value })
    }

    renderSearch(){
        return(
            <div className="input-group mb8">
                <input type="text"
                    value={ this.state.search }
                    onChange={ this.handleSearch }
                    className="form-input input-lg"
                    placeholder="Search jobs by; Position, City, Province, Company..."/>
    
                <button className="btn btn-primary input-group-btn btn-lg">
                    <i className="icon icon-search"></i> Search
                </button>
            </div>
        )
    }

    renderJobs(){
        const { jobs } = this.props;
        if(!jobs) return <Loading />;
        let jobPosts = jobs.filter( (jobPost) => this.computeFilteredJobPosts(jobPost) );

        if(jobPosts.length === 0) return <EmptyState title="No job post found!" icon="icon-edit"/>

        return Object.keys(jobPosts).map((key, index) => {
            let createdAt = moment(jobPosts[key].createdAt).fromNow(true);

            return(
                <div className="card mb8" key={index}>
                    <div className="card-header">
                        <div className="card-title flex-center-between">
                            <span className="h5">
                                <Link to={`/jobs/${jobPosts[key]._id}`}>{jobPosts[key].position}</Link>
                            </span>
                            <span>{`${jobPosts[key].city}, ${jobPosts[key].province}`}</span>
                        </div>
                        <div className="card-subtitle text-gray">
                            <span>{`${createdAt} by ${jobPosts[key].employer.companyName}`}</span>
                            <span>
                                <a href={jobPosts[key].companyWebsite} target="_blank">{jobs[key].companyName}</a>
                            </span>
                        </div>
                    </div>
                    <div className="card-body text-ellipsis">
                        { jobPosts[key].description }
                    </div>
                    <div className="card-footer">
                        { this.renderSkills(jobPosts[key].skills) }
                    </div>
                </div>
            );
        });
    }

    render(){
        if(!this.props.jobs) return <EmptyState title="There is no job post to display" subtitle="Maybe something went wrong =)" icon="icon-edit"/>
        return (
            <div>
                { this.renderSearch() }
                { this.renderJobs() }
            </div>    
        )
    }
}

const mapStateToProps = state => {
    return {
        jobs: state.job.jobPosts
    };
}

export default connect(mapStateToProps, { fetchJobPosts })(JobPostIndex);
