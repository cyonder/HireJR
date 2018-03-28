import React, { Component } from 'react';
import { connect } from 'react-redux';

import EmployerBoard from './EmployerBoard';
import CandidateBoard from './CandidateBoard';

class Dashboard extends Component{
    render(){
        if(this.props.role === 'employer')
            return(
                <div className="container grid-sm">
                    <EmployerBoard />
                </div>
            );
        else
            return(
                <div className="container grid-sm">
                    <CandidateBoard />
                </div>
            );
    }
}

const mapStateToProps = state => {
    return {
        role: state.user.role,
    }
}

export default connect(mapStateToProps)(Dashboard);
