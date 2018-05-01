import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';

import EmptyState from '../../EmptyState';
import DashboardListItem from '../../DashboardListItem';
import ProjectForm from '../../Forms/ProjectForm';

class Projects extends Component{
    constructor(){
        super();
        this.state = { displayForm: false }
        this.toggleForm = this.toggleForm.bind(this);
        this.onSubmitAddProject = this.onSubmitAddProject.bind(this);
        this.onSubmitEditProject = this.onSubmitEditProject.bind(this);
        this.onDelete = this.onDelete.bind(this);
    }

    toggleForm(){
        this.setState({ displayForm: !this.state.displayForm })
    }

    onSubmitAddProject(values){
        this.props.createProject(values, () => {
            this.props.notify("Saved successfully!");
            this.toggleForm();
        })
    }

    onSubmitEditProject(values){       
        this.props.updateProject(values, () => {
            this.props.notify("Updated successfully!");
        })
    }

    onDelete(id){
        this.props.deleteProject(id, () => {
            this.props.notify("Deleted successfully!");
        })
    }
    
    renderSkills(skills){
        return skills.map((skill, index) => {
            return <span className="chip" key={index}>{skill}</span>
        });
    }

    renderProjects(){
        const projects = this.props.candidate.projects;
        return Object.keys(projects).map((key, index) => {
            return <DashboardListItem key={index}
                {...this.props}
                title={projects[key].projectName} 
                meta={projects[key].url}
                skills={this.renderSkills(projects[key].skills)}
                summary={projects[key].summary}
                initialValues={projects[key]}
                form={projects[key]._id} 
                onSubmit={this.onSubmitEditProject}
                onDelete={this.onDelete} />
        });
    }

    renderEmptyState(){
        const activeClass = !this.state.displayForm ? 'btn btn-primary btn-block mt8' : 'd-none'

        return[
            <EmptyState title="You haven't added any projects"
                        subtitle="Show off your live apps and websites"
                        icon="icon-edit"
                        shouldHide={this.state.displayForm}
                        key={1}/>,
            <div key={2}>
                <ProjectForm {...this.props} 
                    form='postProjectForm'
                    onSubmit={this.onSubmitAddProject} 
                    shouldHide={!this.state.displayForm} />
                
                <button type="button" 
                    className={activeClass}
                    onClick={this.toggleForm}>Add Project</button>
            </div>
        ]
    }

    render(){
        if(!this.props.candidate || !this.props.candidate['projects'].length > 0) return this.renderEmptyState();
        const activeClass = !this.state.displayForm ? 'btn btn-primary btn-block mt8' : 'd-none'
        
        return( 
            <div>
                { this.renderProjects() }

                <ProjectForm {...this.props} 
                    form='postProjectForm' 
                    onSubmit={this.onSubmitAddProject}
                    shouldHide={!this.state.displayForm} />

                <button type="button" 
                    className={activeClass}
                    onClick={this.toggleForm}>Add Project</button>
            </div>
        )
    }
}

export default Projects;
