import { Application, NextFunction, Request, Response } from 'express';

import { kratosPublicBaseUrl } from '../../configuration';
import { getUrlForFlow, isQuerySet } from '../../pkg';
import { logger } from '../../pkg/logger';
import { sdk } from '../../pkg/sdk';

export const createLoginRoute = async (req: Request, res: Response) => {
    const { flow, aal = '', refresh = '', return_to = '' } = req.query;
    const initFlowUrl = getUrlForFlow(
        kratosPublicBaseUrl,
        'login',
        new URLSearchParams({
            aal: aal.toString(),
            refresh: refresh.toString(),
            return_to: return_to.toString(),
        })
    );

    // const initRegistrationUrl = getUrlForFlow(
    //     kratosPublicBaseUrl,
    //     'registration',
    //     new URLSearchParams({
    //         return_to: return_to.toString(),
    //     })
    // );

    // The flow is used to identify the settings and registration flow and
    // return data like the csrf_token and so on.
    if (!isQuerySet(flow)) {
        logger.debug('No flow ID found in URL query initializing login flow', {
            query: req.query,
        });
        // res.redirect(303, initFlowUrl);
        res.send({
            message: 'No flow ID found in URL query initializing login flow',
            goto: initFlowUrl,
        });
        return;
    }

    // It is probably a bit strange to have a logout URL here, however this screen
    // is also used for 2FA flows. If something goes wrong there, we probably want
    // to give the user the option to sign out!
    // const logoutUrl =
    //     (
    //         await sdk
    //             .createSelfServiceLogoutFlowUrlForBrowsers(req.header('cookie'))
    //             .catch(() => ({ data: { logout_url: '' } }))
    //     ).data.logout_url || '';

    // res.redirect('/asdf');

    res.end({ flow: flow });
    return;
};
