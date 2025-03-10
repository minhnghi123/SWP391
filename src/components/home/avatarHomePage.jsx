import imgAvatar from '../../assets/p15.jpg'
import React, { useState, useEffect, useRef } from 'react'
import { data, Link, useNavigate } from 'react-router-dom';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import EscalatorWarningOutlinedIcon from '@mui/icons-material/EscalatorWarningOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import RestoreOutlinedIcon from '@mui/icons-material/RestoreOutlined';
import { useDispatch, useSelector } from 'react-redux';
import { accountAction } from '../redux/reducers/accountSlice';
import { vaccineAction } from '../redux/reducers/selectVaccine';
import { childAction } from '../redux/reducers/selectChildren';
import { arriveActions } from '../redux/reducers/arriveDate';
export default function AvatarHomePage() {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);
    const user = useSelector((state) => state.account.user);
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
    const handleLogout = () => {
        dispatch(accountAction.clearUser())
        dispatch(vaccineAction.completePayment())
        dispatch(childAction.completePayment())
        dispatch(arriveActions.resetArriveDate());
        navigate('/loginPage');
    };

    return (
        <div className="relative z-[1000]" ref={dropdownRef} >
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
                        src={user.avatar}
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
                                    src={user.avatar}
                                    alt="User profile"
                                />
                            </div>
                            <div>
                                <h4 className="text-sm font-semibold text-gray-800">{user?.name }</h4>
                                {/* <p className="text-xs text-gray-500">{user.email || ''}</p> */}
                            </div>
                        </div>
                    </div>

                    {/* Menu Items */}
                    {
                        user?.role === 'admin' ?
                            (<div className=' p-2 space-y-1'>
                                <button onClick={handleLogout}
                                    className="w-full flex items-center space-x-3 px-3 py-2.5 text-sm text-red-600 rounded-xl hover:bg-red-50 transition-colors duration-200"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                    </svg>
                                    <span>Sign Out</span>
                                </button>
                            </div>)
                            :
                            (<div className="p-2 space-y-1">
                                <button onClick={() => navigate(`/pageProfile/profile/${user.id}`)} className="w-full flex items-center space-x-3 px-3 py-2.5 text-sm text-gray-600 rounded-xl hover:bg-gray-50 transition-colors duration-200">
                                    <AccountCircleOutlinedIcon />
                                    <span>Your Profile</span>
                                </button>
                                <button onClick={() => navigate(`/pageProfile/children/${user.id}`)} className="w-full flex items-center space-x-3 px-3 py-2.5 text-sm text-gray-600 rounded-xl hover:bg-gray-50 transition-colors duration-200">
                                    <EscalatorWarningOutlinedIcon />
                                    <span>Your Children</span>
                                </button>

                                <button onClick={() => navigate(`/pageProfile/tracking/${user.id}`)} className="w-full flex items-center space-x-3 px-3 py-2.5 text-sm text-gray-600 rounded-xl hover:bg-gray-50 transition-colors duration-200">
                                    <CalendarMonthOutlinedIcon />
                                    <span>Tracking vaccines</span>
                                </button>
                                <button onClick={() => navigate(`/pageProfile/history/${user.id}`)} className="w-full flex items-center space-x-3 px-3 py-2.5 text-sm text-gray-600 rounded-xl hover:bg-gray-50 transition-colors duration-200">
                                    <RestoreOutlinedIcon />
                                    <span>History</span>
                                </button>
                                <div className="my-2 border-t border-gray-100"></div>
                                <button onClick={handleLogout}
                                    className="w-full flex items-center space-x-3 px-3 py-2.5 text-sm text-red-600 rounded-xl hover:bg-red-50 transition-colors duration-200"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                    </svg>
                                    <span>Sign Out</span>
                                </button>


                            </div>)
                    }


                </div>
            )}
        </div>
    );
}