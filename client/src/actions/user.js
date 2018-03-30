import axios from 'axios';

import {
    ROOT_API_URL,
    AUTHENTICATION_TOKEN
} from '../constants/config.js';

import {
    FIND_CURRENT_USER
} from '../constants/actionTypes';

export const findCurrentUserSuccess = user => {
    return {
        type: FIND_CURRENT_USER,
        payload: user
    }
}

export const findCurrentUser = (callback) => {
    return dispatch => {
        axios.get(`${ROOT_API_URL}/current_user`, {
            headers: { authorization: localStorage.getItem(AUTHENTICATION_TOKEN) }
        })
        .then(response => {
            let currentUser = response.data;
            delete currentUser.password;
            dispatch(findCurrentUserSuccess(currentUser));
            callback(response.data);
        })
    }
}
