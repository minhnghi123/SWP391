import axios from "axios";
import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import Avatar from '../../../avatar.json';
import { addData } from "@/Api/axios";
import useAxios from "../../utils/useAxios";
import ToUpperCase from "../../utils/upperCaseFirstLetter";

const InputRegister = ({ type, placeholder, onChange, name, value, label, error }) => {
    return (
        <div className="space-y-2">
            {label && <label className="text-sm font-medium text-gray-700 ml-1">{label}</label>}
            <input
                type={type}
                placeholder={placeholder}
                className={`w-full p-4 border-2 rounded-xl 
                focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all duration-300 
                bg-white/60 backdrop-blur-md hover:bg-white/70
                ${error ? 'border-red-500' : 'border-gray-300 focus:border-blue-500'}`}
                onChange={onChange}
                value={value}
                name={name}
                max={new Date().toISOString().split('T')[0]}
                required
            />
            {error && <p className="text-red-500 text-xs ml-1">{error}</p>}
        </div>
    );
};



export default function Register({ setRegister }) {
    // const api = useAxios();
    const avatar = Avatar;
    const [err, setErr] = useState("");
    const [stage, setStage] = useState(1);
    const [verificationCode, setVerificationCode] = useState(["", "", "", "", "", ""]);
    const [input, setInput] = useState({
        firstName: "",
        lastName: "",
        birthDay: "",
        userName: "",
        password: "",
        confirmPassword: "",
        phone: "",
        gender: "",
        email: "",
    });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const inputRefs = useRef([]);

    const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const validatePhone = (phone) => /^\d{10,11}$/.test(phone);
    const validatePassword = (password) => password.length >= 8;
    const validateName = (name) => /^[a-zA-Z\s-]{2,}$/.test(name);

    const handleSignIn = () => setRegister(0);

    const handleChangeAccount = (e) => {
        const { name, value } = e.target;
        let newErrors = { ...errors };

        switch (name) {
            case "firstName":
            case "lastName":
                if (value && !validateName(value)) {
                    newErrors[name] = "Name must be at least 2 characters (letters only)";
                } else {
                    delete newErrors[name];
                }
                break;
            case "email":
                if (value && !validateEmail(value)) {
                    newErrors.email = "Invalid email format";
                } else {
                    delete newErrors.email;
                }
                break;
            case "phone":
                if (value && !validatePhone(value)) {
                    newErrors.phone = "Phone must be 10-11 digits";
                } else {
                    delete newErrors.phone;
                }
                break;
            case "password":
                if (value && !validatePassword(value)) {
                    newErrors.password = "Password must be at least 8 characters";
                } else {
                    delete newErrors.password;
                }
                break;
            case "confirmPassword":
                if (value && value !== input.password) {
                    newErrors.confirmPassword = "Passwords do not match";
                } else {
                    delete newErrors.confirmPassword;
                }
                break;
            case "userName":
                if (value && value.length < 3) {
                    newErrors.userName = "Username must be at least 3 characters";
                } else {
                    delete newErrors.userName;
                }
                break;
            default:
                break;
        }

        setInput({ ...input, [name]: value });
        setErrors(newErrors);
        setErr("");
    };

    const handleVerificationChange = (index, value) => {
        if (!/^[0-9]$/.test(value) && value !== "") return;
        const newCode = [...verificationCode];
        newCode[index] = value;
        setVerificationCode(newCode);

        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (index, e) => {
        if (e.key === "Backspace" && !verificationCode[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        } else if (e.key === "ArrowLeft" && index > 0) {
            inputRefs.current[index - 1]?.focus();
        } else if (e.key === "ArrowRight" && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const isFormValid = () => {
        return (
            input.firstName &&
            input.lastName &&
            input.userName &&
            input.email &&
            input.phone &&
            input.password &&
            input.confirmPassword &&
            input.birthDay &&
            input.gender &&
            validateName(input.firstName) &&
            validateName(input.lastName) &&
            validateEmail(input.email) &&
            validatePhone(input.phone) &&
            validatePassword(input.password) &&
            input.password === input.confirmPassword &&
            input.userName.length >= 3
        );
    };

    const handleStage1Submit = async (e) => {
        e.preventDefault();
        if (!isFormValid()) {
            setErr("Please complete all fields correctly");
            return;
        }

        setIsSubmitting(true);
        const avatarUrl = avatar[Math.floor(Math.random() * avatar.length)].avatar;

        try {
            const value = {
                name: `${ToUpperCase(input.firstName)} ${ToUpperCase(input.lastName)}`,
                username: input.userName,
                gmail: input.email,
                phoneNumber: input.phone,
                dateOfBirth: new Date(input.birthDay).toISOString(),
                password: input.password,
                avatar: avatarUrl,
                gender: input.gender?.toLowerCase() === "male" ? 0 : 1,
            };

            const res = await addData(`User/register`, value);
            if (res?.status === 200) {
                setStage(2);
            }
        } catch (error) {
            const errorMsg = error.response?.data?.msg || "Failed to send verification code";
            setErr(errorMsg);
            toast.error(errorMsg);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleFinalSubmit = async (e) => {
        e.preventDefault();
        if (!verificationCode.every(code => code.length === 1)) {
            setErr("Please enter complete verification code");
            return;
        }

        setIsSubmitting(true);
        try {
            const verifyValue = { otp: verificationCode.join("") };
            const verifyRes = await addData('User/verify-register', verifyValue);
        
            if (verifyRes?.status === 200) {
                toast.success("Registered successfully");
                setTimeout(() => setRegister(0), 1500);
            }
        } catch (error) {
            const errorMsg = error.response?.data?.message || "Verification failed";
            setErr(errorMsg);
            toast.error(errorMsg);
        } finally {
            setIsSubmitting(false);
        }
    };

    const renderVerificationStage = () => {
        return (
            <div className="space-y-6">
                <p className="text-center text-gray-600">
                    We've sent a verification code to your email
                </p>
                <div className="flex justify-between space-x-3">
                    {verificationCode.map((digit, index) => (
                        <input
                            key={index}
                            ref={(el) => (inputRefs.current[index] = el)}
                            id={`code-${index}`}
                            type="text"
                            maxLength="1"
                            value={digit}
                            onChange={(e) => handleVerificationChange(index, e.target.value)}
                            onKeyDown={(e) => handleKeyDown(index, e)}
                            className="w-12 h-12 text-center text-2xl font-bold border-2 border-gray-300 rounded-lg
                            focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                        />
                    ))}
                </div>
            </div>
        );
    };

    return (
        <div className="min-h-screen flex flex-col justify-center items-center p-8 ư-">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md space-y-8"
            >
                <div className="text-center space-y-4">
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">
                        {stage === 2 ? "Verify Your Email" : "Create Account"}
                    </h1>
                </div>

                <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-xl">
                    {stage === 1 ? (
                        <form onSubmit={handleStage1Submit} className="space-y-6">
                            <div className="grid grid-cols-2 gap-4">
                                <InputRegister
                                    type="text"
                                    label="First Name"
                                    placeholder="Enter your first name"
                                    onChange={handleChangeAccount}
                                    name="firstName"
                                    value={input.firstName}
                                    error={errors.firstName}
                                />
                                <InputRegister
                                    type="text"
                                    label="Last Name"
                                    placeholder="Enter your last name"
                                    onChange={handleChangeAccount}
                                    name="lastName"
                                    value={input.lastName}
                                    error={errors.lastName}
                                />
                            </div>

                            <InputRegister
                                type="text"
                                label="Username"
                                placeholder="Choose a username"
                                onChange={handleChangeAccount}
                                name="userName"
                                value={input.userName}
                                error={errors.userName}
                            />

                            <InputRegister
                                type="email"
                                label="Email Address"
                                placeholder="Enter your email"
                                onChange={handleChangeAccount}
                                name="email"
                                value={input.email}
                                error={errors.email}
                            />

                            <InputRegister
                                type="tel"
                                label="Phone Number"
                                placeholder="Enter your phone number"
                                onChange={handleChangeAccount}
                                name="phone"
                                value={input.phone}
                                error={errors.phone}
                            />

                            <div className="grid grid-cols-2 gap-4">
                                <InputRegister
                                    type="password"
                                    label="Password"
                                    placeholder="Create a password"
                                    onChange={handleChangeAccount}
                                    name="password"
                                    value={input.password}
                                    error={errors.password}
                                />
                                <InputRegister
                                    type="password"
                                    label="Confirm Password"
                                    placeholder="Confirm your password"
                                    onChange={handleChangeAccount}
                                    name="confirmPassword"
                                    value={input.confirmPassword}
                                    error={errors.confirmPassword}
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <InputRegister
                                    type="date"
                                    label="Date of Birth"
                                    onChange={handleChangeAccount}
                                    name="birthDay"
                                    max={new Date().toISOString().split('T')[0]}
                                    value={input.birthDay}
                                />
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700 ml-1">Gender</label>
                                    <select
                                        name="gender"
                                        value={input.gender}
                                        onChange={handleChangeAccount}
                                        className="w-full p-4 border-2 border-gray-300 rounded-xl 
                                        focus:outline-none focus:border-blue-500 focus:ring-2 
                                        focus:ring-blue-200 transition-all duration-300 
                                        bg-white/60 backdrop-blur-md hover:bg-white/70"
                                    >
                                        <option value="">Select gender</option>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                    </select>
                                </div>
                            </div>

                            {err && (
                                <p className="text-red-500 text-sm text-center">{err}</p>
                            )}

                            <button
                                type="submit"
                                disabled={!isFormValid() || isSubmitting}
                                className={`w-full py-3 rounded-xl font-medium transition-all duration-300
                                    ${isFormValid() && !isSubmitting
                                        ? "bg-gradient-to-r from-blue-600 to-blue-500 text-white hover:from-blue-700 hover:to-blue-600"
                                        : "bg-gray-200 text-gray-400 cursor-not-allowed"
                                    }`}
                            >
                                {isSubmitting ? "Processing..." : "Submit & Verify Email"}
                            </button>
                        </form>
                    ) : (
                        <form onSubmit={handleFinalSubmit}>
                            {renderVerificationStage()}
                            {err && (
                                <p className="text-red-500 text-sm mt-4 text-center">{err}</p>
                            )}
                            <div className="flex justify-between mt-8">
                                <button
                                    type="button"
                                    onClick={() => setStage(1)}
                                    className="px-6 py-3 text-blue-600 hover:text-blue-800 font-medium"
                                    disabled={isSubmitting}
                                >
                                    Back
                                </button>
                                <button
                                    type="submit"
                                    disabled={!verificationCode.every(code => code.length === 1) || isSubmitting}
                                    className={`px-6 py-3 rounded-xl font-medium transition-all duration-300
                                        ${verificationCode.every(code => code.length === 1) && !isSubmitting
                                            ? "bg-gradient-to-r from-blue-600 to-blue-500 text-white hover:from-blue-700 hover:to-blue-600"
                                            : "bg-gray-200 text-gray-400 cursor-not-allowed"
                                        }`}
                                >
                                    {isSubmitting ? "Processing..." : "Complete Registration"}
                                </button>
                            </div>
                        </form>
                    )}
                </div>

                <div className="text-center">
                    <p className="text-gray-600">
                        Already have an account?{" "}
                        <button
                            onClick={handleSignIn}
                            className="text-blue-600 font-medium hover:text-blue-800 hover:underline"
                        >
                            Sign in
                        </button>
                    </p>
                </div>
            </motion.div>
        </div>
    );
}