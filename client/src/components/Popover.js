import React from 'react';

import Card from './Card';

const Popover = (props) => (
    <div className="popover popover-right">
        <span className="popover-button rounded">?</span>
        <div className="popover-container">
            <Card>
                {props.content}
            </Card>
        </div>
    </div>
)

export default Popover;
