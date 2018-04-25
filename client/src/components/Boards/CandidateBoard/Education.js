import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';

import EmptyState from '../../EmptyState';
import DashboardListItem from '../../DashboardListItem';
import EducationForm from '../../Forms/EducationForm';

class Education extends Component{
    constructor(){
        super();
        this.state = { displayForm: false }
        this.toggleForm = this.toggleForm.bind(this);
        this.onSubmitAddEducation = this.onSubmitAddEducation.bind(this);
        this.onSubmitEditEducation = this.onSubmitEditEducation.bind(this);
        this.onDelete = this.onDelete.bind(this);
    }

    toggleForm(){
        this.setState({ displayForm: !this.state.displayForm })
    }

    onSubmitAddEducation(values){
        this.props.createEducation(values, () => {
            this.props.notify();
            this.toggleForm();
        })
    }

    onSubmitEditEducation(values){
        this.props.updateEducation(values, () => {
            this.props.notify();            
        })
    }

    onDelete(id){
        this.props.deleteEducation(id, () => {
            this.props.notify();
        })
    }
    
    renderEducation(){
        const education = this.props.candidate.education;
        return Object.keys(education).map((key, index) => {
            let date = `${education[key].startYear}-${education[key].endYear}`
            return <DashboardListItem key={index}
                {...this.props}
                title={education[key].schoolName} 
                subTitle={education[key].field}
                meta={date}
                subMeta={education[key].degree}
                initialValues={education[key]}
                form={education[key]._id}
                onSubmit={this.onSubmitEditEducation}
                onDelete={this.onDelete} />
        });
    }

    renderEmptyState(){
        const activeClass = !this.state.displayForm ? 'btn btn-primary btn-block mt8' : 'd-none'

        return[
            <EmptyState title="You haven't added any education"
                        subtitle="Show off your degrees and certifications"
                        icon="icon-edit"
                        shouldHide={this.state.displayForm}
                        key={1}/>,
            <div key={2}>
                <EducationForm {...this.props} 
                    form='postEducationForm'
                    shouldHide={!this.state.displayForm}
                    onSubmit={this.onSubmitAddEducation} />

                <button type="button" 
                    className={activeClass}
                    onClick={this.toggleForm}>Add Education</button>
            </div>
        ]
    }
    
    render(){
        if(!this.props.candidate || !this.props.candidate['education'].length > 0) return this.renderEmptyState();
        const activeClass = !this.state.displayForm ? 'btn btn-primary btn-block mt8' : 'd-none'

        return( 
            <div>
                { this.renderEducation() }

                <EducationForm {...this.props} 
                    form="postEducationForm" 
                    shouldHide={!this.state.displayForm}
                    onSubmit={this.onSubmitAddEducation} />

                <button type="button" 
                    className={activeClass}
                    onClick={this.toggleForm}>Add Education</button>
            </div>
        )
    }
}

export default Education;