import React from 'react';

import { LoginDataResponse } from '../types/rest';
import { toUiNodePartial } from '../utils/functions';

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
        <div className="auth app-container" id="login">
            <div className="card">
                {insertHeader()}
                {/*<Messages messages={data.ui.messages} />*/}

                {data.ui.nodes.map(node => toUiNodePartial(node))}

                {/*{{#if isAuthenticated}}*/}
                {/*    <div class="card">*/}
                {/*    <div class="card-action">*/}
                {/*    <a class="typography-link typography-h2" data-testid="logout-link" href="{{logoutUrl}}">Log out</a>*/}
                {/*    </div>*/}
                {/*    </div>*/}
                {/*{{else}}*/}
                {/*    <div class="card">*/}
                {/*    <div class="card-action">*/}
                {/*    <a class="typography-link typography-h2" data-testid="cta-link" href="{{signUpUrl}}">Create account</a>*/}
                {/*    </div>*/}
                {/*    </div>*/}
                {/*    <div class="card">*/}
                {/*    <div class="card-action">*/}
                {/*    <a class="typography-link typography-h2" data-testid="forgot-password" href="recovery">Recover*/}
                {/*    your account</a>*/}
                {/*    </div>*/}
                {/*    </div>*/}
                {/*{{/if}}*/}
            </div>
        </div>
    );
};
