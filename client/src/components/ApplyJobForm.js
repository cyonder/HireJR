import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';

import { renderTextField } from './Fields/TextFields';
import { renderCheckField } from './Fields/ControlFields';

import { createJobApplication } from '../actions/jobPost';

import Loading from './Loading';

class ApplyJobForm extends Component{
    constructor(){
        super();
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(values){
        const jobPostId = this.props.match.params.id;
        const employerId = this.props.job.employer._id;
        const newQuestions = this.props.questions;
        
        // TODO: Sometimes throws -> TypeError: Cannot read property 'question' of undefined
        let questions = Object.keys(values).map((key, index) => {
            return { question: newQuestions[index].question, answer: values[key] }
        })

        const jobApplication = {
            employerId: employerId,
            questions: questions
        }
        
        this.props.createJobApplication(jobPostId, jobApplication, () => {
            this.props.toggleModal();
            toast.success('Application sent successfully!');
        })
    }

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
                        component={renderCheckField} 
                        validate={value => (value ? undefined : 'Required')}/>
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
                                component={renderTextField} 
                                validate={value => (value ? undefined : 'Required')}/>
                        </div>
                    </div>
                )
            }
        })
    }

    renderForm(){                        
        const { handleSubmit } = this.props;
        return(
            <form onSubmit={handleSubmit(this.onSubmit)}>
                { this.renderQuestions() }
                <input type="submit" id="submit-apply-job-form" className="d-none"/>
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
})(
    connect(null, { createJobApplication })(ApplyJobForm)
);