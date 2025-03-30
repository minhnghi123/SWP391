import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { accountAction } from "../redux/reducers/accountSlice";
import { FiCalendar, FiClock } from "react-icons/fi";
import { Syringe, LayoutDashboard } from "lucide-react";
import Sidebar from "../ui/SideBar";
import { FaBars } from "react-icons/fa";
import { vaccineAction } from "../redux/reducers/selectVaccine";
import { childAction } from "../redux/reducers/selectChildren";

const LeftSide = ({ section }) => {
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
    dispatch(childAction.replaceAdvitory())
    dispatch(childAction.resetArriveDate());
    localStorage.removeItem('authTokens');
    navigate('/loginPage');
    setIsSidebarOpen(false);
  };

  return (
    <Sidebar
      title="Health"
      brandLetter="H"
      menuItems={menuItems} // Đảm bảo menuItems luôn được truyền
      activeItem={section}
      onMenuClick={(itemId) => navigate(`/staffPage/${itemId}`)}
      onLogout={handleLogout}
    />
  );
};

export default LeftSide;