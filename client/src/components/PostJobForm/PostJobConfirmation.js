import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';

import { createJobPost } from '../../actions/jobPost';
import JobPost from '../JobPost';

class PostJobConfirmation extends Component{
    handleSubmit(formValues){
        this.props.createJobPost(formValues, id => {
            this.props.reset();
            this.props.history.push(`/jobs/${id}`);
        });
    }

    render(){
        const { previousPage, formValues } = this.props;
        return(
            <div className="mt8">
                <JobPost formValues={formValues} {...this.props} />
                <div className="flex-center-between mt8">
                    <button className="btn" type="button"
                        onClick={previousPage}>Previous</button>
                    <button className="btn btn-primary" type="button"
                        onClick={() => this.handleSubmit(formValues)}>Save</button>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        formValues: state.form.postJobForm.values
    };
}

export default reduxForm({
    form: 'postJobForm',
    destroyOnUnmount: false,
})(
    connect(mapStateToProps, { createJobPost })(PostJobConfirmation)
);
