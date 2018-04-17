import axios from 'axios';

import {
    ROOT_API_URL,
    AUTHENTICATION_TOKEN
} from '../constants/systemTypes';

import {
    UPDATE_CANDIDATE,
    FETCH_CANDIDATES,
    FIND_CANDIDATE
} from '../constants/actionTypes';

export const updateCandidateSuccess = candidate => {
    return {
        type: UPDATE_CANDIDATE,
        payload: candidate
    }
};

export const fetchCandidatesSuccess = candidates => {
    return {
        type: FETCH_CANDIDATES,
        payload: candidates
    }
}

export const findCandidateSuccess = candidate => {
    return {
        type: FIND_CANDIDATE,
        payload: candidate
    }
}

export const fetchCandidates = () => {
    return dispatch => {
        axios.get(`${ROOT_API_URL}/candidates`)
        .then(response => {                
            let candidates = response.data.candidates;
            dispatch(fetchCandidatesSuccess(candidates))
        })
    }
}

export const findCandidate = userId => {    
    return dispatch => {
        axios.get(`${ROOT_API_URL}/candidates/${userId}`)
        .then(response => {
            let candidate = response.data.candidate;
            dispatch(findCandidateSuccess(candidate))
        })
    }
}

export const createEducation = (values, callback) => {
    return dispatch => {
        axios.post(`${ROOT_API_URL}/candidates/education`, values, {
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
        axios.post(`${ROOT_API_URL}/candidates/workexperience`, values, {
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
        axios.post(`${ROOT_API_URL}/candidates/projects`, values, {
                headers: { authorization: localStorage.getItem(AUTHENTICATION_TOKEN)}
            })
            .then(response => {
                let candidate = response.data;
                dispatch(updateCandidateSuccess(candidate));
                callback();
            })
    }
};

export const updateCandidateProfile = (values, callback) => {
    return dispatch => {
        axios.post(`${ROOT_API_URL}/candidates/about`, values, {
                headers: { authorization: localStorage.getItem(AUTHENTICATION_TOKEN)}
            })
            .then(response => {
                let candidate = response.data;
                dispatch(updateCandidateSuccess(candidate));
                callback();
            })
    }
};
