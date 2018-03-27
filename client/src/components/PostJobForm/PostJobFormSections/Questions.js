import React, { Component } from 'react';
import { Field, FieldArray } from 'redux-form';

import { renderSimpleTextField } from '../../Fields/TextFields';
import { renderSimpleSelectField } from '../../Fields/SelectFields';

class JobQuestions extends Component{
    constructor(){
        super();
        this.renderQuestionArray = this.renderQuestionArray.bind(this);
    }

    renderQuestionField({fields}){
        return fields.map((question, index) => {
            return(
                <div className="job-form-question" key={index}>
                    <div className="input-group">
                        <button type="button"
                            className="btn btn-error float-right"
                            onClick={() => fields.remove(index)} ><i className="icon icon-delete"></i></button>

                        <Field name={`${question}.questionType`}
                            component={renderSimpleSelectField}
                            index={index} />

                        <Field name={`${question}.question`}
                            component={renderSimpleTextField}
                            placeholder="What is the difference between a class and an object?" />
                    </div>
                    <div className={this.props.postJobForm.values.questions[index].questionType === 'multiple-choice' ? 'mt10' : 'd-none'}>
                        <Field name={`${question}.choices`}
                            component={renderSimpleTextField}
                            placeholder="Comma-separated answer choices" />
                    </div>
                </div>
            );
        })
    }

    renderQuestionArray({fields}){
        return(
            <div className="form-group job-form-questions">
                <button type="button"
                    className={fields.length === 5 ? 'btn btn-success disabled' : 'btn btn-success'}
                    onClick={() => {
                        if(fields.length < 5){
                            fields.push({})
                        }
                    }}>Add Question</button>
                { this.renderQuestionField({fields}) }
            </div>
        );
    }

    render(){
        return(
            <div className="card with-no-background">
                <div className="card-header">
                    <div className="card-title h5">{this.props.title}</div>
                    <div className="card-subtitle text-gray">{this.props.subtitle}</div>
                </div>
                <div className="card-body">
                    <FieldArray name="questions" component={this.renderQuestionArray} />
                </div>
            </div>
        );
    }
}

export default JobQuestions;
