import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import RestoreOutlinedIcon from '@mui/icons-material/RestoreOutlined';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../Services/AuthLogin';
import EscalatorWarningOutlinedIcon from '@mui/icons-material/EscalatorWarningOutlined';
const LeftSide = ({section,id}) => {
  const navigate = useNavigate();
    // const {logout}= useContext(AuthContext)
    const handleLogout=()=>{
      // logout()
      localStorage.removeItem('Account')
      navigate('/loginPage')
    }
  const EachMenu = ({ label, icon, onClick }) => {
    return (
      <div
        className="flex items-center px-4 py-3 rounded-lg cursor-pointer hover:bg-blue-50 transition-all duration-200 group"
        onClick={onClick} 
      >
        {icon}
        <p className="text-gray-700 group-hover:text-blue-600 font-medium">{label}</p>
      </div>
    );
  };
  
 
  return (
    <div className="fixed w-64 h-screen bg-white border-r border-gray-200 shadow-sm">
      {/* Logo Section */}
      <div onClick={() => navigate('/')} className="px-6 py-8 cursor-pointer">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-500 to-blue-400 flex items-center justify-center shadow-md">
            <span className="text-2xl font-bold text-white">H</span>
          </div>
          <span className="text-xl font-bold text-gray-800">
            Health<span className="text-blue-500">Blue</span>
          </span>
        </div>
      </div>

      {/* Navigation Menu */}
      <div className="px-4">
        <h1 className="text-lg font-semibold text-gray-800 mb-4 px-2">Choose your Service</h1>

        <nav className="space-y-1">

          <EachMenu onClick={() => navigate(`/pageProfile/profile/${id}`)}   label="Your Profile" icon={<Person2OutlinedIcon className="text-blue-500 mr-3 group-hover:scale-110 transition-transform" />} />
          <EachMenu onClick={() => navigate(`/pageProfile/children/${id}`)}   label="Your Children" icon={<EscalatorWarningOutlinedIcon className="text-blue-500 mr-3 group-hover:scale-110 transition-transform" />} />
          <EachMenu onClick={() => navigate(`/pageProfile/tracking/${id}`)} label="Tracking Schedule" icon={<CalendarMonthOutlinedIcon className="text-blue-500 mr-3 group-hover:scale-110 transition-transform" />} />
          <EachMenu onClick={() => navigate(`/pageProfile/history/${id}`)} label="History" icon={<RestoreOutlinedIcon className="text-blue-500 mr-3 group-hover:scale-110 transition-transform" />} />
          <EachMenu onClick={handleLogout} label="Logout" icon={<LoginOutlinedIcon className="text-blue-500 mr-3 group-hover:scale-110 transition-transform" />} />

        </nav>
      </div>
    </div>
  )




};

export default LeftSide;
