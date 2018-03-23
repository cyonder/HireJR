import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import authenticationReducer from './authenticationReducer';
import jobReducer from './jobReducer';

const rootReducer = combineReducers({
    form: formReducer,
    authentication: authenticationReducer,
    jobs: jobReducer,
});

export default rootReducer;
