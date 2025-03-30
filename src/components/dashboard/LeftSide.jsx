import Sidebar from "../ui/SideBar";
import { useNavigate } from "react-router-dom";
import { MdDashboard, MdOutlineVaccines, MdOutlinePayment } from "react-icons/md";
import { CiUser } from "react-icons/ci";
import { FaCalendarAlt, FaRegStar, FaBars } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { accountAction } from "../redux/reducers/accountSlice";
import { vaccineAction } from "../redux/reducers/selectVaccine";
import { childAction } from "../redux/reducers/selectChildren";
const LeftSide = ({ section}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const menuItems = [
    { id: "dashboard", icon: MdDashboard, label: "Dashboard" },
    { id: "user", icon: CiUser, label: "User" },
    { id: "vaccine", icon: MdOutlineVaccines, label: "Vaccine" },
    { id: "combo", icon: MdOutlineVaccines, label: "Combo" },
    { id: "booking", icon: MdOutlinePayment, label: "Booking" },
    { id: "tracking", icon: FaCalendarAlt, label: "Tracking" },
    { id: "feedback", icon: FaRegStar, label: "Feedback" },
  ];

  const handleLogout = () => {
    dispatch(accountAction.clearUser())
    dispatch(vaccineAction.completePayment())
    dispatch(childAction.completePayment())
    dispatch(childAction.resetArriveDate());
    dispatch(childAction.replaceAdvitory())
    localStorage.removeItem('authTokens');
    navigate('/loginPage');
  };

  return (
    <Sidebar
      title="Health"
      brandLetter="H"
      menuItems={menuItems} // Đảm bảo menuItems luôn được truyền
      activeItem={section}
      onMenuClick={(itemId) => navigate(`/dashboardPage/${itemId}`)}
      onLogout={handleLogout}
    />
  );
};

export default LeftSide;