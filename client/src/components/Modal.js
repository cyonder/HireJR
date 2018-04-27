import React from 'react';
import ApplyJobForm from './ApplyJobForm';

const Modal = props => {    
    let activeClass = props.active ? 'active' : null;
    return(
        <div className={`modal ${activeClass}`}>
            <a onClick={props.toggleModal} className="modal-overlay" aria-label="Close"></a>
            <div className="modal-container" role="document">
                <div className="modal-header">
                    <button onClick={props.toggleModal} className="btn btn-clear float-right" aria-label="Close"></button>
                    <div className="modal-title h5">A few questions... =)</div>
                </div>
                <div className="modal-body">
                    <ApplyJobForm {...props} questions={props.questions} toggleModal={props.toggleModal} />
                </div>
                <div className="modal-footer">
                    <label type="submit" tabIndex="0" htmlFor="submit-apply-job-form" className="btn btn-primary">Apply</label>
                </div>
            </div>
        </div>
    )
}

export default Modal;