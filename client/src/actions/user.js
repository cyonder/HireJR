import axios from '../constants/axiosInstance'; 

import { ROOT_API_URL } from '../constants/systemTypes';

import { FIND_CURRENT_USER } from '../constants/actionTypes';

export const findCurrentUserSuccess = currentUser => {
    return {
        type: FIND_CURRENT_USER,
        payload: currentUser
    }
}

export const findCurrentUser = () => {
    return dispatch => {
        axios.get(`${ROOT_API_URL}/user`)
        .then(response => {
            const { user } = response.data;
            delete user.password;
            localStorage.setItem(FIND_CURRENT_USER, JSON.stringify(user))
            dispatch(findCurrentUserSuccess(user));
        })
    }
}
