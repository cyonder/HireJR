import { UPDATE_JOB_APPLICATION } from '../constants/actionTypes';

export default function jobApplicationReducer(state = {}, action){
    switch(action.type){
        case UPDATE_JOB_APPLICATION:
            return { ...state, ...action.payload };
        default:
            return state;
    }
}
