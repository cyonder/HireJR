import React from 'react';
import { Field, reduxForm } from 'redux-form';

import projectValidation from '../../validations/projectValidation';

import { renderHorizontalTextField } from '../Fields/TextFields';
import { renderTextAreaFieldWithLabelAndPopover } from '../Fields/TextAreaFields';

const ProjectForm = ({ handleSubmit, onSubmit, shouldHide }) => {
    if(shouldHide) return false;    
    return(
        <form onSubmit={ handleSubmit(onSubmit) } className="form-horizontal">
            <Field name="projectName"
                type="text"
                label="Project Name"
                placeholder="StudentValley"
                id="input-project-name"
                component={renderHorizontalTextField} />

            <Field name="url"
                type="text"
                label="URL"
                placeholder="http://"
                id="input-url" 
                component={renderHorizontalTextField} />

            <Field name="skills"
                type="text"
                label="Languages"
                placeholder="PHP, JavaScript, HTML"
                id="input-languages"
                component={renderHorizontalTextField} />

            <Field name="summary"
                rows="4"
                label="Summary"
                placeholder="Summary..."
                id="input-summary"
                component={renderTextAreaFieldWithLabelAndPopover} />

            <button type="submit" 
                className="btn btn-success btn-block mt8">Save</button>    
        </form>
    )
}

export default reduxForm({
    enableReinitialize: true,
    validate: (values) => projectValidation(values)
})(ProjectForm);