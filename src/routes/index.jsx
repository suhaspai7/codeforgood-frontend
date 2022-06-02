import React from 'react';
import { HashRouter as Router, Route, Routes, Redirect,BrowserRouter } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import Login from '../pages/Login';



export const history=createBrowserHistory();

const Routers=()=>{
    return(
        <BrowserRouter>
            <Routes>
                
                <Route path="login" element={<Login/>}/>
            </Routes>
       </BrowserRouter>

    )
}
export default Routers;
