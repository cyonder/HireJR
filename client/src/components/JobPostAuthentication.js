import React, { Component } from 'react';

import Signup from './Signup';
import Signin from './Signin';

class JobPostAuthentication extends Component{
    render(){
        console.log("JobPostAuthentication-props",this.props);
        return(
            <div className="card pt08">
                <div className="columns">
                    <div className="column">
                        <Signup />
                    </div>
                    <div className="divider-vert" data-content="OR"></div>
                    <div className="column">
                        <Signin />
                    </div>
                </div>
            </div>
        );
    }
}

export default JobPostAuthentication;
