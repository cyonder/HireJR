import React from 'react';

const style = { paddingRight: 0 }

export const renderCheckField = ({ input, meta, type, label }) => {    
    return(
        <label className={meta.error && meta.touched ? `form-${type} has-error` : `form-${type}`}
            style={style}>
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
