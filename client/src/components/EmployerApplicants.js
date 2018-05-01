import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchJobApplicants } from '../actions/jobPost';

import Loading from './Loading';
import CandidateListItem from './CandidateListItem';

class EmployerApplicants extends Component{
    componentDidMount(){
        this.props.fetchJobApplicants();
    }

    renderApplicants(newJobApplicants){
        return Object.keys(newJobApplicants).map((key, index) => {            
            const { _id, firstName, lastName, email } = newJobApplicants[key].user;
            const { 
                province, city, portfolioUrl, githubUrl, linkedInUrl, 
                skills, summary, careerObjective 
            } = newJobApplicants[key].candidate.candidateProfile;

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
        })
    }

    groupApplicantsByPosition = (jobApplicants, key) => {
        return jobApplicants.reduce((acc, applicant) => {     
            (acc[applicant[key].position] = acc[applicant[key].position] || []).push(applicant);
            return acc;
        }, {});
    };

    returnCandidatesGroupedByJobPost(){
        const { jobApplicants } = this.props;
        const groupedJobApplicants = this.groupApplicantsByPosition(jobApplicants, 'jobPost')
        var indents = []

        for(var key in groupedJobApplicants){
            var newJobApplicants = groupedJobApplicants[key];
            indents.push(this.renderApplicants(newJobApplicants))
        }
        
        return indents;
    }

    render(){        
        if(!this.props.jobApplicants) return <Loading />
        let candidateGroups = this.returnCandidatesGroupedByJobPost();
        const groupedJobApplicants = this.groupApplicantsByPosition(this.props.jobApplicants, 'jobPost')
        const jobPostPositions = Object.keys(groupedJobApplicants);
        
        return candidateGroups.map((candidateGroup, index) => {                        
            return (
                <div className="accordion" key={index}>
                    <input type="radio" id={index} name="accordion-radio" checked={index === 0 ? 'checked' : null} hidden/>
                    <label className="accordion-header c-hand" htmlFor={index}>
                        <i className="icon icon-arrow-right mr-1"></i>{jobPostPositions[index]}
                    </label>
                    <div className="accordion-body">
                        <div className="columns">
                            {candidateGroup}
                        </div>
                    </div>
                </div>
            )
        })
    }
}

const mapStateToProps = state => {
    return {
        jobApplicants: state.job.jobApplicants
    }
}

export default connect(mapStateToProps, { fetchJobApplicants })(EmployerApplicants);
