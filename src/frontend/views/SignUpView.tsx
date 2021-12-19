import React from 'react';

import { fold } from '@devexperts/remote-data-ts';

import { useSignUp } from '../hooks/useSignUp';
import { isOryFlowRedirect, isOryInitiateSignUpResponse, OryResponse } from '../types/rest';
import { SignUpPartialView } from './SignUpPartialView';

export const SignUpView: React.FC = () => {
    const { remoteOrySignUpResponse } = useSignUp();

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
                    if (isOryInitiateSignUpResponse(oryResponse)) {
                        return (
                            <div>
                                <SignUpPartialView data={oryResponse.data} />
                            </div>
                        );
                    }
                }
            )(remoteOrySignUpResponse)}
        </div>
    );
};
