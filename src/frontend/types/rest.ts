import { SelfServiceLoginFlow, SelfServiceRegistrationFlow } from '@ory/kratos-client';

export interface InitFlowUrlResponse {
    goto: string;
}

export const isInitFlowUrlResponse = (r: any): r is InitFlowUrlResponse =>
    r && r.goto && typeof r.goto == 'string';

export interface LoginDataResponse extends SelfServiceLoginFlow {
    isAuthenticated: boolean;
    signUpUrl: string;
    logoutUrl: string;
}

export interface RegistrationDataResponse extends SelfServiceRegistrationFlow {
    signInUrl: string;
}

export const isLoginDataResponse = (r: any): r is LoginDataResponse =>
    r && r.isauthenticated !== undefined && r.signupurl !== undefined && r.logouturl !== undefined;

export interface ErrorMessageResponse {
    message: string;
}

/**
 * Disjoint union ory respone
 */

export type OryFlowRedirect = {
    readonly type: 'OryFlowRedirect';
    readonly redirectTo: string;
    readonly message?: string;
};

export type OryInitiateLoginResponse = {
    readonly type: 'OryInitiateLoginResponse';
    readonly data: LoginDataResponse;
};

export type OryResponse = OryFlowRedirect | OryInitiateLoginResponse;

export const oryFlowRedirect = (redirectTo: string, message?: string): OryResponse => ({
    type: 'OryFlowRedirect',
    redirectTo,
    message,
});
export const isOryFlowRedirect = (response: OryResponse): response is OryFlowRedirect =>
    response.type === 'OryFlowRedirect';

export const oryInitiateLoginResponse = (data: LoginDataResponse): OryResponse => ({
    type: 'OryInitiateLoginResponse',
    data,
});
export const isOryInitiateLoginResponse = (
    response: OryResponse
): response is OryInitiateLoginResponse => response.type === 'OryInitiateLoginResponse';
