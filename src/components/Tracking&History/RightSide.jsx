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
        <div className="p-2 sm:p-4 bg-gray-50 min-h-screen">
            {/* Enhanced Header - Hidden on mobile */}
            <div className="hidden lg:block sticky top-0 bg-white backdrop-blur-md z-20 rounded-xl sm:rounded-2xl shadow-md">
                <div className="p-4 sm:px-6 md:px-8 py-4 sm:py-6">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 sm:gap-4">
                        {/* Enhanced Left Side */}
                        <div className="space-y-2 sm:space-y-3">
                            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                                <div className="flex items-center space-x-2 sm:space-x-3">
                                    <span className="text-xl sm:text-2xl">{getHeaderIcon()}</span>
                                    <h1 className="text-xl sm:text-2xl font-bold text-gray-800 capitalize">
                                        {section || 'Profile'}
                                    </h1>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <span className="px-2 sm:px-3 py-1 text-xs font-medium text-blue-600 bg-blue-50 rounded-full">
                                        {formatDate(new Date())}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Enhanced Right Side */}
                        <div className="flex items-center space-x-3 sm:space-x-4">
                            {/* Enhanced User Menu */}
                            <AvatarHomePage />
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="mt-4 sm:mt-6 bg-white rounded-xl sm:rounded-2xl shadow-sm p-3 sm:p-4 md:p-6">
                {renderContent()}
            </div>
        </div>
    )
};

export default RightSide;


