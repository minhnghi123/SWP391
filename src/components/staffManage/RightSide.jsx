import TrackingStaff from "./section/tracking/trackingStaff";
import Dashboard from "../staffManage/section/dashboard/dashboardStaff";
import ManageVaccine from "../staffManage/section/vaccine/manageVaccine";
import Appointments from "./section/appoinment/apointments";
import AvatarHomePage from "../home/avatarHomePage";
import formatDate from "../../utils/Date";
import { Syringe, LayoutDashboard } from "lucide-react";
import { FiCalendar, FiClock } from "react-icons/fi";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";

const RightSide = ({ section, isSidebarOpen }) => {
  const icons = {
    dashboardStaff: <LayoutDashboard />,
    manageVaccine: <Syringe />,
    appointments: <FiCalendar />,
    trackingVaccine: <FiClock />,
  };

  const components = {
    dashboardStaff: <Dashboard />,
    manageVaccine: <ManageVaccine />,
    appointments: <Appointments />,
    trackingVaccine: <TrackingStaff />,
  };

  return (
    <div
      className={`flex flex-col min-h-screen duration-300 ${
        isSidebarOpen ? "md:ml-64 ml-0" : "ml-0 md:ml-64"
      }`}
    >
      {/* AvatarHomePage - Appears at the top on mobile */}
      <div className="md:hidden flex justify-end p-2">
        <AvatarHomePage />
      </div>

      {/* Header - Sticky at the top on larger screens */}
      <div
        className={`bg-white backdrop-blur-md z-10 rounded-2xl shadow-md md:sticky md:top-0 w-full ${
          isSidebarOpen ? "md:w-[calc(100%-256px)]" : "w-full"
        }`}
      >
        <div className="px-4 py-4 md:px-8 md:py-6 flex justify-between items-center">
          {/* Title - Hidden on mobile */}
          <div className="hidden md:flex items-center space-x-3">
            <span className="text-xl md:text-2xl">{icons[section] || <LayoutDashboard />}</span>
            <h1 className="text-xl md:text-2xl font-bold text-gray-800 capitalize">
              {section || "Dashboard"}
            </h1>
            <span className="px-2 py-1 text-xs font-medium text-blue-600 bg-blue-50 rounded-full">
              {formatDate(new Date())}
            </span>
          </div>

          {/* Notification & User - Only visible on desktop */}
          <div className="hidden md:flex items-center space-x-4">
            <AvatarHomePage />
          </div>
        </div>
      </div>

      {/* Content - Takes up remaining space */}
      <div className="flex-1 p-2 md:p-4 mt-0 md:mt-6">
        <div className="bg-white rounded-2xl shadow-sm p-4 md:p-6 h-full">
          {components[section] || <Dashboard />}
        </div>
      </div>
    </div>
  );
};

export default RightSide;