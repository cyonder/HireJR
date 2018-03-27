import React, { Component } from 'react';

import Signup from '../Signup';
import Signin from '../Signin';

class PostJobFormAuth extends Component{
    render(){
        return(
            <div className="columns mt8">
                <div className="column">
                    <Signup {...this.props}/>
                </div>
                <div className="divider-vert" data-content="OR"></div>
                <div className="column">
                    <Signin {...this.props}/>
                </div>
            </div>
        );
    }
}

export default PostJobFormAuth;
