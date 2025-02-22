import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BellIcon, Moon, Sun } from 'lucide-react';
import AvatarHomePage from '../home/avatarHomePage';

const HeaderDoctorManage = () => {
  return (
    <header className="w-full bg-white shadow border-b border-gray-100">
      <div className="flex items-center justify-between px-10 lg:px-20 h-20">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-500 to-blue-400 flex items-center justify-center">
            <span className="text-2xl font-bold text-white">H</span>
          </div>
          <span className="text-2xl font-bold text-gray-800">
            Health<span className="text-blue-500">Blue</span>
          </span>
        </Link>
        
        {/* Actions */}
        <div className="flex items-center space-x-6">
          {/* Notification */}
          <button className="relative p-2 rounded-lg hover:bg-gray-200">
            <BellIcon className="w-6 h-6 text-gray-700" />
            <span className="absolute top-1 right-1 w-3 h-3 bg-red-500 rounded-full animate-ping" />
          </button>
          
          {/* Profile & Dark Mode */}
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="text-base font-medium text-gray-900">Dr. Sarah</p>
              <p className="text-sm text-blue-500">Doctor</p>
            </div>
            <AvatarHomePage />
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeaderDoctorManage;