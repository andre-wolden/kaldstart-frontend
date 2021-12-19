import { AxiosError } from 'axios';
import { Response } from 'express';

import { kratosPublicBaseUrl } from '../../common/configuration';
import { RouteOptionsCreator } from './route';
import { sdk } from './sdk';

export const removeTrailingSlash = (s: string) => s.replace(/\/$/, '');

export const getUrlForFlow = (base: string, flow: string, query?: URLSearchParams): string =>
    `${removeTrailingSlash(base)}/self-service/${flow}/browser${
        query ? `?${query.toString()}` : ''
    }`;

export const isQuerySet = (x: any): x is string => typeof x === 'string' && x.length > 0;

// Redirects to the specified URL if the error is an AxiosError with a 404, 410,
// or 403 error code.
export const redirectOnSoftError = (res: Response, redirectTo: string) => (err: AxiosError) => {
    if (!err.response) {
        return;
    }

    if (err.response.status === 404 || err.response.status === 410 || err.response.status === 403) {
        res.redirect(`${redirectTo}`);
    }
    return;
};

export const defaultConfig: RouteOptionsCreator = () => {
    return {
        apiBaseUrl: kratosPublicBaseUrl,
        kratosBrowserUrl: kratosPublicBaseUrl,
        sdk,
    };
};
