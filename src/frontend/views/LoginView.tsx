import React from 'react';

import { fold, RemoteData } from '@devexperts/remote-data-ts';
import ReactJson from 'react-json-view';

import { StyledDiv, StyledJsonDiv } from '../components/StyledComponents';
import { useLogin } from '../hooks/useLogin';
import { ErrorMessageResponse, LoginDataResponse } from '../types/rest';

// <fieldset
//     className="text-input-fieldset"
//     data-testid="node/input/{{attributes.name}}">
//     <label>
//     <span className="typography-h3">{{ getNodeLabel . }}{{#if attributes.required}}
//         <span className="required-indicator">*</span>{{/if}}
//             </span>
//             <input
//             class="text-input"
//             name="{{attributes.name}}"
//             type="{{attributes.type}}"
//             value="{{attributes.value}}"
//             placeholder="{{getNodeLabel .}}"
//         {{#if attributes.disabled}}disabled{{/if}}
//             />
//             </label>
//         {{#if messages}}
//             <div class="typography-caption">
//         {{> messages}}
//             </div>
//         {{/if}}
// </fieldset>

const loginForm = (loginDataResponse: RemoteData<ErrorMessageResponse, LoginDataResponse>) => {
    return fold(
        () => <StyledDiv>Initial, going to load stuff...</StyledDiv>,
        () => <StyledDiv>Loading...</StyledDiv>,
        (err: ErrorMessageResponse) => <StyledDiv>Error with login data</StyledDiv>,
        (loginData: LoginDataResponse) => (
            <StyledDiv>
                {/*<form action={loginDataResponse} <form action="{{ui.action}}" method="{{ui.method}}">>*/}
                {/*</form>*/}
                <form action={loginData.ui.action} method={loginData.ui.method}>
                    <StyledJsonDiv>{loginData.ui.messages}</StyledJsonDiv>
                    {loginData.ui.nodes.map(node => {
                        if (node.group === 'default') {
                            return (
                                <input
                                    name={node.attributes.name}
                                    type={'hidden'}
                                    value={node.attributes.value}
                                />
                            );
                        }
                        return (
                            <fieldset>
                                <label>
                                    {node.attributes.name}
                                    <input
                                        type={node.attributes.type}
                                        name={node.attributes.name}
                                    />
                                </label>
                            </fieldset>
                        );
                    })}
                </form>
            </StyledDiv>
        )
    )(loginDataResponse);
};

export const LoginView: React.FC = () => {
    const { flow, initFlowUrl, loginDataResponse } = useLogin();

    return (
        <div>
            <div>Login view</div>
            <StyledDiv>Login form:</StyledDiv>
            <StyledDiv>{loginForm(loginDataResponse)}</StyledDiv>
            <StyledDiv> ------------------------- </StyledDiv>
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
