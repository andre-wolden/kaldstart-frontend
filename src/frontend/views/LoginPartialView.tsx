import React from 'react';

import { LoginDataResponse } from '../types/rest';
import { toUiNodePartial } from '../utils/functions';
import { Messages } from './Messages';

interface Props {
    data: LoginDataResponse;
}

export const LoginPartialView: React.FC<Props> = props => {
    const { data } = props;
    const insertHeader = () => {
        if (data.refresh) {
            return <h2>Confirm Action</h2>;
        } else if (data.requested_aal === 'aal2') {
            return <h2>Two-Factor Authentication</h2>;
        } else {
            return <h2>Sign In</h2>;
        }
    };

    return (
        <div>
            <div>
                {insertHeader()}
                {data.ui.messages && <Messages messages={data.ui.messages} />}

                <form action={data.ui.action} method={data.ui.method}>
                    {data.ui.nodes.map(node => toUiNodePartial(node))}
                </form>

                {data.isAuthenticated ? (
                    <div>
                        <a href={data.logoutUrl}>Log out</a>
                    </div>
                ) : (
                    <div>
                        <div>
                            <a
                                className="typography-link typography-h2"
                                data-testid="cta-link"
                                href={data.signUpUrl}
                            >
                                Create account
                            </a>
                        </div>
                        <div>
                            <a
                                className="typography-link typography-h2"
                                data-testid="forgot-password"
                                href="recovery-todo"
                            >
                                Recover your account
                            </a>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
