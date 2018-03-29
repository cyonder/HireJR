import React, { Component } from 'react';
import { Field, FormSection, Fields } from 'redux-form';

import { renderTextField } from '../../Fields/TextFields';
import { renderSelectField } from '../../Fields/SelectFields';

const style = { marginBottom: 0, paddingRight: '.4rem' }

class JobDetails extends Component{
    renderSalaryFields(fields){
        return(
            <div className="d-flex">
                <div className={fields.salary.paymentCycle.meta.error ? 'has-error col-4 col-sm-12' : 'col-4 col-sm-12 form-group'}  style={style}>
                    <select {...fields.salary.paymentCycle.input} className="form-select">
                        <option value="">Payment Cycle</option>
                        <option value="Yearly">Yearly</option>
                        <option value="Monthly">Monthly</option>
                        <option value="Weekly">Weekly</option>
                        <option value="Daily">Daily</option>
                    </select>
                    {fields.salary.paymentCycle.meta.error ? <p className="form-input-hint">{fields.salary.paymentCycle.meta.error}</p> : false}
                </div>
                <div className="col-8 col-sm-12 form-group">
                    <div className={fields.salary.from.meta.error && fields.salary.from.meta.touched ? 'has-error mr4' : 'mr4'}>
                        <input {...fields.salary.from.input} className="form-input" placeholder="from" type="text"/>
                        {fields.salary.from.meta.error ? <p className="form-input-hint">{fields.salary.from.meta.error}</p> : false}
                    </div>
                    <div>
                        <input {...fields.salary.to.input} className="form-input" placeholder="to" type="text"/>
                    </div>
                </div>
            </div>
        )
    }

    render(){
        return(
            <div className="card with-no-background">
                <div className="card-header">
                    <div className="card-title h5">{this.props.title}</div>
                    <div className="card-subtitle text-gray">{this.props.subtitle}</div>
                </div>
                <div className="card-body">
                    <Field name="position"
                        label="Position"
                        placeholder="Jr. Rails Developer"
                        id="input-position"
                        component={renderTextField} />

                    <Field name="companyName"
                        label="Company Name"
                        placeholder="Apple Inc."
                        id="input-company-name"
                        component={renderTextField} />

                    <Field name="companyWebsite"
                        label="Company Website"
                        placeholder="www.apple.com"
                        id="input-company-website"
                        component={renderTextField} />

                    <Field name="city"
                        label="City"
                        placeholder="Toronto"
                        id="input-city"
                        component={renderTextField} />

                    <Field name="province"
                        label="Province"
                        id="input-province"
                        component={renderSelectField}>
                        { this.props.provinces.map(province =>
                            <option key={province.short} value={province.value}>
                                {province.label}
                            </option>
                        )}
                    </Field>

                    <Field name="schedule"
                        label="Schedule"
                        id="input-schedule"
                        component={renderSelectField}>
                        { this.props.schedules.map(schedule =>
                            <option key={schedule.value} value={schedule.value}>
                                {schedule.label}
                            </option>
                        )}
                    </Field>

                    <Field name="skills"
                        label="Skills"
                        placeholder="HTML, CSS, JavaScript, React JS, Ruby on Rails, etc."
                        id="input-skills"
                        component={renderTextField} />

                    <Fields names={[ 'salary.from', 'salary.to', 'salary.paymentCycle' ]}
                        component={this.renderSalaryFields}/>
                </div>
            </div>
        );
    }
}

export default JobDetails;
