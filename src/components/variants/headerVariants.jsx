import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, PhoneCall } from 'lucide-react';
import AvatarHeader from '../home/avatarHomePage';
import { useSelector } from 'react-redux';

const ModernHeader = () => {
  const user = useSelector((state) => state.account.user);
  
  return (
    <div className="w-full relative z-10"> {/* Thêm relative và z-10 */}
      {/* Full Width Navigation Bar */}
      <div className="block top-0 left-0 w-full">
        <div className="bg-white/90 backdrop-blur-lg shadow-lg border-b border-gray-100 w-full">
          <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 h-16 md:h-20"> {/* Giảm chiều cao header */}
            {/* Logo */}
            <div className="flex items-center gap-4">
              <Link to="/" className="flex items-center space-x-2">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-blue-500 to-blue-400 flex items-center justify-center">
                  <span className="text-xl font-bold text-white">H</span>
                </div>
                <span className="text-xl font-bold text-gray-800">
                  Health<span className="text-blue-500">Blue</span>
                </span>
              </Link>
            </div>

            {/* Center Navigation - Ẩn trên mobile */}
            <div className="hidden md:flex items-center space-x-6">
              <div className="flex items-center space-x-2 text-gray-700">
                <Clock size={20} className="text-blue-600" />
                <span className="text-sm">07:30 - 17:00</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-700">
                <PhoneCall size={20} className="text-blue-600" />
                <span className="text-sm">028 7102 6595</span>
              </div>
            </div>

            {/* Right Section */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <AvatarHeader />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModernHeader;