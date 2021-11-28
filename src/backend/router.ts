import path from 'path';

import { Response, Request, Router } from 'express';

import { buildPath } from './configuration';

export const createRoutes = (router: Router): Router => {
    router.get('/error', (_: Request, res: Response) => {
        res.sendFile('error.html', { root: path.join(`assets/`) });
    });

    // Feilhåndtering
    router.post('/logg-feil', (_: Request, res: Response) => {
        res.status(200).send();
    });

    // APP
    router.get('*', (_: Request, res: Response) => {
        res.sendFile('index.html', { root: path.join(process.cwd(), buildPath) });
    });

    return router;
};
