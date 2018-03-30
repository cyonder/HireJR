import React, { Component } from 'react';
import { FieldArray } from 'redux-form';

import { renderQuestionFieldArray } from '../../Fields/CustomFields';

import Card from '../../Card';

class Questions extends Component{
    render(){
        if(!this.props.postJobForm) return false;

        return(
            <Card title={this.props.title}
                subtitle={this.props.subtitle}
                noBackground={true}>
                <FieldArray name="questions" component={renderQuestionFieldArray}
                            reduxQuestions={this.props.postJobForm['values'] ? this.props.postJobForm['values'].questions : null } />
            </Card>
        );
    }
}

export default Questions;
