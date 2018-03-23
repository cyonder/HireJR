import axios from 'axios';

import {
    ROOT_API_URL,
    AUTHENTICATION_TOKEN
} from '../constants/config.js';

import {
    FETCH_JOBS,
    CREATE_JOB,
    FIND_JOB
} from '../constants/actionTypes';

export const createJobSuccess = job => {
    return {
        type: CREATE_JOB,
        payload: job
    }
};

export const fetchJobsSuccess = jobs => {
    console.log("jobs:",jobs);
    return {
        type: FETCH_JOBS,
        payload: jobs
    }
};

export const findJobSuccess = job => {
    return {
        type: FIND_JOB,
        payload: job
    }
};

export const submitJob = values => {
    return dispatch => {
        axios.post(`${ROOT_API_URL}/jobs`, values)
            .then(response => {
                dispatch(createJobSuccess(response.data));
            })
    }
};

export const fetchJobs = () => {
    return dispatch => {
        axios.get(`${ROOT_API_URL}/jobs`)
            .then(response => {
                dispatch( fetchJobsSuccess(response.data) );
            })
    };
}

export const findJob = id => {
    return dispatch => {
        axios.get(`${ROOT_API_URL}/jobs/${id}`)
            .then(response => {
                dispatch( findJobSuccess(response.data) )
            })
    }
}
