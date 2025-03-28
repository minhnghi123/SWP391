import React from 'react';
import { 
    AiOutlineDashboard, 
    AiOutlineBell, 
    AiOutlineCalendar,
    AiOutlineMessage,
    AiOutlineMail,
    AiOutlineTeam,
    AiOutlineSetting,
    AiOutlineQuestionCircle
} from 'react-icons/ai';

export default function Sidebar() {
    return (
        <div className="w-64 h-screen bg-white border-r flex flex-col">
            {/* Logo and Search */}
            <div className="p-4">
                <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center text-white">
                        C
                    </div>
                    <span className="font-semibold">Cusana</span>
                </div>
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search..."
                        className="w-full px-4 py-2 bg-gray-50 rounded-lg text-sm"
                    />
                </div>
            </div>

            {/* Main Menu */}
            <nav className="flex-1 p-4">
                <div className="space-y-1">
                    <a href="#" className="flex items-center gap-3 px-3 py-2 text-sm rounded-lg bg-gray-100">
                        <AiOutlineDashboard className="w-5 h-5" />
                        Dashboard
                    </a>
                    <a href="#" className="flex items-center gap-3 px-3 py-2 text-sm rounded-lg text-gray-700 hover:bg-gray-50">
                        <AiOutlineBell className="w-5 h-5" />
                        Notifications
                    </a>
                    <a href="#" className="flex items-center gap-3 px-3 py-2 text-sm rounded-lg text-gray-700 hover:bg-gray-50">
                        <AiOutlineCalendar className="w-5 h-5" />
                        Calendar
                    </a>
                </div>

                {/* Marketing Section */}
                <div className="mt-8">
                    <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        MARKETING
                    </h3>
                    <div className="mt-2 space-y-1">
                        <a href="#" className="flex items-center gap-3 px-3 py-2 text-sm rounded-lg text-gray-700 hover:bg-gray-50">
                            <AiOutlineMessage className="w-5 h-5" />
                            Product
                        </a>
                        <a href="#" className="flex items-center gap-3 px-3 py-2 text-sm rounded-lg text-gray-700 hover:bg-gray-50">
                            <AiOutlineMail className="w-5 h-5" />
                            Emails
                        </a>
                        <a href="#" className="flex items-center gap-3 px-3 py-2 text-sm rounded-lg text-gray-700 hover:bg-gray-50">
                            <AiOutlineTeam className="w-5 h-5" />
                            Contacts
                        </a>
                    </div>
                </div>

                {/* Favorites Section */}
                <div className="mt-8">
                    <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        FAVORITE
                    </h3>
                    <div className="mt-2 space-y-1">
                        <a href="#" className="flex items-center gap-3 px-3 py-2 text-sm rounded-lg text-gray-700 hover:bg-gray-50">
                            <span className="w-2 h-2 rounded-full bg-orange-500"></span>
                            Opportunity Stages
                        </a>
                        <a href="#" className="flex items-center gap-3 px-3 py-2 text-sm rounded-lg text-gray-700 hover:bg-gray-50">
                            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                            Key Metrics
                        </a>
                        <a href="#" className="flex items-center gap-3 px-3 py-2 text-sm rounded-lg text-gray-700 hover:bg-gray-50">
                            <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                            Product Plan
                        </a>
                    </div>
                </div>
            </nav>

            {/* Footer Menu */}
            <div className="p-4 border-t">
                <div className="space-y-1">
                    <a href="#" className="flex items-center gap-3 px-3 py-2 text-sm rounded-lg text-gray-700 hover:bg-gray-50">
                        <AiOutlineSetting className="w-5 h-5" />
                        Settings
                    </a>
                    <a href="#" className="flex items-center gap-3 px-3 py-2 text-sm rounded-lg text-gray-700 hover:bg-gray-50">
                        <AiOutlineQuestionCircle className="w-5 h-5" />
                        Help & Center
                    </a>
                </div>
            </div>
        </div>
    );
} 