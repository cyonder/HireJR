import React, { Component } from 'react';
import { Field } from 'redux-form';

import Card from '../../Card';

import { renderTextAreaField } from '../../Fields/TextAreaFields';

class Description extends Component{
    render(){
        return(
            <Card title={this.props.title}
                    subtitle={this.props.subtitle}
                    noBackground={true}>
                <Field name="description"
                    rows="10"
                    placeholder="Write job description"
                    component={renderTextAreaField} />
            </Card>
        );
    }
}

export default Description;
