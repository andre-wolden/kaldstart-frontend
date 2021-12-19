import { Request, Response } from 'express';

import {
    ErrorMessageResponse,
    oryFlowRedirect,
    oryInitiateLoginResponse,
    OryResponse,
} from '../../../frontend/types/rest';
import { kratosPublicBaseUrl } from '../../configuration';
import { getUrlForFlow, isQuerySet, redirectOnSoftError } from '../../pkg';
import { logger } from '../../pkg/logger';
import { sdk } from '../../pkg/sdk';

export const getSignUpDataApi = async (req: Request, res: Response<OryResponse>) => {
    res.locals.projectName = 'Create account';

    const { flow, return_to = '' } = req.query;
    const initFlowUrl = getUrlForFlow(
        kratosPublicBaseUrl,
        'registration',
        new URLSearchParams({ return_to: return_to.toString() })
    );
    const initLoginUrl = getUrlForFlow(
        kratosPublicBaseUrl,
        'login',
        new URLSearchParams({
            return_to: return_to.toString(),
        })
    );

    // The flow is used to identify the settings and registration flow and
    // return data like the csrf_token and so on.
    if (!isQuerySet(flow)) {
        logger.debug('No flow ID found in URL query initializing login flow', {
            query: req.query,
        });
        res.send(oryFlowRedirect(initFlowUrl, 'No flow. Go get in the flow.'));
        return;
    }

    sdk.getSelfServiceRegistrationFlow(flow, req.header('Cookie'))
        .then(({ data: flow }) => {
            // Render the data using a view (e.g. Jade Template):
            res.render('registration', {
                ...flow,
                signInUrl: initLoginUrl,
            });
        })
        .catch(redirectOnSoftError(res, initFlowUrl));
};
