import { useParams, useNavigate } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import imgAvatar from '../../assets/p15.jpg'

import Dashboard from "../staffManage/section/dashboardStaff";
import ManageVaccine from "../staffManage/section/manageVaccine";
import Appointments from "./section/apointments";
import AvatarHomePage from "../home/avatarHomePage";


const RightSide = () => {
  const navigate = useNavigate();
  const { section } = useParams();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, text: "New appointment request", time: "5 min ago", unread: true },
    { id: 2, text: "Vaccine stock update needed", time: "1 hour ago", unread: true },
    { id: 3, text: "Monthly report due", time: "2 hours ago", unread: false },
  ]);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  
  const profileRef = useRef(null);
  const notificationsRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
      if (notificationsRef.current && !notificationsRef.current.contains(event.target)) {
        setIsNotificationsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const renderSection = () => {
    switch (section) {
      case "dashboardStaff":
        return <Dashboard />;
      case "manageVaccine":
        return <ManageVaccine />;
      case "appointments":
        return <Appointments />;
      default:
        return <Dashboard />;
    }
  };

  const getPageTitle = () => {
    switch (section) {
      case "dashboardStaff":
        return "Dashboard";
      case "manageVaccine":
        return "Vaccine Management";
      case "appointments":
        return "Appointment Management";
      default:
        return "Dashboard";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Bar */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-200 shadow-sm">
        <div className="px-8 py-4">
          <div className="flex items-center justify-between">
            {/* Left side - Page Title */}
            <div>
              <h1 className="text-2xl font-bold text-gray-800">{getPageTitle()}</h1>
              <p className="text-sm text-gray-500 mt-1">Welcome back, Staff Member</p>
            </div>

            {/* Right side - Search, Notifications, Profile */}
            <div className="flex items-center space-x-6">
              {/* Search Bar */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-64 px-4 py-2 pl-10 text-sm bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
                <SearchOutlinedIcon className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
              </div>

              {/* Notifications */}
              <div className="relative" ref={notificationsRef}>
                <button
                  onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                  className="relative p-2 rounded-lg hover:bg-gray-100 transition-all duration-200"
                >
                  <NotificationsNoneOutlinedIcon className="w-6 h-6 text-gray-600" />
                  {notifications.some(n => n.unread) && (
                    <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full"></span>
                  )}
                </button>

                {/* Notifications Dropdown */}
                {isNotificationsOpen && (
                  <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 py-2">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <h3 className="font-semibold text-gray-800">Notifications</h3>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      {notifications.map((notification) => (
                        <div
                          key={notification.id}
                          className={`px-4 py-3 hover:bg-gray-50 cursor-pointer ${
                            notification.unread ? "bg-blue-50" : ""
                          }`}
                        >
                          <p className="text-sm text-gray-800">{notification.text}</p>
                          <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Profile */}
              <div className="relative" ref={profileRef}>
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 transition-all duration-200"
                >
                  <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
                    <PersonOutlineIcon className="text-white" />
                  </div>
                  <KeyboardArrowDownIcon className={`text-gray-600 transform transition-transform ${
                    isProfileOpen ? "rotate-180" : ""
                  }`} />
                </button>

                {/* Profile Dropdown */}
                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2">
                    <a href="#profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Your Profile
                    </a>
                    <a href="#settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Settings
                    </a>
                    <div className="border-t border-gray-100 my-1"></div>
                    <a href="#logout" className="block px-4 py-2 text-sm text-red-600 hover:bg-red-50">
                      Logout
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-8">
        <div className="bg-white rounded-lg shadow-sm p-6">
          {renderSection()}
        </div>
      </div>
    </div>
  );
};

export default RightSide;