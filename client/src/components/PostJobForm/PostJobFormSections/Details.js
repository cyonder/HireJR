import React, { Component } from 'react';
import { Field } from 'redux-form';

import { renderTextField } from '../../Fields/TextFields';
import { renderSelectField } from '../../Fields/SelectFields';

class JobDetails extends Component{
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
                </div>
            </div>
        );
    }
}

export default JobDetails;
