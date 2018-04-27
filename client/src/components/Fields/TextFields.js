import React from 'react';

export const renderTextField = ({input, meta, type, placeholder, shouldHide}) => {
    if(shouldHide === false) return false;
    return(
        <div className={meta.error && meta.touched ? 'form-group has-error' : 'form-group'}>
            <input {...input}
                type={type}
                className="form-input"
                placeholder={placeholder} />
            {meta.error && meta.touched &&
                <p className="form-input-hint">{meta.error}</p>
            }
        </div>
    );
}

export const renderTextFieldWithLabel = ({ input, meta, type, label, placeholder, id, shouldHide }) => {
    if(shouldHide) return false;
    return(
        <div className={meta.error && meta.touched ? 'form-group has-error' : 'form-group'}>
            <label className="form-label" htmlFor={id}>{label}</label>
            <input {...input}
                type={type}
                className="form-input"
                placeholder={placeholder}
                id={id} />
            {meta.error && meta.touched &&
                <p className="form-input-hint">{meta.error}</p>
            }
        </div>
    );
}

export const renderHorizontalTextField = ({ input, meta, type, label, placeholder, id, shouldHide }) => {
    if(shouldHide) return false;
    return(
        <div className={meta.error && meta.touched ? 'form-group has-error' : 'form-group'}>
            <div className="col-4 col-sm-12">
                <label className="form-label" htmlFor={id}>{label}</label>
            </div>
            <div className="col-8 col-sm-12">
                <input {...input}
                    type={type}
                    className="form-input"
                    placeholder={placeholder}
                    id={id} />
                {meta.error && meta.touched &&
                    <p className="form-input-hint">{meta.error}</p>
                }
            </div>
        </div>
    );
}
