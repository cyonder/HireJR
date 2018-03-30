import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';

import EmptyState from '../../EmptyState';

import { renderHorizontalTextField } from '../../Fields/TextFields';
import { renderTextAreaFieldWithLabelAndPopover } from '../../Fields/TextAreaFields';

class WorkExperience extends Component{
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
        const activeClass = this.state.displayForm ? 'btn btn-success btn-block mt8' : 'btn btn-primary btn-block mt8'
        const { handleSubmit } = this.props;

        return(
            <form onSubmit={ handleSubmit(this.onSubmit) } className="form-horizontal">
                <div className={this.state.displayForm ? 'd-block mb8' : 'd-none'}>
                    <Field name="companyName"
                        type="text"
                        label="Company Name"
                        placeholder="Apple inc."
                        id="input-company-name"
                        component={renderHorizontalTextField} />

                    <Field name="title"
                        type="text"
                        label="Title"
                        placeholder="Marketing Specialist"
                        id="input-title"
                        component={renderHorizontalTextField} />

                    <Field name="startYear"
                        type="text"
                        label="Start Year"
                        placeholder=""
                        id="input-start-year"
                        component={renderHorizontalTextField} />

                    <Field name="endYear"
                        type="text"
                        label="End Year"
                        placeholder="Blank if current"
                        id="input-end-year"
                        component={renderHorizontalTextField} />

                    <Field name="summary"
                        rows="4"
                        label="Summary"
                        placeholder="Summary..."
                        id="input-summary"
                        component={renderTextAreaFieldWithLabelAndPopover} />
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
            <EmptyState title="You haven't added any work experience"
                        subtitle="Highlight your experience"
                        icon="icon-edit"
                        shouldHide={this.state.displayForm ? true : false}
                        key={1}/>,
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
