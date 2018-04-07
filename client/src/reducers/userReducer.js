import {
    FIND_CURRENT_USER,
    UPDATE_CANDIDATE,
    UPDATE_EMPLOYER
} from '../constants/actionTypes';

export default function userReducer(state = {}, action){
    switch(action.type){
        case FIND_CURRENT_USER:
            return { ...state, ...action.payload };
        case UPDATE_CANDIDATE:
            return { ...state, ...action.payload };
        case UPDATE_EMPLOYER:
            return { ...state, ...action.payload };
        default:
            return state;
    }
}
