import { useEffect, useState } from 'react';
import {
    MonetizationOnOutlined, CheckCircleOutline, AppsOutlined, CancelOutlined, PendingOutlined, VaccinesOutlined
} from '@mui/icons-material';
import formatCurrency from '../../../utils/calculateMoney';
import { fetchData } from '../../../Api/axios';
import AppointmentCard from '../Section/history/AppointmentCard';


const History = ({ id }) => {

    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [activeFilter, setActiveFilter] = useState('All');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    //fetch data history
    useEffect(() => {
        const fetchDataHistory = async () => {
            setLoading(true);
            try {
                const res = await fetchData(`Booking/booking-history/${id}`);
                if (res.status === 200) {
                    setData(res.data);
                    setFilteredData(res.data);
                }
            } catch (error) {
                setError('Fetch data failed');
            } finally {
                setLoading(false);
            }
        };
        fetchDataHistory();
    }, [id]);
    console.log(data)
    console.log(filteredData)

    //sort data
    const handleFilter = (status) => {
        setActiveFilter(status);
        if (status === 'All') {
            setFilteredData(data);
        } else {
            setFilteredData(data.filter(item => item.status === status));
        }
    };
    if (data.length === 0) {
        return (
            <div
                className="flex flex-col items-center justify-center p-16 space-y-4  rounded-xl h-[60vh]"
                role="status"
            >
                <div className="p-4 bg-gray-100 rounded-full">
                    <svg
                        className="w-12 h-12 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.5"
                            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                        />
                    </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900">
                    No bookings found
                </h3>
                <p className="max-w-md text-center text-gray-500">
                    You don't have any upcoming or past bookings. Start planning your next adventure!
                </p>
            </div>
        );
    }
    return (
        <div className="space-y-6">
            <div className="bg-gray-50 p-3 rounded-lg flex flex-wrap gap-3">
                {['All', 'Success', 'Refund', 'Pending'].map((status) => (
                    <button
                        key={status}
                        onClick={() => handleFilter(status)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2
              ${activeFilter === status
                                ? 'bg-blue-600 text-white shadow-md'
                                : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'}
            `}
                    >
                        {status === 'All' && <AppsOutlined className="w-4 h-4" />}
                        {status !== 'All' && STATUS_CONFIG[status].icon}
                        {status === 'All' ? 'All' : STATUS_CONFIG[status].text}
                    </button>
                ))}
            </div>

            {error ? (
                <div className="p-6 bg-red-50 text-red-700 rounded-lg">{error}</div>
            ) : loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {[...Array(3)].map((_, idx) => (
                        <div key={idx} className="bg-white rounded-xl p-5 animate-pulse">
                            <div className="h-6 bg-gray-200 rounded w-3/4 mb-4" />
                            <div className="h-4 bg-gray-200 rounded w-1/2 mb-6" />
                            <div className="space-y-3">
                                <div className="h-4 bg-gray-200 rounded w-full" />
                                <div className="h-4 bg-gray-200 rounded w-2/3" />
                            </div>
                        </div>
                    ))}
                </div>
            ) : filteredData && filteredData.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {filteredData.map((bill) => (
                        <AppointmentCard key={bill.id} bill={bill} VaccineItem={VaccineItem} STATUS_CONFIG={STATUS_CONFIG} id={id} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-12 bg-gray-50 rounded-lg">
                    <MonetizationOnOutlined className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                    <p className="text-gray-500">No booking history</p>
                </div>
            )}
        </div>
    );
};
const STATUS_CONFIG = {
    Success: {
        color: 'bg-green-100 text-green-800',
        icon: <CheckCircleOutline className="w-4 h-4" />,
        text: 'Completed'
    },
    Refund: {
        color: 'bg-red-100 text-red-800',
        icon: <CancelOutlined className="w-4 h-4" />,
        text: 'Refund'
    },
    Pending: {
        color: 'bg-amber-100 text-amber-800',
        icon: <PendingOutlined className="w-4 h-4" />,
        text: 'Pending'
    }
};
const VaccineItem = ({ vaccine, totalChild }) => {
    const checkCombo = vaccine.vaccineResponeBooking?.length > 0;
    const finalPrice = checkCombo ? vaccine.finalPrice : vaccine.price;
    const totalChildren = Array.isArray(totalChild) ? totalChild.length : 0;
    const totalPrice = totalChildren > 1 ? totalChildren * finalPrice : finalPrice;

    return (
        <div className="flex justify-between text-sm py-1">
            <span className="flex items-center gap-2">
                <VaccinesOutlined className="w-4 h-4 text-blue-500" />
                {vaccine.name} {totalChildren > 1 && `x${totalChildren}`}
            </span>
            <span>
                {formatCurrency(finalPrice)} VND
                {totalChildren > 1 && (
                    <span className="text-gray-500 text-xs"> ( {formatCurrency(totalPrice)} VND)</span>
                )}
            </span>
        </div>
    );
};


export default History;