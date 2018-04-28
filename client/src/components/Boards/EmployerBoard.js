import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';

import EmptyState from '../EmptyState';
import Loading from '../Loading';

import { deleteJobPost, updateJobPostActivation } from '../../actions/jobPost';

const deleteButtonIcon = { color: '#E6561C' }

class EmployerBoard extends Component{
    constructor(){
        super();
        this.state = {
            selectedTab: 'all',
            computedJobPosts: []
        }
        this.computeJobPosts = this.computeJobPosts.bind(this);
        this.handleTabChange = this.handleTabChange.bind(this);
    }

    componentDidMount(){
        this.computeJobPosts();
    }

    computeJobPosts(){
        const jobPosts = this.props.employer.jobPosts;

        let computedJobPosts = jobPosts.filter(jobPost => {            
            if(this.state.selectedTab === 'all'){
                return true
            }else if(this.state.selectedTab === 'active'){
                return jobPost.isActive === true
            }else if(this.state.selectedTab === 'non-active'){
                return jobPost.isActive === false
            }else{
                return false
            }
        });
    
        this.setState({ computedJobPosts: computedJobPosts });
    }

    handleTabChange(selectedTab){
        this.setState(
            { selectedTab: selectedTab }, 
            () => { this.computeJobPosts() }
        )
    }

    renderTabs(){
        return(
            <ul className="tab tab-block">
                <li className={`tab-item c-hand ${this.state.selectedTab === 'all' ? 'active' : null }`}>
                    <a onClick={() => this.handleTabChange('all')}>All</a>
                </li>
                <li className={`tab-item c-hand ${this.state.selectedTab === 'active' ? 'active' : null }`}>
                    <a onClick={() => this.handleTabChange('active')}>Active</a>
                </li>
                <li className={`tab-item c-hand ${this.state.selectedTab === 'non-active' ? 'active' : null }`}>
                    <a onClick={() => this.handleTabChange('non-active')}>Non-Active</a>
                </li>
            </ul>
        )
    }

    renderJobPosts(){        
        const jobPosts = this.state.computedJobPosts;
        
        return Object.keys(jobPosts).map((key, index) => {
            return(
                <div className="tile tile-centered" key={index}>
                    <div className="tile-content">
                        <div className="tile-title">
                            <Link to={`jobs/${jobPosts[key]._id}`}>
                                {jobPosts[key].position}
                            </Link>
                            <span className={`ml4 label ${jobPosts[key].isActive ? 'label-success' : 'label-error'}`}>{jobPosts[key].isActive ? 'Active' : 'Non-active'}</span>
                        </div>
                        <div className="tile-subtitle">
                            {`${jobPosts[key].city}, ${jobPosts[key].province}`}
                        </div>
                        <div className="tile-subtitle">
                            {jobPosts[key].applyThrough === 'internal' ?
                            `Apply Through: ${jobPosts[key].internal}` :
                            jobPosts[key].external}
                        </div>
                    </div>
                    <div className="tile-action">
                        <button className="btn btn-link btn-action btn-lg tooltip tooltip-left"
                            data-tooltip="Edit"><i className="fas fa-pencil-alt"></i></button>

                        <button className="btn btn-link btn-action btn-lg tooltip tooltip-left"
                            data-tooltip={jobPosts[key].isActive ? 'Deactivate' : 'Activate'}
                            onClick={() => {
                                let confirmed = window.confirm(`Are you sure you want to ${jobPosts[key].isActive ? 'deactivate' : 'activate'} this job post?`)
                                if(confirmed){
                                    this.props.updateJobPostActivation(jobPosts[key]._id, !jobPosts[key].isActive, () => {
                                        this.computeJobPosts()
                                    })
                                }
                            }}><i className="fas fa-snowflake"></i></button>

                        <button className="btn btn-link btn-action btn-lg tooltip tooltip-left"
                            data-tooltip="Delete"
                            onClick={() => {
                                let confirmed = window.confirm('Are you sure you want to delete this job post?')
                                if(confirmed){
                                    this.props.deleteJobPost(jobPosts[key]._id, () => {
                                        this.computeJobPosts()
                                    })
                                }
                            }}><i className="fas fa-trash-alt" style={deleteButtonIcon}></i></button>
                    </div>
                </div>
            );
        })
    }

    renderJobBoardPanel(){
        const { firstName, lastName } = this.props;
        const panelTitle = `Welcome, ${firstName} ${lastName}`;

        return(
            <div className="panel">
                <div className="panel-header text-center">
                    <div className="panel-title h5 mt-10">{panelTitle}</div>
                </div>
                <div className="panel-nav">{this.renderTabs()}</div>
                <div className="panel-body">
                    { !this.props.employer.jobPosts.length > 0 ?
                    <div className="mt8 mb8"><EmptyState title="You have no posted jobs" icon="icon-edit"/></div> :
                    this.renderJobPosts() }
                </div>
            </div>
        )
    }

    render(){                
        return this.renderJobBoardPanel();
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({ 
        deleteJobPost,
        updateJobPostActivation
    }, dispatch)
}

const mapStateToProps = state => {
    return {
        firstName: state.user.firstName,
        lastName: state.user.lastName,
        employer: state.user.employer
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EmployerBoard);
