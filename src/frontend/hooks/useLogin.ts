import { useEffect, useMemo, useState } from 'react';

import axios from 'axios';
import { useLocation } from 'react-router-dom';

function useQuery() {
    const { search } = useLocation();

    return useMemo(() => new URLSearchParams(search), [search]);
}

export const useLogin = () => {
    const [flow, setFlow] = useState<any | string | undefined>(undefined);
    const [hasSetFlow, setHasSetFlow] = useState(false);

    // const match = useMatch<'flowId'>('flow=/:flowId');

    const params = useQuery();
    const flowParam: string | null = params.get('flow');
    console.warn(`params: ${JSON.stringify(params)}`);

    useEffect(() => {
        if (flowParam) {
            setFlow(params.get('flow'));
            return;
        } else {
            axios.get('/bff/login').then(res => {
                if (res && res.data && res.data.flow) {
                    setFlow(res.data);
                } else {
                    window.location.href = res.data.goto;
                }
            });
        }
    }, [flow, hasSetFlow, params]);

    return {
        flow,
    };
};
