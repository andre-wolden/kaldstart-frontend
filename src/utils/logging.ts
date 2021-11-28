// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import fs from 'fs';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import winston from 'winston';

export enum LOG_LEVEL {
    ERROR = 3,
    WARNING = 2,
    INFO = 1,
    DEBUG = 0,
}

export type Meta = Record<string, unknown>;

export const envVar = (navn: string, påkrevd = true, defaultValue?: string): string => {
    const envVariable = process.env[navn];
    if (!envVariable && påkrevd && !defaultValue) {
        logError(`Mangler påkrevd miljøvariabel '${navn}'`);
        process.exit(1);
    }
    if (!envVariable && defaultValue) {
        return defaultValue;
    } else {
        return envVariable as string;
    }
};

export const stdoutLogger = winston.createLogger({
    format: winston.format.json(),
    level: envVar('LOG_LEVEL', false, 'info'),
    transports: [new winston.transports.Console()],
});

export const secureLogger = winston.createLogger({
    format: winston.format.json(),
    level: 'info',
});

export const logDebug = (message: string, meta: Meta = {}) => {
    stdoutLogger.debug(message, meta);
};

export const logInfo = (message: string, meta: Meta = {}) => {
    stdoutLogger.info(message, meta);
};

export const logWarn = (message: string, meta: Meta = {}) => {
    stdoutLogger.warn(message, meta);
};

export const logError = (message: string, err?: Error, meta: Meta = {}) => {
    stdoutLogger.error(message, { ...meta, ...(err && { message: `: ${err?.message || err}` }) });
};

export const logSecure = (message: string, meta: Meta = {}) => {
    secureLogger.info(message, meta);
};
