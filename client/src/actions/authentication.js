import axios from 'axios';

import {
    ROOT_API_URL,
    AUTHENTICATION_TOKEN
} from '../constants/config.js';

import {
    AUTHENTICATE_USER,
    DEAUTHENTICATE_USER,
    SIGNUP_USER_ERROR,
    SIGNIN_USER_ERROR
} from '../constants/actionTypes';

export const signupError = error => {
    return{
        type: SIGNUP_USER_ERROR,
        payload: error
    };
}

export const signinError = error => {
    return{
        type: SIGNIN_USER_ERROR,
        payload: error
    };
}

export const signinUser = ({ email, password, rememberMe }, callback) => {
    return dispatch => {
        axios.post(`${ROOT_API_URL}/signin`, { email, password })
            .then(response => {
                localStorage.setItem(AUTHENTICATION_TOKEN, response.data.token);
                dispatch({ type: AUTHENTICATE_USER });
                callback();
            })
            .catch(error => {
                if(error.response){
                    dispatch(signinError(error.response.data));
                }else{
                    console.error("Something went wrong");
                }
            });
    }
}

export const signupUser = (user, callback) => {
    return dispatch => {
        axios.post(`${ROOT_API_URL}/signup`, user)
            .then(response => {
                localStorage.setItem(AUTHENTICATION_TOKEN, response.data.token);
                dispatch({ type: AUTHENTICATE_USER });
                callback();
            })
            .catch(error => {
                if(error.response){
                    dispatch(signinError(error.response.data));
                }else{
                    console.error("Something went wrong");
                }
            });
    };
};


export const signoutUser = () => {
    localStorage.removeItem(AUTHENTICATION_TOKEN);
    return{ type: DEAUTHENTICATE_USER };
};

// if(rememberMe){
//     localStorage.setItem(AUTHENTICATION_TOKEN, response.data.token);
// }else{
//     sessionStorage.setItem(AUTHENTICATION_TOKEN, response.data.token);
// }
