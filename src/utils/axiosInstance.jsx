import axios from 'axios'
import jwt_decode from "jwt-decode";
import dayjs from 'dayjs'


const url = import.meta.env.VITE_BASE_URL_DB


let authTokens = localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null

const axiosInstance = axios.create({
    baseURL:url,
    headers: { Authorization: `Bearer ${authTokens?.accessToken}` }
});

axiosInstance.interceptors.request.use(async req => {
    if (!authTokens) {
        authTokens = localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null
        req.headers.Authorization = `Bearer ${authTokens?.accessToken}`
    }

    const user = jwt_decode(authTokens.access)
    const expTimeVN = dayjs.unix(user.exp).utcOffset(7).valueOf();
    const currentTimeVN = dayjs().utcOffset(7).valueOf();
    const isExpired = expTimeVN < currentTimeVN;
    if (!isExpired) return req

    const response = await axios.post(`${baseURL}/User/refresh`, {
        accessToken: authTokens.accessToken,
        refreshToken: authTokens.refreshToken
    });

    localStorage.setItem('authTokens', JSON.stringify(response.data.loginResponse))
    req.headers.Authorization = `Bearer ${response.data.loginResponse.accessToken}`
    return req
})


export default axiosInstance;