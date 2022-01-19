import axios from 'axios'
import { REACT_APP_API_URL } from '../constants/httpContants'

const callApiHttp = ({ url, method, baseUrl, data, params }) => 
    axios.create({
        baseURL: baseUrl || REACT_APP_API_URL,
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
    })({
        method,
        url,
        data,
        params,
    })

export default callApiHttp
