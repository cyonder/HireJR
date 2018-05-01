import axios from 'axios';

import {
    ROOT_API_URL,
    AUTHENTICATION_TOKEN
} from '../constants/systemTypes';

import {
    FIND_JOB_POST,
    FETCH_JOB_APPLICATIONS, 
    FETCH_JOB_APPLICANTS, 
    FETCH_JOB_POSTS,
    UPDATE_JOB_APPLICATION,
    UPDATE_JOB_POSTS
} from '../constants/actionTypes';

export const findJobPostSuccess = jobPost => {
    return {
        type: FIND_JOB_POST,
        payload: jobPost
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

export const updateJobApplicationSuccess = jobApplication => {
    return {
        type: UPDATE_JOB_APPLICATION,
        payload: jobApplication
    }
}

export const updateJobPostsSuccess = jobPosts => {
    return {
        type: UPDATE_JOB_POSTS,
        payload: jobPosts
    }
};

export const fetchJobPosts = () => {
    return dispatch => {
        axios.get(`${ROOT_API_URL}/jobs`)
        .then(response => {
            const { jobPosts } = response.data
            dispatch( fetchJobPostsSuccess(jobPosts) );
        })
    };
}

export const findJobPost = jobPostId => {
    return dispatch => {
        axios.get(`${ROOT_API_URL}/jobs/${jobPostId}`)
        .then(response => {            
            const { jobPost } = response.data
            dispatch( findJobPostSuccess(jobPost) )
        })
    }
}

export const createJobPost = (values, callback) => {    
    return dispatch => {
        // Token not ready after signing in, while creating a job post. That's why set the header additionaly.
        axios.post(`${ROOT_API_URL}/jobs`, values, {
            headers: { authorization: localStorage.getItem(AUTHENTICATION_TOKEN)}
        })
        .then(response => {
            const { jobPosts, jobPostId } = response.data;            
            dispatch( updateJobPostsSuccess(jobPosts) );
            callback(jobPostId);
        })
    }
};

export const deleteJobPost = (jobPostId, callback) => {
    return dispatch => {
        axios.delete(`${ROOT_API_URL}/jobs/${jobPostId}`, {
            headers: { authorization: localStorage.getItem(AUTHENTICATION_TOKEN)}
        })
        .then(response => {                        
            const { jobPosts } = response.data;            
            dispatch( updateJobPostsSuccess(jobPosts) );
            callback();
        })
    }
}

export const updateJobPostActivation = (jobPostId, isActive, callback) => {    
    return dispatch => {
        axios.put(`${ROOT_API_URL}/jobs/activation/${jobPostId}`, { isActive }, {
            headers: { authorization: localStorage.getItem(AUTHENTICATION_TOKEN)}
        })
        .then(response => {                                    
            const { jobPosts } = response.data;            
            dispatch( updateJobPostsSuccess(jobPosts) );
            callback();
        })
    }
}

// Job Application

export const fetchJobApplications = () => {
    return dispatch => {
        axios.get(`${ROOT_API_URL}/jobs/applications`, {
            headers: { authorization: localStorage.getItem(AUTHENTICATION_TOKEN)}
        })
        .then(response => {
            const { jobApplications } = response.data;            
            dispatch(fetchJobApplicationsSuccess(jobApplications))
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
            dispatch(fetchJobApplicantsSuccess(jobApplicants))
        })
    };
}

export const createJobApplication = (jobPostId, values, callback) => {
    return dispatch => {
        axios.post(`${ROOT_API_URL}/jobs/apply/${jobPostId}`, values, {
            headers: { authorization: localStorage.getItem(AUTHENTICATION_TOKEN)}
        })
        .then(response => {                                                
            const { jobApplications } = response.data;                        
            dispatch( updateJobApplicationSuccess(jobApplications) );
            callback();
        })
    }
}

export const deleteJobApplication = (jobApplicationId, callback) => {
    return dispatch => {
        axios.delete(`${ROOT_API_URL}/jobs/applications/${jobApplicationId}`, {
            headers: { authorization: localStorage.getItem(AUTHENTICATION_TOKEN)}
        })
        .then(response => {                                                
            const { jobApplications } = response.data;                        
            dispatch( updateJobApplicationSuccess(jobApplications) );
            callback();
        })
    }
}