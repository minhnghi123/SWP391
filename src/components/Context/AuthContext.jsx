import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { addData } from "../../Api/axios";
import { useDispatch } from "react-redux";
import { accountAction } from "../redux/reducers/accountSlice";
import { toast } from "react-toastify";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [authTokens, setAuthTokens] = useState(() => {
        const storedTokens = localStorage.getItem('authTokens');
        return storedTokens ? JSON.parse(storedTokens) : null;
    });

    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [error, setError] = useState(null);

    useEffect(() => {
        if (authTokens?.accessToken) {
            const decoded = jwtDecode(authTokens.accessToken);
            dispatch(accountAction.setUser({
                id: decoded.Id,
                name: decoded.Username,
                role: decoded.Role,
                avatar: decoded.Avatar,
            }));
        }
        setLoading(false);
    }, [authTokens, dispatch]);

    const loginUser = async (data) => {
        setLoading(true)
        const value = { username: data.username, password: data.password };
        try {
            const res = await addData('User/login-by-account', value);
            if (res.status === 200 && res.data?.loginResponse) {
                const newTokens = res.data.loginResponse;
                setAuthTokens(newTokens);
                localStorage.setItem('authTokens', JSON.stringify(newTokens));

                const decoded = jwtDecode(newTokens.accessToken);
                dispatch(accountAction.setUser({
                    id: decoded.Id,
                    name: decoded.Username,
                    role: decoded.Role,
                    avatar: decoded.Avatar,
                }));

                setTimeout(() => {
                    if (decoded.Role.toLowerCase() === 'admin') {
                        toast.success("Welcome back Admin")
                        navigate('/dashboardPage/dashboard')
                    } else if (decoded.Role.toLowerCase() === 'user') {
                        toast.success("Login successfully")
                        navigate('/')
                    }
                    else {
                        toast.success("Welcome comeback Staff")
                        navigate('/staffPage/dashboardStaff')
                    }
                }, 1000)
            }
        } catch (error) {
            const errorMessage = error.response?.data?.error || "An error occurred";
            toast.error(errorMessage)
        }
        finally {
            setLoading(false)
        }
    };
    const loginByGoogle = async (data) => {
        const value = { googleToken: data.googleToken, clientID: data.clientID };

        try {
            const res = await addData('User/login-by-google', value);
            if (res.status === 200 && res.data?.res) {
                const newTokens = res.data.res;
                setAuthTokens(newTokens);
                localStorage.setItem('authTokens', JSON.stringify(newTokens));
                const decoded = jwtDecode(newTokens.accessToken);
                dispatch(accountAction.setUser({
                    id: decoded.Id,
                    name: decoded.Username,
                    role: decoded.Role,
                    avatar: decoded.Avatar,
                }));

                setTimeout(() => {
                    if (decoded.Role.toLowerCase() === 'admin') {
                        toast.success("Welcome back Admin")
                        navigate('/dashboardPage/dashboard')
                    } else if (decoded.Role.toLowerCase() === 'user') {
                        toast.success("Login successfully")
                        navigate('/')
                    }
                    else {
                        toast.success("Welcome comeback Staff")
                        navigate('/staffPage/dashboardStaff')
                    }
                }, 1000)
            }
        } catch (error) {
            const errorMessage = error.response?.data?.error || "An error occurred";
            toast.error(errorMessage)
        }
    }

    const logoutUser = () => {
        setAuthTokens(null);
        dispatch(accountAction.clearUser());
        localStorage.removeItem('authTokens');
        navigate('/');
    };

    const value = {
        authTokens, setAuthTokens, loginUser, logoutUser, error, setError, loading, loginByGoogle
    }
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};
