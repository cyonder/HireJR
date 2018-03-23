import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import isEmail from 'sane-email-validation';

import { signupUser } from '../actions/authentication';

const validate = values => {
    const errors = {};

    if(!values.firstName){
        errors.firstName = 'Required';
    }
    if(!values.lastName){
        errors.lastName = 'Required';
    }
    if(!values.email){
        errors.email = 'Required';
    }else if(!isEmail(values.email)){
        errors.email = 'Incorrect format for the email';
    }

    if(!values.password){
        errors.password = 'Required';
    }else if(values.password.length < 8){
        errors.password = 'Password should be at least 8 characters long'
    }

    if(!values.passwordConfirmation){
        errors.passwordConfirmation = 'Required';
    }else if(values.passwordConfirmation !== values.password){
        errors.passwordConfirmation = 'Passwords must match';
    }

    return errors;
}

class Signup extends Component{
    constructor(){
        super();
        this.onSubmit = this.onSubmit.bind(this);
    };

    renderAlert(){
        if(this.props.errorMessage){
            return(
                <span>{ this.props.errorMessage }</span>
            );
        }
    }

    renderTextField({ input, meta, label, id, placeholder, type }){
        return(
            <div className={meta.error && meta.touched ? 'form-group has-error' : 'form-group'}>
                <label className="form-label" htmlFor={id}>{label}</label>
                <input {...input}
                    className="form-input"
                    type={type}
                    id={id}
                    placeholder={placeholder}/>
                {meta.error && meta.touched &&
                    <p className="form-input-hint">{meta.error}</p>
                }
            </div>
        );
    }

    onSubmit(values){
        const { pathname } = this.props.location;

        delete values.passwordConfirmation; // No need to send conf. to server
        this.props.signupUser(values, () => {
            if(pathname === '/jobs/new/authentication'){
                this.props.history.push('/jobs/new/confirmation');
            }else{
                this.props.history.push('/dashboard');
            }
        });
    };

    renderForm(){
        const { handleSubmit } = this.props;

        return(
            <form onSubmit={ handleSubmit(this.onSubmit) } >
                <Field name="firstName"
                    label="First Name"
                    placeholder="Cagdas"
                    id="signup-firstname"
                    type="text"
                    component={this.renderTextField} />

                <Field name="lastName"
                    label="Last Name"
                    placeholder="Yonder"
                    id="signup-lastname"
                    type="text"
                    component={this.renderTextField} />

                <Field name="email"
                    label="Email"
                    placeholder="cagdasyonder@gmail.com"
                    id="signup-email"
                    type="text"
                    component={this.renderTextField} />

                <Field name="password"
                    label="Password"
                    placeholder="Min. length 8 character"
                    id="signup-password"
                    type="password"
                    component={this.renderTextField} />

                <Field name="passwordConfirmation"
                    label="Password Confirmation"
                    placeholder="Re-type your password"
                    id="signup-password-confirmation"
                    type="password"
                    component={this.renderTextField} />

                { this.renderAlert() }

                <div className="form-group">
                    <button type="submit" className="btn btn-success btn-block">Sign up</button>
                </div>
            </form>
        );
    }

    render(){
        return this.renderForm();
    }
}

const mapStateToProps = state => {
    return{
        errorMessage: state.authentication.signupError
    };
};

export default reduxForm({
    form: 'signupForm',
    validate
})(
    connect(mapStateToProps, { signupUser })(Signup)
);
