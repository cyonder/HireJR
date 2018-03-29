import axios from 'axios';

import {
    ROOT_API_URL,
    AUTHENTICATION_TOKEN
} from '../constants/config.js';

import {
    UPDATE_CANDIDATE
} from '../constants/actionTypes';

export const updateCandidateSuccess = candidate => {
    return {
        type: UPDATE_CANDIDATE,
        payload: candidate
    }
};

export const createEducation = (values, callback) => {
    return dispatch => {
        axios.post(`${ROOT_API_URL}/candidate/education`, values, {
                headers: { authorization: localStorage.getItem(AUTHENTICATION_TOKEN)}
            })
            .then(response => {
                let candidate = response.data;
                dispatch(updateCandidateSuccess(candidate));
                callback();
            })
    }
};

export const createWorkExperience = (values, callback) => {
    return dispatch => {
        axios.post(`${ROOT_API_URL}/candidate/workexperience`, values, {
                headers: { authorization: localStorage.getItem(AUTHENTICATION_TOKEN)}
            })
            .then(response => {
                let candidate = response.data;
                dispatch(updateCandidateSuccess(candidate));
                callback();
            })
    }
};

export const createProject = (values, callback) => {
    return dispatch => {
        axios.post(`${ROOT_API_URL}/candidate/projects`, values, {
                headers: { authorization: localStorage.getItem(AUTHENTICATION_TOKEN)}
            })
            .then(response => {
                let candidate = response.data;
                dispatch(updateCandidateSuccess(candidate));
                callback();
            })
    }
};

export const updateAbout = (values, callback) => {
    return dispatch => {
        axios.post(`${ROOT_API_URL}/candidate/about`, values, {
                headers: { authorization: localStorage.getItem(AUTHENTICATION_TOKEN)}
            })
            .then(response => {
                let candidate = response.data;
                dispatch(updateCandidateSuccess(candidate));
                callback();
            })
    }
};
