import { useState } from 'react';
import { motion } from 'framer-motion';
import Login from '../components/login/login';
import Register from '../components/login/register';
import ForgotPassword from '../components/login/forgetpassword';

const LoginPage = () => {
    const [openRegister, setRegister] = useState(0);

    const renderAuthComponent = () => {
        switch (openRegister) {
            case 0:
                return <Login setRegister={setRegister} />;
            case 1:
                return <Register setRegister={setRegister} />;
            case 2:
                return <ForgotPassword setRegister={setRegister} />;
            default:
                return <Login setRegister={setRegister} />;
        }
    }
    
    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-green-50 via-blue-50 to-purple-50"
        >
            <div className="w-full max-w-4xl flex items-center justify-center p-4">
                {renderAuthComponent()}
            </div>
        </motion.div>
    );
}

export default LoginPage;