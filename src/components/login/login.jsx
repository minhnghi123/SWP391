import { useState, useContext } from "react";
import { motion } from "framer-motion";
import 'react-toastify/dist/ReactToastify.css';
import FormLogin from './formLogin';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { AuthContext } from "../Context/AuthContext";

export default function Login({ setRegister }) {
    const { loginUser, loading } = useContext(AuthContext);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [input, setInput] = useState({
        username: "",
        password: "",
    });

    const handleRegister = () => setRegister(1);
    const handleForgotPassword = () => setRegister(2);

    const handleChangeAccount = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        loginUser(input);
    };

    const isFormValid = () => {
        return input.username && input.password;
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-md space-y-6 sm:space-y-8 p-4 sm:p-6"
        >
            <div className="text-center space-y-3 sm:space-y-4">
                <div className="flex items-center justify-center space-x-2">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-500 to-blue-400 flex items-center justify-center">
                        <span className="text-2xl font-bold text-white">H</span>
                    </div>
                    <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
                        Welcome Back!
                    </h1>
                </div>
                <p className="text-gray-600 text-base sm:text-lg">
                    Simply your workflow and boost your productivity with
                    <span className="font-semibold text-blue-600"> HealthBlue</span>
                </p>
            </div>

            <FormLogin
                handleChangeAccount={handleChangeAccount}
                handleSubmit={handleSubmit}
                input={input}
                handleForgotPassword={handleForgotPassword}
                isFormValid={isFormValid}
                loading={loading}
            />

            <div className="text-center">
                <p className="text-gray-600 text-sm sm:text-base">
                    Not a member?{' '}
                    <button
                        onClick={handleRegister}
                        className="text-blue-600 font-medium hover:text-blue-800 hover:underline transition-all duration-300"
                    >
                        Register now
                    </button>
                </p>
            </div>
        </motion.div>
    );
}