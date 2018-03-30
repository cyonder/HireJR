import React from 'react';

export const renderHorizontalSelectField = ({ input, meta, label, id, children }) => {
    return(
        <div className={meta.error && meta.touched ? 'form-group has-error' : 'form-group'}>
            <div className="col-4 col-sm-12">
                <label className="form-label" htmlFor={id}>{label}</label>
            </div>
            <div className="col-8 col-sm-12">
                <select {...input} className="form-select" id={id}>
                    {children}
                </select>
                {meta.error && meta.touched &&
                    <p className="form-input-hint">{meta.error}</p>
                }
            </div>
        </div>
    );
}

export const renderSelectField = ({input, children}) => {
    return(
        <select {...input} className="form-select">
            {children}
        </select>
    )
}
