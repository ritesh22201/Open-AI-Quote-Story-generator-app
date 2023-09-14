import axios from "axios";
import { AUTH_REQ, AUTH_REQ_FAILURE, AUTH_REQ_SUCCESS, LOGIN_REQ_SUCCESS } from "./actionTypes";
import { LoginType } from "../../Pages/Login";

export interface PayloadType {
    name: string;
    email: string;
    password: string;
}

export const signup = (payload: PayloadType) => (dispatch: any) => {
    dispatch({ type: AUTH_REQ });
    axios.post('https://quote-generator-app-4rug.onrender.com/user/register', payload)
        .then(res => {
            // console.log(res.data)
            dispatch({ type: AUTH_REQ_SUCCESS, payload: res.data.msg });
        })
        .catch(err => {
            dispatch({ type: AUTH_REQ_FAILURE, payload: err.response.data.msg });
        })
}

export const login = (payload: LoginType) => (dispatch: any) => {
    dispatch({ type: AUTH_REQ });
    axios.post('https://quote-generator-app-4rug.onrender.com/user/login', payload)
        .then(res => {
            if (res.data.token) {
                localStorage.setItem('token', JSON.stringify(res.data));
            }
            dispatch({ type: LOGIN_REQ_SUCCESS, payload: res.data.msg });
        })
        .catch(err => {
            dispatch({ type: AUTH_REQ_FAILURE, payload: err.response.data.msg });
        })
}

export const logout = () => (dispatch: any) => {
    dispatch({ type: AUTH_REQ });
    axios.post('https://quote-generator-app-4rug.onrender.com/user/logout')
        .then(res => {
            console.log(res);
            // dispatch({ type: LOGIN_REQ_SUCCESS, payload: res.data.msg });
        })
        .catch(err => {
            console.log(err);
            // dispatch({ type: AUTH_REQ_FAILURE, payload: err.response.data.msg });
        })
}