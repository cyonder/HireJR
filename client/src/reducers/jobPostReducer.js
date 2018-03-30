import {
    FIND_JOB_POST,
    FETCH_JOB_POSTS,
    CREATE_JOB_POST
} from '../constants/actionTypes';

const initialState = {
    index: [],
    job: null
}

export default function jobPostReducer(state = initialState, action){
    switch(action.type){
        case FETCH_JOB_POSTS:
            return { ...state, index: {...state.index, ...action.payload} };
        case CREATE_JOB_POST:
            return [ ...state, ...action.payload ];
        case FIND_JOB_POST:
            return { ...state, job: action.payload };
        default:
            return state;
    }
}
