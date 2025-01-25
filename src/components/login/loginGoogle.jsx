import React from 'react';
// import { GoogleLogin } from '@react-oauth/google';
// import { jwtDecode } from "jwt-decode";
import { useGoogleLogin } from '@react-oauth/google';
import { faGooglePlusG } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
function LoginPage() {
    const login = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            try {
              //API google
                const userInfo = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
                    headers: {
                        Authorization: `Bearer ${tokenResponse.access_token}`,
                    },
                }).then((res) => res.json());
                console.log("User Info:", userInfo);
            } catch (error) {
                console.error("Error fetching user info:", error);
            }
        },
        onError: () => {
            console.error("Login Failed");
        },
    });

    return (
        <div
            onClick={() => login()}
            className="w-12 h-12 bg-white rounded-full flex justify-center items-center 
            cursor-pointer hover:bg-red-50 hover:text-red-500 transition-all duration-300 shadow-md 
            hover:shadow-lg transform border-2 border-gray-100 hover:border-blue-500"
        >
            <FontAwesomeIcon icon={faGooglePlusG} className="text-xl text-gray-700" />
        </div>
    );
}

export default LoginPage;
