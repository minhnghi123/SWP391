import { useState } from "react";

const InputRegister = ({ type, placeholder, onChange, name, value }) => {
    return (
        <div className="mb-4">
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
    )
}

export default function Register({ setRegister }) {
    const [input, setInput] = useState({
        firstName: "",
        lastName: "",
        birthDay: "",
        country: "",
        email: "",
        password: "",
        confirmPassword: "",
        userName: "",
        gender: "",
        phone: "",
    })
    const handleSignIn = () => {
        setRegister(0);
    };
    const handleChangeAccount = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
        
    }

    const isFormValid = () => {
        return (
            input.firstName &&
            input.lastName &&
            input.userName &&
            input.email &&
            input.password &&
            input.confirmPassword &&
            input.phone &&
            input.birthDay &&
            input.country &&
            input.gender
        );
    };

    return (
        <div className="flex-[0.5] flex flex-col justify-center items-center p-8 mt-8">
            <div className="flex flex-col text-center mb-12">
                <div className="font-bold text-5xl mb-4 bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                    Create Account
                </div>
                <div className="text-gray-600">
                    <p className="text-lg">
                        Join us to start your journey with
                        <span className="font-semibold text-blue-600 hover:text-blue-700 transition-colors"> Tuga's App</span>
                    </p>
                </div>
            </div>

            <div className="flex flex-col w-full max-w-[450px] space-y-4 bg-white/30 backdrop-blur-lg p-8 rounded-2xl shadow-lg">
                <form className="space-y-2" onSubmit={(e) => { e.preventDefault() }}>
                    <div className="grid grid-cols-2 gap-4">
                        <InputRegister
                            type="text"
                            placeholder="First Name"
                            onChange={handleChangeAccount}
                            name="firstName"
                            value={input.firstName}
                        />
                        <InputRegister
                            type="text"
                            placeholder="Last Name"
                            onChange={handleChangeAccount}
                            name="lastName"
                            value={input.lastName}
                        />
                    </div>
                    
                    <InputRegister
                        type="text"
                        placeholder="Username"
                        onChange={handleChangeAccount}
                        name="userName"
                        value={input.userName} 
                    />
                    
                    <InputRegister
                        type="email"
                        placeholder="Email Address"
                        onChange={handleChangeAccount}
                        name="email"
                        value={input.email} 
                    />
                    
                    <InputRegister
                        type="password"
                        placeholder="Password"
                        onChange={handleChangeAccount}
                        name="password"
                        value={input.password} 
                    />
                    
                    <InputRegister
                        type="password"
                        placeholder="Confirm Password"
                        onChange={handleChangeAccount}
                        name="confirmPassword"
                        value={input.confirmPassword} 
                    />
                    
                    <InputRegister
                        type="tel"
                        placeholder="Phone Number"
                        onChange={handleChangeAccount}
                        name="phone"
                        value={input.phone} 
                    />

                    <InputRegister
                        type="date"
                        placeholder="Your Birthday"
                        onChange={handleChangeAccount}
                        name="birthDay"
                        value={input.birthDay} 
                    />

                    <div className="grid grid-cols-2 gap-4">
                        <select
                            name="country"
                            value={input.country}
                            onChange={handleChangeAccount}
                            className="w-full p-4 border-2 border-gray-300 rounded-xl 
                                focus:outline-none focus:border-blue-500 focus:ring-2 
                                focus:ring-blue-200 transition-all duration-300 
                                bg-white/60 backdrop-blur-md hover:bg-white/70"
                        >
                            <option value="">Country</option>
                            <option value="Vietnam">Vietnam</option>
                            <option value="English">English</option>
                        </select>

                        <select
                            name="gender"
                            value={input.gender}
                            onChange={handleChangeAccount}
                            className="w-full p-4 border-2 border-gray-300 rounded-xl 
                                focus:outline-none focus:border-blue-500 focus:ring-2 
                                focus:ring-blue-200 transition-all duration-300 
                                bg-white/60 backdrop-blur-md hover:bg-white/70"
                        >
                            <option value="">Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                    </div>

                    <button
                        type="submit"
                        className={`w-full p-4 mt-6 rounded-xl text-base font-semibold 
                            ${isFormValid() 
                                ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white cursor-pointer hover:from-blue-700 hover:to-blue-800' 
                                : 'bg-gray-100 text-gray-400 cursor-not-allowed'}
                            transform hover:scale-[1.01] transition-all duration-300 
                            shadow-md hover:shadow-lg active:scale-[0.99]`}
                        disabled={!isFormValid()}
                    >
                        Create Account
                    </button>
                </form>

                <div className="mt-6 text-center">
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