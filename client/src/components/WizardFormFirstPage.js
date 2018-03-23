import React, { Component } from 'react';
import { Field, Fields, reduxForm } from 'redux-form';
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
            ],
            applyOptions: [
                { 'value': 'internal', 'label': 'Hire jr (we\'ll notify you via email)'},
                { 'value': 'external', 'label': 'Separate Website'},
            ],
            displayInternal: false,
            displayExternal: false,
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleQuestionTypeChange = this.handleQuestionTypeChange.bind(this);
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

    renderTextField({ input, meta, label, id, placeholder, shouldHide }){
        if(shouldHide === false) return false;
        return(
            <div className={meta.error && meta.touched ? 'form-group has-error' : 'form-group'}>
                <div className="col-3 col-sm-12">
                    <label className="form-label" htmlFor={id}>{label}</label>
                </div>
                <div className="col-9 col-sm-12">
                    <input {...input}
                        type="text"
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

    renderInputGroupField(fields){
        return(
            <div className="form-group d-block">
                <div className="form-group input-group">
                    <select id="lang" className="form-select">
                        <option value="multiple-choice">Multiple-Choice</option>
                        <option value="open-ended">Open-Ended</option>
                    </select>
                    <input {...fields[fields.names[0]].input}
                        type="text"
                        className="form-input"
                        placeholder="What is the difference between a class and an object?"/>
                </div>
                <div className="form-group">
                    <input {...fields[fields.names[1]].input}
                        type="text"
                        className="form-input"
                        placeholder="Comma-separated answer choices" />
                </div>
            </div>
        );
    }

    handleQuestionTypeChange(e){
        console.log(e);
    }

    handleChange(e){
        if(e.target.value === 'internal'){
            this.setState({
                displayInternal: true,
                displayExternal: false
            })
        }else if(e.target.value === 'external'){
            this.setState({
                displayInternal: false,
                displayExternal: true
            })
        }else{
            this.setState({
                displayInternal: false,
                displayExternal: false
            })
        }
    }

    renderForm(){
        const { handleSubmit } = this.props;

        return(
            <form onSubmit={handleSubmit} className="form-horizontal">
                <div className="card no-bg">
                    <div className="card-header">
                        <div className="card-title h5">Create a Job Post</div>
                        <div className="card-subtitle text-gray">
                            We offer and promote opportunities for
                            Junior and Entry-Level Developers
                        </div>
                    </div>
                    <div className="card-body">
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
                    </div>
                </div>
                <div className="card no-bg">
                    <div className="card-header">
                        <div className="card-title h5">How to Apply?</div>
                        <div className="card-subtitle text-gray">
                            You have two options when it comes to accepting job applications.
                            Either through hirejr or a separate website.
                        </div>
                    </div>
                    <div className="card-body">
                        <Field name="applyThrough"
                            onChange={ (e) => this.handleChange(e) }
                            label="Apply Through"
                            defaultOption="Choose an applicant option"
                            id="input-province"
                            component={this.renderSelectField}>
                            { this.state.applyOptions.map(options =>
                                <option key={options.value} value={options.value}>
                                    {options.label}
                                </option>
                            )}
                        </Field>

                        <Field name="internal"
                            label="Where to Email?"
                            placeholder="your@email.com"
                            id="input-internal"
                            shouldHide={this.state.displayInternal}
                            component={this.renderTextField} />

                        <Field name="external"
                            label="Where to Re-direct?"
                            placeholder="http://"
                            id="input-external"
                            shouldHide={this.state.displayExternal}
                            component={this.renderTextField} />
                    </div>
                </div>

                { this.state.displayInternal ? this.renderQuestionSection() : false }

                <button type="submit" className="btn btn-primary float-right">Next</button>
            </form>
        );
    }

    renderQuestionSection(){
        return(
            <div className="card no-bg">
                <div className="card-header">
                    <div className="card-title h5">Custom Questions</div>
                    <div className="card-subtitle text-gray">
                        Ask candidates to answer up to three questions when submitting
                        an application through Hire jr.
                    </div>
                </div>
                <div className="card-body">
                    <Fields names={['question1', 'choices1']}
                        component={this.renderInputGroupField} />
                    <Fields names={['question2', 'choices2']}
                        component={this.renderInputGroupField} />
                    <Fields names={['question3', 'choices3']}
                        component={this.renderInputGroupField} />
                </div>
            </div>
        );
    }

    render(){
        return(
            this.renderForm()
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
