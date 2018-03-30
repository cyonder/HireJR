import React, { Component } from 'react';
import { reduxForm } from 'redux-form';

import Description from './PostJobFormSections/Description';

import jobPostFormValidation from '../../validations/jobPostFormValidation';

import { postJobFormSections } from '../../data/postJobFormSections.json';

class PostJobFormTwo extends Component{
    constructor(){
        super();
        this.state = {
            formSections: postJobFormSections
        }
    }

    renderForm(){
        const { handleSubmit, previousPage } = this.props;

        return(
            <form onSubmit={handleSubmit}>
                <Description title={this.state.formSections[3].title}
                            subtitle={this.state.formSections[3].subtitle} />
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
    // destroyOnUnmount: false,
    // validate: (values) => jobPostFormValidation(values)
})(PostJobFormTwo);
