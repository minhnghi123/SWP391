import axios from 'axios'
import { jwtDecode } from "jwt-decode";
import dayjs from 'dayjs'
import { useContext } from 'react'
import { AuthContext } from '../components/Context/AuthContext'
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

    //Nếu không có token, trả về instance axios ban đầu.
    if (!authTokens) {
        return axiosInstance

    }
    //Thêm một interceptor để xử lý mọi yêu cầu trước khi chúng được gửi đi.
    axiosInstance.interceptors.request.use(async req => {

        const user = jwtDecode(authTokens.accessToken)
        const expTimeVN = user.exp;
        const currentTimeVN = dayjs().unix()
        const isExpired = expTimeVN < currentTimeVN;


        //Nếu token chưa hết hạn, trả về yêu cầu gốc (req) mà không làm gì thêm.
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

        //Cập nhật header Authorization của yêu cầu ban đầu với accessToken mới.
        //Trả về yêu cầu đã được cập nhật để tiếp tục thực thi.
        req.headers.Authorization = `Bearer ${newTokens.accessToken}`
        return req
    })

    //Trả về instance axios đã được cập nhật.
    return axiosInstance
}

export default useAxios;