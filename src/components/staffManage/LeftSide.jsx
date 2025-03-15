import { useLocation, useNavigate } from "react-router-dom";
import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard";
import VaccinesIcon from "@mui/icons-material/Vaccines";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";

const LeftSide = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    {
      label: "Dashboard",
      icon: <SpaceDashboardIcon />,
      path: "/staffPage/dashboardStaff"
    },
    {
      label: "Manage Vaccines",
      icon: <VaccinesIcon />,
      path: "/staffPage/manageVaccine"
    },
    {
      label: "Appointments",
      icon: <CalendarMonthIcon />,
      path: "/staffPage/appointments"
    }
  ];

  const MenuItem = ({ label, icon, path }) => {
    const isActive = location.pathname === path;

    return (
      <div
        className={`flex items-center px-4 py-3.5 rounded-lg cursor-pointer transition-all duration-300 group 
          ${isActive 
            ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md" 
            : "hover:bg-blue-50 text-gray-700"}`}
        onClick={() => navigate(path)}
      >
        <div className={`mr-3 transition-transform group-hover:scale-110 
          ${isActive ? "text-white" : "text-blue-500"}`}>
          {icon}
        </div>
        <p className={`font-medium ${isActive 
          ? "text-white" 
          : "group-hover:text-blue-600"}`}>
          {label}
        </p>
      </div>
    );
  };

  return (
    <div className="fixed w-72 h-screen bg-white border-r border-gray-200 shadow-lg flex flex-col">
      {/* Logo Section */}
      <div 
        onClick={() => navigate("/")} 
        className="px-6 py-8 cursor-pointer border-b border-gray-100"
      >
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-500 to-blue-400 
            flex items-center justify-center shadow-lg transform hover:scale-105 transition-transform duration-300">
            <span className="text-2xl font-bold text-white">H</span>
          </div>
          <span className="text-2xl font-bold text-gray-800">
            Health<span className="text-blue-500">Blue</span>
          </span>
        </div>
      </div>

      {/* Navigation Menu */}
      <div className="flex-1 px-4 py-6">
        <div className="space-y-1.5">
          {menuItems.map((item, index) => (
            <MenuItem key={index} {...item} />
          ))}
        </div>
      </div>

      {/* Bottom Section */}
      <div className="px-4 py-6 border-t border-gray-200">
        <div className="space-y-2">
          <div className="flex items-center px-4 py-3 rounded-lg cursor-pointer hover:bg-blue-50 text-gray-700 transition-all duration-200">
            <div className="mr-3 text-blue-500">
              <SettingsIcon />
            </div>
            <p className="font-medium">Settings</p>
          </div>
          <div className="flex items-center px-4 py-3 rounded-lg cursor-pointer hover:bg-red-50 text-gray-700 transition-all duration-200">
            <div className="mr-3 text-red-500">
              <LogoutIcon />
            </div>
            <p className="font-medium text-red-500">Logout</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeftSide;
