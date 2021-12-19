import { Request, Response } from 'express';

import { oryWelcomeResponse } from '../../../frontend/types/rest';
import { sdk } from '../../pkg/sdk';

export const getWelcomeRoute = async (req: Request, res: Response) => {
    res.locals.projectName = 'Welcome to Ory';

    const session = req.session;

    // Create a logout URL
    const logoutUrl =
        (
            await sdk
                .createSelfServiceLogoutFlowUrlForBrowsers(req.header('cookie'))
                .catch(() => ({ data: { logout_url: '' } }))
        ).data.logout_url || '';

    res.send(
        oryWelcomeResponse({
            session: session
                ? JSON.stringify(session, null, 2)
                : `No valid Ory Session was found. Please sign in to receive one.`,
            hasSession: Boolean(session),
            logoutUrl,
        })
    );
};
