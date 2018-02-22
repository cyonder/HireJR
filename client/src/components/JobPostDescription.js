import React, { Component } from 'react';

import TextEditor from './TextEditor';

class JobPostDescription extends Component{
    render(){
        console.log("JobPostDescription-props",this.props);
        return <TextEditor />;
    }
}

export default JobPostDescription;
