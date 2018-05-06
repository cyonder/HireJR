import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import CandidateListItem from './CandidateListItem';
import Loading from './Loading';

class ApplicantIndex extends Component{
    constructor(){
        super();
        this.state = {
            displayApplicants: false
        }
        this.toggleApplicants = this.toggleApplicants.bind(this);
    }

    toggleApplicants(){
        this.setState({ displayApplicants: !this.state.displayApplicants })
    }

    returnApplicants(){
        const { jobPostId, jobApplicants } = this.props; 
        if(!jobApplicants) return <Loading />

        return jobApplicants
            .filter(applicant => applicant._jobPostId === jobPostId)
            .map(applicant => applicant)
    }

    renderApplicants(){
        if(!this.props.jobApplicants) return <Loading />

        const applicants = this.returnApplicants();

        return applicants.map((applicant, index) => {
            const { user: { firstName, lastName, _id }} = applicant;                       
            return (
                <div className="" key={index}>
                    <Link to={`/profile/${_id}`}>{`${firstName} ${lastName}`}</Link>
                </div>
            )
        })
    }

    render(){
        const { displayApplicants } = this.state;
        const applicants = this.returnApplicants();
        
        if(!displayApplicants && applicants.length > 0){
            return(
                <button onClick={this.toggleApplicants} className="btn btn-sm toggle-applicants-button">
                    <i className="fas fa-arrow-down"></i> Display Applicants
                </button>
            )
        }else if(applicants.length === 0){
            return(
                <button onClick={this.toggleApplicants} className="btn btn-sm toggle-applicants-button disabled">
                    <i className="fas fa-arrow-down"></i> No Applicants to Display
                </button>
            )
        }else{
            return(
                <div className="mt4">
                    <div className="divider"></div>
                    { this.renderApplicants() }
                    <button onClick={this.toggleApplicants} className="btn btn-sm toggle-applicants-button">
                        <i className="fas fa-arrow-up"></i> Hide Applicants
                    </button>
                </div>
            )
        }
    }
}

export default ApplicantIndex;