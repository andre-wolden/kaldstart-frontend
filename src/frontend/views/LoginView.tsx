import React from 'react';

import { fold } from '@devexperts/remote-data-ts';

import { useLogin } from '../hooks/useLogin';
import { isOryFlowRedirect, isOryInitiateLoginResponse, OryResponse } from '../types/rest';
import { LoginPartialView } from './LoginPartialView';

export const LoginView: React.FC = () => {
    const { remoteOryResponse } = useLogin();

    return (
        <div>
            <h1>Login view</h1>
            {fold(
                () => <div>Initial...</div>,
                () => <div>Pending...</div>,
                error => <div>{JSON.stringify(error)}</div>,
                (oryResponse: OryResponse) => {
                    if (isOryFlowRedirect(oryResponse)) {
                        return <div>redirecting...</div>;
                    }
                    if (isOryInitiateLoginResponse(oryResponse)) {
                        return (
                            <div>
                                <LoginPartialView data={oryResponse.data} />
                            </div>
                        );
                    }
                }
            )(remoteOryResponse)}
        </div>
    );
};
