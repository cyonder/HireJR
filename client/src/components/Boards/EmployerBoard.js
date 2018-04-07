import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import EmptyState from '../EmptyState';
import Loading from '../Loading';

const deleteButtonIcon = { color: '#E6561C' }

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
        const jobPosts = this.props.employer.jobPosts;
        return Object.keys(jobPosts).map((key, index) => {
            return(
                <div className="tile tile-centered" key={index}>
                    <div className="tile-content">
                        <div className="tile-title">
                            <Link to={`jobs/${jobPosts[key]._id}`}>
                                {jobPosts[key].position}
                            </Link>
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
                            data-tooltip="Edit"><i className="icon icon-edit"></i></button>
                        <button className="btn btn-link btn-action btn-lg tooltip tooltip-left"
                            data-tooltip="Freeze"><i className="icon icon-time"></i></button>
                        <button className="btn btn-link btn-action btn-lg tooltip tooltip-left"
                            data-tooltip="Delete"><i className="icon icon-delete" style={deleteButtonIcon}></i></button>
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

const mapStateToProps = state => {
    return {
        firstName: state.user.firstName,
        lastName: state.user.lastName,
        employer: state.user.employer
    }
}

export default connect(mapStateToProps)(EmployerBoard);
