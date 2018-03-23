import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import JDEditor from './JDEditor';

class WizardFormSecondPage extends Component{
    constructor(props){
        super(props);
    }

    handleChange(editorValue){
        console.log("CHANGE | EditorValue: " + editorValue)
    }

    handleBlur(editorValue){
        console.log("BLUR | EditorValue: " + editorValue)
    }

    handleFocus(editorValue){
        console.log("FOCUS | EditorValue: " + editorValue)
    }

    // onSubmit(e){
    //     e.preventDefault();
    //     const isEmpty = false;
    //     // const isEmpty = !this.state.value.getEditorState().getCurrentContent().hasText();
    //     const authorized = localStorage.getItem('authentication_token');
    //
    //     if(authorized){
    //         if(!isEmpty){
    //             this.props.history.push('/jobs/new/confirmation');
    //             // this.props.saveDescription(this.state.value.toString('html'), () => {
    //             //     this.props.history.push('/jobs/new/confirmation');
    //             // });
    //         }
    //     }else{
    //         if(!isEmpty){
    //             this.props.history.push('/jobs/new/authentication');
    //         }
    //     }
    // }

    render(){
        const { handleSubmit, previousPage } = this.props;
        // console.log("here:",this.props.editorValue);
        const toolbarConfig = {
            display: ['INLINE_STYLE_BUTTONS', 'BLOCK_TYPE_BUTTONS', 'BLOCK_TYPE_DROPDOWN', 'HISTORY_BUTTONS'],
            INLINE_STYLE_BUTTONS: [
                {label: 'Bold', style: 'BOLD', className: 'custom-css-class'},
                {label: 'Italic', style: 'ITALIC'},
                {label: 'Underline', style: 'UNDERLINE'}
            ],
            BLOCK_TYPE_DROPDOWN: [
                {label: 'Normal', style: 'unstyled'},
                {label: 'Heading Large', style: 'header-one'},
                {label: 'Heading Medium', style: 'header-two'},
                {label: 'Heading Small', style: 'header-three'}
            ],
            BLOCK_TYPE_BUTTONS: [
                {label: 'UL', style: 'unordered-list-item'},
                {label: 'OL', style: 'ordered-list-item'}
            ]
        };

        return(
            <form onSubmit={handleSubmit}>
                <Field name="description" component={
                        props =>
                            <JDEditor format={'html'} value={{description: props.editorValue}}
                                onFocus={this.handleFocus.bind(this)}
                                onBlur={this.handleBlur.bind(this)}
                                onChange={this.handleChange.bind(this)}
                                {...props} />
                    }
                />
                <div className="fcs">
                    <button className="btn" type="button" onClick={previousPage}>Previous</button>
                    <button className="btn btn-primary" type="submit">Next</button>
                </div>
            </form>
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
