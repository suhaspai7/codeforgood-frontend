import React from 'react';
import { HashRouter as Router, Route, Routes, Redirect,BrowserRouter } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import Login from '../pages/Login';
import SignUp from '../pages/SignUp';


export const history=createBrowserHistory();

const Routers=()=>{
    return(
        <BrowserRouter>
            <Routes>
                
                <Route path="signin" element={<Login/>}/>
                <Route path="signup" element={<SignUp/>}/>
            </Routes>
       </BrowserRouter>

    )
}
export default Routers;
