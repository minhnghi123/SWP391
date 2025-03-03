import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  BellIcon, CalendarDays, Search, Menu, X,
  Clock, PhoneCall, ChevronRight, Users, FileText,
  Syringe, Home
} from 'lucide-react';

import AvatarHomePage from '../home/avatarHomePage';
import { useSelector } from 'react-redux';

const ModernHeader = () => {
  const user = useSelector((state) => state.account.user)
  return (
    <div className="w-full">
      {/* Full Width Navigation Bar */}
      <div className="block top-0 left-0 w-full " >
        <div className="bg-white/90 backdrop-blur-lg shadow-lg border-b border-gray-100 w-full">
          <div className="flex items-center justify-between px-10 lg:px-20 h-24">

            {/* Logo */}
            <div className="flex flex-row items-center gap-8 p-4">
              <Link to="/" className="flex items-center space-x-4">
                <div className="cursor-pointer flex flex-row gap-4 items-center text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
                  <div className="flex items-center space-x-2">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-r from-blue-500 to-blue-400 flex items-center justify-center">
                      <span className="text-3xl font-bold text-white">H</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="text-2xl font-bold text-gray-800">
                    Health<span className="text-blue-500">Blue</span>
                  </span>
                </div>
              </Link>
            </div>

            {/* Center Navigation */}
            <div className="hidden xl:flex items-center space-x-10 text-lg">
              <div className="flex items-center space-x-3 text-gray-700">
                <Clock size={24} className="text-[#2F3A8F]" />
                <span>07:30 - 17:00</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-700">
                <PhoneCall size={24} className="text-[#2F3A8F]" />
                <span>028 7102 6595</span>
              </div>
            </div>

            {/* Right Section */}
            <div className="flex items-center space-x-8">
              {/* Notification */}
              <button className="relative group">
                <div className="p-3 rounded-xl hover:bg-gray-200 transition-colors">
                  <BellIcon className="w-6 h-6 text-gray-700 group-hover:text-[#2F3A8F]" />
                  <span className="absolute top-2 right-2 w-3 h-3 bg-red-500 rounded-full group-hover:animate-ping" />
                </div>
              </button>

              {/* Profile */}
              <div className="hidden lg:flex items-center space-x-4 cursor-pointer group">
                <div className="text-right">
                  <p className="text-base font-medium text-gray-900">{user.name}</p>
                  <p className="text-sm text-[#2F3A8F]">{user.role}</p>
                </div>
                <div className=" w-12 h-12 rounded-full  overflow-hidden border-2 border-gray-300">
                  <img
                    src={user?.avatar || ''}
                    alt="User Avatar"
                    className="w-full h-full object-cover"
                  />
                </div>


              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModernHeader;


useEffect(() => {
    const fetchDataAsync = async () => {
      try {
        const fetchData = async (url) => {
          const response = await fetch(url);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return await response.json();
        };

        const [vaccineRes, comboRes] = await Promise.all([
          fetchData("https://localhost:7280/api/Vaccine/getAllVacines"),
          fetchData("https://localhost:7280/api/VaccineCombo/getVaccineCombo"),
        ]);

        console.log("Vaccines:", vaccineRes);
        console.log("Combos:", comboRes);

        setVaccines(vaccineRes.data || vaccineRes);
        setCombos(comboRes.data || comboRes);
        setSortVaccines([
          ...(vaccineRes.data || vaccineRes),
          ...(comboRes.data || comboRes),
        ]);
      } catch (error) {
        console.error("Error fetching data:", error);
        setErr(true);
      } finally {
        setLoading(false);
      }
    };
    fetchDataAsync();
  }, []);