import {applyMiddleware, combineReducers, legacy_createStore} from 'redux';
import {reducer as authReducer} from './authReducer/reducer';
import {reducer as promptReducer} from './promptReducer/reducer';
import thunk from 'redux-thunk';
 
const rootReducer = combineReducers({
    authReducer,
    promptReducer
})

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));