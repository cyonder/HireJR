import React from 'react';

export const renderTextField = ({ input, meta, label, id, placeholder, type, shouldHide }) => {
    if(shouldHide === false) return false;
    return(
        <div className={meta.error && meta.touched ? 'form-group has-error' : 'form-group'}>
            <div className="col-4 col-sm-12">
                <label className="form-label" htmlFor={id}>{label}</label>
            </div>
            <div className="col-8 col-sm-12">
                <input {...input}
                    type="text"
                    className="form-input"
                    placeholder={placeholder}
                    id={id}
                    type={type}/>
                {meta.error && meta.touched &&
                    <p className="form-input-hint">{meta.error}</p>
                }
            </div>
        </div>
    );
}

export const renderSimpleTextField = ({input, placeholder, shouldHide}) => {
    if(shouldHide === false) return false;
    return(
        <input {...input} className="form-input" type="text" placeholder={placeholder} />
    );
}

export const renderSimpleTextareaField = ({input, placeholder, shouldHide}) => {
    if(shouldHide === false) return false;
    return(
        <textarea {...input}
            className="form-input"
            placeholder={placeholder}
            rows="4" />
    );
}

export const renderTextareaField = ({ input, meta, placeholder }) => {
    return(
        <div className={meta.error && meta.touched ? 'form-group has-error' : 'form-group'}>
            <textarea {...input}
                className="form-input"
                placeholder={placeholder}
                rows="10"></textarea>
            {meta.error && meta.touched &&
                <p className="form-input-hint">{meta.error}</p>
            }
        </div>
    );
}
