
import { useState, useContext } from "react";
import { motion } from "framer-motion";
import 'react-toastify/dist/ReactToastify.css';
import FormLogin from './formLogin';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";

import { AuthContext } from "../Context/AuthContext";

const ButtonLogin = ({ label, handleClick, link, d, isActive }) => {
    return (
        <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleClick}
            className={`px-4 sm:px-3 py-2 sm:py-3 rounded-xl font-medium transition-all duration-300
                flex items-center gap-2 shadow-sm text-sm sm:text-base
                ${isActive
                    ? 'bg-gradient-to-r from-blue-500 to-blue-400 text-white shadow-blue-200 hover:shadow-md hover:from-blue-600 hover:to-blue-500'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
        >
            <svg xmlns={link} className="h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={d} />
            </svg>
            {label}
        </motion.button>
    )
}

export default function Login({ setRegister }) {
    const { loginUser, loading } = useContext(AuthContext);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [openOTP, setOTP] = useState(false);
    const [sent, setSent] = useState(false);
    const [isOpen, setOpen] = useState(true);
    const [input, setInput] = useState({
        username: "",
        password: "",
    });

    const handleRegister = () => setRegister(1);
    const handleForgotPassword = () => setRegister(2);
    const [phoneNumber, setPhoneNumber] = useState("");

    const handleClickByAccount = () => setOpen(false);
    const handleClickByPhoneNumber = () => setOpen(true);

    const handleChangeAccount = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const handleChangePhoneNumber = (e) => {
        const newPhoneNumber = e.target.value;
        setPhoneNumber(newPhoneNumber);
        setSent(newPhoneNumber.trim() !== "");
    };

    const handleClickOTP = () => {
        setOTP(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isOpen) {
            console.log("OTP");
        } else {
            loginUser(input);
        }
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

            <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
                <ButtonLogin
                    label="Login by Phone"
                    handleClick={handleClickByPhoneNumber}
                    link="http://www.w3.org/2000/svg"
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    isActive={isOpen}
                />
                <ButtonLogin
                    label="Login by Account"
                    handleClick={handleClickByAccount}
                    link="http://www.w3.org/2000/svg"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    isActive={!isOpen}
                />
            </div>

            <FormLogin
                handleChangeAccount={handleChangeAccount}
                handleChangePhoneNumber={handleChangePhoneNumber}
                handleClickOTP={handleClickOTP}
                handleSubmit={handleSubmit}
                input={input}
                handleForgotPassword={handleForgotPassword}
                openOTP={openOTP}
                isOpen={isOpen}
                isFormValid={isFormValid}
                sent={sent}
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