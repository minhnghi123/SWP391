import Sidebar from "../ui/SideBar";
import { useNavigate } from "react-router-dom";
import { MdDashboard, MdOutlineVaccines, MdOutlinePayment } from "react-icons/md";
import { CiUser } from "react-icons/ci";
import { FaCalendarAlt, FaRegStar, FaBars } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { accountAction } from "../redux/reducers/accountSlice";

const LeftSide = ({ section, isSidebarOpen, setIsSidebarOpen }) => {
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
    dispatch(accountAction.clearUser());
    navigate("/loginPage");
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
            navigate(`/dashboardPage/${itemId}`);
            setIsSidebarOpen(false);
          }}
          onLogout={() => {
            handleLogout();
            setIsSidebarOpen(false);
          }}
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