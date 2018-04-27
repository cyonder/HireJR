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
            const { candidates } = response.data;
            dispatch(fetchCandidatesSuccess({ candidates: candidates }))
        })
    }
}

export const findCandidate = userId => {    
    return dispatch => {
        axios.get(`${ROOT_API_URL}/candidates/${userId}`)
        .then(response => {
            const { candidate } = response.data;
            dispatch(findCandidateSuccess({ candidate: candidate }))
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
            const { candidate } = response.data;
            dispatch(updateCandidateSuccess({ candidate: candidate }));
            callback();
        })
    }
};

export const updateEducation = (values, callback) => {
    const candidateId = values._id;
    return dispatch => {
        axios.put(`${ROOT_API_URL}/candidates/education/${candidateId}`, values, {
            headers: { authorization: localStorage.getItem(AUTHENTICATION_TOKEN)}
        })
        .then(response => {
            const { candidate } = response.data;
            dispatch(updateCandidateSuccess({ candidate: candidate }));
            callback();
        })
    }
}

export const deleteEducation = (candidateId, callback) => {    
    return dispatch => {
        axios.delete(`${ROOT_API_URL}/candidates/education/${candidateId}`, {
            headers: { authorization: localStorage.getItem(AUTHENTICATION_TOKEN)}
        })
        .then(response => {            
            const { candidate } = response.data;
            dispatch(updateCandidateSuccess({ candidate: candidate }));
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
            const { candidate } = response.data;
            dispatch(updateCandidateSuccess({ candidate: candidate }));
            callback();
        })
    }
};

export const updateWorkExperience = (values, callback) => {
    const candidateId = values._id;
    return dispatch => {
        axios.put(`${ROOT_API_URL}/candidates/workexperience/${candidateId}`, values, {
            headers: { authorization: localStorage.getItem(AUTHENTICATION_TOKEN)}
        })
        .then(response => {
            const { candidate } = response.data;
            dispatch(updateCandidateSuccess({ candidate: candidate }));
            callback();
        })
    }
}

export const deleteWorkExperience = (candidateId, callback) => {    
    return dispatch => {
        axios.delete(`${ROOT_API_URL}/candidates/workexperience/${candidateId}`, {
            headers: { authorization: localStorage.getItem(AUTHENTICATION_TOKEN)}
        })
        .then(response => {            
            const { candidate } = response.data;
            dispatch(updateCandidateSuccess({ candidate: candidate }));
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
            const { candidate } = response.data;
            dispatch(updateCandidateSuccess({ candidate: candidate }));
            callback();
        })
    }
};

export const updateProject = (values, callback) => {
    const candidateId = values._id;
    return dispatch => {
        axios.put(`${ROOT_API_URL}/candidates/projects/${candidateId}`, values, {
            headers: { authorization: localStorage.getItem(AUTHENTICATION_TOKEN)}
        })
        .then(response => {
            const { candidate } = response.data;
            dispatch(updateCandidateSuccess({ candidate: candidate }));
            callback();
        })
    }
}

export const deleteProject = (candidateId, callback) => {    
    return dispatch => {
        axios.delete(`${ROOT_API_URL}/candidates/projects/${candidateId}`, {
            headers: { authorization: localStorage.getItem(AUTHENTICATION_TOKEN)}
        })
        .then(response => { 
            const { candidate } = response.data;
            dispatch(updateCandidateSuccess({ candidate: candidate }));
            callback();
        })
    }
}

// Profile

export const updateCandidateProfile = (values, callback) => {
    return dispatch => {
        axios.post(`${ROOT_API_URL}/candidates/profile`, values, {
            headers: { authorization: localStorage.getItem(AUTHENTICATION_TOKEN)}
        })
        .then(response => {            
            const { candidate } = response.data;
            dispatch(updateCandidateSuccess({ candidate: candidate }));
            callback();
        })
    }
};
