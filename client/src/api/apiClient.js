import axios from 'axios';
import queryString from 'query-string';
const getToken = () => localStorage.getItem('access_token')
const baseURL = 'http://localhost:8000/api/v1/';

const axiosClient = axios.create({
    baseURL,
    paramsSerializer: params => queryString.stringify({params}),
})
axiosClient.interceptors.request.use(async config => {
    return {
      ...config,
      headers: {
        'Content-Type': 'application/json',
        'authorization': `Bearer ${getToken()}`
      }
    }
  })
  
  axiosClient.interceptors.response.use(response => {
    if (response && response.data) return response.data
    return response
  }, err => {
    if (!err.response) {
      return alert(err)
    }
    throw err.response
  })
  
export default axiosClient;




