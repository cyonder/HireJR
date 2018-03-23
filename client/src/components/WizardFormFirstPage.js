import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';

const validate = values => {
    const errors = {};

    if(!values.position){
        errors.position = 'Required';
    }
    if(!values.companyName){
        errors.companyName = 'Required';
    }
    if(!values.companyWebsite){
        errors.companyWebsite = 'Required';
    }
    if(!values.city){
        errors.city = 'Required';
    }
    if(!values.province || values.province === 'default'){
        errors.province = 'Required';
    }
    if(!values.schedule || values.schedule === 'default'){
        errors.schedule = 'Required';
    }
    if(!values.skills){
        errors.skills = 'Required';
    }

    return errors;
};

class WizardFormFirstPage extends Component{
    constructor(){
        super();
        this.state = {
            provinces:[
                { 'short':'AB', 'name':'Alberta' },
                { 'short':'BC', 'name':'British Columbia' },
                { 'short':'MB', 'name':'Manitoba' },
                { 'short':'NB', 'name':'New Brunswick' },
                { 'short':'NL', 'name':'Newfoundland and Labrador' },
                { 'short':'NS', 'name':'Nova Scotia' },
                { 'short':'NU', 'name':'Nunavut' },
                { 'short':'NT', 'name':'Northwest Territories' },
                { 'short':'ON', 'name':'Ontario' },
                { 'short':'PE', 'name':'Prince Edward Island' },
                { 'short':'QC', 'name':'Quebec' },
                { 'short':'SK', 'name':'Saskatchewan' },
                { 'short':'YT', 'name':'Yukon '}
            ],
            schedules: [
                { 'type':'Full Time' },
                { 'type':'Part Time' },
                { 'type':'Intern' },
                { 'type':'Contract' },
                { 'type':'N/A' },
            ]
        }
    };

    renderSelectField({ input, meta, label, id, defaultOption, children }){
        return(
            <div className={meta.error && meta.touched ? 'form-group has-error' : 'form-group'}>
                <div className="col-3 col-sm-12">
                    <label className="form-label" htmlFor={id}>{label}</label>
                </div>
                <div className="col-9 col-sm-12">
                    <select {...input} className="form-select" id={id}>
                        <option value="default">{defaultOption}</option>
                        {children}
                    </select>
                    {meta.error && meta.touched &&
                        <p className="form-input-hint">{meta.error}</p>
                    }
                </div>
            </div>
        );
    }

    renderTextField({ input, meta, label, id, placeholder }){
        return(
            <div className={meta.error && meta.touched ? 'form-group has-error' : 'form-group'}>
                <div className="col-3 col-sm-12">
                    <label className="form-label" htmlFor={id}>{label}</label>
                </div>
                <div className="col-9 col-sm-12">
                    <input {...input}
                        className="form-input"
                        placeholder={placeholder}
                        id={id}/>
                    {meta.error && meta.touched &&
                        <p className="form-input-hint">{meta.error}</p>
                    }
                </div>
            </div>
        );
    }

    renderForm(){
        const { handleSubmit } = this.props;

        return(
            <form onSubmit={handleSubmit} className="form-horizontal">
                <Field name="position"
                    label="Position"
                    placeholder="Jr. Rails Developer"
                    id="input-position"
                    component={this.renderTextField} />

                <Field name="companyName"
                    label="Company Name"
                    placeholder="Apple Inc."
                    id="input-company-name"
                    component={this.renderTextField} />

                <Field name="companyWebsite"
                    label="Company Website"
                    placeholder="www.apple.com"
                    id="input-company-website"
                    component={this.renderTextField} />

                <Field name="city"
                    label="City"
                    placeholder="Toronto"
                    id="input-city"
                    component={this.renderTextField} />

                <Field name="province"
                    label="Province"
                    defaultOption="Choose a province"
                    id="input-province"
                    component={this.renderSelectField}>
                    { this.state.provinces.map(province =>
                        <option key={province.short} value={province.name}>
                            {province.name}
                        </option>
                    )}
                </Field>

                <Field name="schedule"
                    label="Schedule"
                    defaultOption="Choose a schedule"
                    id="input-schedule"
                    component={this.renderSelectField}>
                    { this.state.schedules.map(schedule =>
                        <option key={schedule.type} value={schedule.type}>
                            {schedule.type}
                        </option>
                    )}
                </Field>

                <Field name="skills"
                    label="Skills"
                    placeholder="HTML, CSS, JavaScript, React JS, Ruby on Rails, etc."
                    id="input-skills"
                    component={this.renderTextField} />

                <button type="submit" className="btn btn-primary float-right">Next</button>
            </form>
        );
    }

    render(){
        return(
            <div className="card no-bg">
                <div className="card-header">
                    <div className="card-title h5">Create a Job Post</div>
                    <div className="card-subtitle text-gray">
                        We offer and promote opportunities for
                        Junior and Entry-Level Developers
                    </div>
                </div>
                <div className="card-body">
                    { this.renderForm() }
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return{};
}

export default reduxForm({
    form: 'wizardForm',
    destroyOnUnmount: false,
    // validate
})(
    connect(mapStateToProps)(WizardFormFirstPage)
);
