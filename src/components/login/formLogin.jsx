import LoginGoogle from './loginGoogle';
// import LoginFaceBook from './loginFacebook'
const FormLogin = ({ handleSubmit, handleChangePhoneNumber, handleClickOTP, handleChangeAccount, input, isFormValid, handleForgotPassword, openOTP, isOpen, sent }) => {
    return (
        <form className="flex flex-col p-10 max-w-[400px] w-full items-center" onSubmit={handleSubmit}>
            {
                isOpen ? (
                    <div className="flex flex-col w-full space-y-5">
                        <div className="relative group">
                            <input
                                className="w-full p-4 border-2 border-gray-300 rounded-xl 
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
                                    transition-all duration-300 bg-white/50 backdrop-blur-sm text-lg 
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
                        <div className="flex items-center gap-4 w-full mt-6">
                            <div className="flex-grow h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
                            <div className="text-sm text-gray-500 whitespace-nowrap">or continue with</div>
                            <div className="flex-grow h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
                        </div>
                    </div>
                ) : (
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


                        <div className="flex items-center gap-4 w-full mt-6">
                            <div className="flex-grow h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
                            <div className="text-sm text-gray-500 whitespace-nowrap">or continue with</div>
                            <div className="flex-grow h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
                        </div>
                    </div>
                )
            }
            <div className="mt-6 text-center">
                <div className="flex justify-center gap-6 items-center">
                    <LoginGoogle />
                    {/* <div>
                        or
                    </div> */}
                    {/* <LoginFaceBook /> */}
                </div>
            </div>
        </form >
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
export default FormLogin