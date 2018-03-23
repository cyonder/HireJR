import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';

import { signinUser } from '../actions/authentication';

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

    onSubmit({ loginID, loginPassword}){
        const { pathname } = this.props.location;

        this.props.signinUser({ email: loginID, password: loginPassword }, () => {
            if(pathname === '/jobs/new'){
                this.props.history.push('/jobs/new/confirmation');
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

                <div className="fcs">
                    <button type="submit" className="btn btn-primary">Sign in</button>
                    <label className="form-checkbox remember-me">
                        <input type="checkbox" name="remember-me"/>
                        <i className="form-icon"></i> Remember me
                    </label>
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
