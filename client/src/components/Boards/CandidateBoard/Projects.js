import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';

import EmptyState from '../../EmptyState';

import { renderHorizontalTextField } from '../../Fields/TextFields';
import { renderTextAreaFieldWithLabelAndPopover } from '../../Fields/TextAreaFields';

class Projects extends Component{
    constructor(){
        super();
        this.state = { displayForm: false }
        
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
        const activeClass = this.state.displayForm ? 'btn btn-success btn-block mt8' : 'btn btn-primary btn-block mt8'
        const { handleSubmit } = this.props;

        return(
            <form onSubmit={ handleSubmit(this.onSubmit) } className="form-horizontal">
                <div className={this.state.displayForm ? 'd-block mb8' : 'd-none'}>
                    <Field name="projectName"
                        type="text"
                        label="Project Name"
                        placeholder="StudentValley"
                        id="input-project-name"
                        component={renderHorizontalTextField} />

                    <Field name="url"
                        type="text"
                        label="URL"
                        placeholder="http://"
                        id="input-url"
                        component={renderHorizontalTextField} />

                    <Field name="skills"
                        type="text"
                        label="Languages"
                        placeholder="PHP, JavaScript, HTML"
                        id="input-languages"
                        component={renderHorizontalTextField} />

                    <Field name="description"
                        rows="4"
                        label="Description"
                        placeholder="description..."
                        id="input-description"
                        component={renderTextAreaFieldWithLabelAndPopover} />
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
            <EmptyState title="You haven't added any projects"
                        subtitle="Show off your live apps and websites"
                        icon="icon-edit"
                        shouldHide={this.state.displayForm ? true : false}
                        key={1}/>,
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
