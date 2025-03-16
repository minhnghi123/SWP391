import { useParams, useNavigate } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import MenuIcon from "@mui/icons-material/Menu";
import TrackingStaff from "./section/tracking/trackingStaff";
import imgAvatar from '../../assets/p15.jpg'

import Dashboard from "../staffManage/section/dashboardStaff";
import ManageVaccine from "../staffManage/section/manageVaccine";
import Appointments from "./section/appoinment/apointments";
import AvatarHomePage from "../home/avatarHomePage";
import LeftSide from "./LeftSide";


const RightSide = () => {
  const navigate = useNavigate();
  const { section } = useParams();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth >= 1024);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, text: "New appointment request", time: "5 min ago", unread: true },
    { id: 2, text: "Vaccine stock update needed", time: "1 hour ago", unread: true },
    { id: 3, text: "Monthly report due", time: "2 hours ago", unread: false },
  ]);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  
  const profileRef = useRef(null);
  const notificationsRef = useRef(null);
  const searchRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
      if (notificationsRef.current && !notificationsRef.current.contains(event.target)) {
        setIsNotificationsOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchOpen(false);
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
      case 'trackingVaccine':
        return <TrackingStaff />
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
      case 'trackingVaccine':
        return 'Tracking Vaccine'
      default:
        return "Dashboard";
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Sidebar */}
      <LeftSide isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      {/* Main Content */}
      <div 
        className={`flex-1 flex flex-col transition-all duration-300 ease-in-out ${
          isSidebarOpen ? 'lg:ml-72' : 'lg:ml-20'
        }`}
      >
        {/* Top Bar */}
        <div className="sticky top-0  bg-white border-b border-gray-200 shadow-sm">
          <div className="px-4 md:px-8 py-4">
            <div className="flex items-center justify-between">
              {/* Left side - Menu Toggle & Page Title */}
              <div className="flex items-center">
                <button 
                  onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                  className="mr-4 p-2 rounded-lg hover:bg-gray-100 lg:hidden"
                >
                  <MenuIcon />
                </button>
                <div>
                  <h1 className="text-xl md:text-2xl font-bold text-gray-800">{getPageTitle()}</h1>
                  <p className="text-sm text-gray-500 mt-1 hidden sm:block">Welcome back, Staff Member</p>
                </div>
              </div>

              {/* Right side - Search, Notifications, Profile */}
              <div className="flex items-center space-x-2 md:space-x-6">
                {/* Search Bar */}
                <div className="relative" ref={searchRef}>
                  {isMobile ? (
                    <>
                      <button
                        onClick={() => setIsSearchOpen(!isSearchOpen)}
                        className="p-2 rounded-lg hover:bg-gray-100 transition-all duration-200"
                      >
                        <SearchOutlinedIcon className="text-gray-600 w-5 h-5" />
                      </button>
                      {isSearchOpen && (
                        <div className="absolute right-0 top-full mt-2 w-72 bg-white rounded-lg shadow-lg border border-gray-200 p-2">
                          <input
                            type="text"
                            placeholder="Search..."
                            className="w-full px-4 py-2 pl-10 text-sm bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                          />
                          <SearchOutlinedIcon className="absolute left-5 top-5 text-gray-400 w-5 h-5" />
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="relative hidden sm:block">
                      <input
                        type="text"
                        placeholder="Search..."
                        className="w-48 md:w-64 px-4 py-2 pl-10 text-sm bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                      />
                      <SearchOutlinedIcon className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
                    </div>
                  )}
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
                    <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-20">
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
                    <KeyboardArrowDownIcon className={`text-gray-600 transform transition-transform hidden sm:block ${
                      isProfileOpen ? "rotate-180" : ""
                    }`} />
                  </button>

                  {/* Profile Dropdown */}
                  {isProfileOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-20">
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
        <div className="flex-1 overflow-y-auto p-4 md:p-8">
          <div className="bg-white rounded-lg shadow-sm p-4 md:p-6">
            {renderSection()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightSide;