import { useState, useRef } from 'react';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import Profile from './Section/profile/profile'
import History from './Section/history/hisotry'
import Tracking from './Section/tracking/tracking'
import ListChildren from '../Tracking&History/Section/children/listChidren';
import AvatarHomePage from '../home/avatarHomePage'
import formatDate from '../../utils/Date';
const RightSide = ({ section, id }) => {
    const getHeaderIcon = () => {
        switch (section) {
            case 'profile': return '👤';
            case 'tracking': return '📅';
            case 'history': return '📋';
            default: return '🏥';
        }
    };
    const renderContent = () => {
        switch (section) {
            case 'profile': return <Profile id={id} />;
            case 'history': return <History id={id} />;
            case 'tracking': return <Tracking id={id} />;
            case 'children': return <ListChildren id={id} />;   
            default: return <Profile id={id} />;
        }
    }

    return (
        <div className="p-4 bg-gray-50 min-h-screen">
            {/* Enhanced Header */}
            <div className="sticky top-0 bg-white backdrop-blur-md z-20 rounded-2xl shadow-md">
                <div className="px-8 py-6">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                        {/* Enhanced Left Side */}
                        <div className="space-y-3">
                            <div className="flex items-center space-x-4">
                                <div className="flex items-center space-x-3">
                                    <span className="text-2xl">{getHeaderIcon()}</span>
                                    <h1 className="text-2xl font-bold text-gray-800 capitalize">
                                        {section || 'Profile'}
                                    </h1>
                                </div>
                                <div className="flex items-center space-x-2">
                                    
                                    <span className="px-3 py-1 text-xs font-medium text-blue-600 bg-blue-50 rounded-full">
                                        {formatDate(new Date())}
                                    </span>
                                </div>
                            </div>

                        </div>

                        {/* Enhanced Right Side */}

                        <div className="flex items-center space-x-4">
                            {/* Enhanced Notification Bell */}
                            {/* <button className="relative p-3 rounded-xl hover:bg-gray-100 transition-all duration-200
                                             group focus:outline-none focus:ring-2 focus:ring-blue-100">
                                <NotificationsNoneOutlinedIcon className="w-6 h-6 text-gray-600 group-hover:text-blue-500" />
                                <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 rounded-full
                                               group-hover:animate-pulse"></span>
                            </button> */}

                            {/* Enhanced User Menu */}
                            <AvatarHomePage />

                        </div>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="mt-6 bg-white rounded-2xl shadow-sm p-6">
              {renderContent()}
            </div>
        </div>
    )
};

export default RightSide;


