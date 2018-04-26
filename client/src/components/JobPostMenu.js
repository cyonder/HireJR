import React from 'react';
import moment from 'moment';

const JobPostMenu = ({job}) => {
    let salaryText = '';
    let createdAt = moment(job.createdAt).fromNow(true);

    if(job.salary){
        salaryText = `${job.salary.paymentCycle}, ${job.salary.from}`
        if(job.salary.to){
            salaryText = `${job.salary.paymentCycle}, ${job.salary.from} - ${job.salary.to}`
        }
    }

    return(
        <ul className="menu">
            <li className="divider" data-content="SHORT"></li>
                { MenuItem(`${job.isActive ? 'Active' : 'Non-active'} since ${createdAt}`, 'fas fa-power-off') }
                { MenuItem(`${job.city}, ${job.province}`, 'fas fa-location-arrow') }
                { MenuItem(`${job.schedule}`, 'fas fa-clock') }
                { job.salary ? MenuItem(`${salaryText}`, 'fas fa-money-bill-alt') : null }
            <li className="divider" data-content="SKILLS"></li>
                { renderSkills(job.skills) }
            <li className="divider"></li>
            <li className="menu-item">
                <a href={job.employer.companyWebsite}>Company Website</a>
            </li>
        </ul>
    )
}

const MenuItem = (text, icon) => (
    <li className="menu-item">
        <i className={`mr4 text-primary ${icon}`}></i>{text}
    </li>
)

const renderSkills = skills => {
    let skillArray;

    if(!Array.isArray(skills)){
        let newSkills = skills.toString().replace(/^[,\s]+|[,\s]+$/g, '').replace(/,[,\s]*,/g, ',');
        skillArray = newSkills.split(',').map(skill => skill.trim())
    }else{
        skillArray = skills;
    }

    return skillArray.map((skill, index) => {
        return <li className="chip" key={index}>{skill}</li>
    });
}

export default JobPostMenu;
