import React, { Component } from 'react';

import Steps from './Steps';
import JobPostCard from './JobPostCard';
import JobPostAuthentication from './JobPostAuthentication';
import JobPostConfirmation from './JobPostConfirmation';

class JobPostProcess extends Component{
    constructor(){
        super();
        this.state = {
            details: {
                position: null,
                companyName: null,
                companyWebsite: null,
                city: null,
                state: null,
                schedule: null,
                salary:{
                    from: null,
                    to: null,
                    per: null
                },
                skills: [],
                remote: false,
                degree: false
            }
        };

        this.saveValues = this.saveValues.bind(this)
    }

    saveValues(details){
        this.setState({ details });
    }

    renderAStep(){
        const { pathname } = this.props.location;

        switch(pathname){
            case '/jobs/new':
                return <JobPostCard
                            saveValues = { this.saveValues} />;
            case '/jobs/new/description':
                return <JobPostCard
                            details = { this.state.details }
                            saveValues = { this.saveValues } />;
            case '/jobs/new/signup':
                return <JobPostAuthentication />;
            case '/jobs/new/confirmation':
                return <JobPostConfirmation />;
            default:
                return false;
        }
    }

    render(){
        console.log("JobPostProcess-props:", this.props);
        return(
            <div>
                <Steps {...this.props} />
                { this.renderAStep() }
            </div>
        );
    }
}

export default JobPostProcess;
