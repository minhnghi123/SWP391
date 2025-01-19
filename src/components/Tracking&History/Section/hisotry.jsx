import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import PriceChangeOutlinedIcon from '@mui/icons-material/PriceChangeOutlined';
import formatCurrency from '../../../utils/calculateMoney';
import PlayCircleFilledWhiteOutlinedIcon from '@mui/icons-material/PlayCircleFilledWhiteOutlined';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';

const History = () => {
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



    )
}

export default History