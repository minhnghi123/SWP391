import TrackingAdmin from "./Section/tracking/manageTracking";
import BookingAdmin from "./Section/booking/manageBooking";
import DashboardAdmin from "./Section/dashboard/dashboard";
import User from "./Section/user&staff/manageUserandStaff";
import Vaccine from "./Section/vaccine/manageVaccine";
import ComboVaccines from "./Section/combo/manageCombo";
import Feedback from "./Section/feedback/manageFeedback";
import AvatarHomePage from "../home/avatarHomePage";
import formatDate from "../../utils/Date";
import { FaUser } from "react-icons/fa";
import { MdOutlineVaccines, MdDashboard } from "react-icons/md";
import { MdOutlinePayment } from "react-icons/md";
import { FaCalendarAlt } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";

const RightSide = ({ section }) => {

  const getHeaderIcon = () => {
    switch (section) {
      case 'dashboard': return <MdDashboard />;
      case 'user': return <FaUser />;
      case 'vaccine': return <MdOutlineVaccines />;
      case 'combo': return <MdOutlineVaccines />;
      case 'booking': return <MdOutlinePayment />;
      case 'tracking': return <FaCalendarAlt />;
      case 'feedback': return <FaRegStar />;
      default: return <MdDashboard />;
    }
  };
  const renderContent = () => {
    switch (section) {
      case 'dashboard': return <DashboardAdmin />;
      case 'user': return <User />;
      case 'vaccine': return <Vaccine />;
      case 'combo': return <ComboVaccines />;
      case 'booking': return <BookingAdmin />;
      case 'tracking': return <TrackingAdmin />;
      case 'feedback': return <Feedback />;
      default: return <DashboardAdmin />;
    }
  };

  

  return (
    <div className="p-2 sm:p-4 bg-gray-50 min-h-screen">
    {/* Enhanced Header - Hidden on mobile */}
    <div className="hidden lg:block sticky top-0 bg-white backdrop-blur-md z-20 rounded-xl sm:rounded-2xl shadow-md">
        <div className="p-4 sm:px-6 md:px-8 py-4 sm:py-6">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 sm:gap-4">
                {/* Enhanced Left Side */}
                <div className="space-y-2 sm:space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                        <div className="flex items-center space-x-2 sm:space-x-3">
                            <span className="text-xl sm:text-2xl">{getHeaderIcon()}</span>
                            <h1 className="text-xl sm:text-2xl font-bold text-gray-800 capitalize">
                                {section || 'Profile'}
                            </h1>
                        </div>
                        <div className="flex items-center space-x-2">
                            <span className="px-2 sm:px-3 py-1 text-xs font-medium text-blue-600 bg-blue-50 rounded-full">
                                {formatDate(new Date())}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Enhanced Right Side */}
                <div className="flex items-center space-x-3 sm:space-x-4">
                    {/* Enhanced User Menu */}
                    <AvatarHomePage />
                </div>
            </div>
        </div>
    </div>

    {/* Content Section */}
    <div className="mt-4 sm:mt-6 bg-white rounded-xl sm:rounded-2xl shadow-sm p-3 sm:p-4 md:p-6">
        {renderContent()}
    </div>
</div>
  );
};

export default RightSide;