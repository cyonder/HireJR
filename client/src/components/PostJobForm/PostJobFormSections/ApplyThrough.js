import React, { Component } from 'react';
import { Field } from 'redux-form';

import { renderTextField } from '../../Fields/TextFields';
import { renderSelectField } from '../../Fields/SelectFields';

class ApplyThrough extends Component{
    render(){
        return(
            <div className="card with-no-background">
                <div className="card-header">
                    <div className="card-title h5">{this.props.title}</div>
                    <div className="card-subtitle text-gray">{this.props.subtitle}</div>
                </div>
                <div className="card-body">
                    <Field name="applyThrough"
                        onChange={ (e) => this.props.handleApplicationOptionChange(e) }
                        label="Apply Through"
                        id="input-applyThrough"
                        component={renderSelectField}>
                        { this.props.applyOptions.map(options =>
                            <option key={options.value} value={options.value}>
                                {options.label}
                            </option>
                        )}
                    </Field>

                    <Field name="internal"
                        label="Where to Email?"
                        placeholder="your@email.com"
                        id="input-internal"
                        shouldHide={this.props.displayInternal}
                        component={renderTextField} />

                    <Field name="external"
                        label="Where to Re-direct?"
                        placeholder="http://"
                        id="input-external"
                        shouldHide={this.props.displayExternal}
                        component={renderTextField} />
                </div>
            </div>
        );
    }
}

export default ApplyThrough;
