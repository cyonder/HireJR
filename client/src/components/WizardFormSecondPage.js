import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';

class WizardFormSecondPage extends Component{
    renderTextareaField({ input, placeholder }){
        return(
            <div className="form-group">
                <textarea {...input}
                    className="form-input"
                    placeholder={placeholder}
                    rows="6"></textarea>
            </div>
        )
    }

    renderForm(){
        const { handleSubmit, previousPage } = this.props;

        return(
            <form onSubmit={handleSubmit}>
                <Field name="description"
                    placeholder="Write job description"
                    component={this.renderTextareaField} />
                <div className="fcs">
                    <button className="btn" type="button" onClick={previousPage}>Previous</button>
                    <button className="btn btn-primary" type="submit">Next</button>
                </div>
            </form>
        );
    }

    render(){
        return(
            <div className="card no-bg">
                <div className="card-header">
                    <div className="card-title h5">Add Description</div>
                    <div className="card-subtitle text-gray">
                        We offer and promote opportunities for
                        Junior and Entry-Level Developers
                    </div>
                </div>
                <div className="card-body">
                    { this.renderForm() }
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return{};
}

export default reduxForm({
    form: 'wizardForm',
    destroyOnUnmount: false,
    // validate
})(
    connect(mapStateToProps)(WizardFormSecondPage)
);
