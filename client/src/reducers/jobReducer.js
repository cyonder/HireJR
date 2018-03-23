import {
    FIND_JOB,
    FETCH_JOBS,
    CREATE_JOB,
    DELETE_JOB,
    UPDATE_JOB
} from '../constants/actionTypes';

const initialState = {
    index: [],
    job: null
}

export default function jobReducer(state = initialState, action){
    switch(action.type){
        case FETCH_JOBS:
            return { ...state, index: {...state.index, ...action.payload} };
        case CREATE_JOB:
            return [ ...state, ...action.payload ];
        case FIND_JOB:
            return { ...state, job: action.payload };
        default:
            return state;
    }
}
