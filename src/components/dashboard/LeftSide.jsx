import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  SpaceDashboard as DashboardIcon,
  Feedback as FeedbackIcon,
  Person as PersonIcon,
  Vaccines as VaccinesIcon,
  BookOnline as BookingIcon,
  Payment as PaymentIcon,
  FollowTheSigns as TrackingIcon,
  ChildCare as ChildCareIcon,
  Menu as MenuIcon,
  ChevronLeft as ChevronLeftIcon,
} from "@mui/icons-material";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";

const LeftSide = ({ isOpen, setIsOpen }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768); // Đổi breakpoint thành 768px để đồng bộ với RightSide

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile && !isOpen) setIsOpen(true); // Mở sidebar trên desktop
      else if (mobile && isOpen) setIsOpen(false); // Đóng sidebar trên mobile
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isOpen, setIsOpen]);

  const menuItems = [
    { path: "/dashboardPage/dashboard", label: "Dashboard", icon: <DashboardIcon /> },
    { path: "/dashboardPage/user", label: "User", icon: <PersonIcon /> },
    { path: "/dashboardPage/vaccine", label: "Vaccine", icon: <VaccinesIcon /> },
    { path: "/dashboardPage/combo", label: "Combo", icon: <VaccinesIcon /> },
    { path: "/dashboardPage/booking", label: "Booking", icon: <BookingIcon /> },
    { path: "/dashboardPage/payments", label: "Payments", icon: <PaymentIcon /> },
    { path: "/dashboardPage/tracking", label: "Tracking", icon: <TrackingIcon /> },
    { path: "/dashboardPage/feedback", label: "Feedback", icon: <FeedbackIcon /> },
  ];

  const MenuItem = ({ label, icon, path }) => {
    const isActive = location.pathname === path;

    const handleClick = () => {
      navigate(path);
      if (isMobile) setIsOpen(false);
    };

    return (
      <div
        className={`flex items-center px-3 py-2.5 rounded-lg cursor-pointer transition-all duration-300 group ${
          isActive
            ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md"
            : "hover:bg-blue-50 text-gray-700"
        }`}
        onClick={handleClick}
      >
        <div
          className={`mr-3 transition-transform group-hover:scale-110 ${
            isActive ? "text-white" : "text-blue-500"
          }`}
        >
          {icon}
        </div>
        {isOpen && (
          <p className={`font-medium ${isActive ? "text-white" : "group-hover:text-blue-600"}`}>
            {label}
          </p>
        )}
      </div>
    );
  };

  return (
    <>
      {isMobile && isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20"
          onClick={() => setIsOpen(false)}
        />
      )}

      <div
        className={`fixed top-0 left-0 h-screen bg-white border-r border-gray-200 shadow-sm flex flex-col transition-all duration-300 ease-in-out z-30 ${
          isOpen ? (isMobile ? "w-64 translate-x-0" : "w-64") : "w-16"
        } ${isMobile && !isOpen ? "-translate-x-full" : ""}`}
      >
        {/* Logo Section */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
          <div
            onClick={() => navigate("/")}
            className="flex items-center space-x-2 cursor-pointer"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-blue-500 to-blue-400 flex items-center justify-center shadow-md transform hover:scale-105 transition-transform duration-300">
              <span className="text-lg font-bold text-white">H</span>
            </div>
            {isOpen && (
              <span className="text-lg font-bold text-gray-800">
                Health<span className="text-blue-500">Blue</span>
              </span>
            )}
          </div>
          {!isMobile && (
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-1.5 rounded-full hover:bg-gray-100 text-gray-600"
            >
              {isOpen ? <ChevronLeftIcon /> : <MenuIcon />}
            </button>
          )}
        </div>

        {/* Navigation Menu */}
        <div className="flex-1 px-2 py-4 overflow-y-auto space-y-1">
          {menuItems.map((item, index) => (
            <MenuItem key={index} {...item} />
          ))}
        </div>

        {/* Bottom Section */}
        <div className="px-2 py-4 border-t border-gray-200 space-y-1">
          <div className="flex items-center px-3 py-2.5 rounded-lg cursor-pointer hover:bg-blue-50 text-gray-700 transition-all duration-200">
            <div className="mr-3 text-blue-500">
              <SettingsIcon />
            </div>
            {isOpen && <p className="font-medium">Settings</p>}
          </div>
          <div className="flex items-center px-3 py-2.5 rounded-lg cursor-pointer hover:bg-red-50 text-gray-700 transition-all duration-200">
            <div className="mr-3 text-red-500">
              <LogoutIcon />
            </div>
            {isOpen && <p className="font-medium text-red-500">Logout</p>}
          </div>
        </div>
      </div>
    </>
  );
};

export default LeftSide;