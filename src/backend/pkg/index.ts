export const removeTrailingSlash = (s: string) => s.replace(/\/$/, '');

export const getUrlForFlow = (base: string, flow: string, query?: URLSearchParams): string =>
    `${removeTrailingSlash(base)}/self-service/${flow}/browser${
        query ? `?${query.toString()}` : ''
    }`;

export const isQuerySet = (x: any): x is string => typeof x === 'string' && x.length > 0;
