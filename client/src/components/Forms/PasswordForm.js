import React from 'react';
import { Field, reduxForm } from 'redux-form';

import passwordValidation from '../../validations/passwordValidation';

import { renderTextFieldWithLabel } from '../Fields/TextFields';

const PasswordForm = ({ handleSubmit, onSubmit }) => {
    return(
        <form onSubmit={ handleSubmit(onSubmit) }>
            <Field name="currentPassword"
                type="password"
                label="Current Password"
                placeholder=""
                id="input-current-password"
                component={renderTextFieldWithLabel} />

            <Field name="newPassword"
                type="password"
                label="New Password"
                placeholder=""
                id="input-new-password"
                component={renderTextFieldWithLabel} />

            <Field name="passwordConfirmation"
                type="password"
                label="Password Confirmation"
                placeholder=""
                id="input-password-confirmation"
                component={renderTextFieldWithLabel} />

            <button type="submit" 
                className="btn btn-success btn-block mt8">Update Password</button>
        </form>
    )
}

export default reduxForm({
    validate: (values) => passwordValidation(values)
})(PasswordForm);