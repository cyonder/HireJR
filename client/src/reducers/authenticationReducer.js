import {
    AUTHENTICATE_USER,
    DEAUTHENTICATE_USER,
    SIGNUP_USER_ERROR,
    SIGNIN_USER_ERROR
} from '../constants/actionTypes';

export default function authenticationReducer(state = {}, action){
    switch(action.type){
        case AUTHENTICATE_USER:
            return { ...state, authenticated: true, signupError: '', signinError: ''};

        case DEAUTHENTICATE_USER:
            return { ...state, authenticated: false };

        case SIGNUP_USER_ERROR:
            return { ...state, signupError: action.payload };

        case SIGNIN_USER_ERROR:
            return { ...state, signinError: action.payload };

        default:
            return state;
    }
}
