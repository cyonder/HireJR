import React, { Component } from 'react';
// import { Link } from 'react-router-dom';

const STEPS = [
    { pageNo: 1, page: 'details', label: 'Job Details', tooltip: 'Enter the job details' },
    { pageNo: 2, page: 'description', label: 'Job Description', tooltip: 'Describe the job' },
    { pageNo: 3, page: 'authentication', label: 'Authentication', tooltip: 'Sign up/Sign into an account' },
    { pageNo: 4, page: 'confirmation', label: 'Confirmation', tooltip: 'Review your entries' }
];

class Steps extends Component{
    renderSteps(){
        const { page } = this.props;
        let authenticated = localStorage.getItem('authentication_token');

        return Object.keys(STEPS).map((item, index) => {
            if(STEPS[item].page === 'authentication' && authenticated) return null;
            return(
                <li key={index}
                    className={STEPS[item].pageNo === page ? 'step-item active' : 'step-item'}>
                    <a className="tooltip tooltip-bottom"
                        data-tooltip={STEPS[item].tooltip}>{STEPS[item].label}</a>
                </li>
            );
        });
    }

    render(){
        return(
            <ul className="step">
                { this.renderSteps() }
            </ul>
        );
    }
}

export default Steps;
