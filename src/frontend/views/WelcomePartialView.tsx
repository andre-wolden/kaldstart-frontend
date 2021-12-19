import React from 'react';

import { isFailure, isSuccess } from '@devexperts/remote-data-ts';
import ReactJson from 'react-json-view';

import { useWelcome } from '../hooks/useWelcome';
import { isOryWelcomeData } from '../types/rest';

export const WelcomePartialView = () => {
    const { remoteOryResponse } = useWelcome();

    return (
        <div>
            <h1>Welcome!!!! ffs</h1>
            {isSuccess(remoteOryResponse) && (
                <div>
                    <ReactJson src={remoteOryResponse.value} />
                    {isOryWelcomeData(remoteOryResponse.value) && (
                        <p>
                            <a href={remoteOryResponse.value.data.logoutUrl}>Logout</a>
                        </p>
                    )}
                </div>
            )}
            {isFailure(remoteOryResponse) && <div>failure</div>}
        </div>
    );
};
