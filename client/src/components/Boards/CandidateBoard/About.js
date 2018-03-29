import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

import { renderTextField } from '../../Fields/TextFields';

import Popover from '../../Popover';

class About extends Component{
    renderTextArea({input, placeholder, id, label}){
        return(
            <div className="form-group d-block">
                <label className="form-label" htmlFor={id}>{label}</label>
                <textarea {...input}
                    className="form-input"
                    placeholder={placeholder}
                    id={id}
                    rows="4" />
            </div>
        );
    }

    onSubmit(values){
        this.props.updateAbout(values, () => {
            this.props.notify();
            this.props.reset();
        })
    }

    renderForm(){
        const { handleSubmit } = this.props;

        return(
            <form onSubmit={ handleSubmit(this.onSubmit.bind(this)) } className="form-horizontal">
                <Field name="city"
                    label="City"
                    placeholder="Toronto"
                    id="input-city"
                    component={renderTextField} />

                <Field name="province"
                    label="Province"
                    placeholder="Ontario"
                    id="input-province"
                    component={renderTextField} />

                <Field name="portfolioUrl"
                    label="Portfolio"
                    placeholder="http://"
                    id="input-portfolio"
                    component={renderTextField} />

                <Field name="githubUrl"
                    label="Github"
                    placeholder="http://"
                    id="input-province"
                    component={renderTextField} />

                <Field name="linkedInUrl"
                    label="LinkedIn"
                    placeholder="http://"
                    id="input-linkedin"
                    component={renderTextField} />

                <Field name="summary"
                    placeholder="summary..."
                    label="Summary"
                    id="input-summary"
                    component={this.renderTextArea} />

                <Field name="careerObjective"
                    placeholder="career objective..."
                    label="Career Objective"
                    id="input-career-objective"
                    component={this.renderTextArea} />

                <button type="submit" className="btn btn-success btn-block mt8">Save</button>
            </form>
        )
    }

    render(){
        return this.renderForm();
    }
}

export default reduxForm({
    form: 'postAboutForm',
    enableReinitialize: true,
})(About);
