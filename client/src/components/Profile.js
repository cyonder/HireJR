import React, { Component } from 'react';

class Profile extends Component{
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
            <div className="profile">
                { Header(header) }
                { Summary(candidateProfile.summary) }
                { CareerObjective(candidateProfile.careerObjective) }
                { Skills(candidateProfile.skills) }
                { Education(education) }
                { WorkExperience(workExperience) }
                { Projects(projects) }
            </div>
        )
    }
}

const Header = header => {
    return(
        <div className="profile-header">
            <div>
                { Name(header.firstName, header.lastName) }
                { Title(header.title) }
            </div>
            { Information(header.information) }
        </div>
    )
}

const Information = ({city, province, email, portfolioUrl, githubUrl, linkedInUrl}) => {
    return(
        <div className="profile-info">
            <div className={`d-flex ${!city ? 'd-none' : null}`}>
                <i className="text-primary fa-lg mr4 fas fa-map-marker"></i>
                <span>{`${city}, ${province}`}</span>
            </div>
            <div className={`d-flex ${!email ? 'd-none' : null}`}>
                <i className="text-primary fa-lg mr4 far fa-envelope-open"></i>
                <span>{email}</span>
            </div>
            <div className={`d-flex ${!portfolioUrl ? 'd-none' : null}`}>
                <i className="text-primary fa-lg mr4 fas fa-link"></i>
                <span>{portfolioUrl}</span>
            </div>
            <div className={`d-flex ${!githubUrl ? 'd-none' : null}`}>
                <i className="text-primary fa-lg mr4 fab fa-github"></i>
                <span>{githubUrl}</span>
            </div>
            <div className={`d-flex ${!linkedInUrl ? 'd-none' : null}`}>
                <i className="text-primary fa-lg mr4 fab fa-linkedin-in"></i>
                <span>{linkedInUrl}</span>
            </div>
        </div>
    )
}

const Name = (firstName, lastName) => {
    return <div className="h3 text-bold">{`${firstName} ${lastName}`}</div>
}

const Title = title => {
    return <div className="h4">{title}</div>
}

const Summary = summary => {
    return (
        <section className="profile-section">
            { SectionTitle('Summary') }
            <div className="divider"></div>
            <div>{summary}</div>
        </section>
    )
}

const CareerObjective = careerObjective => {
    return (
        <section className="profile-section">
            { SectionTitle('Career Objective') }
            <div className="divider"></div>
            <div>{careerObjective}</div>
        </section>
    )
}

const Skills = skills => {
    return(
        <section className="profile-section">
            { SectionTitle('Skills') }
            <div className="divider"></div>
            <div className="profile-skills">{renderSkills(skills)}</div>
        </section>
    )
}

const renderSkills = skills => {
    return skills.map(skill => {
        return(
            <div className="profile-skill">
                <i className="mr4 text-primary far fa-dot-circle"></i>{skill}
            </div>
        )
    })
}

const Education = educationArray => {
    return(
        <section className="profile-section">
            { SectionTitle('Education') }
            <div className="divider"></div>
            {renderEducation(educationArray)}
        </section>
    )
}

const renderEducation = educationArray => {
    return educationArray.map(education => {
        return(
            <div className="profile-education">
                <div className="row">
                    <span>{education.schoolName}</span>
                    <span>{education.field}</span>
                </div>
                <div className="row">
                    <span>{`${education.startYear} - ${education.endYear}`}</span>
                    <span>{education.degree}</span>
                </div>
            </div>
        )
    })
}

const WorkExperience = workExperienceArray => {
    return(
        <section className="profile-section">
            { SectionTitle('Work Experience') }
            <div className="divider"></div>
            {renderWorkExperience(workExperienceArray)}
        </section>
    )
}

const renderWorkExperience = workExperienceArray => {
    return workExperienceArray.map(experience => {
        return(
            <div className="profile-education">
                <div className="row">
                    <span>{experience.companyName}</span>
                    <span>{experience.title}</span>
                </div>
                <div className="row">
                    <span>{`${experience.startYear} - ${experience.endYear}`}</span>
                    <span></span>
                </div>
            </div>
        )
    })
}

const Projects = projectsArray => {
    return(
        <section className="profile-section">
            { SectionTitle('Projects') }
            <div className="divider"></div>
            {renderProjects(projectsArray)}
        </section>
    )
}

const renderProjects = projectsArray => {
    return projectsArray.map(project => {
        return(
            <div className="profile-education">
                <div className="row">
                    <span>{project.projectName}</span>
                    <span>{project.url}</span>
                </div>
                <div className="row">
                    <span>{project.description}</span>
                    <span></span>
                </div>
            </div>
        )
    })
}

const SectionTitle = sectionTitle => {
    return <span className="h5 text-bold text-primary">{sectionTitle}</span>
} 

export default Profile;