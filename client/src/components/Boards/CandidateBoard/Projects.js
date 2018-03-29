import React, { Component } from 'react';
// import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

// import { createProject } from '../../../actions/candidate';

import { renderTextField, renderSimpleTextareaField } from '../../Fields/TextFields';

class Projects extends Component{
    constructor(){
        super();
        this.state = {
            displayForm: false
        }
        this.handleClick = this.handleClick.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    handleClick(){
        this.setState({
            displayForm: !this.state.displayForm
        })
    }

    onSubmit(values){
        this.props.createProject(values, () => {
            this.props.notify();
            this.props.reset();
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
            return(
                <div className="holder" key={index}>
                    <div className="flex-center-between">
                        <span className="holder-title">{projects[key].projectName}</span>
                        <span className="">{`${projects[key].url}`}</span>
                    </div>
                    <div className="flex-center-between">
                        <span className="text-italic">{this.renderSkills(projects[key].skills)}</span>
                    </div>
                </div>
            )
        });
    }

    renderForm(){
        const activeClass = this.state.displayForm ? 'btn btn-success btn-block' : 'btn btn-primary btn-block'
        const { handleSubmit } = this.props;

        return(
            <form onSubmit={ handleSubmit(this.onSubmit) } className="form-horizontal">
                <div className={this.state.displayForm ? 'd-block mb8' : 'd-none'}>
                    <Field name="projectName"
                        label="Project Name"
                        placeholder="StudentValley"
                        id="input-project-name"
                        component={renderTextField} />

                    <Field name="url"
                        label="URL"
                        placeholder="http://"
                        id="input-url"
                        component={renderTextField} />

                    <Field name="skills"
                        label="Languages"
                        placeholder="PHP, JavaScript, HTML"
                        id="input-languages"
                        component={renderTextField} />

                    <Field name="description"
                        placeholder="description..."
                        component={renderSimpleTextareaField} />
                </div>
                <button type={this.state.displayForm ? "button" : "submit"}
                    className={activeClass}
                    onClick={this.handleClick}>{ !this.state.displayForm ?
                    'Add Project' : 'Save' }
                </button>
            </form>
        )
    }

    renderEmptyState(){
        return[
            <div className={this.state.displayForm ? 'd-none' : 'd-block empty mb8'} key={1}>
                <div className="empty-icon">
                    <i className="icon icon-3x icon-edit"></i>
                </div>
                <p className="empty-title h5">You haven't added any projects</p>
                <p className="empty-subtitle">Show off your live apps and websites</p>
            </div>,
            <div key={2}>
                {this.renderForm()}
            </div>
        ]
    }

    render(){
        if(!this.props.candidate || !this.props.candidate['projects'].length > 0) return this.renderEmptyState();

        return(
            <div>
                {this.renderProjects()}
                {this.renderForm()}
            </div>
        )
    }
}

export default reduxForm({
    form: 'postProjectForm'
})(Projects);
