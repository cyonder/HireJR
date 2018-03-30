import React, { Component } from 'react';
import { FieldArray } from 'redux-form';

import { renderQuestionFieldArray } from '../../Fields/CustomFields';

import Card from '../../Card';

// Uncomment if typeof, go /signout, go /jobs/new

class Questions extends Component{
    render(){
        if( typeof this.props.postJobForm['values.questions'] === 'undefined') return false;

        return(
            <Card title={this.props.title}
                subtitle={this.props.subtitle}
                noBackground={true}>
                <FieldArray name="questions" component={renderQuestionFieldArray}
                            reduxQuestions={this.props.postJobForm['values.questions']}/>
            </Card>
        );
    }
}

export default Questions;
