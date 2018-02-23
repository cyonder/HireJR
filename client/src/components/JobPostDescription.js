import React, { Component } from 'react';

import TextEditor from './TextEditor';

class JobPostDescription extends Component{
    render(){
        console.log("JobPostDescription-props",this.props);
        return(
            <div>
                <TextEditor />
                <div className="fcs">
                    <button className="btn">Previous</button>
                    <button className="btn btn-primary">Next</button>
                </div>
            </div>
        );
    }
}

export default JobPostDescription;
