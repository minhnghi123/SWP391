import axios from "axios";
import { useState } from "react";
import { motion } from "framer-motion";
import {  toast } from "react-toastify";
import Avatar from '../../../avatar.json'
import useAxios from "../../utils/useAxios";
const url = import.meta.env.VITE_BASE_URL_DB

const InputRegister = ({ type, placeholder, onChange, name, value, label }) => {
    return (
        <div className="space-y-2">
            {label && <label className="text-sm font-medium text-gray-700 ml-1">{label}</label>}
            <input
                type={type}
                placeholder={placeholder}
                className="w-full p-4 border-2 border-gray-300 rounded-xl 
                focus:outline-none focus:border-blue-500 focus:ring-2 
                focus:ring-blue-200 transition-all duration-300 
                bg-white/60 backdrop-blur-md hover:bg-white/70"
                onChange={onChange}
                value={value}
                name={name}
                required
            />
        </div>
    );
};

const StepIndicator = ({ currentStep, totalSteps }) => {
    return (
        <div className="flex justify-center items-center space-x-2 mb-8">
            {[...Array(totalSteps)].map((_, index) => (
                <div
                    key={index}
                    className={`h-2 w-2 rounded-full transition-all duration-300 ${index < currentStep ? 'bg-blue-600 w-8' : 'bg-gray-300'
                        }`}
                />
            ))}
        </div>
    );
};

