import React from 'react';

const Tile = props => {
    <div className="tile">
        { TileHeader(props.header) }
        { TileBody(props.body) }
        { TileFooter(props.footer) }
    </div>
}

const TileHeader = header => {
    <div className="tile-header">
        { TileIcon() }
        { TileTitle(header.title) }
        { TileAction(header.action) }
    </div>
}

const TileBody = body => {
    <div className="tile-body">
        <div className="tile-info">{body.info}</div>
        <div className="tile-location">{body.location}</div>
    </div>
}

const TileFooter = footer => {
    <div className="tile-skills">{footer.skills}</div>
}

const TileIcon = () => {
    <div className="tile-icon"></div>
}

const TileTitle = (title) => {
    <div className="tile-title">{title}</div>
}

const TileAction = () => {
    <div className="tile-action"></div>
}

export default Tile;
// listItem

// const tile = {
//     header: {
//         candidate: {
//             resumeLink: '',
//             name: '',
//             portfolioUrl: '',
//             githubUrl: '',
//             linkedInUrl: ''
//         },
//         employer: {
//             position: '',
//             companyWebsite: ''
//         }
//     },
//     body: {
//         candidate: {
//             email: '',
//             location: ''
//         },
//         employer: {
//             createdAt: '',
//             by: '',
//             location: ''
//         }
//     },
//     footer: {
//         skills: {}
//     },
// }

{/* <div className="tile">
    <div className="tile-header">
        <div className="resume-icon ?:"></div>
        <div className="name - position"></div>
        <div className="buttons - 1 or 3"></div>
    </div>
    <div className="tile-body">
        <div className="time - email"></div>
        <div className="location"></div>
    </div>
    <div className="tile-footer">
        <div className="skills"></div>
    </div>
</div> */}

