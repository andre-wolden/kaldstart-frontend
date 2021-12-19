import { useEffect, useState } from 'react';

import {
    failure,
    initial,
    isInitial,
    pending,
    RemoteData,
    success,
} from '@devexperts/remote-data-ts';
import { AxiosError, AxiosResponse } from 'axios';

import { Endpoints } from '../../common/endpoints';
import { isOryFlowRedirect, isOryWelcomeData, OryResponse } from '../types/rest';
import { fetchOryResponse } from '../utils/api';
import { useQuery } from '../utils/functions';

interface WelcomeData {
    remoteOryResponse: RemoteData<AxiosError, OryResponse>;
}

export const useWelcome = (): WelcomeData => {
    const params: URLSearchParams = useQuery();
    const queryParams = params.toString();

    const [remoteOryResponse, setRemoteOryResponse] =
        useState<RemoteData<AxiosError, OryResponse>>(initial);

    useEffect(() => {
        if (isInitial(remoteOryResponse)) {
            setRemoteOryResponse(pending);
            fetchOryResponse(queryParams, Endpoints.BFF_WELCOME_DATA_API)
                .then(({ data: oryResponse }: AxiosResponse<OryResponse>) => {
                    if (isOryFlowRedirect(oryResponse)) {
                        window.location.href = oryResponse.redirectTo;
                    } else if (isOryWelcomeData(oryResponse)) {
                        setRemoteOryResponse(success(oryResponse));
                    } else {
                        // TODO: Log error! shouldn't be possible
                    }
                })
                .catch((e: AxiosError) => setRemoteOryResponse(failure(e)));
        }
    }, [remoteOryResponse, params]);

    return {
        remoteOryResponse,
    };
};