export default function Register({ setRegister }) {
    const api = useAxios()
    const avatar = Avatar
    const [err, setErr] = useState("");
    const [step, setStep] = useState(1);
    const [stage, setStage] = useState(1); // Stage 1: Information collection, Stage 2: Verification
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
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSignIn = () => {
        setRegister(0);
    };

    const handleChangeAccount = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
        setErr("");
    };

    const handleVerificationChange = (index, value) => {
        if (!/^[0-9]*$/.test(value)) return;
        const newCode = [...verificationCode];
        newCode[index] = value;
        setVerificationCode(newCode);
        if (value && index < 5) {
            document.getElementById(`code-${index + 1}`).focus();
        }
    };

    const isStepValid = () => {
        switch (step) {
            case 1:
                return input.firstName && input.lastName;
            case 2:
                return input.userName && input.email && input.phone;
            case 3:
                return input.password && input.confirmPassword && input.password === input.confirmPassword;
            case 4:
                return input.birthDay && input.gender;
            default:
                return false;
        }
    };

    const handleNext = () => {
        if (step === 3 && input.password !== input.confirmPassword) {
            setErr("Passwords do not match");
            return;
        }

        setStep(step + 1);
    };

    const handleBack = () => {
        setStep(step - 1);
        setErr("");
    };

    // Submit all user information and request verification code
    const handleStage1Submit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        const avatarUrl = avatar[Math.floor(Math.random() * avatar.length)].avatar;

        try {
            const value = {
                name: `${input.firstName} ${input.lastName}`,
                username: input.userName,
                gmail: input.email,
                phoneNumber: input.phone,
                dateofBirth: new Date(input.birthDay).toISOString(),
                password: input.password,
                avatar: avatarUrl,
                gender: input.gender?.toLowerCase() === "male" ? 0 : 1,
                
            }
           
            const res = await api.post(`${url}/User/register`, value)
            if (res?.status === 200) {
                setStage(2);
                setIsSubmitting(false);
            }
        } catch (error) {
            const errorMsg = error.response?.data?.message || "Failed to send verification code";
            setErr(errorMsg);
            toast.error(errorMsg);
            setIsSubmitting(false);
        }
    };

    // Complete registration with verification code
    const handleFinalSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

       
        try {
            // First verify the code
            const verifyValue = {
                otp: verificationCode.join("")
            };
            const verifyRes = await api.post(`${url}/User/verify-register`, verifyValue);

            if (verifyRes?.status === 200) {
                toast.success("Registered successfully");
                setTimeout(() => setRegister(0), 1500);
            }
        } catch (error) {
            const errorMsg = error.response?.data?.message || "Registration failed";
            setErr(errorMsg);
            toast.error(errorMsg);
        } finally {
            setIsSubmitting(false);
        }
    };

    const renderStep = () => {
        switch (step) {
            case 1:
                return (
                    <div className="space-y-4">
                        <InputRegister
                            type="text"
                            label="First Name"
                            placeholder="Enter your first name"
                            onChange={handleChangeAccount}
                            name="firstName"
                            value={input.firstName}
                        />
                        <InputRegister
                            type="text"
                            label="Last Name"
                            placeholder="Enter your last name"
                            onChange={handleChangeAccount}
                            name="lastName"
                            value={input.lastName}
                        />
                    </div>
                );
            case 2:
                return (
                    <div className="space-y-4">
                        <InputRegister
                            type="text"
                            label="Username"
                            placeholder="Choose a username"
                            onChange={handleChangeAccount}
                            name="userName"
                            value={input.userName}
                        />
                        <InputRegister
                            type="email"
                            label="Email Address"
                            placeholder="Enter your email"
                            onChange={handleChangeAccount}
                            name="email"
                            value={input.email}
                        />
                        <InputRegister
                            type="tel"
                            label="Phone Number"
                            placeholder="Enter your phone number"
                            onChange={handleChangeAccount}
                            name="phone"
                            value={input.phone}
                        />
                    </div>
                );
            case 3:
                return (
                    <div className="space-y-4">
                        <InputRegister
                            type="password"
                            label="Password"
                            placeholder="Create a password"
                            onChange={handleChangeAccount}
                            name="password"
                            value={input.password}
                        />
                        <InputRegister
                            type="password"
                            label="Confirm Password"
                            placeholder="Confirm your password"
                            onChange={handleChangeAccount}
                            name="confirmPassword"
                            value={input.confirmPassword}
                        />
                    </div>
                );
            case 4:
                return (
                    <div className="space-y-4">
                        <InputRegister
                            type="date"
                            label="Date of Birth"
                            onChange={handleChangeAccount}
                            name="birthDay"
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
                );
            default:
                return null;
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
                            id={`code-${index}`}
                            type="text"
                            maxLength="1"
                            value={digit}
                            onChange={(e) => handleVerificationChange(index, e.target.value)}
                            className="w-12 h-12 text-center text-2xl font-bold border-2 border-gray-300 rounded-lg
                            focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                        />
                    ))}
                </div>
            </div>
        );
    };

    return (
        <div className="min-h-screen flex flex-col justify-center items-center p-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md space-y-8"
            >
                <div className="text-center space-y-4">
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                        {stage === 2 ? "Verify Your Email" : "Create Account"}
                    </h1>
                    {stage === 1 && (
                        <p className="text-gray-600">
                            Step {step} of 4
                        </p>
                    )}
                </div>

                {stage === 1 && <StepIndicator currentStep={step} totalSteps={4} />}

                <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-xl">
                    {stage === 1 ? (
                        <form onSubmit={step === 4 ? handleStage1Submit : (e) => e.preventDefault()}>
                            {renderStep()}

                            {err && (
                                <p className="text-red-500 text-sm mt-4 text-center">{err}</p>
                            )}

                            <div className="flex justify-between mt-8">
                                {step > 1 && (
                                    <button
                                        type="button"
                                        onClick={handleBack}
                                        className="px-6 py-3 text-blue-600 hover:text-blue-800 font-medium"
                                        disabled={isSubmitting}
                                    >
                                        Back
                                    </button>
                                )}
                                {step < 4 ? (
                                    <button
                                        type="button"
                                        onClick={handleNext}
                                        disabled={!isStepValid() || isSubmitting}
                                        className={`px-6 py-3 rounded-xl font-medium transition-all duration-300
                                            ${isStepValid() && !isSubmitting
                                                ? "bg-blue-600 text-white hover:bg-blue-700"
                                                : "bg-gray-200 text-gray-400 cursor-not-allowed"
                                            } ml-auto`}
                                    >
                                        Continue
                                    </button>
                                ) : (
                                    <button
                                        type="submit"
                                        disabled={!isStepValid() || isSubmitting}
                                        className={`px-6 py-3 rounded-xl font-medium transition-all duration-300
                                            ${isStepValid() && !isSubmitting
                                                ? "bg-blue-600 text-white hover:bg-blue-700"
                                                : "bg-gray-200 text-gray-400 cursor-not-allowed"
                                            } ml-auto`}
                                    >
                                        {isSubmitting ? "Sending..." : "Submit & Verify Email"}
                                    </button>
                                )}
                            </div>
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
                                            ? "bg-blue-600 text-white hover:bg-blue-700"
                                            : "bg-gray-200 text-gray-400 cursor-not-allowed"
                                        } ml-auto`}
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
