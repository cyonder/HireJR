import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';

import { renderTextField } from './Fields/TextFields';
import { renderCheckField } from './Fields/ControlFields';

import Loading from './Loading';

class ApplyJobForm extends Component{
    renderAnswers(choices, questionId){
        if(!choices) return <Loading />
        // Choices comes as array from db and as string from confirmation. Convert to string always!
        // let newChoices = choices.toString().split(',').map(choice => choice.trim());

        return choices.map((choice, index) => {            
            return(
                <div key={index}>
                    <Field name={questionId}
                        type="radio"
                        label={choice}
                        value={choice}
                        component={renderCheckField} />
                </div>
            )
        })
    }

    renderQuestions(){
        const { questions } = this.props;
        if(!questions) return <Loading />
        
        return questions.map((question, index) => {     
            if(question.choices){
                return(
                    <div key={index} className="d-flex">
                        <span className="form-label">
                            <span className="label text-bold mr8">{index+1}</span>
                        </span>
                        <div key={index} className="form-group">
                            <label className="form-label">{question.question}</label>
                            <div className="form-group">{this.renderAnswers(question.choices, question._id)}</div>
                        </div>
                    </div> 
                )
            }else{
                return(
                    <div key={index} className="d-flex">
                        <span className="form-label">
                            <span className="label text-bold mr8">{index+1}</span>
                        </span>
                        <div className="form-group" style={{flex: '1'}}>
                            <label className="form-label">{question.question}</label>
                            <Field name={question._id}
                                type="text"
                                placeholder="Type your answer..."
                                component={renderTextField} />
                        </div>
                    </div>
                )
            }
        })
    }

    renderForm(){
        const { handleSubmit } = this.props;
        return(
            <form onSubmit={handleSubmit}>
                { this.renderQuestions() }
            </form>   
        )     
    }

    render(){
        return this.renderForm();
    }
}

export default reduxForm({
    form: 'applyJobForm',
    destroyOnUnmount: false
})(ApplyJobForm);