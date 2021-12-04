import React from 'react';

import { Link } from 'react-router-dom';

export const NotFoundView: React.FC = () => {
    return (
        <div>
            <div>Not found</div>
            <Link to={'/login'}>Go to homepage</Link>
        </div>
    );
};
