import { useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import Avatar from '../../assets/p15.jpg'
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import Profile from './Section/profile'
import History from './Section/hisotry'
import Tracking from './Section/tracking'
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';

const RightSide = ({ section, id }) => {
   
    const searchRef = useRef(null)
    const [search, setSearch] = useState('')
    const handleSearch = (e) => {
        const value = e.target.value
        setSearch(value)
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        searchRef.current.focus();
        setSearch('');
    };

    return (
        <div className="p-4">
            {/* Top */}
            <div className="sticky top-0 bg-white/95 backdrop-blur-sm z-10 border-b border-gray-300 shadow-sm">
                <div className="px-8 py-6">
                    {/* Header Content */}
                    <div className="flex items-center justify-between">
                        {/* Left Side - Title & Description */}
                        <div className="space-y-2">
                            <div className="flex items-center space-x-3">
                                <h1 className="text-2xl font-bold text-gray-800 capitalize">
                                    {section || 'Profile'}
                                </h1>
                                <span className="px-3 py-1 text-xs font-medium text-blue-600 bg-blue-50 rounded-full">
                                    Active
                                </span>
                            </div>
                            <p className="text-sm text-gray-500">
                                {section === 'profile' && 'Manage your personal information and settings'}
                                {section === 'tracking' && 'Track your appointments and schedules'}
                                {section === 'history' && 'View your medical history and past appointments'}
                            </p>
                        </div>

                        {/* Right Side - Search & Actions */}
                        <div className="flex items-center space-x-6">
                            {/* Search Bar */}
                            <div className="relative group">
                                <input
                                    ref={searchRef}
                                    value={search}
                                    onChange={handleSearch}
                                    type="text"
                                    placeholder="Search..."
                                    className="w-64 pl-11 pr-4 py-2.5 rounded-lg border border-gray-200 
                                             text-sm placeholder-gray-400
                                             group-hover:border-gray-300
                                             focus:outline-none focus:ring-2 focus:ring-blue-50 
                                             focus:border-blue-500 transition-all duration-200"
                                />
                                <button onClick={handleSubmit}>
                                <SearchOutlinedIcon 
                                    
                                    className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 
                                              text-gray-400 group-hover:text-gray-500 transition-colors duration-200" 
                                />
                                </button>
                               
                            </div>

                            {/* Actions */}
                            <div className="flex items-center space-x-4">
                                {/* Notification Bell */}
                                <div className="relative">
                                    <button className="p-2 rounded-lg hover:bg-gray-100 transition-all duration-200">
                                        <NotificationsNoneOutlinedIcon className="w-6 h-6 text-gray-600" />
                                        <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full"></span>
                                    </button>
                                </div>

                                {/* Divider */}
                                {/* <div className="h-8 w-px bg-gray-200"></div> */}

                                {/* Avatar & User Menu */}
                                <div className="flex items-center space-x-3">
                                    <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-offset-2 ring-blue-100 transition-all duration-200 hover:ring-blue-200">
                                        <img
                                            src={Avatar}
                                            alt="User avatar"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    {/* <button className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                                        <KeyboardArrowDownOutlinedIcon className="w-4 h-4 text-gray-500" />
                                    </button> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* bottom */}
           
          {
            section === 'profile' && <Profile  id={id}/>
          }
          {
            section === 'history' && <History />
          }
        {
            section === 'tracking' && <Tracking />
        }

        </div>
    )
};

export default RightSide;