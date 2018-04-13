import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import authenticationReducer from './authenticationReducer';
import jobPostReducer from './jobPostReducer';
import candidateReducer from './candidateReducer';
import userReducer from './userReducer';

import { DEAUTHENTICATE_USER } from '../constants/actionTypes';

const appReducer = combineReducers({
    form: formReducer,
    authentication: authenticationReducer,
    jobPost: jobPostReducer,
    candidate: candidateReducer,
    user: userReducer
});

const rootReducer = (state, action) => {
    if(action.type === DEAUTHENTICATE_USER){
        state.user = undefined
    }

    return appReducer(state, action)
}

export default rootReducer;
