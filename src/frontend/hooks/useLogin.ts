import { useEffect, useState } from 'react';

import { useMatch } from 'react-router-dom';

export const useLogin = () => {
    const [flow, setFlow] = useState<any | string | undefined>(undefined);
    const [hasSetFlow, setHasSetFlow] = useState(false);

    const match = useMatch<'flowId'>('flow=/:flowId');

    useEffect(() => {
        if (flow === undefined && !hasSetFlow) {
            window.location.href = 'http://127.0.0.1:4455/bff/login';
            // axios.get('/bff/login').then(res => {
            //     setFlow(res);
            // });
            setHasSetFlow(true);
        }
    }, [flow, hasSetFlow, match]);

    return {
        flow,
    };
};
