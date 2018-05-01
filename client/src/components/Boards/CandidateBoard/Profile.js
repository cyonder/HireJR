import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';



import CandidateProfileForm from '../../Forms/CandidateProfileForm';

class About extends Component{
    onSubmit(values){
        this.props.updateCandidateProfile(values, () => {
            this.props.notify("Profile saved successfully!");
        })
    }

    renderForm(){
        const { handleSubmit } = this.props;
        
        return <CandidateProfileForm {...this.props}
                    form='postCandidateProfileForm'
                    onSubmit={this.onSubmit.bind(this)} />
    }

    render(){
        return this.renderForm();
    }
}

export default About;
