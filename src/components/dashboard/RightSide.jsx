import { useParams, useNavigate } from "react-router-dom";
import { useRef, useState, useEffect, useContext } from "react";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";

import Dashboard from "../dashboard/Section/dashboard";
import User from "../dashboard/Section/manageUser";
import FeedBack from "../dashboard/Section/manageFeedback";
import Vaccine from "../dashboard/Section/manageVaccine";
import Tracking from "../dashboard/Section/manageTracking";
import Booking from "../dashboard/Section/manageBooking";
import Payments from "../dashboard/Section/payments";
import Combo from "../dashboard/Section/manageCombo"
import Children from "../dashboard/Section/manageChild"
import AvatarHomePage from "../home/avatarHomePage";
const RightSide = () => {
  // const {logout} = useContext(AuthContext);
  // const handleLogout = () => {
  //   logout();
  //   localStorage.removeItem('Account');

  //   navigate('../loginPage');
  // }
  const navigate = useNavigate();
  const { section } = useParams(); // Lấy section từ URL
  const searchRef = useRef(null);
  const [search, setSearch] = useState("");
  // const [isOpen, setIsOpen] = useState(false);
  // const dropdownRef = useRef(null);

  //     // Click outside handler
  //     useEffect(() => {
  //         const handleClickOutside = (event) => {
  //             if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
  //                 //phần tử được click không nằm bên trong dropdown.
  //                 setIsOpen(false);
  //             }
  //         };

  //         document.addEventListener('mousedown', handleClickOutside);
  //         return () => document.removeEventListener('mousedown', handleClickOutside);
  //     }, []);

  // const user ={
  //   name:'Shu',
  //   email:'teei8191@gmail.com'
  // }


  // Hàm render section với ID user
  const renderSection = () => {
    switch (section) {
      case "dashboard":
        return <Dashboard />;
      case "children":
        return <Children / >;
      case "user":
        return <User />;
      case "vaccine":
        return <Vaccine />;
        case "combo":
          return <Combo />;
      case "booking":
        return <Booking />;
      case "payments":
        return <Payments />;
      case "tracking":
        return <Tracking />;
      case "feedback":
        return <FeedBack />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="p-4">
      {/* Top */}
      <div className="sticky top-0 bg-white/95 backdrop-blur-sm z-10 border-b border-gray-300 shadow-sm">
        <div className="px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <h1 className="text-2xl font-bold text-gray-800 capitalize">
                {section === "dashboard" && "Dashboard"}
                {section === "children" && "Children"}
                {section === "user" && "Manage User"}
                {section === "vaccine" && "Manage Vaccine"}
                {section === "combo" && "Manage Vaccine Combo"}
                {section === "booking" && "Manage Booking"}
                {section === "payments" && "Manage Payments"}
                {section === "tracking" && "Manage Tracking"}
                {section === "feedback" && "Manage Feedback"}

              </h1>
            </div>
            <div className="flex items-center space-x-6">
              {/* Search Bar */}
          
              {/* Avatar và Notification cùng hàng */}
              <div className="flex items-center space-x-4">
                {/* Notification */}
                <button className="relative p-2 rounded-lg hover:bg-gray-100 transition-all duration-200">
                  <NotificationsNoneOutlinedIcon className="w-6 h-6 text-gray-600" />
                  <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full"></span>
                </button>

                {/* Avatar */}
                {/* <AvatarHomePage/> */}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section rendering */}
      <div>{renderSection()}</div>
    </div>
  );
};

export default RightSide;
