import {useEffect, useState} from "react";
import {useMatch} from "react-router-dom";


export const useLogin = () => {

    const [flow, setFlow] = useState<string | undefined>(undefined)
    const [hasSetFlow, setHasSetFlow] = useState(false);

    const match = useMatch<"flowId">('flow=/:flowId');


    useEffect(() => {
        if (flow === undefined && hasSetFlow === false) {
            setFlow(match?.params.flowId ?? 'no-flow');
            setHasSetFlow(true)
        }
        if (flow === 'no-flow') {
            window.location.href = 'http://127.0.0.1:4433/self-service/login/browser';
        }
    }, [flow, hasSetFlow, match])

    return {
        flow
    }
}
