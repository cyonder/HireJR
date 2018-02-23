import React, { Component } from 'react';
import PropTypes from 'prop-types';

import RichTextEditor from 'react-rte';


class TextEditor extends Component{
    static propTypes = {
        onChange: PropTypes.func
    };

    state = {
        value: RichTextEditor.createEmptyValue()
    }

    onChange = (value) => {
        this.setState({value});
        if(this.props.onChange){
            this.props.onChange(value.toString('html'));
        }
    };

    render(){
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
            <RichTextEditor
                value={this.state.value}
                onChange={this.onChange}
                toolbarConfig={toolbarConfig}
                className="form-group"
            />
        );
    }
}

export default TextEditor;
