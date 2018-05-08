import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';

import RequireAuthentication from './HOC/RequireAuthentication';

import Loading from './Loading';
import Card from './Card';
import PasswordForm from './Forms/PasswordForm';
import AccountSettingsForm from './Forms/AccountSettingsForm';
import EmployerSettingsForm from './Forms/EmployerSettingsForm';

import { 
    updateUser, 
    updateEmployer,
    updateUserPassword 
} from '../actions/user';

class Settings extends Component{
    onSubmitUpdateAccount(values){
        this.props.updateUser(values, () => {
            toast.success('Account updated successfully!');
        })
    }

    onSubmitUpdateEmployer(values){
        this.props.updateEmployer(values, () => {
            toast.success('Employer updated successfully!');
        })
    }

    onSubmitUpdatePassword(values){
        this.props.updateUserPassword(values, () => {
            toast.success('Password updated successfully!');
        })
    }

    render(){
        return(
            <div className="settings">
                <Card title="Account">
                    <AccountSettingsForm {...this.props} 
                        form="accountSettingsForm"
                        hideUsername={true}
                        initialValues={this.props.user}
                        onSubmit={this.onSubmitUpdateAccount.bind(this)} />
                </Card>
                {
                    this.props.user.role === 'employer' ? 
                    <Card title="Employer">
                        <EmployerSettingsForm {...this.props} 
                            form="employerSettingsForm"
                            initialValues={this.props.user.employer}
                            onSubmit={this.onSubmitUpdateEmployer.bind(this)} />
                    </Card> : null
                }
                <Card title="Update Password">
                    <PasswordForm {...this.props} 
                        form="passwordForm"
                        onSubmit={this.onSubmitUpdatePassword.bind(this)} />
                </Card>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps, 
    { updateUser, updateEmployer, updateUserPassword })
    (RequireAuthentication(Settings));