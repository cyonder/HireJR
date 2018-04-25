import React, { Component } from 'react';
import { connect } from 'react-redux';

import Loading from './Loading';
import Resume from './Resume';

import { findCandidate } from '../actions/candidate';

class CandidateProfile extends Component{
    componentDidMount(){
        this.props.findCandidate(this.props.match.params.id);
    }

    render(){        
        const candidate = this.props.candidate;
        if(!candidate) return <Loading />;
        return <Resume candidate={candidate} />
    }
}

const mapStateToProps = state => {
    return {
        candidate: state.candidate.candidate
    }
}

export default connect(mapStateToProps, { findCandidate })(CandidateProfile);