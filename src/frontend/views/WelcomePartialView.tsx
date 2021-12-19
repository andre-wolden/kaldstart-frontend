import React from 'react';

import { isSuccess } from '@devexperts/remote-data-ts';
import ReactJson from 'react-json-view';

import { useWelcome } from '../hooks/useWelcome';

export const WelcomePartialView = () => {
    const { remoteOryResponse } = useWelcome();

    return (
        <div>
            <h1>Welcome!!!! ffs</h1>
            {isSuccess(remoteOryResponse) && <ReactJson src={remoteOryResponse.value} />}
        </div>
    );
};
