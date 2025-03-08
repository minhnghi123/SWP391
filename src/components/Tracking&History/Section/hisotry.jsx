import { useEffect, useState } from 'react';
import {
    MonetizationOnOutlined, CheckCircleOutline, AppsOutlined, CancelOutlined, PendingOutlined, VaccinesOutlined
} from '@mui/icons-material';
import formatCurrency from '../../../utils/calculateMoney';
import { fetchData } from '../../../Api/axios';
import AppointmentCard from '../history/AppointmentCard';


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
    //sort data
    const handleFilter = (status) => {
        setActiveFilter(status);
        if (status === 'All') {
            setFilteredData(data);
        } else {
            setFilteredData(data.filter(item => item.status === status));
        }
    };
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
            ) : filteredData.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {filteredData.map((bill) => (
                        <AppointmentCard key={bill.id} bill={bill} VaccineItem={VaccineItem} STATUS_CONFIG={STATUS_CONFIG} />
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
const VaccineItem = ({ vaccine }) => (
    <div className="flex justify-between text-sm py-1">
        <span className="flex items-center gap-2">

            <VaccinesOutlined className="w-4 h-4 text-blue-500" />
            {vaccine.name} 
        </span>
        <span>{formatCurrency(vaccine.price)} {` `} VND</span>
    </div>
);
export default History;