import axios from 'axios';

import {
    ROOT_API_URL,
    AUTHENTICATION_TOKEN,
    CURRENT_USER
} from '../constants/systemTypes';

import {
    FIND_CURRENT_USER
} from '../constants/actionTypes';

export const findCurrentUserSuccess = currentUser => {
    return {
        type: FIND_CURRENT_USER,
        payload: currentUser
    }
}

export const findCurrentUser = () => {
    return dispatch => {
        axios.get(`${ROOT_API_URL}/user`, {
            headers: { authorization: localStorage.getItem(AUTHENTICATION_TOKEN) }
        })
        .then(response => {
            const currentUser = response.data.currentUser;            
            delete currentUser.password;
            localStorage.setItem(CURRENT_USER, JSON.stringify(currentUser))
            dispatch(findCurrentUserSuccess(currentUser));
        })
    }
}
