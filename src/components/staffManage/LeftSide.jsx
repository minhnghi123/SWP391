import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { accountAction } from "../redux/reducers/accountSlice";
import { FiCalendar, FiClock } from "react-icons/fi";
import { Syringe, LayoutDashboard } from "lucide-react";
import Sidebar from "../ui/SideBar";
import { FaBars } from "react-icons/fa";
import { vaccineAction } from "../redux/reducers/selectVaccine";
import { childAction } from "../redux/reducers/selectChildren";

const LeftSide = ({ section, isSidebarOpen, setIsSidebarOpen }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const menuItems = [
    { id: "dashboardStaff", icon: LayoutDashboard, label: "Dashboard" },
    { id: "manageVaccine", icon: Syringe, label: "Manage Vaccines" },
    { id: "appointments", icon: FiCalendar, label: "Appointments" },
    { id: "trackingVaccine", icon: FiClock, label: "Tracking Vaccine" },
  ];

  const handleLogout = () => {
    dispatch(accountAction.clearUser())
    dispatch(vaccineAction.completePayment())
    dispatch(childAction.completePayment())
    dispatch(childAction.resetArriveDate());
    localStorage.removeItem('authTokens');
    navigate('/loginPage');
    setIsSidebarOpen(false);
};

  return (
    <div>
      {/* Nút mở sidebar trên mobile */}
      <button
        className="block md:hidden static py-3 pl-3 top-4 left-4 z-50 text-2xl text-gray-700"
        onClick={() => setIsSidebarOpen(true)}
      >
        <FaBars />
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 w-64 h-full duration-300 z-50
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        <Sidebar
          title="Health"
          brandLetter="H"
          menuItems={menuItems}
          activeItem={section}
          onMenuClick={(itemId) => {
            navigate(`/staffPage/${itemId}`);
            setIsSidebarOpen(false);
          }}
          onLogout={handleLogout}
        />
      </div>

      {/* Overlay khi mở sidebar trên mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default LeftSide;