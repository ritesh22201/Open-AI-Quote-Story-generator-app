import { ActionType } from "../authReducer/reducer"
import { PROMPT_REQ, PROMPT_REQ_FAILURE, PROMPT_REQ_SUCCESS } from "./actionTypes";

const initialState = {
    isLoading: false,
    isError: true,
    resData: ''
}

export const reducer = (state = initialState, { type, payload }: ActionType) => {
    switch (type) {

        case PROMPT_REQ: {
            return {
                ...state,
                isLoading: true,
                isError: false,
                resData: ''
            }
        }

        case PROMPT_REQ_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                isError: false,
                resData: payload
            }
        }

        case PROMPT_REQ_FAILURE: {
            return {
                ...state,
                isLoading: false,
                isError: true,
                resData: ''
            }
        }

        default: {
            return state;
        }
    }
}