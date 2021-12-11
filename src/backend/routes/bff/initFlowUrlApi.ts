import { RemoteData, success } from '@devexperts/remote-data-ts';
import { Request, Response } from 'express';

import { ErrorMessageResponse, InitFlowUrlResponse } from '../../../frontend/types/rest';
import { kratosPublicBaseUrl } from '../../configuration';
import { getUrlForFlow } from '../../pkg';

export const getInitFlowUrlApi = (
    req: Request,
    res: Response<RemoteData<ErrorMessageResponse, InitFlowUrlResponse>>
) => {
    const { aal = '', refresh = '', return_to = '' } = req.query;
    const initFlowUrl: string = getUrlForFlow(
        kratosPublicBaseUrl,
        'login',
        new URLSearchParams({
            aal: aal.toString(),
            refresh: refresh.toString(),
            return_to: return_to.toString(),
        })
    );
    return res.send(success({ goto: initFlowUrl }));
};
