import axios from 'axios';

import {
    ROOT_API_URL,
    AUTHENTICATION_TOKEN
} from '../constants/config.js';

import {
    FETCH_JOB_POSTS,
    CREATE_JOB_POST,
    FIND_JOB_POST
} from '../constants/actionTypes';

export const createJobPostSuccess = jobPost => {
    return {
        type: CREATE_JOB_POST,
        payload: jobPost
    }
};

export const fetchJobPostsSuccess = jobPosts => {
    return {
        type: FETCH_JOB_POSTS,
        payload: jobPosts
    }
};

export const findJobPostSuccess = jobPost => {
    return {
        type: FIND_JOB_POST,
        payload: jobPost
    }
};

export const createJobPost = (values, callback) => {
    return dispatch => {
        axios.post(`${ROOT_API_URL}/jobs`, values, {
                headers: { authorization: localStorage.getItem(AUTHENTICATION_TOKEN)}
            })
            .then(response => {
                dispatch(createJobPostSuccess(response.data));
                callback(response.data._id);
            })
    }
};

export const fetchJobPosts = () => {
    return dispatch => {
        axios.get(`${ROOT_API_URL}/jobs`, {
                headers: { authorization: localStorage.getItem(AUTHENTICATION_TOKEN)}
            })
            .then(response => {
                dispatch( fetchJobPostsSuccess(response.data) );
            })
    };
}

export const findJobPost = id => {
    return dispatch => {
        axios.get(`${ROOT_API_URL}/jobs/${id}`)
            .then(response => {
                dispatch( findJobPostSuccess(response.data) )
            })
    }
}


// Find an employee where _userId equals to current user _id
// Fetch jobPosts with employer._jobPostIds
