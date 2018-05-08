import React from 'react';
import { Field, reduxForm } from 'redux-form';

import employerValidation from '../../validations/employerValidation';

import { renderTextFieldWithLabel } from '../Fields/TextFields';

const EmployerSettingsForm = ({ handleSubmit, onSubmit }) => {
    return(
        <form onSubmit={ handleSubmit(onSubmit) }>
            <Field name="companyName"
                type="text"
                label="Company Name"
                placeholder=""
                id="input-company-name"
                component={renderTextFieldWithLabel} />

            <Field name="companyWebsite"
                type="text"
                label="Company Website"
                placeholder="http://"
                id="input-company-website"
                component={renderTextFieldWithLabel} />

            <button type="submit" 
                className="btn btn-success btn-block mt8">Update Employer</button>
        </form>
    )
}

export default reduxForm({
    enableReinitialize: true,
    validate: (values) => employerValidation(values)
})(EmployerSettingsForm);