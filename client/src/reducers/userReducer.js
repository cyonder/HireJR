import {
    FIND_CURRENT_USER,
    UPDATE_CANDIDATE
} from '../constants/actionTypes';

export default function userReducer(state = {}, action){
    switch(action.type){
        case FIND_CURRENT_USER:
            return { ...state, ...action.payload };
        case UPDATE_CANDIDATE:
            return { ...state, candidate: action.payload };
        default:
            return state;
    }
}
