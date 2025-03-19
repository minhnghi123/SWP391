import { useParams, useNavigate } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import LeftSide from "./LeftSide";
import Dashboard from "../dashboard/Section/dashboard/dashboard";
import User from "../dashboard/Section/user/manageUser";
import FeedBack from "./Section/manageFeedback";
import Vaccine from "./Section/vaccine/manageVaccine";
import Tracking from "../dashboard/Section/manageTracking";
import Booking from "../dashboard/Section/manageBooking";
import Payments from "../dashboard/Section/payments";
import Combo from "./Section/combo/manageCombo";
import AvatarHomePage from "../home/avatarHomePage";

const RightSide = () => {
  const navigate = useNavigate();
  const { section } = useParams();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth >= 768);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [search, setSearch] = useState("");

  const profileRef = useRef(null);
  const searchRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      setIsSidebarOpen(!mobile); // Mở sidebar trên desktop, đóng trên mobile
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const renderSection = () => {
    switch (section) {
      case "dashboard": return <Dashboard />;
      case "user": return <User />;
      case "vaccine": return <Vaccine />;
      case "combo": return <Combo />;
      case "booking": return <Booking />;
      case "payments": return <Payments />;
      case "tracking": return <Tracking />;
      case "feedback": return <FeedBack />;
      default: return <Dashboard />;
    }
  };

  const getPageTitle = () => {
    switch (section) {
      case "dashboard": return "Dashboard";
      case "user": return "Manage User";
      case "vaccine": return "Manage Vaccine";
      case "combo": return "Manage Vaccine Combo";
      case "booking": return "Manage Booking";
      case "payments": return "Manage Payments";
      case "tracking": return "Manage Tracking";
      case "feedback": return "Manage Feedback";
      default: return "Dashboard";
    }
  };

  return (
    <div className="flex min-h-screen w-full bg-gray-50 overflow-x-hidden">
      <LeftSide isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      <div
        className={`flex-1 flex flex-col transition-all duration-300 ease-in-out w-full ${
          isSidebarOpen && !isMobile ? "md:ml-64" : "md:ml-16"
        }`}
      >
        {/* Top Bar */}
        <div className="sticky top-0 bg-white border-b border-gray-200 shadow-sm z-20">
          <div className="px-4 sm:px-6 md:px-8 py-3 max-w-full">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <button
                  onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                  className="mr-3 p-1.5 rounded-lg hover:bg-gray-100 text-gray-600 md:hidden"
                >
                  <MenuIcon />
                </button>
                <div>
                  <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800">
                    {getPageTitle()}
                  </h1>
                  <p className="text-xs sm:text-sm text-gray-500 mt-0.5 hidden sm:block">
                    Welcome back, Admin
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-2 sm:space-x-4">
                <div className="relative" ref={searchRef}>
                  {isMobile ? (
                    <>
                      <button
                        onClick={() => setIsSearchOpen(!isSearchOpen)}
                        className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-600"
                      >
                        <SearchOutlinedIcon className="w-5 h-5" />
                      </button>
                      {isSearchOpen && (
                        <div className="absolute right-0 top-full mt-2 w-60 bg-white rounded-lg shadow-lg border border-gray-200 p-2 z-20">
                          <input
                            type="text"
                            placeholder="Search..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full px-3 py-1.5 pl-9 text-sm bg-gray-100 border border-gray-200 rounded-md focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                          />
                          <SearchOutlinedIcon className="absolute left-2.5 top-3.5 text-gray-400 w-4 h-4" />
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="relative hidden sm:block">
                      <input
                        type="text"
                        placeholder="Search..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-40 md:w-48 lg:w-64 px-3 py-1.5 pl-9 text-sm bg-gray-100 border border-gray-200 rounded-md focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                      />
                      <SearchOutlinedIcon className="absolute left-2.5 top-2 text-gray-400 w-4 h-4" />
                    </div>
                  )}
                </div>
                <div ref={profileRef}>
                  <AvatarHomePage />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8 max-w-full">
          <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 max-w-full overflow-x-hidden">
            {renderSection()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightSide;