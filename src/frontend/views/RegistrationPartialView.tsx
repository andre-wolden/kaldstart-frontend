import React from 'react';

import { RegistrationDataResponse } from '../types/rest';
import { toUiNodePartial } from '../utils/functions';
import { Messages } from './Messages';

interface Props {
    data: RegistrationDataResponse;
}

export const RegistrationPartialView: React.FC<Props> = props => {
    const { data } = props;

    return (
        <div className="auth app-container" id="signup">
            <div className="card">
                <h2>Create an account</h2>

                {data.ui.messages && <Messages messages={data.ui.messages} />}

                <form action={data.ui.action} method={data.ui.method}>
                    {data.ui.nodes.map(node => toUiNodePartial(node))}
                </form>
            </div>
            <div>
                <a href={data.signInUrl}>Sign in</a>
            </div>
        </div>
    );
};
