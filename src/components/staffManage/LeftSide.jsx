import { useLocation, useNavigate } from "react-router-dom";
import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard";
import VaccinesIcon from "@mui/icons-material/Vaccines";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

const LeftSide = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const EachMenu = ({ label, icon, path }) => {
    const isActive = location.pathname === path;

    return (
      <div
        className={`flex items-center px-4 py-3 rounded-lg cursor-pointer transition-all duration-200 group 
          ${isActive ? "bg-blue-500 text-white" : "hover:bg-blue-50 text-gray-700"}`}
        onClick={() => navigate(path)}
      >
        <div className={`mr-3 transition-transform ${isActive ? "scale-110 text-white" : "text-blue-500 group-hover:scale-110"}`}>
          {icon}
        </div>
        <p className={`font-medium ${isActive ? "text-white" : "group-hover:text-blue-600"}`}>{label}</p>
      </div>
    );
  };

  return (
    <div className="fixed w-64 h-screen bg-white border-r border-gray-200 shadow-sm">
      {/* Logo Section */}
      <div onClick={() => navigate("/")} className="px-6 py-8 cursor-pointer">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-500 to-blue-400 flex items-center justify-center shadow-md">
            <span className="text-2xl font-bold text-white">H</span>
          </div>
          <span className="text-xl font-bold text-gray-800">
            Health<span className="text-blue-500">Blue</span>
          </span>
        </div>
      </div>

      {/* Navigation Menu */}
      <div className="px-4">
        <nav className="space-y-1">
          <EachMenu path="/staffPage/dashboardStaff" label="Dashboard" icon={<SpaceDashboardIcon />} />
          <EachMenu path="/staffPage/manageVaccine" label="Manage Vaccines" icon={<VaccinesIcon />} />
          <EachMenu path="/staffPage/appointments" label="Appointments" icon={<CalendarMonthIcon />} />
        </nav>
      </div>
    </div>
  );
};

export default LeftSide;
