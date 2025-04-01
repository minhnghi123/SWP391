import React, { useEffect, useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
const url = import.meta.env.VITE_GOOGLE_CLIENT_ID
function LoginPage() {
    const { loginByGoogle } = useContext(AuthContext)
    useEffect(() => {
        // Kiểm tra xem Google API đã sẵn sàng chưa
        const checkGoogle = setInterval(() => {
            if (window.google) {
                clearInterval(checkGoogle);
                google.accounts.id.initialize({ //h OAuth 2.0.
                    client_id: url,
                    callback: handleCallbackResponse,
                });

                google.accounts.id.renderButton(
                    document.getElementById("googleSignIn"),
                    { theme: "outline", size: "large" }
                );
            }
        }, 100);

        return () => clearInterval(checkGoogle);
    }, []);

    const handleCallbackResponse = async (response) => {
        if (!response.credential) {
            throw new Error("No ID Token received!");
        }
        const idToken = response.credential;
        const value = { googleToken: idToken, clientID: url };
        await loginByGoogle(value)
    }

    return <div id="googleSignIn"></div>;
}

export default LoginPage;
