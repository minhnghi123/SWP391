import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faApple } from '@fortawesome/free-brands-svg-icons';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';
import { useEffect, useState } from "react";

import LoginButton from './loginGoogle';
// import LogoutButton from './logoutGoogle';

import { gapi } from 'gapi-script';

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
const InputLogin = ({ type, placeholder, onChange, name, value }) => {
    return (
        <div className="group relative">
            <input
                className="w-full p-4 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 bg-white/50 backdrop-blur-sm"
                type={type}
                placeholder={placeholder}
                onChange={onChange}
                name={name}
                value={value}
                required
            />
        </div>
    )
}

export default function Login({ setRegister }) {

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
    const handleSubmit = (e) => {
        e.preventDefault();
        if (isOpen) {
            console.log(phoneNumber)
        }
        else {
            console.log(input)
        }
    }
    const isFormValid = () => {
        return (
            input.username &&
            input.password
        )
    }
  



    return (

        <div className="flex-[0.5] flex flex-col justify-center items-center p-8 mt-8">
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

            {
                isOpen ? (

                    <>
                        <form className="flex flex-col p-10 max-w-[400px] w-full items-center" onSubmit={handleSubmit}>
                            <div className="flex flex-col w-full space-y-5">
                                <div className="relative group">
                                    <input
                                        className="w-full p-4  border-2 border-gray-300 rounded-xl 
                                                    focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 
                                                    transition-all duration-300 bg-white/50 backdrop-blur-sm"
                                        type="text"
                                        placeholder="Enter phone number"
                                        onChange={handleChangePhoneNumber}


                                    />



                                    <div className={`absolute right-3 top-1/2 -translate-y-1/2 
                                                    px-4 py-1.5 ${sent ? 'cursor-pointer' : 'cursor-not-allowed'}
                                                    ${sent ? 'text-blue-600 font-medium' : 'text-gray-400 blur-[0.5px]'}`}
                                        onClick={handleClickOTP}>
                                        Send
                                    </div>

                                </div>

                                {openOTP && (
                                    <>

                                        <div className="relative group animate-fadeIn">
                                            <input
                                                className="w-full p-4 border-2 border-gray-300 rounded-xl 
                                                        focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 
                                                        transition-all duration-300 bg-white/50 backdrop-blur-sm  text-lg 
                                                         font-medium"
                                                type="text"
                                                placeholder="Enter Your OTP"

                                            />

                                        </div>
                                        <button className="w-full p-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white 
                                     rounded-xl text-base font-semibold hover:from-blue-700 hover:to-blue-800 
                                     transform hover:scale-[1.02] transition-all duration-300 shadow-md hover:shadow-lg
                                     disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
                                     flex items-center justify-center gap-2"
                                            disabled={!sent}
                                        >
                                            {openOTP ? 'Verify OTP' : 'Login'}

                                        </button>
                                    </>

                                )}



                                {openOTP && (
                                    <div className="text-center text-sm text-gray-600">
                                        Didn't receive the code? {' '}
                                        <button type="button" className="text-blue-600 hover:text-blue-800 font-medium">
                                            Resend
                                        </button>
                                    </div>
                                )}
                            </div>
                            <div className="flex items-center gap-4 w-full mt-6">
                                <div className="flex-grow h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
                                <div className="text-sm text-gray-500 whitespace-nowrap">or continue with</div>
                                <div className="flex-grow h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
                            </div>

                            <div className="mt-6 text-center">
                                <div className="flex justify-center gap-6">
                                    <LoginButton />
                                 
                                    {[   
                                        
                                        { icon: faApple, color: 'hover:bg-gray-50 hover:text-gray-900' },
                                        { icon: faFacebook, color: 'hover:bg-blue-50 hover:text-blue-600' }
                                    ].map((social, index) => (
                                        <div key={index}
                                            className={`w-12 h-12 bg-white rounded-full flex justify-center items-center 
                                                cursor-pointer ${social.color} transition-all duration-300 shadow-md 
                                                hover:shadow-lg transform border-2 border-gray-100 
                                                hover:border-${social.icon === faApple ? 'gray' : 'blue'}-500`}
                                        >
                                            <FontAwesomeIcon icon={social.icon} className="text-xl text-gray-700" />
                                        </div>
                                    ))}
                                </div>
                            </div>

                        </form>
                    </>
                ) : (
                    <form className="flex flex-col p-10 max-w-[400px] w-full items-center" onSubmit={handleSubmit}>
                        <div className="flex flex-col w-full space-y-5">
                            <InputLogin
                                type="text"
                                placeholder="Username"
                                onChange={handleChangeAccount}
                                name="username"
                                value={input.username}
                            />

                            <InputLogin
                                type="password"
                                placeholder="Password"
                                onChange={handleChangeAccount}
                                name="password"
                                value={input.password}
                            />

                            <span onClick={handleForgotPassword} className="text-right text-sm text-blue-600 cursor-pointer hover:text-blue-800 hover:underline transition-all duration-300">
                                Forgot Password?
                            </span>


                            <button type="submit"
                                className={`w-full p-4 mt-6 rounded-xl text-base font-semibold 
                            ${isFormValid()
                                        ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white cursor-pointer hover:from-blue-700 hover:to-blue-800'
                                        : 'bg-gray-100 text-gray-400 cursor-not-allowed'}
                            transform hover:scale-[1.01] transition-all duration-300 
                            shadow-md hover:shadow-lg active:scale-[0.99]`}
                                disabled={!isFormValid()}
                            >
                                Login
                            </button>
                        </div>
                        <div className="flex items-center gap-4 w-full mt-6">
                            <div className="flex-grow h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
                            <div className="text-sm text-gray-500 whitespace-nowrap">or continue with</div>
                            <div className="flex-grow h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
                        </div>

                        <div className="mt-6 text-center">
                            <div className="flex justify-center gap-6">
                                <LoginButton/>
                                {[
                                    { icon: faApple, color: 'hover:bg-gray-50 hover:text-gray-900' },
                                    { icon: faFacebook, color: 'hover:bg-blue-50 hover:text-blue-600' }
                                ].map((social, index) => (
                                    <div key={index}
                                        className={`w-12 h-12 bg-white rounded-full flex justify-center items-center 
                                                cursor-pointer ${social.color} transition-all duration-300 shadow-md 
                                                hover:shadow-lg transform border-2 border-gray-100 
                                                hover:border-${social.icon === faApple ? 'gray' : 'blue'}-500`}
                                    >
                                        <FontAwesomeIcon icon={social.icon} className="text-xl text-gray-700" />
                                    </div>
                                ))}
                            </div>
                        </div>

                    </form>
                )
            }



            <div className="mt-8 text-center">
                <p className="text-gray-600">
                    Not a member? {' '}

                    <a className="text-blue-600 cursor-pointer hover:text-blue-800 transition-all duration-300 
                                            font-semibold hover:underline" onClick={handleRegister}> Register now</a>
                </p>
            </div>
        </div>


    )
}