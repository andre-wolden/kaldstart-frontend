import React from 'react';

import { RegistrationDataResponse } from '../types/rest';

interface Props {
    data: RegistrationDataResponse;
}

const RegistrationPartialView: React.FC<Props> = props => {
    const { data } = props;
    return (
        <div id="signup">
            <div>
                <h2>Create an account</h2>

                {/*{{ > messages messages=messages className="global"}}*/}

                {/*{{ > ui ui=ui}}*/}
            </div>
            <div className="card">
                <div className="card-action">
                    <a
                        className="typography-link typography-h2"
                        data-testid="cta-link"
                        href="{{signInUrl}}"
                    >
                        Sign in
                    </a>
                </div>
            </div>
        </div>
    );
};
