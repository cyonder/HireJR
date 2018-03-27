import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import authenticationReducer from './authenticationReducer';
import jobPostReducer from './jobPostReducer';

const rootReducer = combineReducers({
    form: formReducer,
    authentication: authenticationReducer,
    jobs: jobPostReducer,
});

export default rootReducer;
