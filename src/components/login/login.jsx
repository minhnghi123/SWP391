
import { jwtDecode } from "jwt-decode";
import { useState, useContext } from "react";
import { ToastContainer, toast } from "react-toastify";
import FormLogin from './formLogin';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../Services/AuthLogin';
export default function Login({ setRegister }) {
    const navigate = useNavigate()
    const [openOTP, setOTP] = useState(false);
    const [sent, setSent] = useState(false);
    const [isOpen, setOpen] = useState(true)
    const [input, setInput] = useState({
        username: "",
        password: "",
    });
    const handleRegister = () => {
        setRegister(1);
    };
    const handleForgotPassword = () => setRegister(2);
    const [phoneNumber, setPhoneNumber] = useState({
        phoneNumber: ""
    });

    const handleClickByAccount = () => {
        setOpen(false)
    }
    const handleClickByPhoneNumber = () => {
        setOpen(true)
    }

    const handleChangeAccount = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }
    const handleChangePhoneNumber = (e) => {
        const newPhoneNumber = e.target.value;
        setPhoneNumber(newPhoneNumber);
        setSent(newPhoneNumber.trim() !== "");

    }
    const handleClickOTP = () => {
        setOTP(true)
    }
    const { login } = useContext(AuthContext)
    const handleSubmit = async (e) => {
        e.preventDefault();

        // phone 
        if (isOpen) {
            console.log(phoneNumber);
            return;
        }
        // check input
        if (!input || !input.username || !input.password) {
            toast.error("You need to provide a username or password");
            return;
        }
        try {
            const response = await axios.post('https://fakestoreapi.com/auth/login', input);
            const token = response?.data?.token;
            if (!token) {
                toast.error("Login Failed: No token received");
                return;
            }
            const decoded = jwtDecode(token);
            localStorage.setItem("Account", JSON.stringify(decoded));
            toast.success("Login successfully");
            // login()
            setTimeout(() => {
                navigate('/')
            }, 1000)
        } catch (err) {
            toast.error("Login Failed");
        }
    };

    const isFormValid = () => {
        return (
            input.username &&
            input.password
        )
    }
    return (
        <>
            <ToastContainer />
            <div className="flex-[0.5] flex flex-col justify-center items-center p-8 mt-8">
                <div>
                    <button onClick={() => navigate('/')}>Home</button>
                </div>
                <div className="flex flex-col text-center">
                    <div className="font-bold text-5xl mb-3 bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">Welcome Back!</div>
                    <div className="text-gray-600 max-w-[415px]">
                        <p className="text-lg">
                            Simply your workflow and boost your productivity with
                            <span className="font-semibold text-blue-600"> Tuga's App</span>. Get started for free.
                        </p>
                    </div>
                </div>
                <div className="flex flex-row gap-4 mt-8">

                    <ButtonLogin
                        label="Login by Phone"
                        handleClick={handleClickByPhoneNumber}
                        link="http://www.w3.org/2000/svg"
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        isActive={isOpen}
                    />

                    <ButtonLogin label="Login by Account" handleClick={handleClickByAccount}
                        link="http://www.w3.org/2000/svg"
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        isActive={!isOpen}
                    />
                </div>
                {/* formLogin */}
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


                />
                <div className="mt-8 text-center">
                    <p className="text-gray-600">
                        Not a member? {' '}

                        <a className="text-blue-600 cursor-pointer hover:text-blue-800 transition-all duration-300 
                                            font-semibold hover:underline" onClick={handleRegister}> Register now</a>
                    </p>
                </div>
            </div>

        </>
    )
}
const ButtonLogin = ({ label, handleClick, link, d, isActive }) => {
    return (
        <button
            onClick={handleClick}
            className={`px-6 py-3 rounded-xl font-medium transition-all duration-300
                                flex items-center gap-2 shadow-sm
                                ${isActive
                    ? 'bg-blue-500 text-white shadow-blue-200 hover:shadow-md hover:bg-blue-600'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
        >
            <svg xmlns={link} className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d={d}
                />
            </svg>
            {label}
        </button>
    )
}