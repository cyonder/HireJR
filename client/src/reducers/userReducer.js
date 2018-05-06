import {
    CURRENT_USER,
    UPDATE_JOB_POSTS,
    UPDATE_EDUCATION,
    UPDATE_WORK_EXPERIENCE,
    UPDATE_PROJECT,
    UPDATE_CANDIDATE_PROFILE
} from '../constants/actionTypes';

export default function userReducer(state = {}, action){    
    switch(action.type){
        case CURRENT_USER:
            return { ...state, ...action.payload };
        case UPDATE_JOB_POSTS:
            return { 
                ...state, employer: { 
                    ...state.employer, jobPosts: action.payload
                } 
            };        
        case UPDATE_EDUCATION:
            return { 
                ...state, candidate: { 
                    ...state.candidate, education: action.payload
                } 
            };        
        case UPDATE_WORK_EXPERIENCE:
            return { 
                ...state, candidate: { 
                    ...state.candidate, workExperience: action.payload
                } 
            };        
        case UPDATE_PROJECT:
            return { 
                ...state, candidate: { 
                    ...state.candidate, projects: action.payload
                } 
            };
        case UPDATE_CANDIDATE_PROFILE:
            return { 
                ...state, candidate: { 
                    ...state.candidate, candidateProfile: action.payload
                } 
            };
        default:
            return state;
    }
}
