import axios from 'axios';

import { 
    ROOT_API_URL,
    AUTHENTICATION_TOKEN
} from '../constants/systemTypes';

export const axiosInstance = axios.create({
    baseURL: ROOT_API_URL,
    headers: {'authorization': localStorage.getItem(AUTHENTICATION_TOKEN)}
});