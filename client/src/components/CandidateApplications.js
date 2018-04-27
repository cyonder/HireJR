import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchJobApplications } from '../actions/jobPost';

class CandidateApplications extends Component{
    componentDidMount(){
        this.props.fetchJobApplications();
    }
    
    render(){
        return 'CandidateApplications'
    }
}

export default connect(null, { fetchJobApplications })(CandidateApplications);
