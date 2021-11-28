import path from 'path';

import bodyParser from 'body-parser';
import express from 'express';
import expressStaticGzip from 'express-static-gzip';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

import { hostname, port } from './configuration';
import { middlewareLogger } from './pkg/logger';
import { createRoutes } from './router';

// eslint-disable-next-line
const webpackDevConfig = require('../webpack/webpack.dev');

const app = express();
const router = express.Router();

app.use(middlewareLogger);

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

// app.use(
//     '/api',
//     // ensureAuthenticated(authClient),
//     // attachToken(authClient),
//     // doPdfProxy()
// );

app.use(bodyParser.json({ limit: '200mb' }));
app.use(bodyParser.urlencoded({ limit: '200mb', extended: true }));
app.use('/', createRoutes(router));

app.listen(port, hostname, () => {
    console.log(`Listening on http://${hostname}:${port}`);
});
