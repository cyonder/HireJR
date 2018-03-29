import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import isEmail from 'validator/lib/isEmail';

import { signupUser } from '../actions/authentication';
import { findCurrentUser } from '../actions/user';

import { renderTextField } from './Fields/TextFields';

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

    if(!values.role){
        errors.role = 'Required';
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

    renderSwitchField({ input, meta, label, type }){
        return(
            <div className={meta.error && meta.touched ? 'form-group has-error' : 'form-group'}>
                <label className="form-switch">
                    <input {...input} type={type} />
                    <i className="form-icon"></i> {label}
                    {meta.error && meta.touched &&
                        <span className="form-input-hint ml4">{meta.error}</span>
                    }
                </label>

            </div>
        );
    }

    // renderTextField({ input, meta, label, id, placeholder, type }){
    //     return(
    //         <div className={meta.error && meta.touched ? 'form-group has-error' : 'form-group'}>
    //             <label className="form-label d-inline" htmlFor={id}>{label}</label>
    //             <input {...input}
    //                 className="form-input"
    //                 type={type}
    //                 id={id}
    //                 placeholder={placeholder}/>
    //             {meta.error && meta.touched &&
    //                 <span className="form-input-hint"> {meta.error}</span>
    //             }
    //         </div>
    //     );
    // }

    onSubmit(values){
        const { pathname } = this.props.location;

        delete values.passwordConfirmation;
        this.props.signupUser(values, () => {
            this.props.findCurrentUser();
            if(pathname === '/jobs/new'){
                this.props.setPage(3);
            }else{
                this.props.history.push('/dashboard');
            }
        });
    };

    renderForm(){
        const { handleSubmit } = this.props;

        return(
            <form onSubmit={ handleSubmit(this.onSubmit) } className="form-horizontal">
                <Field name="firstName"
                    label="First Name"
                    placeholder="Cagdas"
                    id="signup-firstname"
                    type="text"
                    component={renderTextField} />

                <Field name="lastName"
                    label="Last Name"
                    placeholder="Yonder"
                    id="signup-lastname"
                    type="text"
                    component={renderTextField} />

                <Field name="email"
                    label="Email"
                    placeholder="cagdasyonder@gmail.com"
                    id="signup-email"
                    type="text"
                    component={renderTextField} />

                <Field name="password"
                    label="Password"
                    placeholder="Min. length 8 character"
                    id="signup-password"
                    type="password"
                    component={renderTextField} />

                <Field name="passwordConfirmation"
                    label="Confirmation"
                    placeholder="Re-type your password"
                    id="signup-password-confirmation"
                    type="password"
                    component={renderTextField} />

                <Field name="role"
                    label="I'm a jr developer"
                    type="radio"
                    value="candidate"
                    component={this.renderSwitchField}  />

                <Field name="role"
                    label="I'm an employer looking for jr's"
                    type="radio"
                    value="employer"
                    component={this.renderSwitchField} />

                { this.renderAlert() }

                <div className="form-group">
                    <button type="submit" className="btn btn-primary btn-block">Sign up</button>
                </div>
            </form>
        );
    }

    render(){
        return <div className="auth-form">{this.renderForm()}</div>
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
    connect(mapStateToProps, { signupUser, findCurrentUser })(Signup)
);
