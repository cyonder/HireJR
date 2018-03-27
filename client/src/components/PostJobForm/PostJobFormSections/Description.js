import React, { Component } from 'react';
import { Field } from 'redux-form';

import { renderTextareaField } from '../../Fields/TextFields';

class Description extends Component{
    render(){
        return(
            <div className="card with-no-background">
                <div className="card-header">
                    <div className="card-title h5">Add Description</div>
                    <div className="card-subtitle text-gray">
                        We offer and promote opportunities for
                        Junior and Entry-Level Developers
                    </div>
                </div>
                <div className="card-body">
                    <Field name="description"
                        placeholder="Write job description"
                        component={renderTextareaField} />
                </div>
            </div>
        );
    }
}

export default Description;
