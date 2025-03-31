import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import useAxios from "../../utils/useAxios";

const InputForgotPassword = ({ type, placeholder, onChange, name, value, label, error }) => {
  return (
    <div className="space-y-2 w-full">
      {label && <label className="text-sm font-medium text-gray-700 ml-1">{label}</label>}
      <input
        type={type}
        placeholder={placeholder}
        className="w-full p-3.5 border-2 border-gray-200 rounded-xl
                focus:outline-none focus:border-blue-500 focus:ring-4
                focus:ring-blue-100 transition-all duration-300 
                bg-white/90 backdrop-blur-sm hover:border-gray-300
                placeholder-gray-400 text-gray-700"
        onChange={onChange}
        value={value}
        name={name}
        required
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default function ForgotPassword({ setRegister }) {
  const [error, setError] = useState("");
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [step, setStep] = useState(1);
  const [emailSent, setEmailSent] = useState(false);
  const [input, setInput] = useState({
    password: "",
    confirmPassword: "",
  });
  const [passwordError, setPasswordError] = useState(""); // Thêm trạng thái lỗi cho mật khẩu
  const api = useAxios();
  const url = import.meta.env.VITE_BASE_URL_DB;
  const [email, setEmail] = useState("");
  const inputRefs = useRef([]);
  const [canResend, setCanResend] = useState(true);
  const [countdown, setCountdown] = useState(60);
  const [notification, setNotification] = useState("");
  const [retryCount, setRetryCount] = useState(0);
  const maxRetries = 3;

  // Countdown timer for resend code
  useEffect(() => {
    let timer;
    if (emailSent && !canResend) {
      timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            setCanResend(true);
            clearInterval(timer);
            return 60;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [emailSent, canResend]);

  // Validate email format
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  // Handle sending verification code with retry mechanism
  const handleSendCode = async () => {
    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setCanResend(false);
    setEmailSent(false);
    setCountdown(60);
    setError("");

    const sendRequest = async (attempt = 1) => {
      try {
        const value = { gmail: email };
        const res = await api.post(`${url}/User/forgot-password`, value);
        if (res.status === 200) {
          setEmailSent(true);
          setRetryCount(0);
          setTimeout(() => inputRefs.current[0]?.focus(), 100);
        } else {
          throw new Error(`Unexpected response status: ${res.status}`);
        }
      } catch (err) {
        const message = err.response?.data?.message || err.message || "Failed to send code.";
        if (attempt < maxRetries) {
          setError(`Attempt ${attempt} failed: ${message}. Retrying...`);
          setRetryCount(attempt);
          setTimeout(() => sendRequest(attempt + 1), 2000);
        } else {
          setError(`All ${maxRetries} attempts failed: ${message}. Please try again later.`);
          setCanResend(true);
          setRetryCount(0);
        }
      }
    };

    await sendRequest();
  };

  // Handle code input change
  const handleChange = (index, value) => {
    if (!/^[0-9]*$/.test(value)) return;
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // Handle backspace for code input
  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  // Handle password input change with length validation
  const handleChangeAccount = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({ ...prev, [name]: value }));

    if (name === "password") {
      if (value.length < 8 && value.length > 0) {
        setPasswordError("Password must be at least 8 characters long.");
      } else {
        setPasswordError(""); // Xóa lỗi nếu mật khẩu hợp lệ
      }
    }

    if (name === "confirmPassword" && value !== input.password) {
      setNotification("Passwords do not match.");
    } else if (name === "confirmPassword" && value === input.password) {
      setNotification("");
    }
  };

  // Handle form submission for both steps
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setNotification("");

    if (step === 1) {
      const codeString = code.join("");
      try {
        const value = { verifyCode: codeString };
        const res = await api.post(`${url}/User/verify-forgot-password`, value);
        if (res.status === 200) {
          setStep(2);
        } else {
          throw new Error(res.data?.message || "Incorrect code.");
        }
      } catch (err) {
        setError(err.response?.data?.message || err.message || "Incorrect code. Please try again.");
      }
    } else {
      if (input.password.length < 8) {
        setPasswordError("Password must be at least 8 characters long.");
        return;
      }

      if (input.password !== input.confirmPassword) {
        setNotification("Passwords do not match.");
        return;
      }

      try {
        const value = { newPassword: input.password };
        const res = await api.post(`${url}/User/change-password`, value);
        if (res.status === 200) {
          setNotification("Password changed successfully!");
          setTimeout(() => setRegister(0), 1500);
        } else {
          throw new Error(res.data?.message || "Failed to change password.");
        }
      } catch (err) {
        setError(err.response?.data?.message || err.message || "Error occurred. Try again.");
      }
    }
  };

  // Check if form is valid for submission
  const isFormValid = () => {
    if (step === 1) {
      return validateEmail(email) && emailSent && code.every((digit) => digit.trim().length === 1);
    }
    return input.password.length >= 8 && input.confirmPassword === input.password;
  };

  return (
    <div className="h-screen flex-[0.5] flex flex-col justify-center items-center p-8 mt-8">
      <div className="w-full max-w-md space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-xl shadow-blue-50/50 border border-white"
        >
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
              {step === 1 ? "Reset Your Password" : "Create New Password"}
            </h1>
            <p className="text-gray-600 text-lg">
              {step === 1
                ? emailSent
                  ? "We sent a verification code to your email"
                  : "Enter your email to reset password"
                : ""}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            {step === 1 && (
              <div className="space-y-6">
                <div className="flex gap-3">
                  <InputForgotPassword
                    type="email"
                    label="Email Address"
                    placeholder="name@company.com"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    name="email"
                    className="flex-1"
                  />
                  <button
                    type="button"
                    onClick={handleSendCode}
                    disabled={!validateEmail(email) || !canResend}
                    className={`mt-8 h-[55px] px-6 rounded-xl font-semibold transition-all
                      ${validateEmail(email) && canResend
                        ? "bg-blue-600 hover:bg-blue-700 text-white shadow-md cursor-pointer"
                        : "bg-gray-100 text-gray-400 cursor-not-allowed"}`}
                  >
                    {canResend ? "Send" : `${countdown}s`}
                  </button>
                </div>
                {error && <p className="text-red-500 text-sm">{error}</p>}

                {emailSent && (
                  <div className="space-y-3">
                    <div className="flex justify-between space-x-3">
                      {code.map((digit, index) => (
                        <input
                          key={index}
                          ref={(el) => (inputRefs.current[index] = el)}
                          type="text"
                          maxLength="1"
                          value={digit}
                          onChange={(e) => handleChange(index, e.target.value)}
                          onKeyDown={(e) => handleKeyDown(index, e)}
                          className="w-14 h-14 text-center text-3xl font-bold bg-gray-50 text-gray-800 border-2 border-gray-200 
                            rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 
                            transition-all duration-200 outline-none placeholder-gray-300"
                        />
                      ))}
                    </div>
                    <p className="text-sm text-gray-500 text-right">
                      {canResend ? (
                        <button
                          type="button"
                          onClick={handleSendCode}
                          className="text-blue-600 hover:text-blue-800 font-medium"
                        >
                          Resend Code
                        </button>
                      ) : (
                        <span className="text-gray-400">Resend in {countdown}s</span>
                      )}
                    </p>
                  </div>
                )}
              </div>
            )}

            {step === 2 && (
              <div className="space-y-5">
                <InputForgotPassword
                  type="password"
                  label="New Password"
                  placeholder="Enter your password"
                  onChange={handleChangeAccount}
                  value={input.password}
                  name="password"
                  error={passwordError} // Truyền lỗi vào input
                />
                <InputForgotPassword
                  type="password"
                  label="Confirm Password"
                  placeholder="Confirm your password"
                  onChange={handleChangeAccount}
                  value={input.confirmPassword}
                  name="confirmPassword"
                />
              </div>
            )}

            {notification && (
              <p className={notification.includes("success") ? "text-green-600" : "text-red-600"}>
                {notification}
              </p>
            )}

            <button
              type="submit"
              className={`w-full p-4 rounded-xl text-lg font-semibold transition-all duration-300
                ${isFormValid()
                  ? "bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-200 cursor-pointer"
                  : "bg-gray-100 text-gray-400 cursor-not-allowed"}`}
              disabled={!isFormValid()}
            >
              {step === 1 ? "Verify Code" : "Reset Password"}
            </button>

            <div className="text-center text-sm text-gray-600">
              Remember your password?{" "}
              <button
                onClick={() => setRegister(0)}
                className="text-blue-600 hover:text-blue-800 font-semibold underline underline-offset-4"
              >
                Login here
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}