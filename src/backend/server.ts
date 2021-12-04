import path from 'path';

import bodyParser from 'body-parser';
import express, { Request, Response } from 'express';
import expressStaticGzip from 'express-static-gzip';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

import { buildPath, hostname, port } from './configuration';
import { createLoginRoute } from './routes/bff/loginRoute';

// eslint-disable-next-line
const webpackDevConfig = require('../webpack/webpack.dev');

const app = express();
const router = express.Router();

// app.use(middlewareLogger);

if (process.env.NODE_ENV === 'development') {
    const compiler = webpack(webpackDevConfig);
    app.use(
        webpackDevMiddleware(compiler, {
            publicPath: webpackDevConfig.output.publicPath,
            writeToDisk: true,
        })
    );
    app.use(webpackHotMiddleware(compiler));
} else {
    app.use('/assets', expressStaticGzip(path.join(process.cwd(), 'frontend_production'), {}));
}
/**
 * Proxy later
 */
// app.use(
//     '/api',
//     // ensureAuthenticated(authClient),
//     // attachToken(authClient),
//     // doPdfProxy()
// );

app.use(bodyParser.json({ limit: '1mb' }));
app.use(bodyParser.urlencoded({ limit: '1mb', extended: true }));
// app.use('/bff', createBffRoutes(router));
// app.use('/api', createApiRoutes(router));

app.get('/bff/login', createLoginRoute);

/**
 * serve index.html
 */
app.get('*', (_: Request, res: Response) => {
    res.sendFile('index.html', { root: path.join(process.cwd(), buildPath) });
});

app.listen(port, hostname, () => {
    console.log(`Listening on http://${hostname}:${port}`);
});
