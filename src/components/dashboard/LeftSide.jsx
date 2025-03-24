import Sidebar from "../ui/SideBar";
import { useNavigate } from "react-router-dom";
import { MdDashboard, MdOutlineVaccines, MdOutlineChildCare, MdOutlinePayment } from "react-icons/md";
import { CiUser } from "react-icons/ci";
import { FaCalendarAlt, FaRegStar } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { accountAction } from "../redux/reducers/accountSlice";
const LeftSide = ({ section }) => {
  // console.log(section)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const menuItems = [
    { id: "dashboard", icon: MdDashboard, label: "Dashboard" },
    { id: "user", icon: CiUser, label: "User" },
    { id: "childCare", icon: MdOutlineChildCare, label: "Child Care" },
    { id: "vaccine", icon: MdOutlineVaccines, label: "Vaccine" },
    { id: "combo", icon: MdOutlineVaccines, label: "Combo" },
    { id: "booking", icon: MdOutlinePayment, label: "Booking" },
    { id: "tracking", icon: FaCalendarAlt, label: "Tracking" },
    { id: "feedback", icon: FaRegStar, label: "Feedback" },
  ];


  const handleLogout = () => {
    dispatch(accountAction.clearUser());
    navigate("/loginPage");
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