import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';

import EducationForm from './Forms/EducationForm';
import WorkExperienceForm from './Forms/WorkExperienceForm';
import ProjectForm from './Forms/ProjectForm';

class DashboardListItem extends Component{
    constructor(){
        super();
        this.state = { displayForm: false }
        this.toggleForm = this.toggleForm.bind(this);
    }

    toggleForm(){
        this.setState({ displayForm: !this.state.displayForm })
    }

    renderButtons(){    
        const id = this.props.initialValues._id;
        
        return(
            <div className="btn-group btn-group-block list-item-buttons">
                <button className={this.state.displayForm ? 'btn btn-primary' : 'btn btn-warning' } 
                    onClick={this.toggleForm}>{this.state.displayForm ? 'Cancel' : 'Edit'}</button>
                    
                <button className={this.state.displayForm ? 'd-none' : 'btn btn-error' } 
                    onClick={() => {
                        let confirmed = window.confirm('Are you sure you want to delete this?')
                        if(confirmed){this.props.onDelete(id)}
                    }}>Delete</button>
            </div>
        )
    }

    renderListItem(header, body){
        return(
            <div className={this.state.displayForm ? 'd-none' : '' }>
                { this.renderListItemHeader(header) }
                { body.summary ? this.renderListItemBody(body) : null }
            </div>
        )
    }

    renderListItemHeader({ title, subTitle, meta, subMeta }){
        return(
            <div className="dashboard-list-item-header">
                <div className="flex-center-between">
                    <span className="holder-title">{title}</span>
                    <span>{meta}</span>
                </div>
                <div className="flex-center-between">
                    <span className="text-italic">{subTitle}</span>
                    <span>{subMeta}</span>
                </div>
            </div>
        )
    }
    
    renderListItemBody({ summary, skills }){
        let newSummary = summary.replace(/[*]/g, '<i class="text-primary far fa-dot-circle mr4"></i>');
    
        return(
            <div className="dashboard-list-item-body">
                <div className="job-post-description mt4" dangerouslySetInnerHTML={{ __html: newSummary }}/>
                { skills ? <div className="mt4">{skills}</div> : null }
            </div>
        )
    }

    renderForm(){
        const { onSubmit } = this.props;
        const { pathname } = this.props.location;
        
        if(this.state.displayForm){
            switch(pathname){
                case '/dashboard/education':
                    return <EducationForm {...this.props} onSubmit={onSubmit} />
                case '/dashboard/experience':
                    return <WorkExperienceForm {...this.props} onSubmit={onSubmit} />
                case '/dashboard/projects':
                    return <ProjectForm {...this.props} onSubmit={onSubmit} />
                default:
                    return null
            }
        }else{
            return null
        }
    }

    render(){
        const { title, subTitle, meta, subMeta, summary, skills } = this.props;
        const header = { title, subTitle, meta, subMeta };
        const body = { summary, skills };
        
        return(
            <div className="holder">
                { this.renderButtons() }
                { this.renderListItem(header, body) }
                { this.renderForm() }
            </div>
        )
    }
}

export default DashboardListItem;