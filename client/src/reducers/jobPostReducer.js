import { FIND_JOB_POST, FETCH_JOB_POSTS } from '../constants/actionTypes';

export default function jobPostReducer(state = {}, action){
    switch(action.type){
        case FETCH_JOB_POSTS:
            return { ...state, jobPosts: { ...state.jobPosts, ...action.payload } };
        case FIND_JOB_POST:
            return { ...state, jobPost: action.payload };
        default:
            return state;
    }
}
