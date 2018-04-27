import axios from 'axios';

import {
    ROOT_API_URL,
    AUTHENTICATION_TOKEN
} from '../constants/systemTypes';

import {
    FETCH_JOB_POSTS,
    FIND_JOB_POST,
    FETCH_JOB_APPLICATIONS, 
    FETCH_JOB_APPLICANTS, 
    UPDATE_EMPLOYER,
    UPDATE_JOB_APPLICATION
} from '../constants/actionTypes';

export const updateEmployerSuccess = employer => {
    return {
        type: UPDATE_EMPLOYER,
        payload: employer
    }
};

export const fetchJobPostsSuccess = jobPosts => {    
    return {
        type: FETCH_JOB_POSTS,
        payload: jobPosts
    }
};

export const fetchJobApplicationsSuccess = jobApplications => {    
    return {
        type: FETCH_JOB_APPLICATIONS,
        payload: jobApplications
    }
};

export const fetchJobApplicantsSuccess = jobApplicants => {    
    return {
        type: FETCH_JOB_APPLICANTS,
        payload: jobApplicants
    }
};

export const findJobPostSuccess = jobPost => {
    return {
        type: FIND_JOB_POST,
        payload: jobPost
    }
};

export const updateJobApplicationSuccess = jobApplication => {
    return {
        type: UPDATE_JOB_APPLICATION,
        payload: jobApplication
    }
}

export const fetchJobPosts = () => {
    return dispatch => {
        axios.get(`${ROOT_API_URL}/jobs`)
        .then(response => {
            const { jobPosts } = response.data
            dispatch( fetchJobPostsSuccess({ jobPosts: jobPosts }) );
        })
    };
}

export const findJobPost = jobPostId => {
    return dispatch => {
        axios.get(`${ROOT_API_URL}/jobs/${jobPostId}`)
        .then(response => {
            const { jobPost } = response.data
            dispatch( findJobPostSuccess({ jobPost: jobPost }) )
        })
    }
}

export const createJobPost = (values, callback) => {    
    return dispatch => {
        axios.post(`${ROOT_API_URL}/jobs`, values, {
            headers: { authorization: localStorage.getItem(AUTHENTICATION_TOKEN)}
        })
        .then(response => {
            const { employer, jobPostId } = response.data;
            dispatch( updateEmployerSuccess({ employer: employer }) );
            callback(jobPostId);
        })
    }
};

export const deleteJobPost = jobPostId => {
    return dispatch => {
        axios.delete(`${ROOT_API_URL}/jobs/${jobPostId}`, {
            headers: { authorization: localStorage.getItem(AUTHENTICATION_TOKEN)}
        })
        .then(response => {                        
            const { employer } = response.data;
            dispatch( updateEmployerSuccess({ employer: employer }) );
        })
    }
}

export const updateJobPostActivation = (jobPostId, isActive) => {    
    return dispatch => {
        axios.put(`${ROOT_API_URL}/jobs/activation/${jobPostId}`, { isActive }, {
            headers: { authorization: localStorage.getItem(AUTHENTICATION_TOKEN)}
        })
        .then(response => {                                    
            const { employer } = response.data
            dispatch( updateEmployerSuccess({ employer: employer }) );
        })
    }
}

// Job Application

export const createJobApplication = (jobPostId, values, callback) => {
    return dispatch => {
        axios.post(`${ROOT_API_URL}/jobs/apply/${jobPostId}`, values, {
            headers: { authorization: localStorage.getItem(AUTHENTICATION_TOKEN)}
        })
        .then(response => {                                                
            const { jobApplication } = response.data
            dispatch( updateJobApplicationSuccess({ jobApplication: jobApplication }) );
            callback();
        })
    }
}

export const fetchJobApplications = () => {
    return dispatch => {
        axios.get(`${ROOT_API_URL}/jobs/applications`, {
            headers: { authorization: localStorage.getItem(AUTHENTICATION_TOKEN)}
        })
        .then(response => {
            const { jobApplications } = response.data;
            dispatch(fetchJobApplicationsSuccess({ jobApplications: jobApplications }))
        })
    };
}

export const fetchJobApplicants = () => {    
    return dispatch => {
        axios.get(`${ROOT_API_URL}/jobs/applicants`, {
            headers: { authorization: localStorage.getItem(AUTHENTICATION_TOKEN)}
        })
        .then(response => {
            const { jobApplicants } = response.data;
            dispatch(fetchJobApplicantsSuccess({ jobApplicants: jobApplicants }))
        })
    };
}