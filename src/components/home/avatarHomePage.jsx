import imgAvatar from '../../assets/p15.jpg'
import React, { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom';
export default function AvatarHomePage({ signout, user }) {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);


    // Click outside handler
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                //phần tử được click không nằm bên trong dropdown.
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);
    console.log(user.email)
    return (
        <div className="relative" ref={dropdownRef}>
            {/* Avatar Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`
                    w-10 h-10 rounded-full 
                    ${isOpen ? 'ring-2 ring-blue-500 ring-offset-2' : 'hover:ring-2 hover:ring-gray-300 hover:ring-offset-2'}
                    transition-all duration-300 focus:outline-none
                `}
            >
                <div className="w-full h-full rounded-full overflow-hidden">
                    <img
                        className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-300"
                        src={user.picture || imgAvatar}
                        alt="User avatar"
                    />
                </div>
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
                <div className="absolute top-14 right-0 w-64 bg-white rounded-2xl shadow-lg border border-gray-100 transform transition-all duration-200 ease-out z-50">
                    {/* User Info */}
                    <div className="p-4 border-b border-gray-100">
                        <div className="flex items-center space-x-3">
                            <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-blue-500">
                                <img
                                    className="w-full h-full object-cover"
                                    src={user.picture || imgAvatar}
                                    alt="User profile"
                                />
                            </div>
                            <div>
                                <h4 className="text-sm font-semibold text-gray-800">{user.name || user.user}</h4>
                                <p className="text-xs text-gray-500">{user.email || ''}</p>
                            </div>
                        </div>
                    </div>

                    {/* Menu Items */}
                    <div className="p-2 space-y-1">
                        <button onClick={() => navigate(`/pageProfile/profile/${user.id || user.sub}`)} className="w-full flex items-center space-x-3 px-3 py-2.5 text-sm text-gray-600 rounded-xl hover:bg-gray-50 transition-colors duration-200">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                            <span>Edit Profile</span>
                        </button>

                        <button onClick={() => navigate(`/pageProfile/tracking/${user.id || user.sub}`)} className="w-full flex items-center space-x-3 px-3 py-2.5 text-sm text-gray-600 rounded-xl hover:bg-gray-50 transition-colors duration-200">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <span>Tracking vaccines</span>
                        </button>
                        <button onClick={() => navigate(`/pageProfile/history/${user.id || user.sub}`)} className="w-full flex items-center space-x-3 px-3 py-2.5 text-sm text-gray-600 rounded-xl hover:bg-gray-50 transition-colors duration-200">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <span>History</span>
                        </button>

                        <div className="my-2 border-t border-gray-100"></div>

                        <button onClick={signout}
                            className="w-full flex items-center space-x-3 px-3 py-2.5 text-sm text-red-600 rounded-xl hover:bg-red-50 transition-colors duration-200"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                            </svg>
                            <span>Sign Out</span>
                        </button>


                    </div>
                </div>
            )}
        </div>
    );
}