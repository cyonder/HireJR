import { 
    FIND_JOB_POST, 
    FETCH_JOB_POSTS,
    FETCH_JOB_APPLICATIONS, 
    FETCH_JOB_APPLICANTS 
} from '../constants/actionTypes';

export default function jobPostReducer(state = {}, action){
    switch(action.type){
        case FETCH_JOB_POSTS:
            return { ...state, ...action.payload };
        case FIND_JOB_POST:
            return { ...state, ...action.payload };
        case FETCH_JOB_APPLICATIONS:
            return { ...state, ...action.payload };
        case FETCH_JOB_APPLICANTS:
            return { ...state, ...action.payload };
        default:
            return state;
    }
}
