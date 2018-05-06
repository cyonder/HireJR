import axios from 'axios'; 

import { ROOT_API_URL, AUTHENTICATION_TOKEN } from '../constants/systemTypes';

import { CURRENT_USER } from '../constants/actionTypes';

export const findCurrentUserSuccess = currentUser => {
    return {
        type: CURRENT_USER,
        payload: currentUser
    }
}

export const findCurrentUser = () => {
    return dispatch => {
        // Token not ready after sign in. That's why set the header additionaly.
        axios.get(`${ROOT_API_URL}/user`, {
            headers: { authorization: localStorage.getItem(AUTHENTICATION_TOKEN) }
        })
        .then(response => {
            const { user } = response.data;
            delete user.password;
            localStorage.setItem(CURRENT_USER, JSON.stringify(user))
            dispatch(findCurrentUserSuccess(user));
        })
    }
}
