import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
    

import { 
    faThLarge, 
    faCalendarCheck, 
    faUsers, 
    faUserMd, 
    faBoxes, 
    faComments,
    faChevronLeft,
    faChevronRight,
    faBell,
    faCog,
    faArrowUp,
    faArrowDown,
    faDollarSign,
    faCalendarAlt,
    faChartLine
} from '@fortawesome/free-solid-svg-icons';
import profileImage from '../../assets/p15.jpg';
import CalendarAppointmentTracker from '../../utils/calendarTracker';

export default function DashboardPage() {
    const [isOpen, setIsOpen] = useState(true);
    const [hoveredItem, setHoveredItem] = useState(null);
    const location = useLocation();

    const menuItems = [
        { path: '/dashboard', icon: faChartLine, label: 'Dashboard', bgColor: 'bg-blue-100', textColor: 'text-blue-600', isDefault: true },
        { path: '/appointments', icon: faCalendarAlt, label: 'Appointments', bgColor: 'bg-green-100', textColor: 'text-green-600' },
        { path: '/patients', icon: faUserMd, label: 'Patients', bgColor: 'bg-purple-100', textColor: 'text-purple-600' },
        { path: '/doctors-schedule', icon: faCalendarCheck, label: 'Doctors\' Schedule', bgColor: 'bg-indigo-100', textColor: 'text-indigo-600' },
        { path: '/inventory', icon: faBoxes, label: 'Inventory', bgColor: 'bg-amber-100', textColor: 'text-amber-600' },
        { path: '/messages', icon: faComments, label: 'Messages', bgColor: 'bg-pink-100', textColor: 'text-pink-600' },
    ];

    const stats = [
        { label: 'Total Patients', value: '1,234', icon: faUsers, color: 'blue', trend: '+12.5%', trendUp: true },
        { label: 'Appointments', value: '42', icon: faCalendarCheck, color: 'green', trend: '+8.1%', trendUp: true },
        { label: 'Available Doctors', value: '8', icon: faUserMd, color: 'purple', trend: '-2.4%', trendUp: false },
        { label: 'Revenue', value: '$12,345', icon: faDollarSign, color: 'amber', trend: '+23.1%', trendUp: true },
    ];

    return (
        <div className="flex min-h-screen bg-gray-50/50">
            {/* Sidebar with glass morphism */}
            <div className={`${isOpen ? 'w-64' : 'w-27'} 
                duration-300 bg-white/80 backdrop-blur-xl 
                shadow-[0_8px_30px_rgb(0,0,0,0.05)] relative 
                border-r border-gray-100/50 transition-all ease-in-out z-20`}>
                
                {/* Toggle Button */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="absolute -right-3 top-5 bg-white/80 backdrop-blur-xl 
                        border-2 border-blue-500/50 rounded-full p-1.5 
                        shadow-lg hover:shadow-blue-500/20 hover:bg-blue-50 
                        transition-all duration-300 hover:scale-110 group"
                >
                    <FontAwesomeIcon 
                        icon={isOpen ? faChevronLeft : faChevronRight} 
                        className="text-blue-500 text-sm transition-all duration-300
                            group-hover:text-blue-600" 
                    />
                </button>

                {/* Logo Section */}
                <div className="flex items-center gap-3 p-6 border-b border-gray-100/50">
                    <div className="w-20 h-20 rounded-xl bg-gradient-to-tr from-blue-500 to-blue-400 
                        flex items-center justify-center flex-shrink-0 
                        shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 
                        transition-all duration-300 group">
                        <span className="text-4xl font-bold text-white/90 
                            group-hover:text-white transition-colors duration-300">H</span>
                    </div>
                    <span className={`text-xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 
                        bg-clip-text text-transparent transition-all duration-300 
                        ${!isOpen ? 'opacity-0 w-0' : 'opacity-100 w-auto'}`}>
                        HealthBlue
                    </span>
                </div>

                {/* Navigation */}
                <nav className="mt-8">
                    <ul className="space-y-2.5 px-4">
                        {menuItems.map((item) => (
                            <li key={item.path}
                                onMouseEnter={() => setHoveredItem(item.path)}
                                onMouseLeave={() => setHoveredItem(null)}
                            >
                                {item.isDefault ? (
                                    // Dashboard item
                                    <div className={`flex items-center ${isOpen ? 'px-4 py-3 rounded-xl' : 'p-3 rounded-lg'} 
                                        bg-gradient-to-tr from-blue-500 to-blue-400 text-white 
                                        shadow-lg shadow-blue-500/20 relative overflow-hidden 
                                        group transition-all duration-300 hover:shadow-blue-500/30`}>
                                        {/* Gradient overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/80 to-blue-500/80 
                                            opacity-0 group-hover:opacity-100 transition-opacity duration-500"/>
                                        
                                        {/* Floating particles */}
                                        <div className="absolute inset-0 opacity-0 group-hover:opacity-20">
                                            <div className="absolute h-2 w-2 bg-white rounded-full animate-float-1"/>
                                            <div className="absolute h-2 w-2 bg-white rounded-full animate-float-2"/>
                                            <div className="absolute h-1.5 w-1.5 bg-white rounded-full animate-float-3"/>
                                        </div>
                                        
                                        {/* Icon container */}
                                        <div className={`${isOpen ? 'w-8 h-8' : 'w-10 h-10'} 
                                            rounded-lg bg-white/20 backdrop-blur-sm 
                                            flex items-center justify-center relative z-10 
                                            group-hover:scale-105 transition-all duration-300
                                            border border-white/10`}>
                                            <FontAwesomeIcon 
                                                icon={item.icon} 
                                                className={`text-white transform group-hover:rotate-6 
                                                    transition-all duration-300 ${!isOpen && 'text-lg'}`}
                                            />
                                        </div>
                                        
                                        <span className={`ml-3 font-medium relative z-10 
                                            transition-all duration-300 
                                            ${!isOpen ? 'opacity-0 w-0' : 'opacity-100'}`}>
                                            {item.label}
                                        </span>
                                    </div>
                                ) : (
                                    // Other menu items
                                    <Link 
                                        to={item.path}
                                        className={`flex items-center ${isOpen ? 'px-4 py-3 rounded-xl' : 'p-3 rounded-lg'}
                                            transition-all duration-300 relative overflow-hidden group
                                            ${location.pathname === item.path 
                                                ? 'bg-gradient-to-tr from-blue-500 to-blue-400 text-white shadow-lg shadow-blue-500/20' 
                                                : 'text-gray-600 hover:bg-blue-50/50 hover:shadow-sm'}`}
                                    >
                                        {/* Hover overlay */}
                                        <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 
                                            transition-opacity duration-300
                                            ${location.pathname === item.path 
                                                ? 'bg-gradient-to-r from-blue-600/80 to-blue-500/80' 
                                                : 'bg-gradient-to-r from-blue-50/50 to-blue-100/50'}`}
                                        />
                                        
                                        {/* Icon container */}
                                        <div className={`${isOpen ? 'w-8 h-8' : 'w-10 h-10'} 
                                            rounded-lg flex items-center justify-center relative z-10 
                                            transition-all duration-300 group-hover:scale-105 
                                            border border-gray-100/50
                                            ${location.pathname === item.path ? 'bg-white/20' : item.bgColor}`}>
                                            <FontAwesomeIcon 
                                                icon={item.icon} 
                                                className={`transform group-hover:rotate-6 transition-all duration-300
                                                    ${location.pathname === item.path ? 'text-white' : item.textColor}
                                                    ${!isOpen && 'text-lg'}`}
                                            />
                                        </div>
                                        
                                        <span className={`ml-3 font-medium relative z-10 
                                            transition-all duration-300
                                            ${!isOpen ? 'opacity-0 w-0' : 'opacity-100'}
                                            ${location.pathname === item.path 
                                                ? 'text-white' 
                                                : 'group-hover:text-blue-600'}`}>
                                            {item.label}
                                        </span>

                                        {/* Shine effect */}
                                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 
                                            bg-gradient-to-r from-transparent via-white/10 to-transparent 
                                            translate-x-[-100%] group-hover:translate-x-[100%] 
                                            transition-transform duration-1000"/>
                                    </Link>
                                )}
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-8">
                {/* Header */}
                <header className="bg-white rounded-2xl shadow-sm p-6 mb-8">
                    <div className="flex justify-between items-center">
                        <h1 className="text-2xl font-bold text-gray-800">Overview</h1>
                        <div className="flex items-center gap-4">
                            {/* Notification */}
                            <button className="p-2 hover:bg-gray-100 rounded-xl relative transition-all duration-200">
                                <FontAwesomeIcon icon={faBell} className="text-gray-600" />
                                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                            </button>

                            {/* Settings */}
                            <button className="p-2 hover:bg-gray-100 rounded-xl transition-all duration-200">
                                <FontAwesomeIcon icon={faCog} className="text-gray-600" />
                            </button>

                            {/* Profile */}
                            <div className="flex items-center gap-3 border-l pl-4 cursor-pointer group">
                                <div className="flex items-center gap-3 py-1 px-2 rounded-xl hover:bg-gray-50 transition-all duration-200">
                                    <img 
                                        src={profileImage} 
                                        alt="User" 
                                        className="w-10 h-10 rounded-full border-2 border-blue-500 group-hover:border-blue-600 transition-all duration-200 object-cover"
                                    />
                                    <div>
                                        <h4 className="font-semibold text-gray-800 group-hover:text-gray-900">Dr. Smith</h4>
                                        <p className="text-sm text-gray-500">Admin</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {stats.map((stat, index) => (
                        <div key={index} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300">
                            <div className="flex items-center justify-between">
                                <div className="space-y-2">
                                    <p className="text-sm text-gray-500">{stat.label}</p>
                                    <div className="flex items-center gap-3">
                                        <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
                                        <span className={`text-sm ${stat.trendUp ? 'text-green-500' : 'text-red-500'} 
                                            flex items-center`}>
                                            <FontAwesomeIcon 
                                                icon={stat.trendUp ? faArrowUp : faArrowDown} 
                                                className="mr-1" 
                                            />
                                            {stat.trend}
                                        </span>
                                    </div>
                                </div>
                                <div className={`w-14 h-14 rounded-xl flex items-center justify-center
                                    group transition-all duration-300
                                    ${stat.trendUp ? 'bg-blue-50 hover:bg-blue-500' : 'bg-red-50 hover:bg-red-500'}`}>
                                    <FontAwesomeIcon 
                                        icon={stat.icon} 
                                        className={`text-xl
                                            ${stat.trendUp ? 'text-blue-500 group-hover:text-white' : 'text-red-500 group-hover:text-white'}
                                            transition-colors duration-300`}
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Charts */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
                    <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300">
                        <h2 className="text-lg font-semibold text-gray-800 mb-6 flex items-center">
                            <FontAwesomeIcon icon={faCalendarAlt} className="mr-3 text-blue-500" />
                            Recent Appointments
                        </h2>
                        <div className="overflow-hidden">
                            <CalendarAppointmentTracker/>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300">
                        <h2 className="text-lg font-semibold text-gray-800 mb-6 flex items-center">
                            <FontAwesomeIcon icon={faChartLine} className="mr-3 text-blue-500" />
                            Patient Analytics
                        </h2>
                        {/* Add analytics chart */}
                    </div>
                </div>
            </div>
        </div>
    );
}