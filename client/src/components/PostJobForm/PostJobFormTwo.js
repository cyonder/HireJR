import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';

import Description from './PostJobFormSections/Description';

import jobPostFormValidation from '../../validations/jobPostFormValidation';

class PostJobFormTwo extends Component{
    renderForm(){
        const { handleSubmit, previousPage } = this.props;

        return(
            <form onSubmit={handleSubmit}>
                <Description />
                <div className="flex-center-between">
                    <button className="btn ml8" type="button" onClick={previousPage}>Previous</button>
                    <button className="btn btn-primary mr8" type="submit">Next</button>
                </div>
            </form>
        );
    }

    render(){
        return this.renderForm();
    }
}

export default reduxForm({
    form: 'postJobForm',
    destroyOnUnmount: false,
    // validate: (values) => jobPostFormValidation(values)
})(PostJobFormTwo);
