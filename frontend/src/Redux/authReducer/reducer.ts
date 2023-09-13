import { AUTH_REQ, AUTH_REQ_FAILURE, AUTH_REQ_SUCCESS, LOGIN_REQ_SUCCESS } from "./actionTypes";

interface ActionType {
    type : string;
    payload : any;
}

const initialState = {
    isLoading : false,
    isError : false,
    isAuth : false,
    token : '',
    isRegistered : '',
    registerErr : '',
    loginMsg : ''
}

export const reducer = (state = initialState, {type, payload}:ActionType) => {
    switch(type) { 

        case AUTH_REQ : {
            return {
                ...state,
                isLoading : true,
                isError : false,
                registerErr : '',
                isAuth : false
            }
        }

        case AUTH_REQ_SUCCESS : {
            return {
                ...state,
                isLoading : false,
                isError : false,
                isRegistered : payload, 
                registerErr : ''
            }
        }

        case AUTH_REQ_FAILURE : {
            return {
                ...state,
                isLoading : false,
                isError : true,
                registerErr : payload
            }
        }

        case LOGIN_REQ_SUCCESS : {
            return {
                ...state,
                isLoading : false,
                isError : false,
                registerErr : '',
                isAuth : true,
                loginMsg : payload
            }
        }

        default : {
            return state;
        }
    }
}