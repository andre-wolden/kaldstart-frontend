import React from 'react';

import ReactJson from 'react-json-view';
import styled from 'styled-components';

import { useLogin } from '../hooks/useLogin';

export const StyledDiv = styled.div`
    margin-top: 1rem;
`;

export const LoginView: React.FC = () => {
    const { flow, initFlowUrl, loginDataResponse } = useLogin();

    return (
        <div>
            <div>Login view</div>
            <StyledDiv>flow</StyledDiv>
            <div>{JSON.stringify(flow)}</div>
            <StyledDiv>initFlowUrl</StyledDiv>
            <ReactJson src={initFlowUrl} />
            <StyledDiv>loginDataResponse:</StyledDiv>
            <ReactJson src={loginDataResponse} />
            <StyledDiv>END</StyledDiv>
        </div>
    );
};
