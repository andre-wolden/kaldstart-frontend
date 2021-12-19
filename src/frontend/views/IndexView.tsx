import React from 'react';

import { Link } from 'react-router-dom';

export const IndexView = () => {
    return (
        <div>
            <div>Home</div>
            <div>No authentication required</div>
            <p>
                <Link to={'/login'}>Log in</Link>
            </p>
            <p>
                <Link to={'/signup'}>Sign up</Link>
            </p>
        </div>
    );
};
