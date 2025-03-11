import React, { useEffect } from "react";
import {jwtDecode} from "jwt-decode";
import { useDispatch } from "react-redux";
import { accountAction } from "../redux/reducers/accountSlice";
import { useNavigate } from "react-router-dom";
import { addData } from "../../Api/axios";
import { toast } from "react-toastify";

function LoginPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        // Kiểm tra xem Google API đã sẵn sàng chưa
        const checkGoogle = setInterval(() => {
            if (window.google) {
                clearInterval(checkGoogle);
                google.accounts.id.initialize({
                    client_id: "428240789533-0ph77i9n53v8cqc7b8m55h7rq3hh7efn.apps.googleusercontent.com",
                    callback: handleCallbackResponse,
                });

                google.accounts.id.renderButton(
                    document.getElementById("googleSignIn"),
                    { theme: "outline", size: "large" }
                );
            }
        }, 100); // Kiểm tra mỗi 100ms

        return () => clearInterval(checkGoogle);
    }, []);

    async function handleCallbackResponse(response) {
        try {
          
            if (!response.credential) {
                throw new Error("No ID Token received!");
            }

            const idToken = response.credential;
            // const decoded = jwtDecode(idToken);
            const value ={
                googleToken: idToken,
                clientID: "428240789533-0ph77i9n53v8cqc7b8m55h7rq3hh7efn.apps.googleusercontent.com" 
            }
            
            const res = await addData("User/login-by-google", value);

            if (res?.status === 200) {
                const decode = jwtDecode(res.data.res.accessToken);
                dispatch(accountAction.setUser({
                    id: decode.Id,
                    name: decode.Username,
                    role: decode.Role,
                    avatar: decode.Avatar,
                }));
                toast.success("Login successfully by Google");

                setTimeout(() => navigate("/"), 1000);
            } else {
                throw new Error("Invalid response from backend.");
            }
        } catch (error) {
            console.error("Error in Google login:", error);
            toast.error("Login failed. Please try again.");
        }
    }

    return <div id="googleSignIn"></div>;
}

export default LoginPage;
