import React from 'react';

import { useLogin } from '../hooks/useLogin';

export const LoginView: React.FC = () => {
    const { flow } = useLogin();

    return (
        <div>
            <div>Login view</div>
            <div>Flow: {JSON.stringify(flow)}</div>
        </div>
    );
};
