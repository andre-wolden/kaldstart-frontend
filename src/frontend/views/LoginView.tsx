import React from 'react';

import { isSuccess } from '@devexperts/remote-data-ts';
import ReactJson from 'react-json-view';

import { StyledDiv, StyledJsonDiv } from '../components/StyledComponents';
import { useLogin } from '../hooks/useLogin';
import { LoginPartialView } from './LoginPartialView';

export const LoginView: React.FC = () => {
    const { flow, initFlowUrl, loginDataResponse } = useLogin();

    return (
        <div>
            <h1>Login view</h1>
            {isSuccess(loginDataResponse) && (
                <div>
                    <LoginPartialView data={loginDataResponse.value} />
                </div>
            )}
            <h3>Debug stuff:</h3>
            <StyledDiv>flow</StyledDiv>
            <div>{JSON.stringify(flow)}</div>
            <StyledDiv>initFlowUrl</StyledDiv>
            <ReactJson src={initFlowUrl} />
            <StyledDiv>loginDataResponse:</StyledDiv>
            <StyledJsonDiv>
                <ReactJson src={loginDataResponse} />
            </StyledJsonDiv>
            <StyledDiv>END</StyledDiv>
        </div>
    );
};
