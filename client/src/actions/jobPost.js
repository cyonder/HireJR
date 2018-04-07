import axios from 'axios';

import {
    ROOT_API_URL,
    AUTHENTICATION_TOKEN
} from '../constants/systemTypes';

import {
    UPDATE_EMPLOYER,
    FETCH_JOB_POSTS,
    FIND_JOB_POST
} from '../constants/actionTypes';

export const createJobPostSuccess = employer => {
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
                const { employer, jobPostId } = response.data;
                dispatch( createJobPostSuccess({ employer: employer }) );
                callback(jobPostId);
            })
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

export const findJobPost = id => {
    return dispatch => {
        axios.get(`${ROOT_API_URL}/jobs/${id}`)
            .then(response => {
                const { jobPost } = response.data
                dispatch( findJobPostSuccess(jobPost) )
            })
    }
}
