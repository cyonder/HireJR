import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Loading from './Loading';
import CandidateListItem from './CandidateListItem';

import { fetchCandidates } from '../actions/candidate';

class CandidateIndex extends Component{
    componentDidMount(){
        this.props.fetchCandidates();
    }

    renderCandidates(){
        const candidates = this.props.candidates;

        return Object.keys(candidates).map((key, index) => {
            if(candidates[key].candidateProfile == undefined) return null;
            const { _id, firstName, lastName, email } = candidates[key].user;
            const { 
                province, city, portfolioUrl, githubUrl, linkedInUrl, 
                skills, summary, careerObjective 
            } = candidates[key].candidateProfile;

            let header = {
                userId: _id, 
                resumeLink: null,
                title: `${firstName} ${lastName}`,
                portfolioUrl: portfolioUrl,
                githubUrl: githubUrl,
                linkedInUrl: linkedInUrl 
            }

            let body = { email: email, city: city, province: province }
            let footer = { skills: [], summary: summary, careerObjective };

            if(skills){ footer.skills = skills }
            
            return(
                <CandidateListItem key={index} 
                    header={header} 
                    body={body} 
                    footer={footer} />
            );
        });
    }

    render(){
        const candidates = this.props.candidates;
        if(!candidates) return <Loading />;
        return <div className="columns">{this.renderCandidates()}</div>
    }
}

const mapStateToProps = state => {
    return {
        candidates: state.candidate.candidates
    }
}

export default connect(mapStateToProps, { fetchCandidates })(CandidateIndex);
