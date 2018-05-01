import React from 'react';

import EmptyState from './EmptyState';

const NotFound = () => (
    <div className="container grid-sm">
        <EmptyState title="404 Page not found!" subtitle="We can't seem to find the page you are looking for!" icon="icon-cross"/>
    </div>
)

export default NotFound;