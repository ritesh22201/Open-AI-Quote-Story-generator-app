import React from 'react';
import {Navigate} from 'react-router-dom';

const PrivateRoute = ({children}:any) => {
    const value: string | null = localStorage.getItem('token');
    const token: {[key : string] : any} | null = value ? JSON.parse(value) : null;
 
    return token ? children : <Navigate to={'/login'}/>
}

export default PrivateRoute;