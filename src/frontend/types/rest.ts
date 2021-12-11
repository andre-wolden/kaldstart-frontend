export interface InitFlowUrlResponse {
    goto: string;
}

export const isInitFlowUrlResponse = (r: any): r is InitFlowUrlResponse =>
    r && r.goto && typeof r.goto == 'string';

export interface LoginDataResponse {
    isAuthenticated: boolean;
    signUpUrl: string;
    logoutUrl: string;
    [key: string]: any;
}

export const isLoginDataResponse = (r: any): r is LoginDataResponse =>
    r && r.isauthenticated !== undefined && r.signupurl !== undefined && r.logouturl !== undefined;

export interface ErrorMessageResponse {
    message: string;
}
