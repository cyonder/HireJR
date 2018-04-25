import React from 'react';
import { Field, reduxForm } from 'redux-form';

import workExperienceValidation from '../../validations/workExperienceValidation';

import { renderHorizontalTextField } from '../Fields/TextFields';
import { renderTextAreaFieldWithLabelAndPopover } from '../Fields/TextAreaFields';

const WorkExperienceForm = ({ handleSubmit, onSubmit, shouldHide }) => {
    if(shouldHide) return false;    
    return(
        <form onSubmit={ handleSubmit(onSubmit) } className="form-horizontal">
            <Field name="companyName"
                type="text"
                label="Company Name"
                placeholder="Apple inc."
                id="input-company-name"
                component={renderHorizontalTextField} />

            <Field name="title"
                type="text"
                label="Title"
                placeholder="Marketing Specialist"
                id="input-title"
                component={renderHorizontalTextField} />

            <Field name="startYear"
                type="text"
                label="Start Year"
                placeholder=""
                id="input-start-year"
                component={renderHorizontalTextField} />

            <Field name="endYear"
                type="text"
                label="End Year"
                placeholder="Blank if current"
                id="input-end-year"
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
    validate: (values) => workExperienceValidation(values)
})(WorkExperienceForm);