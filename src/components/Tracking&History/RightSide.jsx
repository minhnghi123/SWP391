import { useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import Avatar from '../../assets/p15.jpg'
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import PriceChangeOutlinedIcon from '@mui/icons-material/PriceChangeOutlined';
import formatCurrency from '../../utils/calculateMoney';
import PlayCircleFilledWhiteOutlinedIcon from '@mui/icons-material/PlayCircleFilledWhiteOutlined';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';

const RightSide = ({ section }) => {
    const searchRef = useRef(null)
    const [isOpen, setIsOpen] = useState(false)
    const handleOpen = () => {
        setIsOpen(!isOpen)
    }

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
    const navigate = useNavigate();

    const AppointmentCard = ({ name, time, price, date, status }) => {
        const getStatusColor = (status) => {
            const statusColors = {
                'Completed': 'bg-green-500',
                'Pending': 'bg-yellow-500',
                'In Progress': 'bg-blue-500'
            };
           return statusColors[status] || 'bg-gray-500';
        };

        return (
            <div className='bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200'>
                {/* Header */}
                <div className='flex justify-between items-start mb-4'>
                    <h2 className='text-lg font-semibold text-gray-800'>{name}</h2>
                    <span className={`${getStatusColor(status)} px-3 py-1 rounded-full text-xs font-medium text-white`}>
                        {status}
                    </span>
                </div>

                {/* Appointment Details */}
                <div className='space-y-3 mb-4'>
                    <div className='flex items-center text-gray-600'>
                        <AccessTimeOutlinedIcon className='w-5 h-5 mr-2 text-blue-500' />
                        <span className='text-sm'>{time}</span>
                        <span className='ml-auto font-medium text-blue-600'>{formatCurrency(price)} VND</span>
                    </div>

                    <div className='flex items-center text-gray-600'>
                        <CalendarTodayOutlinedIcon className='w-5 h-5 mr-2 text-blue-500' />
                        <span className='text-sm'>{date}</span>
                    </div>
                </div>

                {/* Footer */}
                <div className='flex items-center justify-between pt-4 border-t border-gray-100'>
                    <div>
                        <p className='text-xs text-gray-500'>Doctor</p>
                        <p className='text-sm font-medium text-gray-700'>Dr. {name}</p>
                    </div>
                    <button className='p-2 rounded-full hover:bg-blue-50 transition-colors duration-200'>
                        <PlayCircleFilledWhiteOutlinedIcon className='w-6 h-6 text-blue-500' />
                    </button>
                </div>
            </div>
        );
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
            <div className='p-4 grid grid-cols-4 gap-4'>
                {/* information  & time*/}
                <AppointmentCard name='Minh Tam' time='10:00' price={Number(1000000)} date='10/10/2024' status='Completed' />
                <AppointmentCard name='Minh Tam' time='10:00' price={Number(1000000)} date='10/10/2024' status='Pending' />
                <AppointmentCard name='Minh Tam' time='10:00' price={Number(1000000)} date='10/10/2024' status='Completed' />
                <AppointmentCard name='Minh Tam' time='10:00' price={Number(1000000)} date='10/10/2024' status='Progress' />
                <AppointmentCard name='Minh Tam' time='10:00' price={Number(1000000)} date='10/10/2024' status='Completed' />
                <AppointmentCard name='Minh Tam' time='10:00' price={Number(1000000)} date='10/10/2024' status='Pending' />
                <AppointmentCard name='Minh Tam' time='10:00' price={Number(1000000)} date='10/10/2024' status='Completed' />
                <AppointmentCard name='Minh Tam' time='10:00' price={Number(1000000)} date='10/10/2024' status='Progress' />

            </div>



        </div>
    )
};

export default RightSide;