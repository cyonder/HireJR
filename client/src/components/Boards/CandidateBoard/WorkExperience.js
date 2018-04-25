import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';

import EmptyState from '../../EmptyState';
import DashboardListItem from '../../DashboardListItem';
import WorkExperienceForm from '../../Forms/WorkExperienceForm';

class WorkExperience extends Component{
    constructor(){
        super();
        this.state = { displayForm: false }
        this.toggleForm = this.toggleForm.bind(this);
        this.onSubmitAddWorkExperience = this.onSubmitAddWorkExperience.bind(this);
        this.onSubmitEditWorkExperience = this.onSubmitEditWorkExperience.bind(this);
        this.onDelete = this.onDelete.bind(this);
    }

    toggleForm(){        
        this.setState({ displayForm: !this.state.displayForm  })
    }

    onSubmitAddWorkExperience(values){
        this.props.createWorkExperience(values, () => {
            this.props.notify();
            this.toggleForm();
        })
    }

    onSubmitEditWorkExperience(values){
        this.props.updateWorkExperience(values, () => {
            this.props.notify();            
        })
    }

    onDelete(id){
        this.props.deleteWorkExperience(id, () => {
            this.props.notify();
        })
    }
    
    renderWorkExperience(){
        const workExperience = this.props.candidate.workExperience;
        return Object.keys(workExperience).map((key, index) => {            
            let date = `${workExperience[key].startYear}-${workExperience[key].endYear}`
            return <DashboardListItem key={index} 
                {...this.props}
                title={workExperience[key].companyName} 
                subTitle={workExperience[key].title} 
                meta={date}
                summary={workExperience[key].summary}
                initialValues={workExperience[key]}
                form={workExperience[key]._id}
                onSubmit={this.onSubmitEditWorkExperience}
                onDelete={this.onDelete} />
        });
    }

    renderEmptyState(){
        const activeClass = !this.state.displayForm ? 'btn btn-primary btn-block mt8' : 'd-none'

        return[
            <EmptyState title="You haven't added any work experience"
                        subtitle="Highlight your experience"
                        icon="icon-edit"
                        shouldHide={this.state.displayForm}
                        key={1}/>,
            <div key={2}>
                <WorkExperienceForm {...this.props} 
                    form='postWorkExperienceForm'
                    onSubmit={this.onSubmitAddWorkExperience} 
                    shouldHide={!this.state.displayForm} />
                
                <button type="button" 
                    className={activeClass}
                    onClick={this.toggleForm}>Add Work Experience</button>
            </div>
        ]
    }

    render(){
        if(!this.props.candidate || !this.props.candidate['workExperience'].length > 0) return this.renderEmptyState();
        const activeClass = !this.state.displayForm ? 'btn btn-primary btn-block mt8' : 'd-none'
        
        return( 
            <div>
                { this.renderWorkExperience() }

                <WorkExperienceForm {...this.props} 
                    form='postWorkExperienceForm' 
                    onSubmit={this.onSubmitAddWorkExperience}
                    shouldHide={!this.state.displayForm} />

                <button type="button" 
                    className={activeClass}
                    onClick={this.toggleForm}>Add Work Experience</button>
            </div>
        )
    }
}

export default WorkExperience;
