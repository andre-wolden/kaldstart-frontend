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
import {
    isOryFlowRedirect,
    isOryInitiateLoginResponse,
    isOryInitiateSignUpResponse,
    OryResponse,
} from '../types/rest';
import { fetchOryResponse } from '../utils/api';

function useQuery() {
    const { search } = useLocation();
    return useMemo(() => new URLSearchParams(search), [search]);
}

export interface SignUpData {
    remoteOrySignUpResponse: RemoteData<AxiosError, OryResponse>;
}

export const useSignUp = (): SignUpData => {
    const params: URLSearchParams = useQuery();
    params.append('return_to', 'signup');
    const queryParams = params.toString();

    const [remoteOrySignUpResponse, setRemoteOrySignUpResponse] =
        useState<RemoteData<AxiosError, OryResponse>>(initial);

    useEffect(() => {
        if (isInitial(remoteOrySignUpResponse)) {
            setRemoteOrySignUpResponse(pending);
            fetchOryResponse(queryParams, Endpoints.BFF_SIGNUP_DATA_API)
                .then(({ data: oryResponse }: AxiosResponse<OryResponse>) => {
                    if (isOryFlowRedirect(oryResponse)) {
                        window.location.href = oryResponse.redirectTo;
                    } else if (isOryInitiateSignUpResponse(oryResponse)) {
                        setRemoteOrySignUpResponse(success(oryResponse));
                    } else {
                        // TODO: Log error! shouldn't be possible
                    }
                })
                .catch((e: AxiosError) => setRemoteOrySignUpResponse(failure(e)));
        }
    }, [remoteOrySignUpResponse, params]);

    return {
        remoteOrySignUpResponse,
    };
};
