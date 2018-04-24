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

// Actions

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

// Find

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

// Education

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

export const updateEducation = (values, callback) => {
    return dispatch => {
        axios.put(`${ROOT_API_URL}/candidates/education/${values._id}`, values, {
            headers: { authorization: localStorage.getItem(AUTHENTICATION_TOKEN)}
        })
        .then(response => {
            let candidate = response.data;
            dispatch(updateCandidateSuccess(candidate));
            callback();
        })
    }
}

export const deleteEducation = (id, callback) => {    
    return dispatch => {
        axios.delete(`${ROOT_API_URL}/candidates/education/${id}`, {
            headers: { authorization: localStorage.getItem(AUTHENTICATION_TOKEN)}
        })
        .then(response => {            
            let candidate = response.data;            
            dispatch(updateCandidateSuccess(candidate));
            callback();
        })
    }
}

// Work Experience

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

export const updateWorkExperience = (values, callback) => {
    return dispatch => {
        axios.put(`${ROOT_API_URL}/candidates/workexperience/${values._id}`, values, {
            headers: { authorization: localStorage.getItem(AUTHENTICATION_TOKEN)}
        })
        .then(response => {
            let candidate = response.data;
            dispatch(updateCandidateSuccess(candidate));
            callback();
        })
    }
}

export const deleteWorkExperience = (id, callback) => {    
    return dispatch => {
        axios.delete(`${ROOT_API_URL}/candidates/workexperience/${id}`, {
            headers: { authorization: localStorage.getItem(AUTHENTICATION_TOKEN)}
        })
        .then(response => {            
            let candidate = response.data;            
            dispatch(updateCandidateSuccess(candidate));
            callback();
        })
    }
}

// Project

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

export const updateProject = (values, callback) => {
    return dispatch => {
        axios.put(`${ROOT_API_URL}/candidates/projects/${values._id}`, values, {
            headers: { authorization: localStorage.getItem(AUTHENTICATION_TOKEN)}
        })
        .then(response => {
            let candidate = response.data;
            dispatch(updateCandidateSuccess(candidate));
            callback();
        })
    }
}

export const deleteProject = (id, callback) => {    
    return dispatch => {
        axios.delete(`${ROOT_API_URL}/candidates/projects/${id}`, {
            headers: { authorization: localStorage.getItem(AUTHENTICATION_TOKEN)}
        })
        .then(response => {            
            let candidate = response.data;            
            dispatch(updateCandidateSuccess(candidate));
            callback();
        })
    }
}

// Profile

export const updateCandidateProfile = (values, callback) => {
    return dispatch => {
        axios.post(`${ROOT_API_URL}/candidates/candidateprofile`, values, {
            headers: { authorization: localStorage.getItem(AUTHENTICATION_TOKEN)}
        })
        .then(response => {
            let candidate = response.data;
            dispatch(updateCandidateSuccess(candidate));
            callback();
        })
    }
};
