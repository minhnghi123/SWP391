import React, { useContext } from 'react';
// import { GoogleLogin } from '@react-oauth/google';
// import { jwtDecode } from "jwt-decode";
import { useGoogleLogin } from '@react-oauth/google';
import { faGooglePlusG } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AuthContext } from '../Services/AuthLogin';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { accountAction } from '../redux/reducers/accountSlice';
import axios from 'axios';
import { addData } from '../../Api/axios';

function LoginPage() {
    // const { login } = useContext(AuthContext)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const loginGoogle = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            try {
                // Lấy thông tin user từ Google
                const userInfo = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
                    headers: {
                        'Authorization': `Bearer ${tokenResponse.access_token}`
                    },
                }).then(res => res.json());
    
                const data = {
                    token: tokenResponse.access_token,
                    id: userInfo.sub,
                    name: userInfo.name,
                    email: userInfo.email,
                    picture: userInfo.picture,
                    role: 'user'
                };
    
                // Lưu vào localStorage hoặc Redux
                dispatch(accountAction.setUser(data));
                try {
                   const res = addData('User/login-by-google', {googleToken: tokenResponse.access_token})
                    if (res?.status === 200) {
                        console.log('Success', res.data);
                    }
                } catch (error) {
                    console.error("Error sending token to backend:", error);
                }
    
                toast.success("Login successfully by Google");
                // Chuyển hướng người dùng sau khi login
                setTimeout(() => {
                    navigate('/');
                }, 1000);
            } catch (error) {
                console.error("Error fetching user info:", error);
                toast.error("Error fetching user info");
            }
        },
        onError: () => {
            toast.error("Login Failed");
        },
    });
    return (
        <div
            onClick={() => loginGoogle()}
            className="w-12 h-12 bg-white rounded-full flex justify-center items-center 
            cursor-pointer hover:bg-red-50 hover:text-red-500 transition-all duration-300 shadow-md 
            hover:shadow-lg transform border-2 border-gray-100 hover:border-blue-500"
        >
            <FontAwesomeIcon icon={faGooglePlusG} className="text-xl text-gray-700" />
        </div>
    );
}

export default LoginPage;