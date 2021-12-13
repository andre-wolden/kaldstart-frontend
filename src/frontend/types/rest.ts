import { SelfServiceLoginFlow } from '@ory/client/api';

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

export const isLoginDataResponse = (r: any): r is LoginDataResponse =>
    r && r.isauthenticated !== undefined && r.signupurl !== undefined && r.logouturl !== undefined;

export interface ErrorMessageResponse {
    message: string;
}
