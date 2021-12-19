import { useEffect, useMemo, useState } from 'react';

import {
    failure,
    initial,
    isInitial,
    pending,
    RemoteData,
    success,
} from '@devexperts/remote-data-ts';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { useLocation } from 'react-router-dom';

import { Endpoints } from '../../common/endpoints';
import { isOryFlowRedirect, isOryInitiateLoginResponse, OryResponse } from '../types/rest';

function useQuery() {
    const { search } = useLocation();
    return useMemo(() => new URLSearchParams(search), [search]);
}

const fetchAsyncInitFlowUrlResponse = async (
    queryParams: string
): Promise<AxiosResponse<OryResponse, any>> =>
    axios.get<OryResponse>(`${Endpoints.BFF_LOGIN_DATA_API}?${queryParams}`);

interface LoginData {
    remoteOryResponse: RemoteData<AxiosError, OryResponse>;
}

export const useLogin = (): LoginData => {
    const params: URLSearchParams = useQuery();
    const queryParams = params.toString();

    const [remoteOryResponse, setRemoteOryResponse] =
        useState<RemoteData<AxiosError, OryResponse>>(initial);

    useEffect(() => {
        if (isInitial(remoteOryResponse)) {
            setRemoteOryResponse(pending);
            fetchAsyncInitFlowUrlResponse(queryParams)
                .then(({ data: oryResponse }: AxiosResponse<OryResponse>) => {
                    if (isOryFlowRedirect(oryResponse)) {
                        window.location.href = oryResponse.redirectTo;
                    } else if (isOryInitiateLoginResponse(oryResponse)) {
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
