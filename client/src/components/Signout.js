import React, { Component } from 'react';
import { connect } from 'react-redux';

import { signoutUser } from '../actions/authentication';

class Signout extends Component {
    constructor(props){
        super(props);
        this.props.signoutUser();
    }

    render(){
        return <div>You signed out =(</div>;
    }
}

export default connect(null, { signoutUser })(Signout);
