
import TrackingAdmin from "./Section/TrackingAdmin";
import BookingAdmin from "./Section/BookingAdmin";
import DashboardAdmin from "./Section/dashboard/dashboard";
import User from "./Section/user/manageUser";
import ChildCare from "./Section/user/ChildrenTable";
import Vaccine from "./Section/vaccine/manageVaccine";
import ComboVaccines from "./Section/combo/manageCombo";
import Feedback from "./Section/manageFeedback";
import AvatarHomePage from '../home/avatarHomePage'
import formatDate from '../../utils/Date';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import { Baby } from "lucide-react";
import { FaUser } from "react-icons/fa";
import { MdOutlineChildCare } from "react-icons/md";
import { MdOutlineVaccines } from "react-icons/md";
import { MdOutlinePayment } from "react-icons/md";
import { FaCalendarAlt } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";

const RightSide = ({ section }) => {
  const getHeaderIcon = () => {
    switch (section) {
      case 'dashboard': return <Baby />;
      case 'user': return <FaUser />;
      case 'childCare': return <MdOutlineChildCare />;
      case 'vaccine': return <MdOutlineVaccines />;
      case 'combo': return <MdOutlineVaccines />;
      case 'booking': return <MdOutlinePayment />;
      case 'tracking': return <FaCalendarAlt />;
      case 'feedback': return <FaRegStar />;
    }
  };
  const renderContent = () => {
    switch (section) {
      case 'dashboard': return <DashboardAdmin />;
      case 'user': return <User />;
      case 'childCare': return <ChildCare />;
      case 'vaccine': return <Vaccine />;
      case 'combo': return <ComboVaccines />;
      case 'booking': return <BookingAdmin />;
      case 'tracking': return <TrackingAdmin />;
      case 'feedback': return <Feedback />;
    }
  }
  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      {/* Enhanced Header */}
      <div className="sticky top-0 bg-white backdrop-blur-md z-10 rounded-2xl shadow-md">
        <div className="px-8 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            {/* Enhanced Left Side */}
            <div className="space-y-3">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{getHeaderIcon()}</span>
                  <h1 className="text-2xl font-bold text-gray-800 capitalize">
                    {section || 'Profile'}
                  </h1>
                </div>
                <div className="flex items-center space-x-2">
                  {/* <span className="px-3 py-1 text-xs font-medium text-emerald-600 bg-emerald-50 rounded-full">
                    Active
                  </span> */}
                  <span className="px-3 py-1 text-xs font-medium text-blue-600 bg-blue-50 rounded-full">
                    {formatDate(new Date())}
                  </span>
                </div>
              </div>

            </div>

            {/* Enhanced Right Side */}

            <div className="flex items-center space-x-4">
              {/* Enhanced Notification Bell */}
              <button className="relative p-3 rounded-xl hover:bg-gray-100 transition-all duration-200
                                             group focus:outline-none focus:ring-2 focus:ring-blue-100">
                <NotificationsNoneOutlinedIcon className="w-6 h-6 text-gray-600 group-hover:text-blue-500" />
                <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 rounded-full
                                               group-hover:animate-pulse"></span>
              </button>

              {/* Enhanced User Menu */}
              <AvatarHomePage />

            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="mt-6 bg-white rounded-2xl shadow-sm p-6">
        {renderContent()}
      </div>
    </div>
  )
};

export default RightSide;
