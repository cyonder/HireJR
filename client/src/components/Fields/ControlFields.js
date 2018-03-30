import React from 'react';

let checkboxStyle = { paddingRight: 0 }

export const renderCheckField = ({ input, meta, label, type }) => {
    return(
        <label className={meta.error && meta.touched ? 'form-checkbox has-error' : 'form-checkbox'} style={checkboxStyle}>
            <input {...input}
                type={type} />
            <i className="form-icon"></i> {label}
            {meta.error && meta.touched &&
                <span className="form-input-hint ml4">{meta.error}</span>
            }
        </label>
    );
}

export const renderSwitchField = ({ input, meta, type, label }) => {
    return(
        <div className={meta.error && meta.touched ? 'form-group has-error' : 'form-group'}>
            <label className="form-switch">
                <input {...input}
                    type={type} />
                <i className="form-icon"></i> {label}
                {meta.error && meta.touched &&
                    <span className="form-input-hint ml4">{meta.error}</span>
                }
            </label>
        </div>
    );
}
