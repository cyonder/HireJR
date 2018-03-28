import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import storage from 'redux-persist/lib/storage'

import { DEAUTHENTICATE_USER } from '../constants/actionTypes';

import authenticationReducer from './authenticationReducer';
import jobPostReducer from './jobPostReducer';
import userReducer from './userReducer';

const appReducer = combineReducers({
    form: formReducer,
    authentication: authenticationReducer,
    jobs: jobPostReducer,
    user: userReducer,
});

const rootReducer = (state, action) => {
    if(action.type === DEAUTHENTICATE_USER){
        Object.keys(state).forEach(key => {
            storage.removeItem(`persist:${key}`);
        });
        state = undefined
    }
    return appReducer(state, action)
}

export default rootReducer;
