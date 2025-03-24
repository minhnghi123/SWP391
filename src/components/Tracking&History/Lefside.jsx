import { useNavigate } from "react-router-dom";
import { FiUser, FiCalendar, FiClock } from "react-icons/fi";
import { Baby } from "lucide-react";
import Sidebar from "../ui/SideBar";
import { useDispatch } from "react-redux";
const LeftSide = ({ section , id }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(clearUser());
    navigate("/loginPage");
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
