import { useState } from "react"

export default function ForgotPassword({ setRegister }) {
    const [email, setEmail] = useState('')
    
    const handleResetPassword = () => {
        setRegister(0)
    }

    return (
        <div className="flex-[0.5] flex flex-col justify-center items-center p-8 mt-8">
            <div className="flex flex-col text-center mb-12">
                <div className="font-bold text-5xl mb-4 bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                    Reset Password
                </div>
                <div className="text-gray-600 max-w-[415px]">
                    <p className="text-lg leading-relaxed">
                        Don't worry! It happens. Please enter your email address to reset your password.
                    </p>
                </div>
            </div>
            
            <div className="flex flex-col w-full max-w-[420px] space-y-4 bg-white/60 backdrop-blur-md rounded-2xl p-8 shadow-xl shadow-gray-200/50">
                <input 
                    type="email" 
                    placeholder="Enter Email Address" 
                    className="w-full p-4 border-2 border-gray-300 rounded-xl 
                    focus:outline-none focus:border-blue-500 focus:ring-2 
                    focus:ring-blue-200 transition-all duration-300 
                    bg-white/80 backdrop-blur-sm hover:border-gray-400"
                />
                <input 
                    type="password" 
                    placeholder="Enter New Password" 
                    className="w-full p-4 border-2 border-gray-300 rounded-xl 
                    focus:outline-none focus:border-blue-500 focus:ring-2 
                    focus:ring-blue-200 transition-all duration-300 
                    bg-white/80 backdrop-blur-sm hover:border-gray-400"
                />
                <input 
                    type="password" 
                    placeholder="Confirm New Password" 
                    className="w-full p-4 border-2 border-gray-300 rounded-xl 
                    focus:outline-none focus:border-blue-500 focus:ring-2 
                    focus:ring-blue-200 transition-all duration-300 
                    bg-white/80 backdrop-blur-sm hover:border-gray-400"
                />

                <button 
                    onClick={handleResetPassword}
                    className="w-full p-4 mt-4 bg-gradient-to-r from-blue-600 to-blue-700 
                    text-white rounded-xl text-base font-semibold 
                    hover:from-blue-700 hover:to-blue-800 
                    transform hover:scale-[1.02] transition-all duration-300 
                    shadow-md hover:shadow-lg"
                >
                    Reset Password
                </button>
            </div>

            <div className="mt-8 text-center">
                <p className="text-gray-600">
                    Remember your password?{' '}
                    <span 
                        className="text-blue-600 cursor-pointer hover:text-blue-800 
                        transition-all duration-300 font-semibold hover:underline"
                        onClick={() => setRegister(0)}
                    >
                        Back to Login
                    </span>
                </p>
            </div>
        </div>
    )
}