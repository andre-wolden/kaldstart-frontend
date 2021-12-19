import axios, { AxiosResponse } from 'axios';

import { Endpoints } from '../../common/endpoints';
import { OryResponse } from '../types/rest';

export const fetchOryResponse = async (
    queryParams: string,
    path: Endpoints
): Promise<AxiosResponse<OryResponse>> => {
    const queryString = queryParams !== '' ? `?${queryParams}` : '';
    return axios.get<OryResponse>(`${path}${queryString}`);
};
