import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';

import JobPostForm from './JobPostForm';
import JobPostDescription from './JobPostDescription';

class JobPostCard extends Component{
    render(){
        console.log("JobPostCard-props:", this.props);
        return(
            <div className="card">
                <div className="card-header">
                    <div className="card-title h5">Create a Job Post</div>
                    <div className="card-subtitle text-gray">
                        We offer and promote opportunities for
                        Junior and Entry-Level Developers
                    </div>
                </div>
                <div className="card-body">
                    <Switch>
                        <Route exact path="/jobs/new" render={
                            () => <JobPostForm {...this.props} />
                        }/>
                        <Route exact path="/jobs/new/description" render={
                            () => <JobPostDescription {...this.props} />
                        }/>
                    </Switch>
                </div>
            </div>
        );
    }
}

export default withRouter(JobPostCard);
