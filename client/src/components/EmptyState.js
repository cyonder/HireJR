import React from 'react';

// const style = { boxShadow: 'none' }
const style = {}

const EmptyState = (props) => (
    <div className={props.shouldHide ? 'd-none' : 'empty'} style={style}>
        { EmptyIcon(props.icon) }
        { EmptyTitle(props.title) }
        { EmptySubtitle(props.subtitle) }
    </div>
);

const EmptyIcon = (icon) => (
    <div className="empty-icon">
        <i className={`icon icon-3x ${icon}`}></i>
    </div>
);

const EmptyTitle = (title) => (
    <p className="empty-title h5">{ title }</p>
);

const EmptySubtitle = (subtitle) => (
    <p className="empty-subtitle">{ subtitle }</p>
);

export default EmptyState;
