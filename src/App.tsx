import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import {PrivateNotes} from "./components/PrivateNotes";
import {AuthenticationWrapper} from "./components/AuthenticationWrapper";


const App = () => {


    return (
        <Router>
            <Routes>
                <Route path={'/login'} element={<div>Login page</div>}/>
                <Route path={'/private'} element={
                    <AuthenticationWrapper>
                        <PrivateNotes />
                    </AuthenticationWrapper>
                }/>
                <Route index element={<div>Home</div>}/>
                <Route path={'*'} element={<div>Not found route</div>}/>
            </Routes>
        </Router>
    )


};

export default App;
