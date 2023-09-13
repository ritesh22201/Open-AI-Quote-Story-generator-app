import React from 'react';
import {Routes, Route} from 'react-router-dom';
import Prompt from '../Pages/Prompt';
import PrivateRoute from './PrivateRoute';
import Login from '../Pages/Login';
import Signup from '../Pages/Signup';

const AllRoutes = () => {
  return (
    <Routes>
        <Route path='/' element={<PrivateRoute>
            <Prompt/>
        </PrivateRoute>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/login' element={<Login/>}/>
    </Routes>
  )
}

export default AllRoutes;