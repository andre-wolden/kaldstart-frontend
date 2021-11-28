import * as React from 'react';

import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import { AuthenticationWrapper } from './components/AuthenticationWrapper';
import { PrivateNotes } from './components/PrivateNotes';
import './app.less';

const App: React.FC = () => {
    return (
        <div>
            <div>Drawing a line...</div>

            <Router>
                <Routes>
                    <Route path={'/login'} element={<div>Login page</div>} />
                    <Route
                        path={'/private'}
                        element={
                            <AuthenticationWrapper>
                                <PrivateNotes />
                            </AuthenticationWrapper>
                        }
                    />
                    <Route index element={<div>Home</div>} />
                    <Route path={'*'} element={<div>Not found route</div>} />
                </Routes>
            </Router>
        </div>
    );
};

export default App;
