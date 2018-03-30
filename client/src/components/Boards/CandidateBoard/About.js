import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';

import { renderHorizontalTextField } from '../../Fields/TextFields';
import { renderTextAreaFieldWithLabelAndPopover } from '../../Fields/TextAreaFields';

class About extends Component{
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
                    type="text"
                    label="City"
                    placeholder="Toronto"
                    id="input-city"
                    component={renderHorizontalTextField} />

                <Field name="province"
                    type="text"
                    label="Province"
                    placeholder="Ontario"
                    id="input-province"
                    component={renderHorizontalTextField} />

                <Field name="portfolioUrl"
                    type="text"
                    label="Portfolio"
                    placeholder="http://"
                    id="input-portfolio"
                    component={renderHorizontalTextField} />

                <Field name="githubUrl"
                    type="text"
                    label="Github"
                    placeholder="http://"
                    id="input-github"
                    component={renderHorizontalTextField} />

                <Field name="linkedInUrl"
                    type="text"
                    label="LinkedIn"
                    placeholder="http://"
                    id="input-linkedin"
                    component={renderHorizontalTextField} />

                <Field name="summary"
                    rows="4"
                    label="Summary"
                    placeholder="summary..."
                    popover="Summary provides a brief, focused overview of what your specialties are as an employee, and serves as an introduction to the rest of your resume."
                    id="input-summary"
                    component={renderTextAreaFieldWithLabelAndPopover} />

                <Field name="careerObjective"
                    rows="4"
                    label="Career Objective"
                    placeholder="career objective..."
                    popover="Career objective is helpful if you’re not applying to a specific job posting, but instead are sending out unsolicited applications to potential employers."
                    id="input-career-objective"
                    component={renderTextAreaFieldWithLabelAndPopover} />

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
