import path from 'path';

import { Response, Request, Router } from 'express';

import { buildPath } from './configuration';
import { createMessagesRoute } from './routes/api';
import { createLoginRoute } from './routes/bff/loginRoute';

// export const createBffRoutes = (router: Router): Router => {
//     router.get('/login', createLoginRoute);
//
//     return router;
// };

export const createApiRoutes = (router: Router): Router => {
    router.get('/messages', createMessagesRoute);

    return router;
};
