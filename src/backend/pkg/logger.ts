import expressWinston from 'express-winston';
import winston from 'winston';

const config = {
    format: winston.format.json(),
    transports: [new winston.transports.Console()],
};
export const logger = winston.createLogger(config);

export const middlewareLogger = expressWinston.logger({ winstonInstance: logger });
