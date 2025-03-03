import { useState, useRef } from 'react';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import Profile from './Section/profile/profile'
import History from './Section/hisotry'
import Tracking from './Section/tracking'
import ListChildren from '../Tracking&History/Section/children/listChidren';
import AvatarHomePage from '../home/avatarHomePage'
const RightSide = ({ section, id }) => {

    const searchRef = useRef(null)
    const [search, setSearch] = useState('')
    const [showUserMenu, setShowUserMenu] = useState(false)
    const handleSearch = (e) => {
        const value = e.target.value
        setSearch(value)
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        searchRef.current.focus();
        setSearch('');
    };

    const getHeaderIcon = () => {
        switch(section) {
            case 'profile': return '👤';
            case 'tracking': return '📅';
            case 'history': return '📋';
            default: return '🏥';
        }
    };
    const user ={
        name:'Shu',
        email:'teei8191@gmail.com'
    }
    return (
        <div className="p-4 bg-gray-50 min-h-screen">
            {/* Enhanced Header */}
            <div className="sticky top-0 bg-white backdrop-blur-md z-10 rounded-2xl shadow-md">
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
                                    <span className="px-3 py-1 text-xs font-medium text-emerald-600 bg-emerald-50 rounded-full">
                                        Active
                                    </span>
                                    <span className="px-3 py-1 text-xs font-medium text-blue-600 bg-blue-50 rounded-full">
                                        {new Date().toLocaleDateString()}
                                    </span>
                                </div>
                            </div>
                            {/* <p className="text-sm text-gray-500 max-w-xl">
                                {section === 'profile' && 'Customize your profile, manage personal information, and adjust your healthcare preferences all in one place.'}
                                {section === 'tracking' && 'Stay on top of your healthcare journey with our comprehensive appointment tracking system.'}
                                {section === 'history' && 'Access and review your complete medical history, including past treatments and consultations.'}
                                {section === 'children' && 'Access and review your complete medical history, including past treatments and consultations.'}
                            </p> */}
                        </div>

                        {/* Enhanced Right Side */}
                        <div className="flex flex-col lg:flex-row items-center gap-4">
                            {/* Improved Search */}
                            <div className="relative group w-full lg:w-auto">
                                <input
                                    ref={searchRef}
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    type="text"
                                    placeholder="Search in records..."
                                    className="w-full lg:w-80 pl-12 pr-4 py-3 rounded-xl border border-gray-200 
                                         text-sm placeholder-gray-400 bg-gray-50
                                         group-hover:border-blue-300 group-hover:bg-white
                                         focus:outline-none focus:ring-2 focus:ring-blue-100 
                                         focus:border-blue-400 transition-all duration-300"
                                />
                                <button
                                    onClick={handleSubmit}
                                    className="absolute left-3 top-1/2 -translate-y-1/2 p-1.5 rounded-lg
                                         hover:bg-blue-50 transition-colors duration-200"
                                >
                                    <SearchOutlinedIcon className="w-5 h-5 text-gray-400 group-hover:text-blue-500" />
                                </button>
                            </div>

                            {/* Actions Container */}
                            <div className="flex items-center space-x-4">
                                {/* Enhanced Notification Bell */}
                                <button className="relative p-3 rounded-xl hover:bg-gray-100 transition-all duration-200
                                             group focus:outline-none focus:ring-2 focus:ring-blue-100">
                                    <NotificationsNoneOutlinedIcon className="w-6 h-6 text-gray-600 group-hover:text-blue-500" />
                                    <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 rounded-full
                                               group-hover:animate-pulse"></span>
                                </button>

                                {/* Enhanced User Menu */}
                                    <AvatarHomePage user={user}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="mt-6 bg-white rounded-2xl shadow-sm p-6">
                {section === 'profile' && <Profile id={id} />}
                {section === 'history' && <History id={id} />}
                {section === 'tracking' && <Tracking id={id} />}
                {section === 'children' && <ListChildren id={id} />}
            </div>
        </div>
    )
};

export default RightSide;