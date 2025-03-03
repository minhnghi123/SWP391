import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import PriceChangeOutlinedIcon from '@mui/icons-material/PriceChangeOutlined';
import formatCurrency from '../../../utils/calculateMoney';
import PlayCircleFilledWhiteOutlinedIcon from '@mui/icons-material/PlayCircleFilledWhiteOutlined';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import { useEffect, useState } from 'react';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import AppsOutlinedIcon from '@mui/icons-material/AppsOutlined';
import axios from 'axios';

const History = ({ id }) => {
    const [data, setData] = useState([]);
    const [sorted, setSorted] = useState([]);
    const [err, setErr] = useState('');

    const STATUS_COLORS = {
        'Completed': 'bg-green-500',
        'Pending': 'bg-yellow-500',
        'In Progress': 'bg-blue-500'
    };
    const mockData = [
        {
            id: 1,
            name: "Nguyễn Văn A",
            time: "08:30",
            price: 1500000,
            date: "2025-03-01",
            status: "Completed",
            doctorImage: "https://randomuser.me/api/portraits/men/1.jpg"
        },
        {
            id: 2,
            name: "Trần Thị B",
            time: "10:00",
            price: 1200000,
            date: "2025-03-02",
            status: "Pending",
            doctorImage: "https://randomuser.me/api/portraits/women/2.jpg"
        },
        {
            id: 3,
            name: "Lê Văn C",
            time: "14:45",
            price: 2000000,
            date: "2025-03-03",
            status: "In Progress",
            doctorImage: "https://randomuser.me/api/portraits/men/3.jpg"
        },
        {
            id: 4,
            name: "Nguyễn Văn A",
            time: "08:30",
            price: 1500000,
            date: "2025-03-01",
            status: "Completed",
            doctorImage: "https://randomuser.me/api/portraits/men/1.jpg"
        },
        {
            id: 5,
            name: "Trần Thị B",
            time: "10:00",
            price: 1200000,
            date: "2025-03-02",
            status: "Pending",
            doctorImage: "https://randomuser.me/api/portraits/women/2.jpg"
        },
        {
            id: 6,
            name: "Lê Văn C",
            time: "14:45",
            price: 2000000,
            date: "2025-03-03",
            status: "In Progress",
            doctorImage: "https://randomuser.me/api/portraits/men/3.jpg"
        }
    ];
    

    const AppointmentCard = ({ name, time, price, date, status, doctorImage }) => (
        <div className='bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200'>
            <div className='flex justify-between items-start mb-4'>
                <h2 className='text-lg font-semibold text-gray-800'>{name}</h2>
                <span className={`${STATUS_COLORS[status] || 'bg-gray-500'} px-3 py-1 rounded-full text-xs font-medium text-white`}>
                    {status}
                </span>
            </div>

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

            <div className='flex items-center justify-between pt-4 border-t border-gray-100'>
                <div className='flex items-center gap-2'>
                    <img
                        src={doctorImage}
                        alt='Doctor'
                        className='w-8 h-8 rounded-full object-cover'
                    />
                    <div>
                        <p className='text-xs text-gray-500'>Doctor</p>
                        <p className='text-sm font-medium text-gray-700'>Dr. {name}</p>
                    </div>
                </div>
                <button className='p-2 rounded-full hover:bg-blue-50 transition-colors duration-200'>
                    <PlayCircleFilledWhiteOutlinedIcon className='w-6 h-6 text-blue-500' />
                </button>
            </div>
        </div>
    );

    const sortByProcess = (status) => {
        if (!data) return;

        let sortedData = [];

        if (status === 'All') {
            sortedData = data; 
        } else {
            sortedData = data.filter((bill) => bill.status === status);
        }

        setSorted(sortedData);
    };


    useEffect(() => {
        const fetchData = async () => {
            // try {
            //     const res = await axios.get('API_URL_HERE'); // Thay API_URL_HERE bằng API thực tế
            //     if (res.status === 200 && res.data) {
            //         setData(res.data);
            //         setSorted(res.data); // Gán dữ liệu ban đầu vào sorted
            //     } else {
            //         setErr('Fetch API Failed');
            //     }
            // } catch (error) {
            //     setErr('Failed to fetch data');
            // }
            setData(mockData);
            setSorted(mockData);
        };

        fetchData();
    }, []);

    return (

        <>
            <div className='w-full shadow-sm bg-blue-50 rounded-lg flex flex-row items-center justify-end p-2 gap-2'>
                {/* <input
                    type='text'
                    placeholder='Search appointments...'
                    className='px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                /> */}
                <div className='flex gap-2'>
                    <button
                        onClick={() => sortByProcess('All')}
                        className='px-4 py-2 rounded-lg bg-gray-50  hover:bg-gray-400 hover:text-white transition-colors duration-200 font-medium text-sm uppercase tracking-wide shadow-sm hover:shadow-md active:scale-95 focus:outline-none focus:ring-2  focus:ring-black focus:ring-offset-2 flex items-center gap-2'
                    >
                        <AppsOutlinedIcon className='w-5 h-5' />
                        All
                    </button>
                    <button
                        onClick={() => sortByProcess('Completed')}
                        className='px-4 py-2 rounded-lg bg-green-100 text-green-800 hover:bg-green-500 hover:text-white transition-colors duration-200 font-medium text-sm uppercase tracking-wide shadow-sm hover:shadow-md active:scale-95 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 flex items-center gap-2'
                    >
                        <CheckCircleOutlinedIcon className='w-5 h-5' />
                        Complete
                    </button>
                    <button
                        onClick={() => sortByProcess('Pending')}
                        className='px-4 py-2 rounded-lg bg-amber-100 text-amber-800 hover:bg-amber-500 hover:text-white transition-colors duration-200 font-medium text-sm uppercase tracking-wide shadow-sm hover:shadow-md active:scale-95 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 flex items-center gap-2'
                    >
                        <AccessTimeOutlinedIcon className='w-5 h-5' />
                        Pending
                    </button>
                    <button
                        onClick={() => sortByProcess('In Progress')}
                        className='px-4 py-2 rounded-lg bg-blue-100 text-blue-800 hover:bg-blue-500 hover:text-white transition-colors duration-200 font-medium text-sm uppercase tracking-wide shadow-sm hover:shadow-md active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center gap-2'
                    >
                        <PlayCircleFilledWhiteOutlinedIcon className='w-5 h-5' />
                        Process
                    </button>
                </div>
            </div>

            <div className='p-4 grid grid-cols-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
                {sorted.length > 0 ? (
                    sorted.map((appointment, index) => (
                        <AppointmentCard
                            key={index}
                            name={appointment.name}
                            time={appointment.time}
                            price={appointment.price}
                            date={appointment.date}
                            status={appointment.status}
                            doctorImage={appointment.doctorImage}
                        />
                    ))
                ) : (
                    <p className="text-gray-500 text-center col-span-full">No appointments found.</p>
                )}


                {/* Tương tự cho các thẻ khác */}
            </div>
        </>






    )
}

export default History