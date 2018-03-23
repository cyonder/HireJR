import React, { Component } from 'react';

import Signup from './Signup';
import Signin from './Signin';

class WizardFormAuthPage extends Component{
    render(){
        return(
            <div className="card no-bg pt08">
                <div className="columns">
                    <div className="column">
                        <Signup {...this.props}/>
                    </div>
                    <div className="divider-vert no-bg" data-content="OR"></div>
                    <div className="column">
                        <Signin {...this.props}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default WizardFormAuthPage;
