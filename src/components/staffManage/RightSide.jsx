import { useParams, useNavigate } from "react-router-dom";
import { useRef, useState, useEffect, useContext } from "react";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import imgAvatar from '../../assets/p15.jpg'
import { AuthContext } from "../Services/AuthLogin";

import Dashboard from "../staffManage/section/dashboardStaff";
import ManageVaccine from "../staffManage/section/manageVaccine";
import Appointments from "../staffManage/section/apointments";
import LoginPage from "../../pages/loginPage";
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

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    searchRef.current.focus();
    setSearch("");
  };

  // Hàm render section với ID user
  const renderSection = () => {
    switch (section) {
      case "dashboard":
        return <Dashboard />;
      case "manageVaccine":
        return <ManageVaccine />;
      case "appointments":
        return <Appointments />;
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
                {section === "manageVaccine" && "Manage Vaccine"}
                {section === "appointments" && "Appointments"}
              </h1>
            </div>
              <div className="flex items-center space-x-6">
    {/* Search Bar */}
              <div className="relative group">
                <input
                  ref={searchRef}
                  value={search}
                  onChange={handleSearch}
                  type="text"
                  placeholder="Search..."
                  className="w-64 pl-11 pr-4 py-2.5 rounded-lg border border-gray-200 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-50 focus:border-blue-500 transition-all duration-200"
                />
                <button onClick={handleSubmit}>
                  <SearchOutlinedIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                </button>
              </div>

              {/* Avatar và Notification cùng hàng */}
              <div className="flex items-center space-x-4">
                {/* Notification */}
                <button className="relative p-2 rounded-lg hover:bg-gray-100 transition-all duration-200">
                  <NotificationsNoneOutlinedIcon className="w-6 h-6 text-gray-600" />
                  <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full"></span>
                </button>

                {/* Avatar */}
              <AvatarHomePage/>
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
