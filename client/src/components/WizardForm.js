import React, { Component } from 'react';

import Steps from './Steps';

import WizardFormFirstPage from './WizardFormFirstPage';
import WizardFormSecondPage from './WizardFormSecondPage';
import WizardFormAuthPage from './WizardFormAuthPage';
import WizardFormConfirmationPage from './WizardFormConfirmationPage';

class WizardForm extends Component{
    constructor(){
        super();
        this.state = {
            page: 1
        };

        this.nextPage = this.nextPage.bind(this);
        this.previousPage = this.previousPage.bind(this);
    }

    nextPage(){
        this.setState({ page: this.state.page + 1 })
    }

    previousPage(){
        this.setState({ page: this.state.page - 1 })
    }

    renderAStep(){
        const { page } = this.state;
        const authenticated = localStorage.getItem('authentication_token');

        switch(page){
            case 1:
                return <WizardFormFirstPage
                            onSubmit={this.nextPage} />;
            case 2:
                return <WizardFormSecondPage
                            previousPage={this.previousPage}
                            onSubmit={this.nextPage} />;
            case 3:
                if(!authenticated)
                    return <WizardFormAuthPage {...this.props} />;
                else
                    return <WizardFormConfirmationPage
                                previousPage={this.previousPage} />;
            case 4:
                return <WizardFormConfirmationPage
                            previousPage={this.previousPage} />;
            default:
                return false;
        }
    }

    render(){
        return(
            <div>
                <Steps {...this.props} page={this.state.page} />
                { this.renderAStep() }
            </div>
        );
    }
}

export default WizardForm;
