import React, { Component } from 'react';
import { Field, FormSection, reduxForm } from 'redux-form';
import { connect } from 'react-redux';

import RequireSignout from './HOC/RequireSignout';
import Card from './Card';

import signupValidation from '../validations/signupValidation';

import { signupUser } from '../actions/authentication';
import { findCurrentUser } from '../actions/user';

import { renderHorizontalTextField } from './Fields/TextFields';
import { renderSwitchField } from './Fields/ControlFields';

const formSectionStyle = { flexDirection: 'column' }

class Signup extends Component{
    constructor(){
        super();
        this.onSubmit = this.onSubmit.bind(this);
        this.handleToggle = this.handleToggle.bind(this);
        this.state = {
            displayEmployerSection: false
        }
    };

    renderAlert(){
        if(this.props.errorMessage){
            return(
                <div className="auth-error-message">{ this.props.errorMessage }</div>
            );
        }
    }

    handleToggle(value){
        this.setState({ displayEmployerSection: value })
    }

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
                    component={renderHorizontalTextField} />

                <Field name="lastName"
                    label="Last Name"
                    placeholder="Yonder"
                    id="signup-lastname"
                    type="text"
                    component={renderHorizontalTextField} />

                <Field name="email"
                    label="Email"
                    placeholder="cagdasyonder@gmail.com"
                    id="signup-email"
                    type="text"
                    component={renderHorizontalTextField} />

                <Field name="password"
                    label="Password"
                    placeholder="Min. length 8 character"
                    id="signup-password"
                    type="password"
                    component={renderHorizontalTextField} />

                <Field name="passwordConfirmation"
                    label="Confirmation"
                    placeholder="Re-type your password"
                    id="signup-password-confirmation"
                    type="password"
                    component={renderHorizontalTextField} />

                <Field name="role"
                    type="radio"
                    label="I'm a jr developer"
                    value="candidate"
                    onChange={() => this.handleToggle(false)}
                    component={renderSwitchField} />

                <Field name="role"
                    type="radio"
                    label="I'm an employer looking for jr's"
                    value="employer"
                    onChange={() => this.handleToggle(true)}
                    component={renderSwitchField} />

                { this.state.displayEmployerSection ?
                <FormSection name="employer" className="form-group" style={formSectionStyle}>
                    <div className="divider" data-content="EMPLOYER"></div>

                    <Field name="companyName"
                        label="Company Name"
                        placeholder="Your company name"
                        id="signup-company-name"
                        type="text"
                        component={renderHorizontalTextField} />

                    <Field name="companyWebsite"
                        label="Company Website"
                        placeholder="http://"
                        id="signup-company-website"
                        type="text"
                        component={renderHorizontalTextField} />
                </FormSection> : null }

                { this.renderAlert() }

                <div className="form-group">
                    <button type="submit" className="btn btn-primary btn-block">Sign up</button>
                </div>
            </form>
        );
    }

    render(){
        return <Card title="Create Account">{this.renderForm()}</Card>
    }
}

const mapStateToProps = state => {
    return{
        errorMessage: state.authentication.signupError
    };
};

export default reduxForm({
    form: 'signupForm',
    validate: (values) => signupValidation(values)
})(
    connect(mapStateToProps, { signupUser, findCurrentUser })(
        // RequireSignout(Signup)
        Signup
    )
);
