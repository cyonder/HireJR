import React from 'react';
import { Field } from 'redux-form';

import { renderTextField } from './TextFields';
import { renderSelectField } from './SelectFields';

const style = { marginBottom: 0, paddingRight: '.4rem' }

export const renderSalaryFields = (fields) => {
    return(
        <div className="d-flex">
            <div className={fields.salary.paymentCycle.meta.error ? 'has-error col-4 col-sm-12' : 'col-4 col-sm-12 form-group'}
                    style={style}>
                <select {...fields.salary.paymentCycle.input} className="form-select">
                    {fields.children}
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

const renderQuestionField = ({fields, reduxQuestions}) => {
    // if(typeof reduxQuestions === 'undefined') return false;

    return fields.map((field, index) => {
        return(
            <div className="job-form-question" key={index}>
                <div className="input-group">
                    <div className="col-4 col-sm-12 d-flex">
                        <button type="button"
                            className="btn btn-error float-right"
                            onClick={() => fields.remove(index)} ><i className="icon icon-delete"></i></button>

                        <Field name={`${field}.questionType`}
                            component={renderSelectField}>
                            <option value="Open-Ended">Open-Ended</option>
                            <option value="Multiple-Choice">Multiple-Choice</option>
                        </Field>
                    </div>
                    <div className="col-8 col-sm-12">
                        <Field name={`${field}.question`}
                            type="text"
                            component={renderTextField}
                            placeholder="What is the difference between a class and an object?" />
                    </div>
                </div>
                <div className={reduxQuestions[index].questionType === 'Multiple-Choice' ? 'mt10' : 'd-none'}>
                    <Field name={`${field}.choices`}
                        type="text"
                        component={renderTextField}
                        placeholder="Comma-separated answer choices" />
                </div>
            </div>
        );
    })
}

export const renderQuestionFieldArray = ({fields, reduxQuestions}) => {
    return(
        <div className="form-group job-form-questions">
            <button type="button"
                className={fields.length === 5 ? 'btn btn-success disabled' : 'btn btn-success'}
                onClick={() => {
                    if(fields.length < 5){
                        fields.push({})
                    }
                }}>Add Question</button>
            { renderQuestionField({fields, reduxQuestions}) }
        </div>
    );
}
