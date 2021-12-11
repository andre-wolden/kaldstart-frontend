import { useEffect, useMemo, useState } from 'react';

import {
    failure,
    initial,
    isInitial,
    isSuccess,
    pending,
    // eslint-disable-next-line import/named
    RemoteData,
    success,
} from '@devexperts/remote-data-ts';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

import { Endpoints } from '../types/endpoints';
import { ErrorMessageResponse, InitFlowUrlResponse, LoginDataResponse } from '../types/rest';

function useQuery() {
    const { search } = useLocation();

    return useMemo(() => new URLSearchParams(search), [search]);
}

const fetchAsyncInitFlowUrlResponse = async (): Promise<
    RemoteData<ErrorMessageResponse, InitFlowUrlResponse>
> =>
    axios
        .get<RemoteData<ErrorMessageResponse, InitFlowUrlResponse>>(Endpoints.BFF_INIT_FLOW_URL)
        .then(res => res.data)
        .catch(e => failure({ message: JSON.stringify(e) }));

const fetchAsyncLoginDataResponse = async (
    flow: string
): Promise<RemoteData<ErrorMessageResponse, LoginDataResponse>> =>
    axios
        .get<RemoteData<ErrorMessageResponse, LoginDataResponse>>(
            `${Endpoints.BFF_LOGIN_DATA_API}?flow=${flow}`
        )
        .then(res => res.data)
        .catch(e => failure({ message: JSON.stringify(e) }));

const doNothing = () => {
    return;
};

export const useLogin = () => {
    const params = useQuery();
    const flow: string | null = params.get('flow');

    const [initFlowUrl, setInitFlowUrl] = useState<
        RemoteData<ErrorMessageResponse, InitFlowUrlResponse>
    >(flow ? success({ goto: '' }) : initial);
    useState<RemoteData<ErrorMessageResponse, LoginDataResponse>>(initial);

    const [loginDataResponse, setLoginDataResponse] =
        useState<RemoteData<ErrorMessageResponse, LoginDataResponse>>(initial);

    useEffect(() => {
        if (isInitial(initFlowUrl) && flow === null) {
            setInitFlowUrl(pending);
            fetchAsyncInitFlowUrlResponse().then(
                (res: RemoteData<ErrorMessageResponse, InitFlowUrlResponse>) => {
                    if (isSuccess(res)) {
                        window.location.href = res.value.goto;
                    }
                    setInitFlowUrl(res);
                }
            );
        }
        if (flow && isInitial(loginDataResponse)) {
            setLoginDataResponse(pending);
            fetchAsyncLoginDataResponse(flow).then(setLoginDataResponse);
        }
    }, [flow, params]);

    return {
        flow,
        initFlowUrl,
        loginDataResponse,
    };
};
