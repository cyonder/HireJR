import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';

import Details from './PostJobFormSections/Details';
import ApplyThrough from './PostJobFormSections/ApplyThrough';
import Questions from './PostJobFormSections/Questions';

import jobPostFormValidation from '../../validations/jobPostFormValidation';

import { postJobFormSections } from '../../data/postJobFormSections.json';
import { provinces } from '../../data/provinces.json';
import { schedules } from '../../data/schedules.json';
import { applyOptions } from '../../data/applyOptions.json';
import { paymentCycle } from '../../data/paymentCycle.json';

class PostJobFormOne extends Component{
    constructor(){
        super();
        this.state = {
            formSections: postJobFormSections,
            provinces: provinces,
            schedules: schedules,
            applyOptions: applyOptions,
            paymentCycle: paymentCycle,
            displayInternal: true,
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
                    schedules={this.state.schedules}
                    paymentCycle={this.state.paymentCycle} />

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
                        postJobForm={this.props.postJobForm} /> : null }

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
