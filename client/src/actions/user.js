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

export const updateUserPassword = (password, callback) => {
    return dispatch => {
        axios.put(`${ROOT_API_URL}/user/password`, password, {
            headers: { authorization: localStorage.getItem(AUTHENTICATION_TOKEN)}
        })
        .then(response => {
            callback()
        })
    }
}

export const updateUser = (values, callback) => {
    return dispatch => {
        axios.put(`${ROOT_API_URL}/user`, values, {
            headers: { authorization: localStorage.getItem(AUTHENTICATION_TOKEN)}
        })
        .then(response => {
            console.log(response.data);
            
            callback();
        })
    }
}

export const updateEmployer = (values, callback) => {
    return dispatch => {
        axios.put(`${ROOT_API_URL}/user/employer`, values, {
            headers: { authorization: localStorage.getItem(AUTHENTICATION_TOKEN)}
        })
        .then(response => {
            console.log(response.data);
            
            callback();
        })
    }
}
