import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, Fields } from 'redux-form';

import { renderHorizontalTextField } from '../../Fields/TextFields';
import { renderHorizontalSelectField } from '../../Fields/SelectFields';
import { renderSalaryFields } from '../../Fields/CustomFields';

import Card from '../../Card';

class JobDetails extends Component{
    render(){
        return(
            <Card title={this.props.title}
                    subtitle={this.props.subtitle}
                    noBackground={true}>
                <Field name="position"
                    type="text"
                    label="Position"
                    placeholder="Jr. Rails Developer"
                    id="input-position"
                    component={renderHorizontalTextField} />

                <Field name="city"
                    type="text"
                    label="City"
                    placeholder="Toronto"
                    id="input-city"
                    component={renderHorizontalTextField} />

                <Field name="province"
                    label="Province"
                    id="input-province"
                    component={renderHorizontalSelectField}>
                    { this.props.provinces.map(province =>
                      <option key={province.short} value={province.value}>
                          {province.label}
                      </option>
                    )}
                </Field>

                <Field name="schedule"
                    label="Schedule"
                    id="input-schedule"
                    component={renderHorizontalSelectField}>
                    { this.props.schedules.map(schedule =>
                      <option key={schedule.value} value={schedule.value}>
                          {schedule.label}
                      </option>
                    )}
                </Field>

                <Field name="skills"
                    type="text"
                    label="Skills"
                    placeholder="HTML, CSS, JavaScript, React JS, Ruby on Rails, etc."
                    id="input-skills"
                    component={renderHorizontalTextField} />

                <Fields names={[ 'salary.from', 'salary.to', 'salary.paymentCycle' ]}
                    component={renderSalaryFields}>
                    { this.props.paymentCycle.map(payment =>
                        <option key={payment.value} value={payment.value}>
                            {payment.label}
                        </option>
                    )}
                </Fields>
            </Card>
        );
    }
}

const mapStateToProps = state => {
    return {
        employer: state.user.employer
    }
}

export default connect(mapStateToProps)(JobDetails);

// { !this.props.employer ?
//     [<Field name="companyName"
//         type="text"
//         label="Company Name"
//         placeholder="Apple Inc."
//         id="input-company-name"
//         component={renderHorizontalTextField} key={1} />,
//     <Field name="companyWebsite"
//         type="text"
//         label="Company Website"
//         placeholder="www.apple.com"
//         id="input-company-website"
//         component={renderHorizontalTextField} key={2} />] : null }
