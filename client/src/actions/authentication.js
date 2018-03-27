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
                dispatch({ type: AUTHENTICATE_USER });

                localStorage.setItem(AUTHENTICATION_TOKEN, response.data.token);

                // if(rememberMe){
                //     localStorage.setItem(AUTHENTICATION_TOKEN, response.data.token);
                // }else{
                //     sessionStorage.setItem(AUTHENTICATION_TOKEN, response.data.token);
                // }
                // callback();
            })
            .then( () => callback() ) // Re-direct
            .catch(error => {
                if(error.response.data){
                    dispatch(signinError(error.response.data));
                    // dispatch(signinError('Bad login info'));
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
                dispatch({ type: AUTHENTICATE_USER });
                localStorage.setItem(AUTHENTICATION_TOKEN, response.data.token);
            })
            .then( () => callback() ) // Sign in user and re-direct to "/dashboard"
            .catch(error => {
                if(error.response.data){
                    dispatch(signupError(error.response.data));
                }else{
                    console.error("Something went wrong");
                }
            })
    };
};


export const signoutUser = () => {
    localStorage.removeItem(AUTHENTICATION_TOKEN);
    return{ type: DEAUTHENTICATE_USER };
};


export const fetchUsers = () => {
    return dispatch => {
        axios.get(ROOT_API_URL, {
            headers: { authorization: localStorage.getItem('authentication_token') }
        })
        .then(response => {
            console.log(response);
        })
    }
}


// .catch(error => { SIGNIN
//     if(error.response.status == 401){
//         dispatch( signinUserError(error.response.data.error.user_authentication) )
//     }else{
//         dispatch( signinUserError('Something went wrong. Please refresh your page and try again.') )
//         console.error(error.response.data.error);
//     }
// })

// tch(error => { SIGNUP
//     if(error.response.status == 422){
//         dispatch( signupUserError(error.response.data.errors.email) )
//     }else{
//         dispatch( signupUserError('Something went wrong. Please refresh your page and try again.') )
//         console.error(error.response.data.error);
//     }
// })
