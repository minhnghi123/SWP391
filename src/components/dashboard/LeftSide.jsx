import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
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
  Close as CloseIcon,
} from "@mui/icons-material";

const menuItems = [
  { path: "/dashboardPage/dashboard", label: "Dashboard", icon: <DashboardIcon /> },
  { path: "/dashboardPage/children", label: "Children", icon: <ChildCareIcon /> },
  { path: "/dashboardPage/user", label: "User", icon: <PersonIcon /> },
  { path: "/dashboardPage/vaccine", label: "Vaccine", icon: <VaccinesIcon /> },
  { path: "/dashboardPage/combo", label: "Combo", icon: <VaccinesIcon /> },
  { path: "/dashboardPage/booking", label: "Booking", icon: <BookingIcon /> },
  { path: "/dashboardPage/payments", label: "Payments", icon: <PaymentIcon /> },
  { path: "/dashboardPage/tracking", label: "Tracking", icon: <TrackingIcon /> },
  { path: "/dashboardPage/feedback", label: "Feedback", icon: <FeedbackIcon /> },
];

const LeftSide = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      {/* Toggle Button for Mobile */}
      <button
        className="fixed top-4 left-4 z-50 bg-blue-600 text-white p-3 rounded-full shadow-md md:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <CloseIcon /> : <MenuIcon />}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-screen bg-white border-r border-gray-200 shadow-md transition-transform duration-300 z-40
          ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:w-64`}
      >
        {/* Logo Section */}
        <div className="flex items-center space-x-3 p-6 cursor-pointer" onClick={() => navigate("/")}> 
          <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-500 to-blue-400 flex items-center justify-center shadow-md">
            <span className="text-2xl font-bold text-white">H</span>
          </div>
          <span className="text-xl font-bold text-gray-800 hidden md:block">
            Health<span className="text-blue-500">Blue</span>
          </span>
        </div>

        {/* Navigation Menu */}
        <nav className="px-4 space-y-1">
          {menuItems.map(({ path, label, icon }) => {
            const isActive = location.pathname === path;
            return (
              <div
                key={path}
                className={`flex items-center px-4 py-3 rounded-lg cursor-pointer transition-all duration-200 group
                  ${isActive ? "bg-blue-500 text-white" : "hover:bg-blue-50 text-gray-700"}`}
                onClick={() => {
                  navigate(path);
                  setIsOpen(false);
                }}
              >
                <div className={`mr-3 text-lg transition-transform ${isActive ? "text-white scale-110" : "text-blue-500 group-hover:scale-110"}`}>
                  {icon}
                </div>
                <p className={`font-medium ${isActive ? "text-white" : "group-hover:text-blue-600"}`}>{label}</p>
              </div>
            );
          })}
        </nav>
      </div>
    </div>
  );
};

export default LeftSide;