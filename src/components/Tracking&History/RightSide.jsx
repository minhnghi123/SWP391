import { useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import Avatar from '../../assets/p15.jpg'
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import Profile from './Section/profile'
import History from './Section/hisotry'

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
            <div className="sticky top-0 bg-white z-10 px-8 py-6 border-b border-gray-100">
                {/* Header Content */}
                <div className="flex items-center justify-between">
                    {/* Left Side - Title & Description */}
                    <div className="space-y-1">
                        <h1 className="text-2xl font-bold text-gray-800 capitalize">
                            {section || 'Profile'}
                        </h1>
                        <p className="text-sm text-gray-500">
                            Showing your all histories with a clear view
                        </p>
                    </div>

                    {/* Right Side - Search & Actions */}
                    <div className="flex items-center space-x-4">
                        {/* Search Bar */}
                        <div className="relative">
                            <input
                                ref={searchRef}
                                value={search}
                                onChange={handleSearch}
                                type="text"
                                placeholder="Search..."
                                className="w-64 pl-4 pr-10 py-2 rounded-lg border border-gray-200 
                                           focus:outline-none focus:ring-2 focus:ring-blue-100 
                                           focus:border-blue-500 transition-all duration-200"
                            />
                            <button
                                type='submit'
                                onClick={handleSubmit}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 
                                           hover:text-blue-500 transition-colors duration-200"
                            >
                                <SearchOutlinedIcon className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Notification Bell */}
                        <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                            <NotificationsNoneOutlinedIcon className="w-6 h-6 text-gray-600" />
                        </button>

                        {/* Avatar */}
                        <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-offset-2 ring-gray-100">
                            <img
                                src={Avatar}
                                alt="User avatar"
                                className="w-full h-full object-cover"
                            />
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


        </div>
    )
};

export default RightSide;