import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import EventIcon from '@mui/icons-material/Event';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import MessageIcon from '@mui/icons-material/Message';
import InventoryIcon from '@mui/icons-material/Inventory';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import { useNavigate } from 'react-router-dom';
const LeftSide = () => {
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
  
  const navigate = useNavigate();
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
        <nav className="space-y-1">

          <EachMenu onClick={() => navigate('/dashboardPage/dashboard')}   label="Dashboard" icon={<SpaceDashboardIcon className="text-blue-500 mr-3 group-hover:scale-110 transition-transform" />} />
          <EachMenu onClick={() => navigate('/dashboardPage/appointments')} label="Appointments" icon={<EventIcon className="text-blue-500 mr-3 group-hover:scale-110 transition-transform" />} />
          <EachMenu onClick={() => navigate('/dashboardPage/patients')} label="Patients" icon={<AssignmentIndIcon className="text-blue-500 mr-3 group-hover:scale-110 transition-transform" />} />
          <EachMenu onClick={() => navigate('/dashboardPage/doctorSchedule')} label="Doctors' Schedule" icon={<EditCalendarIcon className="text-blue-500 mr-3 group-hover:scale-110 transition-transform" />} />
          <EachMenu onClick={() => navigate('/dashboardPage/payments')} label="Payments" icon={<AccountBalanceWalletIcon className="text-blue-500 mr-3 group-hover:scale-110 transition-transform" />} />
          <EachMenu onClick={() => navigate('/dashboardPage/inventory')} label="Inventory" icon={<InventoryIcon className="text-blue-500 mr-3 group-hover:scale-110 transition-transform" />} />
          <EachMenu onClick={() => navigate('/dashboardPage/message')} label="Message" icon={<MessageIcon className="text-blue-500 mr-3 group-hover:scale-110 transition-transform" />} />
        </nav>
      </div>
    </div>
  )
};

export default LeftSide;
