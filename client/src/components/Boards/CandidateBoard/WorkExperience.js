import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

import { renderTextField, renderSimpleTextareaField } from '../../Fields/TextFields';

class WorkExperience extends Component{
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
        this.props.createWorkExperience(values, () => {
            this.props.notify();
            this.props.reset();
        })
    }

    renderWorkExperience(){
        const workExperience = this.props.candidate.workExperience;
        return Object.keys(workExperience).map((key, index) => {
            return(
                <div className="holder" key={index}>
                    <div className="flex-center-between">
                        <span className="holder-title">{workExperience[key].companyName}</span>
                        <span className="">{`${workExperience[key].startYear}-${workExperience[key].endYear}`}</span>
                    </div>
                    <div className="flex-center-between">
                        <span className="text-italic">{workExperience[key].title}</span>
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
                    <Field name="companyName"
                        label="Company Name"
                        placeholder="Apple inc."
                        id="input-company-name"
                        component={renderTextField} />

                    <Field name="title"
                        label="Title"
                        placeholder="Marketing Specialist"
                        id="input-title"
                        component={renderTextField} />

                    <Field name="startYear"
                        label="Start Year"
                        placeholder=""
                        id="input-start-year"
                        component={renderTextField} />

                    <Field name="endYear"
                        label="End Year"
                        placeholder="Blank if current"
                        id="input-end-year"
                        component={renderTextField} />

                    <Field name="summary"
                        placeholder="Summary..."
                        component={renderSimpleTextareaField} />
                </div>
                <button type={this.state.displayForm ? "button" : "submit"}
                    className={activeClass}
                    onClick={this.handleClick}>{ !this.state.displayForm ?
                    'Add Work Experience' : 'Save' }
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
                <p className="empty-title h5">You haven't added any work experience</p>
                <p className="empty-subtitle">Highlight your experience</p>
            </div>,
            <div key={2}>
                {this.renderForm()}
            </div>
        ]
    }

    render(){
        if(!this.props.candidate || !this.props.candidate['workExperience'].length > 0) return this.renderEmptyState();

        return(
            <div>
                {this.renderWorkExperience()}
                {this.renderForm()}
            </div>
        )
    }
}

export default reduxForm({
    form: 'postWorkExperienceForm'
})(WorkExperience);
