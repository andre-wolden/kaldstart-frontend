import React from 'react';

import { Link } from 'react-router-dom';

import { WelcomePartialView } from './WelcomePartialView';

export const WelcomeView = () => {
    return (
        <div>
            <WelcomePartialView />

            <p>
                <Link to={'/'}>Home</Link>
            </p>
        </div>
    );
};
