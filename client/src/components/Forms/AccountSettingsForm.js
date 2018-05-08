import React from 'react';
import { Field, reduxForm } from 'redux-form';

import accountValidation from '../../validations/accountValidation';

import { renderTextFieldWithLabel } from '../Fields/TextFields';

const AccountSettingsForm = ({ handleSubmit, onSubmit, hideUsername }) => {
    return(
        <form onSubmit={ handleSubmit(onSubmit) }>
            <Field name="firstName"
                type="text"
                label="First Name"
                placeholder=""
                id="input-first-name"
                component={renderTextFieldWithLabel} />

            <Field name="lastName"
                type="text"
                label="Last Name"
                placeholder=""
                id="input-city"
                component={renderTextFieldWithLabel} />

            { !hideUsername ? 
                <Field name="username"
                type="text"
                label="Username"
                placeholder="hirejr.com/profile/'username'"
                id="input-custom-url"
                component={renderTextFieldWithLabel} /> : null    
            }

            <button type="submit" 
                className="btn btn-success btn-block mt8">Update Account</button>
        </form>
    )
}

export default reduxForm({
    enableReinitialize: true,
    validate: (values) => accountValidation(values)
})(AccountSettingsForm);