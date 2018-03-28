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

export const findCurrentUser = () => {
    return dispatch => {
        axios.get(`${ROOT_API_URL}/current_user`, {
            headers: { authorization: localStorage.getItem(AUTHENTICATION_TOKEN) }
        })
        .then(response => {
            dispatch(findCurrentUserSuccess(response.data))
        })
    }
}
