import { motion } from 'framer-motion';
import LoginGoogle from './loginGoogle';
// import LoginFaceBook from './loginFacebook'

const FormLogin = ({ handleSubmit, handleChangePhoneNumber, handleClickOTP, handleChangeAccount, input, isFormValid, handleForgotPassword, openOTP, isOpen, sent, loading }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-md mx-auto"
        >
            <form className="bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-xl space-y-6" onSubmit={handleSubmit}>
                {isOpen ? (
                    <div className="space-y-6">
                        <div className="relative">
                            <input
                                className="w-full p-4 border-2 border-gray-300 rounded-xl 
                                focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 
                                transition-all duration-300 bg-white/50 backdrop-blur-sm"
                                type="text"
                                placeholder="Enter phone number"
                                onChange={handleChangePhoneNumber}
                            />
                            <button
                                type="button"
                                className={`absolute right-3 top-1/2 -translate-y-1/2 
                                px-4 py-1.5 rounded-lg transition-all duration-300
                                ${sent
                                        ? 'bg-blue-100 text-blue-600 hover:bg-blue-200 cursor-pointer'
                                        : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}
                                onClick={handleClickOTP}
                                disabled={!sent}
                            >
                                Send
                            </button>
                        </div>
                        {openOTP && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="space-y-6"
                            >
                                <div className="relative">
                                    <input
                                        className="w-full p-4 border-2 border-gray-300 rounded-xl 
                                        focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 
                                        transition-all duration-300 bg-white/50 backdrop-blur-sm text-lg 
                                        font-medium"
                                        type="text"
                                        placeholder="Enter Your OTP"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="w-full p-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white 
                                    rounded-xl text-base font-semibold hover:from-blue-700 hover:to-blue-800 
                                    transform hover:scale-[1.02] transition-all duration-300 shadow-md hover:shadow-lg
                                    disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
                                    flex items-center justify-center gap-2"
                                    disabled={!sent}
                                >
                                    {loading ? (
                                        <>
                                            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            <span>Verifying...</span>
                                        </>
                                    ) : 'Verify OTP'}
                                </button>
                            </motion.div>
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
                ) : (
                    <div className="space-y-5">
                        <InputLogin
                            type="text"
                            placeholder="Username"
                            onChange={handleChangeAccount}
                            name="username"
                            value={input.username}
                            label="Username"
                        />
                        <InputLogin
                            type="password"
                            placeholder="Password"
                            onChange={handleChangeAccount}
                            name="password"
                            value={input.password}
                            label="Password"
                        />
                        <div className="flex justify-end">
                            <button
                                type="button"
                                onClick={handleForgotPassword}
                                className="text-sm text-blue-600 hover:text-blue-800 hover:underline transition-all duration-300"
                            >
                                Forgot Password?
                            </button>
                        </div>
                        <button
                            type="submit"
                            className={`w-full p-4 rounded-xl text-base font-semibold transition-all duration-300
                                ${isFormValid()
                                    ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 transform hover:scale-[1.02] shadow-md hover:shadow-lg'
                                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                }`}
                            disabled={!isFormValid()}
                        >
                            {loading ? (
                                <div className="flex items-center justify-center gap-2">
                                    <svg className=" animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    <span className={`${loading ? 'cursor-pointer' : ''}`}>Signing in...</span>
                                </div>
                            ) : 'Sign in'}
                        </button>
                    </div>
                )}

                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-white/80 text-gray-500">or continue with</span>
                    </div>
                </div>

                <div className="flex justify-center space-x-4">
                    <LoginGoogle />
                </div>
            </form>
        </motion.div>
    )
}

const InputLogin = ({ type, placeholder, onChange, name, value, label }) => {
    return (
        <div className="space-y-2">
            {label && (
                <label className="block text-sm font-medium text-gray-700">
                    {label}
                </label>
            )}
            <input
                className="w-full p-4 border-2 border-gray-300 rounded-xl 
                focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 
                transition-all duration-300 bg-white/50 backdrop-blur-sm"
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

export default FormLogin