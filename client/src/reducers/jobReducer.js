import { 
    FIND_JOB_POST, 
    FETCH_JOB_POSTS,
    FETCH_JOB_APPLICATIONS, 
    FETCH_JOB_APPLICANTS,
    UPDATE_JOB_POSTS,
    UPDATE_JOB_APPLICATION 
} from '../constants/actionTypes';

export default function jobReducer(state = {}, action){
    switch(action.type){
        case FIND_JOB_POST:
            return { ...state, jobPost: action.payload };
        case FETCH_JOB_POSTS:
            return { ...state, jobPosts: action.payload };
        case FETCH_JOB_APPLICATIONS:
            return { ...state, jobApplications: action.payload };
        case FETCH_JOB_APPLICANTS:
            return { ...state, jobApplicants: action.payload };
        case UPDATE_JOB_POSTS:
            return { ...state, jobPosts: action.payload };
        case UPDATE_JOB_APPLICATION:
            return { ...state, jobApplications: action.payload };
        default:
            return state;
    }
}