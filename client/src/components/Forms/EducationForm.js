import React from 'react';
import { Field, reduxForm } from 'redux-form';

import educationValidation from '../../validations/educationValidation';

import { renderHorizontalTextField } from '../Fields/TextFields';

const EducationForm = ({ handleSubmit, onSubmit, shouldHide }) => {
    if(shouldHide) return false;    
    return(
        <form onSubmit={ handleSubmit(onSubmit) } className="form-horizontal">
            <Field name="schoolName"
                type="text"
                label="School Name"
                placeholder="Seneca College"
                id="input-school-name"
                component={renderHorizontalTextField} />

            <Field name="degree"
                type="text"
                label="Degree"
                placeholder="Bachelors"
                id="input-degree"
                component={renderHorizontalTextField} />

            <Field name="field"
                type="text"
                label="Field of Study"
                placeholder="Programming"
                id="input-field"
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

            <button type="submit" 
                className="btn btn-success btn-block mt8">Save</button>    
        </form>
    )
}

export default reduxForm({
    enableReinitialize: true,
    validate: (values) => educationValidation(values)
})(EducationForm);