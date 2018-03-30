import React, { Component } from 'react';

class Steps extends Component{
    renderSteps(){
        const { page, steps } = this.props;
        let authenticated = localStorage.getItem('authentication_token');

        return Object.keys(steps).map((key, index) => {
            if(steps[key].page === 'authentication' && authenticated) return null;
            return(
                <li key={index}
                    className={steps[key].pageNo === page ? 'step-item active' : 'step-item'}>
                    <a className="tooltip tooltip-bottom"
                        data-tooltip={steps[key].tooltip}>{steps[key].label}</a>
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
