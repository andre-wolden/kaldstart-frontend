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
import { fetchOryResponse } from '../utils/api';

function useQuery() {
    const { search } = useLocation();
    return useMemo(() => new URLSearchParams(search), [search]);
}

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
            fetchOryResponse(queryParams, Endpoints.BFF_LOGIN_DATA_API, { withCredentials: true })
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
