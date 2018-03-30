import React, { Component } from 'react';
import { Field } from 'redux-form';

import { renderHorizontalTextField } from '../../Fields/TextFields';
import { renderHorizontalSelectField } from '../../Fields/SelectFields';

import Card from '../../Card';

class ApplyThrough extends Component{
    render(){
        return(
            <Card title={this.props.title}
                    subtitle={this.props.subtitle}
                    noBackground={true}>
                <Field name="applyThrough"
                    onChange={ (e) => this.props.handleApplicationOptionChange(e) }
                    label="Apply Through"
                    id="input-apply-through"
                    component={renderHorizontalSelectField}>
                    { this.props.applyOptions.map(options =>
                        <option key={options.value} value={options.value}>
                            {options.label}
                        </option>
                    )}
                </Field>

                <Field name="internal"
                    type="text"
                    label="Where to Email?"
                    placeholder="your@email.com"
                    id="input-internal"
                    shouldHide={this.props.displayInternal}
                    component={renderHorizontalTextField} />

                <Field name="external"
                    type="text"
                    label="Where to Re-direct?"
                    placeholder="http://"
                    id="input-external"
                    shouldHide={this.props.displayExternal}
                    component={renderHorizontalTextField} />
            </Card>
        );
    }
}

export default ApplyThrough;
