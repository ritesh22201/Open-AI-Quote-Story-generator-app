import axios from "axios";
import { PROMPT_REQ, PROMPT_REQ_FAILURE, PROMPT_REQ_SUCCESS } from "./actionTypes";
import { PayloadType } from "../authReducer/action";

interface Payload {
    userInput : string;
    inputCategory : string;
}

const value: string | null = localStorage.getItem('token');
const token: { [key: string]: any } | null = value ? JSON.parse(value) : null;

export const getResponse = (payload:Payload) => (dispatch: any) => {

    const axiosConfig = {
        headers : {
            'Authorization' : `Bearer ${token?.token}`,
            'Content-Type' : 'application/json'
        }
    }

    // const keyword = {...payload, userInput : `Keyword : ${payload.userInput}`};

    dispatch({ type: PROMPT_REQ });
    axios.post('https://quote-generator-app-4rug.onrender.com/chat', payload, axiosConfig)
        .then(res => {
            console.log(res)
            dispatch({ type: PROMPT_REQ_SUCCESS, payload: res.data });
        })
        .catch(err => {
            console.log(err)
            dispatch({ type: PROMPT_REQ_FAILURE, payload: err.response.data.msg });
        })
}