import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import PriceChangeOutlinedIcon from '@mui/icons-material/PriceChangeOutlined';
import formatCurrency from '../../../utils/calculateMoney';
import PlayCircleFilledWhiteOutlinedIcon from '@mui/icons-material/PlayCircleFilledWhiteOutlined';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import { useEffect, useState } from 'react';
import axios from 'axios';

const History = ({ id }) => {
    const [data, setData] = useState()
    const [err, setErr] = useState('')
    const [sorted, setSorted] = useState()
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
    const sortByProcess = (style) => {
        let sorted;
        switch (style) {
            case 'Completed':
                sorted = data.filter((bill) => bill.status === style);
                break;
            case 'Pending':
                sorted = data.filter((bill) => bill.status === style);
                break;
            case 'In Progress':
                sorted = data.filter((bill) => bill.status === style);
                break;
            default:
                sorted = [...data]; 
                break;
        }

        setSorted(sorted);
    };

    // useEffect(() => {
    //     try {
    //         const res = axios.get('')
    //         if (res?.status === 200 && res?.data) {
    //             setData(res?.data)
    //         }else {
    //           setErr('Fetch Api Faild')
    //         }

    //     } catch (error) {
    //         setErr('Faild to fetch ')
    //     }
    // }, [])
    return (

        <>
            <div className='w--[90%] shadow-sm bg-blue-300 rounded-lg flex flex-row items-center justify-end p-2 gap-2'>
                <button className='px-4 py-2 rounded-lg bg-green-100 text-green-800 hover:bg-green-500 hover:text-white transition-colors duration-200 font-medium text-sm uppercase tracking-wide shadow-sm hover:shadow-md active:scale-95 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2'>
                    Complete
                </button>
                <button className='px-4 py-2 rounded-lg bg-amber-100 text-amber-800 hover:bg-amber-500 hover:text-white transition-colors duration-200 font-medium text-sm uppercase tracking-wide shadow-sm hover:shadow-md active:scale-95 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2'>
                    Pending
                </button>
                <button className='px-4 py-2 rounded-lg bg-blue-100 text-blue-800 hover:bg-blue-500 hover:text-white transition-colors duration-200 font-medium text-sm uppercase tracking-wide shadow-sm hover:shadow-md active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'>
                    Process
                </button>
            </div>

            <div className='p-4 grid grid-cols-4 gap-4'>
                <AppointmentCard name='Minh Tam' time='10:00' price={Number(1000000)} date='10/10/2024' status='Completed' />
                <AppointmentCard name='Minh Tam' time='10:00' price={Number(1000000)} date='10/10/2024' status='Pending' />
                <AppointmentCard name='Minh Tam' time='10:00' price={Number(1000000)} date='10/10/2024' status='Completed' />
                <AppointmentCard name='Minh Tam' time='10:00' price={Number(1000000)} date='10/10/2024' status='Progress' />
                <AppointmentCard name='Minh Tam' time='10:00' price={Number(1000000)} date='10/10/2024' status='Completed' />
                <AppointmentCard name='Minh Tam' time='10:00' price={Number(1000000)} date='10/10/2024' status='Pending' />
                <AppointmentCard name='Minh Tam' time='10:00' price={Number(1000000)} date='10/10/2024' status='Completed' />
                <AppointmentCard name='Minh Tam' time='10:00' price={Number(1000000)} date='10/10/2024' status='Progress' />
            </div>
        </>






    )
}

export default History