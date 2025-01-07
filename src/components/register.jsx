

export default function Register({ setRegister }) {
    const handleSignIn = () => {
        setRegister(0);
    };

    return (
            <div className="flex-[0.5] flex flex-col justify-center items-center p-8 mt-8">
                <div className="flex flex-col text-center mb-8">
                    <div className="font-bold text-5xl mb-3 bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                        Create Account
                    </div>
                    <div className="text-gray-600 max-w-[415px]">
                        <p className="text-lg">
                            Join us to start your journey with
                            <span className="font-semibold text-blue-600"> Tuga's App</span>
                        </p>
                    </div>
                </div>
                
                <div className="flex flex-col w-full max-w-[400px] space-y-4">
                    <input 
                        type="text" 
                        placeholder="First Name"
                        className="w-full p-4 border-2 border-gray-300 rounded-xl 
                        focus:outline-none focus:border-blue-500 focus:ring-2 
                        focus:ring-blue-200 transition-all duration-300 
                        bg-white/50 backdrop-blur-sm" 
                    />
                    <input 
                        type="text" 
                        placeholder="Last Name"
                        className="w-full p-4 border-2 border-gray-300 rounded-xl 
                        focus:outline-none focus:border-blue-500 focus:ring-2 
                        focus:ring-blue-200 transition-all duration-300 
                        bg-white/50 backdrop-blur-sm" 
                    />
                    <input 
                        type="date" 
                        placeholder="Your Birthday"
                        className="w-full p-4 border-2 border-gray-300 rounded-xl 
                        focus:outline-none focus:border-blue-500 focus:ring-2 
                        focus:ring-blue-200 transition-all duration-300 
                        bg-white/50 backdrop-blur-sm" 
                    />
                    <select 
                        name="Country" 
                        className="w-full p-4 border-2 border-gray-300 rounded-xl 
                        focus:outline-none focus:border-blue-500 focus:ring-2 
                        focus:ring-blue-200 transition-all duration-300 
                        bg-white/50 backdrop-blur-sm"
                    >
                        <option value="">Enter your Country</option>
                        <option value="Vietnam">Vietnam</option>
                        <option value="English">English</option>
                    </select>
                    
                    <div className="mt-8 text-center">
                        <p className="text-gray-600">
                            Already have an account?{' '}
                            <span 
                                className="text-blue-600 cursor-pointer hover:text-blue-800 
                                transition-all duration-300 font-semibold hover:underline"
                                onClick={handleSignIn}
                            >
                                Sign in
                            </span>
                        </p>
                    </div>
                </div>
            </div>

     
           
      
    )
}