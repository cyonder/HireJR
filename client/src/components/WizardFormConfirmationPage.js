import React, { Component } from 'react';
import { connect } from 'react-redux';

import { submitJob } from '../actions/job';
import JobPost from './JobPost';

class WizardFormConfirmationPage extends Component{
    render(){
        const { previousPage, formValues } = this.props;

        return(
            <div>
                <JobPost formValues={formValues} {...this.props} />
                <div className="fcs mt4rem">
                    <button className="btn" type="button"
                        onClick={previousPage}>Previous</button>
                    <button className="btn btn-primary" type="button"
                        onClick={() => this.props.submitJob(formValues)}>Save</button>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        formValues: state.form.wizardForm.values
    };
}

export default connect(mapStateToProps, { submitJob })(WizardFormConfirmationPage);
