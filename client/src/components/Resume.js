import React, { Component } from 'react';
import { runInDebugContext } from 'vm';

class Resume extends Component{
    render(){
        const { 
            user, 
            candidateProfile, 
            education,
            workExperience,
            projects
        } = this.props.candidate;

        const header = {
            firstName: user.firstName,
            lastName: user.lastName,
            title: candidateProfile.title,
            information: {
                email: user.email,
                city: candidateProfile.city,
                province: candidateProfile.province,
                portfolioUrl: candidateProfile.portfolioUrl,
                githubUrl: candidateProfile.githubUrl,
                linkedInUrl: candidateProfile.linkedInUrl,
            }
        }

        return(
            <div className="resume">
                { Header(header) }
                { candidateProfile.summary ? Summary(candidateProfile.summary) : null }
                { candidateProfile.careerObjective ? CareerObjective(candidateProfile.careerObjective) : null }
                { candidateProfile.skills.length > 0 ? Skills(candidateProfile.skills) : null }
                { education.length > 0 ? Education(education) : null }
                { workExperience.length > 0 ? WorkExperience(workExperience) : null }
                { projects.length > 0 ? Projects(projects) : null }
            </div>
        )
    }
}

const Header = header => {
    return(
        <div className="flex-center-between">
            <div>
                <div className="h2 text-bold">{`${header.firstName} ${header.lastName}`}</div>
                <div className="h4">{header.title}</div>
            </div>
            { Information(header.information) }
        </div>
    )
}

const Information = ({city, province, email, portfolioUrl, githubUrl, linkedInUrl}) => {
    let address = '';

    if(city && !province){
        address = <span>{city}</span>;
    }else if(!city && province){
        address = <span>{province}</span>;
    }else if(city && province){
        address = <span>{`${city}, ${province}`}</span>;
    }

    return(
        <div className="resume-info">
            <div className={!city && !province ? 'd-none' : 'd-flex' }>
                <i className="text-primary fa-lg mr4 fas fa-map-marker"></i>
                { address }
            </div>
            <div className={!email ? 'd-none' : 'd-flex' }>
                <i className="text-primary fa-lg mr4 far fa-envelope-open"></i>
                <span>{email}</span>
            </div>
            <div className={!portfolioUrl ? 'd-none' : 'd-flex' }>
                <i className="text-primary fa-lg mr4 fas fa-link"></i>
                <span>{portfolioUrl}</span>
            </div>
            <div className={!githubUrl ? 'd-none' : 'd-flex' }>
                <i className="text-primary fa-lg mr4 fab fa-github"></i>
                <span>{githubUrl}</span>
            </div>
            <div className={!linkedInUrl ? 'd-none' : 'd-flex' }>
                <i className="text-primary fa-lg mr4 fab fa-linkedin-in"></i>
                <span>{linkedInUrl}</span>
            </div>
        </div>
    )
}

const Section = (sectionTitle, children) => (
    <section className="mt8">
        <span className="h5 text-bold text-primary">{sectionTitle}</span>
        <div className="divider"></div>
        <div>{children}</div>
    </section>
)

const Summary         = summary             => Section('Summary', summary)
const CareerObjective = careerObjective     => Section('Career Objective', careerObjective)
const Skills          = skills              => Section('Skills', <div className="resume-skills">{SkillIndex(skills)}</div>)
const Education       = educationArray      => Section('Education', EducationIndex(educationArray))
const WorkExperience  = workExperienceArray => Section('Work Experience', WorkExperienceIndex(workExperienceArray))
const Projects        = projectsArray       => Section('Projects', ProjectIndex(projectsArray))

const EducationIndex = (educationArray) => {
    return educationArray.map((education, index) => {
        return(
            <div className="resume-item" key={index}>
                <div className="flex-space-between">
                    <div className="flex-column">
                        <span className="text-bold">{education.schoolName}</span>
                        <span className="text-italic">{education.field}</span>
                    </div>
                    <div className="flex-column text-right">
                        <span>{`${education.startYear} - ${education.endYear}`}</span>
                        <span>{education.degree}</span>
                    </div>
                </div>    
            </div>
        )
    })
}

const WorkExperienceIndex = workExperienceArray => {
    return workExperienceArray.map((experience, index) => {
        let newSummary;
        if(experience.summary){
            newSummary = experience.summary.replace(/[*]/g, '<i class="text-primary far fa-dot-circle mr4"></i>');
        }
        return(
            <div className="resume-item" key={index}>
                <div className="flex-space-between">
                    <div className="flex-column">
                        <span className="text-bold">{experience.companyName}</span>
                        <span className="text-italic">{experience.title}</span>
                    </div>
                    <div className="flex-column">
                        <span>{`${experience.startYear} - ${experience.endYear}`}</span>
                    </div>
                </div>
                <div className={experience.summary ? 'job-post-description' : 'd-none' } dangerouslySetInnerHTML={{ __html: newSummary }}/>
            </div>
        )
    })
}

const ProjectIndex = projectsArray => {
    return projectsArray.map((project, index) => {
        let newSummary;
        if(project.summary){
            newSummary = project.summary.replace(/[*]/g, '<i class="text-primary far fa-dot-circle mr4"></i>');
        }
        return(
            <div className="resume-item" key={index}>
                <div className="flex-space-between">
                    <div className="flex-column">
                        <span className="text-bold">{project.projectName}</span>
                    </div>
                    <div className="flex-column">
                        <span>{project.url}</span>
                    </div>
                </div>
                <div className={project.summary ? 'job-post-description' : 'd-none' } dangerouslySetInnerHTML={{ __html: newSummary }}/>
                <div className="mt4">{renderProjectSkills(project.skills)}</div>
            </div>
        )
    })
}

const SkillIndex = skills => {    
    return skills.map((skill, index) => {
        return(
            <div className="resume-skill" key={index}>
                <i className="mr4 text-primary far fa-dot-circle"></i>{skill}
            </div>
        )
    })
}

const renderProjectSkills = skills => {
    return skills.map((skill, index) => {
        return <li className="chip" key={index}>{skill}</li>
    });
}

export default Resume;