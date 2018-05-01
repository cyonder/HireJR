import axios from 'axios';

import {
    ROOT_API_URL,
    AUTHENTICATION_TOKEN
} from '../constants/systemTypes';

import {
    FETCH_CANDIDATES,
    FIND_CANDIDATE,
    UPDATE_EDUCATION,
    UPDATE_WORK_EXPERIENCE,
    UPDATE_PROJECT,
    UPDATE_CANDIDATE_PROFILE
} from '../constants/actionTypes';

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

export const updateEducationSuccess = education => {
    return {
        type: UPDATE_EDUCATION,
        payload: education
    }
};

export const updateWorkExperienceSuccess = workExperience => {
    return {
        type: UPDATE_WORK_EXPERIENCE,
        payload: workExperience
    }
};

export const updateProjectSuccess = project => {
    return {
        type: UPDATE_PROJECT,
        payload: project
    }
};

export const updateCandidateProfileSuccess = candidateProfile => {
    return {
        type: UPDATE_CANDIDATE_PROFILE,
        payload: candidateProfile
    }
};

// Find

export const fetchCandidates = () => {
    return dispatch => {
        axios.get(`${ROOT_API_URL}/candidates`)
        .then(response => {        
            const { candidates } = response.data;
            dispatch(fetchCandidatesSuccess(candidates))
        })
    }
}

export const findCandidate = userId => {    
    return dispatch => {
        axios.get(`${ROOT_API_URL}/candidates/${userId}`)
        .then(response => {
            const { candidate } = response.data;
            dispatch(findCandidateSuccess(candidate))
        })
    }
}

// Education

export const createEducation = (values, callback) => {
    return dispatch => {
        axios.post(`${ROOT_API_URL}/candidates/education`, values, {
            headers: { authorization: localStorage.getItem(AUTHENTICATION_TOKEN) }
        })
        .then(response => {                        
            const { education } = response.data;
            dispatch(updateEducationSuccess(education));
            callback();
        })
    }
};

export const updateEducation = (values, callback) => {
    const candidateId = values._id;
    return dispatch => {
        axios.put(`${ROOT_API_URL}/candidates/education/${candidateId}`, values, {
            headers: { authorization: localStorage.getItem(AUTHENTICATION_TOKEN) }
        })
        .then(response => {
            const { education } = response.data;            
            dispatch(updateEducationSuccess(education));
            callback();
        })
    }
}

export const deleteEducation = (candidateId, callback) => {    
    return dispatch => {
        axios.delete(`${ROOT_API_URL}/candidates/education/${candidateId}`, {
            headers: { authorization: localStorage.getItem(AUTHENTICATION_TOKEN) }
        })
        .then(response => {            
            const { education } = response.data;            
            dispatch(updateEducationSuccess(education));
            callback();
        })
    }
}

// Work Experience

export const createWorkExperience = (values, callback) => {    
    return dispatch => {
        axios.post(`${ROOT_API_URL}/candidates/workexperience`, values, {
            headers: { authorization: localStorage.getItem(AUTHENTICATION_TOKEN) }
        })
        .then(response => {
            const { workExperience } = response.data;            
            dispatch(updateWorkExperienceSuccess(workExperience));
            callback();
        })
    }
};

export const updateWorkExperience = (values, callback) => {
    const candidateId = values._id;
    return dispatch => {
        axios.put(`${ROOT_API_URL}/candidates/workexperience/${candidateId}`, values, {
            headers: { authorization: localStorage.getItem(AUTHENTICATION_TOKEN) }
        })
        .then(response => {
            const { workExperience } = response.data;
            dispatch(updateWorkExperienceSuccess(workExperience));
            callback();
        })
    }
}

export const deleteWorkExperience = (candidateId, callback) => {    
    return dispatch => {
        axios.delete(`${ROOT_API_URL}/candidates/workexperience/${candidateId}`, {
            headers: { authorization: localStorage.getItem(AUTHENTICATION_TOKEN) }
        })
        .then(response => {            
            const { workExperience } = response.data;
            dispatch(updateWorkExperienceSuccess(workExperience));
            callback();
        })
    }
}

// Project

export const createProject = (values, callback) => {
    return dispatch => {
        axios.post(`${ROOT_API_URL}/candidates/projects`, values, {
            headers: { authorization: localStorage.getItem(AUTHENTICATION_TOKEN) }
        })
        .then(response => {
            const { projects } = response.data;
            dispatch(updateProjectSuccess(projects));
            callback();
        })
    }
};

export const updateProject = (values, callback) => {
    const candidateId = values._id;
    return dispatch => {
        axios.put(`${ROOT_API_URL}/candidates/projects/${candidateId}`, values, {
            headers: { authorization: localStorage.getItem(AUTHENTICATION_TOKEN) }
        })
        .then(response => {
            const { projects } = response.data;
            dispatch(updateProjectSuccess(projects));
            callback();
        })
    }
}

export const deleteProject = (candidateId, callback) => {    
    return dispatch => {
        axios.delete(`${ROOT_API_URL}/candidates/projects/${candidateId}`, {
            headers: { authorization: localStorage.getItem(AUTHENTICATION_TOKEN) }
        })
        .then(response => { 
            const { projects } = response.data;
            dispatch(updateProjectSuccess(projects));
            callback();
        })
    }
}

// Profile

export const updateCandidateProfile = (values, callback) => {
    return dispatch => {
        axios.post(`${ROOT_API_URL}/candidates/profile`, values, {
            headers: { authorization: localStorage.getItem(AUTHENTICATION_TOKEN) }
        })
        .then(response => {            
            const { candidateProfile } = response.data;
            dispatch(updateCandidateProfileSuccess(candidateProfile));
            callback();
        })
    }
};
