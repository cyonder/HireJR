import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchJobApplicants } from '../actions/jobPost';

class EmployerApplicants extends Component{
    componentDidMount(){
        this.props.fetchJobApplicants();
    }

    render(){
        return 'EmployerApplicants'
    }
}

export default connect(null, { fetchJobApplicants })(EmployerApplicants);
