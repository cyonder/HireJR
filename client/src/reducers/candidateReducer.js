import { 
    FIND_CANDIDATE, 
    FETCH_CANDIDATES
} from '../constants/actionTypes';

export default function candidateReducer(state = {}, action){
    switch(action.type){
        case FETCH_CANDIDATES:
            return { ...state, candidates: action.payload };
        case FIND_CANDIDATE:
            return { ...state, candidate: action.payload };
        default:
            return state;
    }
}
