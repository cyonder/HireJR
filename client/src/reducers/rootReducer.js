import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import authenticationReducer from './authenticationReducer';
import jobPostReducer from './jobPostReducer';
import userReducer from './userReducer';

const rootReducer = combineReducers({
    form: formReducer,
    authentication: authenticationReducer,
    jobs: jobPostReducer,
    user: userReducer
});

export default rootReducer;
