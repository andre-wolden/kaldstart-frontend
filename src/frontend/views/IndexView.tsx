import React from 'react';

import { Link } from 'react-router-dom';

export const IndexView = () => {
    return (
        <div>
            <div>Home</div>
            <div>No authentication required</div>
            <div>
                <Link to={'/login'}>Go to login</Link>
            </div>
        </div>
    );
};
