import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';

import { signinUser } from '../actions/authentication';

let checkboxStyle = { paddingRight: 0 }

class Signin extends Component{
    constructor(){
        super();
        this.onSubmit = this.onSubmit.bind(this);
    }

    renderAlert(){
        if(this.props.errorMessage){
            return(
                <span>{ this.props.errorMessage }</span>
            );
        }
    }

    renderTextField({ input, meta, label, id, type }){
        return(
            <div className="form-group">
                <label className="form-label" htmlFor={id}>{label}</label>
                <input {...input} className="form-input" type={type} id={id} />
            </div>
        );
    }

    renderCheckboxField({ input, label, type }){
        return(
            <label className="form-checkbox" style={checkboxStyle}>
                <input {...input}
                    type={type} />
                <i className="form-icon"></i> {label}
            </label>
        );
    }

    onSubmit({ loginID, loginPassword, rememberMe}){
        const { pathname } = this.props.location;

        this.props.signinUser({
                email: loginID,
                password: loginPassword,
                rememberMe: rememberMe
            }, () => {
                if(pathname === '/jobs/new'){
                    this.props.setPage(3);
                }else{
                    this.props.history.push('/dashboard');
                }
            });
    }

    renderForm(){
        const { handleSubmit } = this.props;

        return(
            <form onSubmit={handleSubmit(this.onSubmit)}>
                <Field name="loginID"
                    label="Email"
                    id="signin-email"
                    type="text"
                    component={this.renderTextField}/>

                <Field name="loginPassword"
                    label="Password"
                    id="signin-password"
                    type="password"
                    component={this.renderTextField}/>

                { this.renderAlert() }

                <div className="flex-center-between">
                    <button type="submit" className="btn btn-primary">Sign in</button>
                    <Field name="rememberMe"
                        label="Remember me"
                        type="checkbox"
                        component={this.renderCheckboxField} />

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
        errorMessage: state.authentication.signinError
    }
}

export default reduxForm({
    form: 'signinForm'
})(
    connect(mapStateToProps, { signinUser })(Signin)
);
