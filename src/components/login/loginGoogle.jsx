import React, { useContext } from 'react';
// import { GoogleLogin } from '@react-oauth/google';
// import { jwtDecode } from "jwt-decode";
import { useGoogleLogin } from '@react-oauth/google';
import { faGooglePlusG } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AuthContext } from '../Services/AuthLogin';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
function LoginPage() {
    // const { login } = useContext(AuthContext)
    const navigate = useNavigate()
    const loginGoogle = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            try {
                //API google
                const userInfo = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
                    headers: {
                        Authorization: `Bearer ${tokenResponse.access_token}`,
                    },
                }).then((res) => res.json());
                // login()
                localStorage.setItem("Account", JSON.stringify(userInfo))
                toast.success("Login successfully by Google");
                setTimeout(() => {
                    navigate('/')
                }, 1000)
            } catch (error) {
                toast.error("Error fetching user info:", error);
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
