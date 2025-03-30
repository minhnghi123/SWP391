import { useNavigate } from "react-router-dom";
import { FiUser, FiCalendar, FiClock } from "react-icons/fi";
import { Baby } from "lucide-react";
import Sidebar from "../ui/SideBar";
import { useDispatch } from "react-redux";
import { accountAction } from "../redux/reducers/accountSlice";
import { vaccineAction } from "../redux/reducers/selectVaccine";
import { childAction } from "../redux/reducers/selectChildren";

const LeftSide = ({ section , id }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(accountAction.clearUser())
    dispatch(vaccineAction.completePayment())
    dispatch(childAction.completePayment())
    dispatch(childAction.resetArriveDate());
    localStorage.removeItem('authTokens');
    navigate('/loginPage');
};

  const menuItems = [
    { id: "profile", icon: FiUser, label: "Your Profile" },
    { id: "children", icon: Baby, label: "Your Children" },
    { id: "tracking", icon: FiCalendar, label: "Tracking Schedule" },
    { id: "history", icon: FiClock, label: "History" },
  ];

  return (
    <Sidebar
      title="Health"
      brandLetter="H"
      menuItems={menuItems} // Đảm bảo menuItems luôn được truyền
      activeItem={section}
      onMenuClick={(itemId) => navigate(`/pageProfile/${itemId}/${id}`)}
      onLogout={handleLogout}
    />
  );
};

export default LeftSide;
