

import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { accountAction } from "../redux/reducers/accountSlice";
import { FiUser, FiCalendar, FiClock } from "react-icons/fi";
import { Baby } from "lucide-react";
import Sidebar from "../ui/SideBar";
const LeftSide = ({ section }) => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(accountAction.clearUser())
    navigate("/loginPage");
  };


  const menuItems = [
    { id: "dashboardStaff", icon: FiUser, label: "Dashboard" },
    { id: "manageVaccine", icon: Baby, label: "Manage Vaccines" },
    { id: "appointments", icon: FiCalendar, label: "Appointments" },
    { id: "trackingVaccine", icon: FiClock, label: "Tracking Vaccine" },
  ];
  console.log(menuItems)


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