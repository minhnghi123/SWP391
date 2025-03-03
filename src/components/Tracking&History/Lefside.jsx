
import { useNavigate } from 'react-router-dom';
import { FiUser, FiCalendar, FiClock, FiLogOut } from "react-icons/fi";
import { Baby } from 'lucide-react';
import { useState } from "react";

const LeftSide = ({ section, id }) => {
  const navigate = useNavigate();
  // const {logout}= useContext(AuthContext)
  const handleLogout = () => {
    // logout()
    localStorage.removeItem('Account')
    navigate('/loginPage')
  }

  const [activeItem, setActiveItem] = useState(section|| '"profile"');
  const menuItems = [
    { id: "profile", icon: FiUser, label: "Your Profile" },
    { id: "children", icon: Baby, label: "Your Children" },
    { id: "tracking", icon: FiCalendar, label: "Tracking Schedule" },
    { id: "history", icon: FiClock, label: "History" }
  ];

  const handleMenuClick = (itemId) => {
    setActiveItem(itemId);
    navigate(`/pageProfile/${itemId}/${id}`);

  };


  return (
    <div className="fixed left-0 h-screen bg-white shadow-lg flex flex-col transition-all duration-200 ease-in-out">
      {/* Brand Logo Section */}
      <div onClick={() => navigate('/')} className="px-6 py-8 cursor-pointer">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-500 to-blue-400 flex items-center justify-center shadow-md">
            <span className="text-2xl font-bold text-white">H</span>
          </div>
          <span className="text-xl font-bold text-gray-800">
            Health<span className="text-blue-500">Blue</span>
          </span>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 px-4 py-6">
        <div className="space-y-6">
          <div>
            <h3 className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Main Menu</h3>
            <div className="mt-4 space-y-1">
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleMenuClick(item.id)}
                    className={`flex items-center w-full px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${activeItem === item.id
                      ? "text-blue-600 bg-blue-50 hover:bg-blue-100"
                      : "text-gray-600 hover:text-blue-600 hover:bg-gray-50 hover:translate-x-1"}`}
                  >
                    <Icon className="h-5 w-5 mr-3" />
                    {item.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </nav>

      {/* Logout Section */}
      <div onClick={handleLogout} className="p-4 border-t">
        <button className="flex items-center w-full px-4 py-2 text-sm font-medium text-gray-600 rounded-lg hover:text-red-600 hover:bg-red-50 transition-all duration-200 hover:translate-x-1">
          <FiLogOut className="h-5 w-5 mr-3" />
          Logout
        </button>
      </div>
    </div>
  );
};

export default LeftSide;