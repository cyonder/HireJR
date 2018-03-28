import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

import { createEducation } from '../../../actions/candidate';

import { renderTextField } from '../../Fields/TextFields';

class Education extends Component{
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
        this.props.createEducation(values, () => {
            this.props.reset();
        })
    }

    renderEducation(){
        const education = this.props.candidate.education;
        return Object.keys(education).map((key, index) => {
            return(
                <div className="holder" key={key}>
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
        const activeClass = this.state.displayForm ? 'btn btn-success btn-block' : 'btn btn-primary btn-block'
        const { handleSubmit } = this.props;

        return(
            <form onSubmit={ handleSubmit(this.onSubmit) } className="form-horizontal">
                <div className={this.state.displayForm ? 'd-block mb8' : 'd-none'}>
                    <Field name="schoolName"
                        label="School Name"
                        placeholder="Seneca College"
                        id="input-school-name"
                        component={renderTextField} />

                    <Field name="degree"
                        label="Degree"
                        placeholder="Bachelors"
                        id="input-degree"
                        component={renderTextField} />

                    <Field name="field"
                        label="Field of Study"
                        placeholder="Programming"
                        id="input-field"
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
            <div className={this.state.displayForm ? 'd-none' : 'd-block empty'} key={1}>
                <div className="empty-icon">
                    <i className="icon icon-3x icon-edit"></i>
                </div>
                <p className="empty-title h5">You haven't added any education</p>
                <p className="empty-subtitle">Show off your degrees and certifications</p>
            </div>,
            this.renderForm()
        ]
    }

    render(){
        const { candidate } = this.props;

        if(!candidate || !candidate.education) return this.renderEmptyState();

        return(
            <div>
                {this.renderEducation()}
                {this.renderForm()}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return{
        candidate: state.user.candidate
    };
}

export default reduxForm({
    form: 'postEducationForm',
})(
    connect(mapStateToProps, {createEducation})(Education)
);
