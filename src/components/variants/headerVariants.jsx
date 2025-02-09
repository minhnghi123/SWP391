import React, { useState, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaBell, FaSearch, FaCalendarAlt, FaPhoneAlt, FaClock } from 'react-icons/fa';
import { VaccineContext } from '../Context/ChildrenSelected';

const HeaderVariants = () => {
    const location = useLocation();
    const [searchQuery, setSearchQuery] = useState('');
    const { selectedVaccines } = useContext(VaccineContext);

    return (
        <>
            {/* Top Banner */}
            <div className="bg-[#2F3A8F] text-white">
                <div className="max-w-[1400px] mx-auto px-6">
                    <div className="flex items-center justify-between h-10">
                        {/* Left Section - Working Hours */}
                        <div className="flex items-center gap-2 text-sm">
                            <FaClock className="w-4 h-4" />
                            <span>Working Hours: Mon-Sat 7:30 AM - 5:00 PM</span>
                        </div>

                        {/* Right Section - Contact & Links */}
                        <div className="flex items-center gap-6 text-sm">
                            <Link to="/home" className="hover:text-blue-200 transition-colors">
                                HOME
                            </Link>
                            <Link to="/vaccines" className="hover:text-blue-200 transition-colors">
                                VACCINE LIST
                            </Link>
                            <div className="flex items-center gap-2">
                                <FaPhoneAlt className="w-4 h-4" />
                                <span className="font-medium">HOTLINE: 028 7102 6595</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Header */}
            <header className="bg-white border-b border-gray-100 shadow-sm">
                <div className="max-w-[1400px] mx-auto px-6">
                    <div className="flex items-center justify-between h-20">
                        {/* Logo */}
                        <Link to="/" className="flex items-center gap-3">
                            <div className="bg-[#2F3A8F] w-12 h-12 rounded-lg flex items-center justify-center">
                                <span className="text-white text-2xl font-bold">H</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-xl font-bold text-gray-800">HealthBlue</span>
                                <span className="text-sm text-gray-500">Child Vaccination Tracker</span>
                            </div>
                        </Link>

                        {/* Navigation Links */}
                        <nav className="hidden lg:flex items-center gap-8">
                            <Link to="/dashboard" className="text-gray-600 hover:text-[#2F3A8F] transition-colors">
                                Dashboard
                            </Link>
                            <Link to="/schedule" className="text-gray-600 hover:text-[#2F3A8F] transition-colors">
                                Schedule
                            </Link>
                            <Link to="/records" className="text-gray-600 hover:text-[#2F3A8F] transition-colors">
                                Records
                            </Link>
                            <Link to="/vaccines" className="text-gray-600 hover:text-[#2F3A8F] transition-colors">
                                Vaccines
                            </Link>
                        </nav>

                        {/* Right Section - Actions */}
                        <div className="flex items-center gap-6">
                            {/* Upcoming Appointments */}
                            <div className="hidden md:flex items-center gap-2 text-gray-600">
                                <FaCalendarAlt className="w-5 h-5 text-[#2F3A8F]" />
                                <div className="text-sm">
                                    <p className="font-medium">Next Appointment</p>
                                    <p className="text-xs text-gray-500">Mar 25, 2024</p>
                                </div>
                            </div>

                            {/* Notifications */}
                            <button className="relative p-2 text-gray-600 hover:text-[#2F3A8F] transition-colors">
                                <FaBell className="w-5 h-5" />
                                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
                            </button>

                            {/* Profile */}
                            <div className="flex items-center gap-3">
                                <div className="hidden md:block text-right">
                                    <p className="text-sm font-medium text-gray-800">Parent Name</p>
                                    <p className="text-xs text-gray-500">View Profile</p>
                                </div>
                                <Link to="/profile">
                                    <img 
                                        src="/images/avatar.jpg" 
                                        alt="Profile" 
                                        className="w-10 h-10 rounded-full object-cover border-2 border-gray-100
                                                 hover:border-[#2F3A8F] transition-colors"
                                    />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </>
    );
};

export default HeaderVariants;