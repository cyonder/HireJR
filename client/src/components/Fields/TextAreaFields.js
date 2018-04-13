import React from 'react';
import Popover from '../Popover';

export const renderTextAreaField = ({ input, meta, rows, placeholder }) => {
    return(
        <div className={meta.error && meta.touched ? 'has-error form-group' : 'form-group'}>
            <textarea {...input}
                className="form-input"
                placeholder={placeholder}
                rows={rows}></textarea>
            {meta.error && meta.touched &&
                <p className="form-input-hint">{meta.error}</p>
            }
        </div>
    );
}

export const renderTextAreaFieldWithLabelAndPopover = ({ input, meta, rows, label, placeholder, popover, maxLength, id }) => {
    return(
        <div className={meta.error && meta.touched ? 'has-error form-group d-block' : 'form-group d-block'}>
            <label className="form-label" htmlFor={id}>{label}
                { popover ? <Popover content={popover} /> : false }
            </label>
            <textarea {...input}
                className="form-input"
                placeholder={placeholder}
                maxLength={maxLength}
                id={id}
                rows={rows} />
            {meta.error && meta.touched &&
                <p className="form-input-hint">{meta.error}</p>
            }
        </div>
    );
}
