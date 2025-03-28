import TrackingAdmin from "./Section/tracking/manageTracking";
import BookingAdmin from "./Section/booking/manageBooking";
import DashboardAdmin from "./Section/dashboard/dashboard";
import User from "./Section/user&staff/manageUserandStaff";
import Vaccine from "./Section/vaccine/manageVaccine";
import ComboVaccines from "./Section/combo/manageCombo";
import Feedback from "./Section/feedback/manageFeedback";
import AvatarHomePage from "../home/avatarHomePage";
import formatDate from "../../utils/Date";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import { FaUser } from "react-icons/fa";
import { MdOutlineVaccines, MdDashboard } from "react-icons/md";
import { MdOutlinePayment } from "react-icons/md";
import { FaCalendarAlt } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";

const RightSide = ({ section, isSidebarOpen }) => {
  const icons = {
    dashboard: <MdDashboard />,
    user: <FaUser />,
    vaccine: <MdOutlineVaccines />,
    combo: <MdOutlineVaccines />,
    booking: <MdOutlinePayment />,
    tracking: <FaCalendarAlt />,
    feedback: <FaRegStar />,
  };

  const components = {
    dashboard: <DashboardAdmin />,
    user: <User />,
    vaccine: <Vaccine />,
    combo: <ComboVaccines />,
    booking: <BookingAdmin />,
    tracking: <TrackingAdmin />,
    feedback: <Feedback />,
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
            <span className="text-xl md:text-2xl">{icons[section] || <FaUser />}</span>
            <h1 className="text-xl md:text-2xl font-bold text-gray-800 capitalize">
              {section || "Profile"}
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
          {components[section] || <DashboardAdmin />}
        </div>
      </div>
    </div>
  );
};

export default RightSide;