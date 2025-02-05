import React from 'react';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../Services/AuthLogin';
const LoginForm = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext)
  const handleFacebookCallback = (response) => {
    try {
      if (response && response.status !== 'unknown') {
        const { accessToken,name, email, picture,id } = response;
        const userData = {
          token: accessToken,
          id:response.userID,
          name: name,
          picture: picture?.data?.url,
        };

       
        localStorage.setItem('Account', JSON.stringify(userData));
        toast.success("Login Successful by Facebook");
        // login();
        setTimeout(() => {
          navigate('/');
        }, 1000);
       }
      //  else {
      //   toast.error("Facebook login failed");
      // }
    } catch (err) {
      console.error("Login error:", err);
      toast.error("Login Failed");
    }
  };


  return (
    <FacebookLogin
      appId="1106181131254067"
      autoLoad={false}
      fields="name,email,picture"
      callback={handleFacebookCallback}
      render={(renderProps) => (
        <div
          onClick={renderProps.onClick}
          className="w-12 h-12 bg-white rounded-full flex justify-center items-center 
                     cursor-pointer hover:bg-blue-50 hover:text-blue-600 transition-all duration-300 shadow-md 
                     hover:shadow-lg transform border-2 border-gray-100 hover:border-blue-500"
        >
          <FontAwesomeIcon icon={faFacebook} className="text-xl text-gray-700" />
        </div>
      )}
    />
  );
};

export default LoginForm;
