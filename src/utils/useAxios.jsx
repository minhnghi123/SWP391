import axios from 'axios'
import { jwtDecode } from "jwt-decode";
import dayjs from 'dayjs'
import { useContext } from 'react'
import {AuthContext} from '../components/Context/AuthContext'
import { useDispatch } from 'react-redux'
import { accountAction } from '../components/redux/reducers/accountSlice'
const url = import.meta.env.VITE_BASE_URL_DB


const useAxios = () => {
    const { authTokens, setAuthTokens } = useContext(AuthContext)
    const dispatch = useDispatch()
    
    const axiosInstance = axios.create({
        baseURL: url,
        headers: { Authorization: `Bearer ${authTokens?.accessToken}` }
    });


    axiosInstance.interceptors.request.use(async req => {

        const user = jwtDecode(authTokens.accessToken)
        const expTimeVN = user.exp;  // user.exp đã ở dạng Unix timestamp (giây)
        const currentTimeVN = new Date().getTime() / 1000;
        const isExpired = expTimeVN < currentTimeVN;
 

        if (!isExpired) return req

        const response = await axios.post(`${url}/User/refresh`, {
            accessToken: authTokens.accessToken,
            refreshToken: authTokens.refreshToken
        });
        const newTokens = response.data.loginResponse
      
        localStorage.setItem('authTokens', JSON.stringify(newTokens))

        setAuthTokens(newTokens)
        const decoded = jwtDecode(newTokens.accessToken);
        dispatch(accountAction.setUser({
            id: decoded.Id,
            name: decoded.Username,
            role: decoded.Role,
            avatar: decoded.Avatar,
        }));

        req.headers.Authorization = `Bearer ${response.data.accessToken}`
        return req
    })

    return axiosInstance
}

export default useAxios;