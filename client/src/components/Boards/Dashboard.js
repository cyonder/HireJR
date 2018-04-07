import React, { Component } from 'react';
import { connect } from 'react-redux';

import RequireAuthentication from '../HOC/RequireAuthentication';

import EmployerBoard from './EmployerBoard';
import CandidateBoard from './CandidateBoard';
import EmptyState from '../EmptyState';

import Loading from '../Loading';

class Dashboard extends Component{
    render(){
        if(!this.props.role) return <Loading />;

        if(this.props.role === 'employer'){
            return(
                <div className="container grid-sm">
                    <EmployerBoard />
                </div>
            );
        }else if(this.props.role === 'candidate'){
            return(
                <div className="container grid-sm">
                    <CandidateBoard />
                </div>
            );
        }else{
            return(
                <div className="container grid-sm">
                    <EmptyState title="Something went wrong!" subtitle="Please sign out and try to sign in again." icon="icon-stop"/>
                </div>
            )
        }
    }
}

const mapStateToProps = state => {
    return {
        role: state.user.role,
    }
}

export default connect(mapStateToProps)(
    RequireAuthentication(Dashboard)
);
