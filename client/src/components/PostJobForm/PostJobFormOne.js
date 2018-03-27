import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';

import Details from './PostJobFormSections/Details';
import ApplyThrough from './PostJobFormSections/ApplyThrough';
import Questions from './PostJobFormSections/Questions';

import jobPostFormValidation from '../../validations/jobPostFormValidation';

class PostJobFormOne extends Component{
    constructor(){
        super();
        this.state = {
            formSections: [
                { 'title': 'Create a Job Post', 'subtitle': 'We offer and promote opportunities for Junior and Entry-Level Developers' },
                { 'title': 'How to Apply?', 'subtitle': 'You have two options when it comes to accepting job applications. Either through Hirejr or a separate website.' },
                { 'title': 'Custom Questions', 'subtitle': 'Ask candidates to answer up to five questions when submitting an application through Hirejr.' },
            ],
            provinces:[
                { 'short': '',   'value': '',                       'label': 'Choose a province' },
                { 'short': 'AB', 'value': 'Alberta',                'label': 'Alberta' },
                { 'short': 'BC', 'value': 'British Columbia',       'label': 'British Columbia' },
                { 'short': 'MB', 'value': 'Manitoba',               'label': 'Manitoba' },
                { 'short': 'NB', 'value': 'New Brunswick',          'label': 'New Brunswick' },
                { 'short': 'NL', 'value': 'Newfoundland and Labrador',  'label': 'Newfoundland and Labrador' },
                { 'short': 'NS', 'value': 'Nova Scotia',            'label': 'Nova Scotia' },
                { 'short': 'NU', 'value': 'Nunavut',                'label': 'Nunavut' },
                { 'short': 'NT', 'value': 'Northwest Territories',  'label': 'Northwest Territories' },
                { 'short': 'ON', 'value': 'Ontario',                'label': 'Ontario' },
                { 'short': 'PE', 'value': 'Prince Edward Island',   'label': 'Prince Edward Island' },
                { 'short': 'QC', 'value': 'Quebec',                 'label': 'Quebec' },
                { 'short': 'SK', 'value': 'Saskatchewan',           'label': 'Saskatchewan' },
                { 'short': 'YT', 'value': 'Yukon',                  'label': 'Yukon'}
            ],
            schedules: [
                { 'value': '',          'label': 'Choose a schedule' } ,
                { 'value': 'Full Time', 'label': 'Full Time' },
                { 'value': 'Part Time', 'label': 'Part Time' },
                { 'value': 'Intern',    'label': 'Intern' },
                { 'value': 'Contract',  'label': 'Contract' },
                { 'value': 'N/A',       'label': 'N/A' },
            ],
            applyOptions: [
                { 'value': '',         'label': 'Choose an application option'},
                { 'value': 'internal', 'label': 'Hire jr (we\'ll notify you via email)'},
                { 'value': 'external', 'label': 'Separate Website'},
            ],
            displayInternal: false,
            displayExternal: false
        }
        this.handleApplicationOptionChange = this.handleApplicationOptionChange.bind(this);
    };

    handleApplicationOptionChange(e){
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
                <Details
                    title={this.state.formSections[0].title}
                    subtitle={this.state.formSections[0].subtitle}
                    provinces={this.state.provinces}
                    schedules={this.state.schedules} />

                <ApplyThrough
                    title={this.state.formSections[1].title}
                    subtitle={this.state.formSections[1].subtitle}
                    displayInternal={this.state.displayInternal}
                    displayExternal={this.state.displayExternal}
                    applyOptions={this.state.applyOptions}
                    handleApplicationOptionChange={this.handleApplicationOptionChange} />

                { this.state.displayInternal ?
                    <Questions
                        title={this.state.formSections[2].title}
                        subtitle={this.state.formSections[2].subtitle}
                        postJobForm={this.props.postJobForm} /> : false
                }

                <button type="submit" className="btn btn-primary float-right mr8">Next</button>
            </form>
        );
    }

    render(){
        return this.renderForm();
    }
}

const mapStateToProps = state => {
    return {
        postJobForm: state.form.postJobForm
    };
}

export default reduxForm({
    form: 'postJobForm',
    destroyOnUnmount: false,
    // validate: (values) => jobPostFormValidation(values)
})(
    connect(mapStateToProps)(PostJobFormOne)
);
