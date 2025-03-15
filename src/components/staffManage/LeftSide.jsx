import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard";
import VaccinesIcon from "@mui/icons-material/Vaccines";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

const LeftSide = ({ isOpen, setIsOpen }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      if (!mobile && !isOpen) {
        setIsOpen(true);
      } else if (mobile && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isOpen, setIsOpen]);

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
    },
    {
      label: "Tracking Vaccine",
      icon: <CalendarMonthIcon />,
      path: "/staffPage/trackingVaccine"
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
        onClick={() => {
          navigate(path);
          if (isMobile) {
            setIsOpen(false);
          }
        }}
      >
        <div className={`mr-3 transition-transform group-hover:scale-110 
          ${isActive ? "text-white" : "text-blue-500"}`}>
          {icon}
        </div>
        {isOpen && (
          <p className={`font-medium ${isActive 
            ? "text-white" 
            : "group-hover:text-blue-600"}`}>
            {label}
          </p>
        )}
      </div>
    );
  };

  return (
    <>
      {/* Mobile overlay */}
      {isMobile && isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div 
        className={`${isOpen ? (isMobile ? 'translate-x-0 w-72' : 'w-72') : 'w-20'} 
          fixed h-screen bg-white border-r border-gray-200 shadow-lg flex flex-col 
          transition-all duration-300 ease-in-out z-30
          ${isMobile && !isOpen ? '-translate-x-full' : ''}`}
      >
        {/* Logo Section */}
        <div className="flex items-center justify-between px-6 py-6 border-b border-gray-100">
          <div 
            onClick={() => navigate("/")} 
            className="flex items-center space-x-3 cursor-pointer"
          >
            <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-500 to-blue-400 
              flex items-center justify-center shadow-lg transform hover:scale-105 transition-transform duration-300">
              <span className="text-2xl font-bold text-white">H</span>
            </div>
            {isOpen && (
              <span className="text-2xl font-bold text-gray-800">
                Health<span className="text-blue-500">Blue</span>
              </span>
            )}
          </div>
          
          {!isMobile && (
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-full hover:bg-gray-100"
            >
              {isOpen ? <ChevronLeftIcon /> : <MenuIcon />}
            </button>
          )}
        </div>

        {/* Navigation Menu */}
        <div className="flex-1 px-4 py-6 overflow-y-auto">
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
              {isOpen && <p className="font-medium">Settings</p>}
            </div>
            <div className="flex items-center px-4 py-3 rounded-lg cursor-pointer hover:bg-red-50 text-gray-700 transition-all duration-200">
              <div className="mr-3 text-red-500">
                <LogoutIcon />
              </div>
              {isOpen && <p className="font-medium text-red-500">Logout</p>}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LeftSide;
