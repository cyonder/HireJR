import React, { Component } from 'react';

class CandidateListItem extends Component{
    constructor(){
        super();
        this.state = {
            togglable: false
        }
        this.toggle = this.toggle.bind(this);
    }

    toggle(){
        this.setState({
            togglable: !this.state.togglable
        })
    }

    render(){        
        const { header, body, footer } = this.props;
        return(
            <div className="list-item col-6 column">
                { ListItemHeader(header) }
                { ListItemBody(body) }
                { ListItemFooter(footer, this.state.togglable, this.toggle) }
            </div>
        )
    }
}

const ListItemHeader = header => (
    <div className="list-item-header">
        { ListItemIcon() }
        { ListItemTitle(header) }
        { ListItemAction(header) }
    </div>
)

const ListItemBody = body => (
    <div className="list-item-body">
        <div className="list-item-info">
            <i className="fas fa-at text-primary"></i>
            <span className="ml4">{body.email}</span>
        </div>
        <div className={`${body.province && body.city ? 'list-item-location' : 'd-none'}`}>
            <i className="fas fa-map-marker text-primary"></i>
            <span className="ml4">{`${body.city}, ${body.province}`}</span>
        </div>
    </div>
)

const ListItemFooter = (footer, togglable, toggle) => (
    <div className="list-item-footer mt4">
        <div className={ togglable ? 'expandable expanded' : 'expandable collapsed' }>
            {renderSkills(footer.skills)}
            {renderSummary(footer.summary)}
            {renderCareerObjective(footer.careerObjective)}
        </div>
        <a onClick={toggle} className="float-right mt4 c-hand">{ togglable ? 'Collapse' : 'Read More...' }</a>
    </div>
)

const ListItemIcon = () => (
    <div className="list-item-icon">
        <button className="btn btn-link"><i className="fas fa-file"></i></button>
    </div>
)

const ListItemTitle = ({title}) => (
    <div className="list-item-title">
        <span className="h4">{title}</span>
    </div>
)

const ListItemAction = ({portfolioUrl, githubUrl, linkedInUrl}) => (
    <div className="list-item-action">
        <button className={`btn btn-primary btn-sm ${!portfolioUrl ? 'd-none' : null}`}><i className="fas fa-link"></i></button>
        <button className={`btn btn-primary btn-sm ${!githubUrl ? 'd-none' : null}`}><i className="fab fa-github"></i></button>
        <button className={`btn btn-primary btn-sm ${!linkedInUrl ? 'd-none' : null}`}><i className="fab fa-linkedin-in"></i></button>
    </div>
)

const renderSkills = skills => {        
    return skills.map((skill, index) => {
        return <span className="chip" key={index}>{skill}</span>
    });    
}

const renderSummary = summary => ( 
    <div className="mt4">
        <div className="h6 text-bold">Summary</div>
        {summary}
    </div> 
)

const renderCareerObjective = careerObjective => ( 
    <div className="mt4">
        <div className="h6 text-bold">Career Objective</div>
        {careerObjective}
    </div> 
)

export default CandidateListItem;