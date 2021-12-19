import React from 'react';

import { fold } from '@devexperts/remote-data-ts';

import { useRegistration } from '../hooks/useRegistration';
import { isOryFlowRedirect, isOryInitiateRegistrationResponse, OryResponse } from '../types/rest';
import { RegistrationPartialView } from './RegistrationPartialView';

export const RegistrationView: React.FC = () => {
    const { remoteOryRegistrationResponse } = useRegistration();

    return (
        <div>
            <div>Sign up</div>
            {fold(
                () => <div>Initial...</div>,
                () => <div>Pending...</div>,
                error => <div>{JSON.stringify(error)}</div>,
                (oryResponse: OryResponse) => {
                    if (isOryFlowRedirect(oryResponse)) {
                        return <div>redirecting...</div>;
                    }
                    if (isOryInitiateRegistrationResponse(oryResponse)) {
                        return (
                            <div>
                                <RegistrationPartialView data={oryResponse.data} />
                            </div>
                        );
                    }
                }
            )(remoteOryRegistrationResponse)}
        </div>
    );
};
