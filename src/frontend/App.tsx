import * as React from 'react';

import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import styled from 'styled-components';

import { AuthenticationWrapper } from './components/AuthenticationWrapper';
import { PrivateNotes } from './components/PrivateNotes';
import { IndexView } from './views/IndexView';
import { LoginView } from './views/LoginView';
import { LogoutButton } from './views/LogoutButton';
import { NotFoundView } from './views/NotFoundView';
import './app.less';
import { RegistrationView } from './views/RegistrationView';
import { WelcomeView } from './views/WelcomeView';

const Header = styled.div`
    border: 1px dotted red;
    margin-bottom: 1rem;
`;

const App: React.FC = () => {
    return (
        <div>
            <Header>Kaldstart</Header>

            <Router>
                <Routes>
                    <Route path={'/login'} element={<LoginView />} />
                    <Route path={'/registration'} element={<RegistrationView />} />
                    <Route path={'/welcome'} element={<WelcomeView />} />
                    <Route
                        path={'/private'}
                        element={
                            <AuthenticationWrapper>
                                <PrivateNotes />
                            </AuthenticationWrapper>
                        }
                    />
                    <Route index element={<IndexView />} />
                    <Route path={'*'} element={<NotFoundView />} />
                </Routes>
            </Router>
        </div>
    );
};

export default App;
