import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchUsers } from '../actions/authentication';

class Dashboard extends Component{
    componentDidMount(){
        this.props.fetchUsers();
    }

    render(){
        return <div>Welcome =)</div>;
    }
}

export default connect(null, { fetchUsers })(Dashboard);
