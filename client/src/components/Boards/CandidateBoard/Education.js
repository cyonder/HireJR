import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';

import EmptyState from '../../EmptyState';

import { renderHorizontalTextField } from '../../Fields/TextFields';

class Education extends Component{
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
        this.props.createEducation(values, () => {
            this.props.notify();
            this.props.reset();
        })
    }

    renderEducation(){
        const education = this.props.candidate.education;
        return Object.keys(education).map((key, index) => {
            return(
                <div className="holder" key={index}>
                    <div className="flex-center-between">
                        <span className="holder-title">{education[key].schoolName}</span>
                        <span className="">{`${education[key].startYear}-${education[key].endYear}`}</span>
                    </div>
                    <div className="flex-center-between">
                        <span className="text-italic">{education[key].field}</span>
                        <span>{education[key].degree}</span>
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
                    <Field name="schoolName"
                        type="text"
                        label="School Name"
                        placeholder="Seneca College"
                        id="input-school-name"
                        component={renderHorizontalTextField} />

                    <Field name="degree"
                        type="text"
                        label="Degree"
                        placeholder="Bachelors"
                        id="input-degree"
                        component={renderHorizontalTextField} />

                    <Field name="field"
                        type="text"
                        label="Field of Study"
                        placeholder="Programming"
                        id="input-field"
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
                </div>

                <button type={this.state.displayForm ? "button" : "submit"}
                    className={activeClass}
                    onClick={this.handleClick}>{ !this.state.displayForm ?
                    'Add Education' : 'Save' }
                </button>
            </form>
        )
    }

    renderEmptyState(){
        return[
            <EmptyState title="You haven't added any education"
                        subtitle="Show off your degrees and certifications"
                        icon="icon-edit"
                        shouldHide={this.state.displayForm ? true : false}
                        key={1}/>,
            <div key={2}>
                {this.renderForm()}
            </div>
        ]
    }
    
    render(){
        if(!this.props.candidate || !this.props.candidate['education'].length > 0) return this.renderEmptyState();

        return(
            <div>
                {this.renderEducation()}
                {this.renderForm()}
            </div>
        )
    }
}

export default reduxForm({
    form: 'postEducationForm'
})(Education);
