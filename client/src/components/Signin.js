import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';

import Card from './Card';

import { renderTextFieldWithLabel } from './Fields/TextFields';
import { renderCheckField } from './Fields/ControlFields';

import { signinUser } from '../actions/authentication';
import { findCurrentUser } from '../actions/user';

class Signin extends Component{
    constructor(){
        super();
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit({ loginID, loginPassword, rememberMe}){
        const { pathname } = this.props.location;

        this.props.signinUser({ email: loginID, password: loginPassword, rememberMe: rememberMe },
            () => {
                this.props.findCurrentUser();
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
                    type="text"
                    label="Email"
                    id="signin-email"
                    component={renderTextFieldWithLabel}/>

                <Field name="loginPassword"
                    type="password"
                    label="Password"
                    id="signin-password"
                    component={renderTextFieldWithLabel}/>

                <div className="flex-center-between">
                    <button type="submit" className="btn btn-primary">Sign in</button>
                    <Field name="rememberMe"
                        type="checkbox"
                        label="Remember me"
                        component={renderCheckField} />
                </div>
            </form>
        );
    }

    render(){
        return <Card>{this.renderForm()}</Card>
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
    connect(mapStateToProps, { signinUser, findCurrentUser })(Signin)
);
