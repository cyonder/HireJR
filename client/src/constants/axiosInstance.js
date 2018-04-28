import axios from 'axios';

import { 
    ROOT_API_URL,
    AUTHENTICATION_TOKEN
} from '../constants/systemTypes';

const axiosInstance = axios.create({
    baseURL: ROOT_API_URL
});

axiosInstance.defaults.headers.common['authorization'] = localStorage.getItem(AUTHENTICATION_TOKEN);

export default axiosInstance;
