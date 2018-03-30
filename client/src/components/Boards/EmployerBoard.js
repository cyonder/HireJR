import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import EmptyState from '../EmptyState';

class EmployerBoard extends Component{
    renderTabs(){
        return(
            <ul className="tab tab-block">
                <li className="tab-item active">
                    <a href="#">All</a>
                </li>
                <li className="tab-item">
                    <a href="#">Active</a>
                </li>
                <li className="tab-item">
                    <a href="#">Non-Active</a>
                </li>
            </ul>
        )
    }

    renderJobPosts(){
        /* position, city, province */
        const jobPosts = this.props.employer._jobPostIds;
        return Object.keys(jobPosts).map((key, index) => {
            return(
                <div className="tile tile-centered mb8" key={index}>
                    <div className="tile-content text-ellipsis">
                        <p className="tile-title">
                            <Link to={`jobs/${jobPosts[key]._id}`}>
                                {jobPosts[key].position}
                            </Link>
                        </p>
                        <p className="tile-subtitle text-gray">
                            {jobPosts[key].description}
                        </p>
                    </div>
                    <div className="tile-action">
                        <div className="btn-group btn-group-block">
                            <button className="btn btn-warning">Edit</button>
                            <button className="btn btn-error">Delete</button>
                        </div>
                    </div>
                </div>
            )
        })
    }

    renderJobBoardPanel(){
        const { firstName, lastName } = this.props;

        const panelTitle = `Welcome ${firstName} ${lastName}`;

        return(
            <div className="panel">
                <div className="panel-header">
                    <div className="panel-title h4">{panelTitle}</div>
                </div>
                <div className="panel-body">
                    { (!this.props.employer || !this.props.employer['_jobPostIds'].length > 0) ?
                    <EmptyState title="You have no posted jobs"
                                icon="icon-edit"/> :
                    this.renderJobPosts() }
                </div>
                <div className="panel-nav">{this.renderTabs()}</div>
            </div>
        )
    }

    render(){
        return this.renderJobBoardPanel();
    }
}

const mapStateToProps = state => {
    return {
        firstName: state.user.firstName,
        lastName: state.user.lastName,
        employer: state.user.employer
    }
}

export default connect(mapStateToProps)(EmployerBoard);
