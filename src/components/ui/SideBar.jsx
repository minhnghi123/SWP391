import { useNavigate } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import PropTypes from "prop-types";

const Sidebar = ({ title, brandLetter, menuItems, activeItem, onMenuClick, onLogout }) => {
  const navigate = useNavigate();
  // console.log(activeItem)
  // console.log(menuItems)
  return (
    <div className="fixed left-0 h-screen bg-white shadow-lg flex flex-col transition-all duration-200 ease-in-out">
      {/* Logo */}
      <div onClick={() => navigate("/")} className="px-6 py-8 cursor-pointer">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-500 to-blue-400 flex items-center justify-center shadow-md">
            <span className="text-2xl font-bold text-white">{brandLetter || "H"}</span>
          </div>
          <span className="text-xl font-bold text-gray-800">
            {title} <span className="text-blue-500">Blue</span>
          </span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6">
        <div className="space-y-6">
          <h3 className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Main Menu</h3>
          <div className="mt-4 space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => onMenuClick(item.id)}
                  className={`flex items-center w-full px-4 py-4 text-sm font-medium rounded-lg transition-all duration-200 ${
                    activeItem === item.id
                      ? "text-blue-600 bg-blue-50 hover:bg-blue-100"
                      : "text-gray-600 hover:text-blue-600 hover:bg-gray-50 hover:translate-x-1"
                  }`}
                >
                  <Icon className="h-5 w-5 mr-3" />
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Logout */}
      {onLogout && (
        <div onClick={onLogout} className="p-4 border-t">
          <button className="flex items-center w-full px-4 py-2 text-sm font-medium text-gray-600 rounded-lg hover:text-red-600 hover:bg-red-50 transition-all duration-200 hover:translate-x-1">
            <FiLogOut className="h-5 w-5 mr-3" />
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

// Kiểm tra kiểu dữ liệu của props
Sidebar.propTypes = {
  title: PropTypes.string,
  brandLetter: PropTypes.string,
  menuItems: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      icon: PropTypes.elementType.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  activeItem: PropTypes.string.isRequired,
  onMenuClick: PropTypes.func.isRequired,
  onLogout: PropTypes.func,
};

export default Sidebar;
