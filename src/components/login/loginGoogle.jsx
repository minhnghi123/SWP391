import React, { useEffect, useContext } from "react";
import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";
import { accountAction } from "../redux/reducers/accountSlice";
import { useNavigate } from "react-router-dom";
import { addData } from "../../Api/axios";
import { toast } from "react-toastify";
import useAxios from "../../utils/useAxios";
import { AuthContext } from "../Context/AuthContext";
const url = import.meta.env.VITE_BASE_URL_DB
function LoginPage() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const api = useAxios()
    const { loginByGoogle } = useContext(AuthContext)
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
        if (!response.credential) {
            throw new Error("No ID Token received!");
        }
        const idToken = response.credential;
        const value = { googleToken: idToken, clientID: "428240789533-0ph77i9n53v8cqc7b8m55h7rq3hh7efn.apps.googleusercontent.com" };
        await loginByGoogle(value)
    }

    return <div id="googleSignIn"></div>;
}

export default LoginPage;
