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
    isOryInitiateRegistrationResponse,
    OryResponse,
} from '../types/rest';
import { fetchOryResponse } from '../utils/api';

function useQuery() {
    const { search } = useLocation();
    return useMemo(() => new URLSearchParams(search), [search]);
}

export interface SignUpData {
    remoteOryRegistrationResponse: RemoteData<AxiosError, OryResponse>;
}

export const useRegistration = (): SignUpData => {
    const params: URLSearchParams = useQuery();
    const queryParams = params.toString();

    const [remoteOryRegistrationResponse, setRemoteOrySignUpResponse] =
        useState<RemoteData<AxiosError, OryResponse>>(initial);

    useEffect(() => {
        if (isInitial(remoteOryRegistrationResponse)) {
            setRemoteOrySignUpResponse(pending);
            fetchOryResponse(queryParams, Endpoints.BFF_SIGNUP_DATA_API)
                .then(({ data: oryResponse }: AxiosResponse<OryResponse>) => {
                    if (isOryFlowRedirect(oryResponse)) {
                        window.location.href = oryResponse.redirectTo;
                    } else if (isOryInitiateRegistrationResponse(oryResponse)) {
                        setRemoteOrySignUpResponse(success(oryResponse));
                    } else {
                        // TODO: Log error! shouldn't be possible
                    }
                })
                .catch((e: AxiosError) => setRemoteOrySignUpResponse(failure(e)));
        }
    }, [remoteOryRegistrationResponse, params]);

    return {
        remoteOryRegistrationResponse,
    };
};
