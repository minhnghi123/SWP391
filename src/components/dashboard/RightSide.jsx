import { useParams } from "react-router-dom";
import Dashboard from "../dashboard/Section/dashboard"; // Import dashboard
import Appointments from "../dashboard/Section/appointment"; // Import appointments
import Patients from "../dashboard/Section/patients"; // Import patients
import { useRef, useState } from "react";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import Avatar from "../../assets/p15.jpg"; // Đường dẫn đến avatar của người dùng

const RightSide = () => {
  const { section } = useParams(); // Lấy section từ URL
  const searchRef = useRef(null);
  const [search, setSearch] = useState("");

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    searchRef.current.focus();
    setSearch("");
  };

  // Hàm render section
  const renderSection = () => {
    switch (section) {
      case "dashboard":
        return <Dashboard />;
      case "appointments":
        return <Appointments />;
      case "patients":
        return <Patients />;
      default:
        return <Dashboard />; // Mặc định hiển thị Dashboard nếu không có section
    }
  };

  return (
    <div className="p-4">
      {/* Top */}
      <div className="sticky top-0 bg-white/95 backdrop-blur-sm z-10 border-b border-gray-300 shadow-sm">
        <div className="px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <h1 className="text-2xl font-bold text-gray-800 capitalize">
                  {section || "Dashboard"}
                </h1>
              </div>
              <p className="text-sm text-gray-500">
                {section === "dashboard" && "Overview"}
                {section === "appointments" && "Manage Appointments"}
                {section === "patients" && "Manage Patients"}
              </p>
            </div>
            <div className="flex items-center space-x-6">
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
                  <SearchOutlinedIcon
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
                  />
                </button>
              </div>
              <div className="relative">
                <button className="p-2 rounded-lg hover:bg-gray-100 transition-all duration-200">
                  <NotificationsNoneOutlinedIcon className="w-6 h-6 text-gray-600" />
                  <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full"></span>
                </button>
              </div>
              <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-blue-100 hover:ring-blue-200">
                <img
                  src={Avatar}
                  alt="User avatar"
                  className="w-full h-full object-cover"
                />
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
