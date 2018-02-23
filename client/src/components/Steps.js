import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Steps extends Component{
    render(){
        const { pathname } = this.props.location;
        console.log("Steps-props:", this.props);

        return(
            <ul className="step">
                <li className={pathname === '/jobs/new' ? 'step-item active' : 'step-item'}>
                    <Link to="/jobs/new"
                        className="tooltip tooltip-bottom"
                        data-tooltip="Enter the job details">Details</Link>
                </li>
                <li className={pathname === '/jobs/new/description' ? 'step-item active' : 'step-item'}>
                    <Link to="/jobs/new/description"
                        className="tooltip tooltip-bottom"
                        data-tooltip="Describe the job">Description</Link>
                </li>
                <li className={pathname === '/jobs/new/authentication' ? 'step-item active' : 'step-item'}>
                    <Link to="/jobs/new/authentication"
                        className="tooltip tooltip-bottom"
                        data-tooltip="Sign up/Sign into an account">Authentication</Link>
                </li>
                <li className={pathname === '/jobs/new/confirmation' ? 'step-item active' : 'step-item'}>
                    <Link to="/jobs/new/confirmation"
                        className="tooltip tooltip-bottom"
                        data-tooltip="Review your entries">Confirmation</Link>
                </li>
            </ul>
        );
    }
}

export default Steps;
