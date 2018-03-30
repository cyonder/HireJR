import React from 'react';

const Card = (props) => (
    <div className={props.noBackground ? 'with-no-background card' : 'card'}>
        { props.title ? CardHeader(props) : false }
        { CardBody(props) }
    </div>
);

const CardHeader = (props) => (
    <div className="card-header">
        { CardTitle(props.title) }
        { CardSubtitle(props.subtitle) }
    </div>
);

const CardBody = (props) => (
    <div className="card-body">
        { props.children }
    </div>
);

const CardTitle = (title) => (
    <div className="card-title h5">{ title }</div>
);

const CardSubtitle = (subtitle) => (
    <div className="card-subtitle text-gray">{ subtitle }</div>
);

export default Card;
