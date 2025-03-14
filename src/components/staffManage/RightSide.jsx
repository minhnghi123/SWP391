import { useParams, useNavigate } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import imgAvatar from "../../assets/p15.jpg";
import Dashboard from "../staffManage/section/dashboardStaff";
import ManageVaccine from "../staffManage/section/manageVaccine";
import Appointments from "./section/apointments";
import AvatarHomePage from "../home/avatarHomePage";

const RightSide = () => {
  const navigate = useNavigate();
  const { section } = useParams();
  const searchRef = useRef(null);
  const [search, setSearch] = useState("");

  // Ánh xạ section với tiêu đề và component
  const sectionConfig = {
    dashboard: { title: "Dashboard", component: <Dashboard /> },
    manageVaccine: { title: "Manage Vaccine", component: <ManageVaccine /> },
    appointments: { title: "Appointments", component: <Appointments /> },
  };

  // Lấy config dựa trên section, mặc định là dashboard
  const currentSection = sectionConfig[section] || sectionConfig["dashboard"];

  return (
    <div className="p-4">
      {/* Top */}
      <div className="sticky top-0 bg-white/95 backdrop-blur-sm z-10 border-b border-gray-300 shadow-sm">
        <div className="px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <h1 className="text-2xl font-bold text-gray-800 capitalize">
                {currentSection.title}
              </h1>
            </div>
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-4">
                {/* Notification */}
                <button className="relative p-2 rounded-lg hover:bg-gray-100 transition-all duration-200">
                  <NotificationsNoneOutlinedIcon className="w-6 h-6 text-gray-600" />
                  <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full"></span>
                </button>
                {/* Avatar */}
                {/* <AvatarHomePage /> */}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section rendering */}
      <div>{currentSection.component}</div>
    </div>
  );
};

export default RightSide;