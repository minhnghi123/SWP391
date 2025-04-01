import { Close, Info, Payment, LocalOffer, Vaccines, ExpandMore, ExpandLess } from '@mui/icons-material';
import formatCurrency from '../../../../utils/calculateMoney';
import { useState } from 'react';
import useAxios from '@/utils/useAxios';
import { toast } from 'react-toastify';
import formatDate from '../../../../utils/Date';
import { locationAciton } from '../../../redux/reducers/locationBooking';
import { useDispatch, useSelector } from 'react-redux';
const url = import.meta.env.VITE_BASE_URL_DB;
const PaymentModal = ({ onClose, bill, id }) => {
    const api = useAxios();
    const [selectedMethod, setSelectedMethod] = useState(1);
    const [expandedComboId, setExpandedComboId] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isTrigger, setIsTrigger] = useState(false);
    const dispatch = useDispatch();
    const location = useSelector((state) => state.location.location);
    const paymentMethods = [
        // {
        //     id: 1,
        //     name: 'Cash',
        //     icon: '💵',
        //     desc: 'Pay at location',
        //     bgColor: 'bg-green-50',
        //     hoverColor: 'hover:bg-green-100',
        //     borderColor: 'border-green-500'
        // },
        {
            id: 2,
            name: 'MoMo',
            icon: '📱',
            desc: 'Mobile payment',
            bgColor: 'bg-pink-50',
            hoverColor: 'hover:bg-pink-100',
            borderColor: 'border-pink-500'
        },
        {
            id: 3,
            name: 'VnPay',
            icon: '🏦',
            desc: 'Online banking',
            bgColor: 'bg-blue-50',
            hoverColor: 'hover:bg-blue-100',
            borderColor: 'border-blue-500'
        },
        {
            id: 4,
            name: 'PayPal',
            icon: '💳',
            desc: 'All cards accepted',
            bgColor: 'bg-indigo-50',
            hoverColor: 'hover:bg-indigo-100',
            borderColor: 'border-indigo-500'
        },
    ];

    const totalPrice = bill.amount;
    const childrenIds = bill.childrenList.map(child => child.idid);
    const NumberOfChildren = childrenIds.length;
    const total = totalPrice * NumberOfChildren;


    // handle payment
    const handlePaymentSubmit = async () => {
        dispatch(locationAciton.locationHistory())
        try {
            setIsLoading(true);
            const value = {
                parentId: id,
                advisoryDetail: bill.advisoryDetail,
                totalPrice: totalPrice,
                arrivedAt: bill.arrivedAt,
                paymentId: selectedMethod,
                childrenIds: bill.childrenList.map(child => child.childId),
                vaccineIds: bill.vaccineList.map(vaccine => vaccine.id),
                vaccineComboIds: bill.comboList.map(combo => combo.id),
                bookingID: bill.id,

            }
            console.log('value', value);
            const res = await api.post(`${url}/Booking/add-booking`, value);
            if (res && res.status === 200 && res.data) {
                window.location.href = res.data;
            } else {
                setError('Payment failed');
            }
        } catch (error) {
            setIsLoading(false);
            setError('Payment failed');
        } finally {
            setIsLoading(false);
        }
    }
    // console.log('location', location)
    // handle expand combo
    const toggleComboExpand = (comboId) => {
        setExpandedComboId(expandedComboId === comboId ? null : comboId);
    };

    return (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl w-full max-w-4xl overflow-hidden shadow-xl">
                {/* Header */}
                <div className="flex justify-between items-center px-6 py-4 bg-white border-b">
                    <div className="flex items-center gap-3">
                        <div className="bg-blue-100 p-2 rounded-lg">
                            <Payment className="w-5 h-5 text-blue-600" />
                        </div>
                        <h2 className="text-xl font-semibold text-gray-800">History</h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <Close className="w-5 h-5 text-gray-500" />
                    </button>
                </div>

                {/* Content */}
                <div className="flex flex-col md:flex-row max-h-[80vh] overflow-auto">
                    {/* Left Column - Cart Details */}
                    <div className="flex-1 p-6 space-y-4">
                        {/* Customer Details */}
                        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                            <div className="p-4">
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <span className="text-gray-700 font-medium">Patient:</span>
                                            <span className="text-gray-900">{bill.childrenList.map(child => child.name).join(', ')}</span>
                                        </div>
                                        <div className={`px-3 py-1 rounded-full text-sm ${bill.status === 'Completed' ? 'bg-green-100 text-green-700' : bill.status === 'Refund' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'}`}>
                                            {bill.status}
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-gray-700 font-medium">Appointment Date:</span>
                                        <span className="text-gray-900">{formatDate(bill.arrivedAt)}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-gray-700 font-medium">Service:</span>
                                        <span className="text-gray-900">Vaccination Schedule</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Vaccines List */}
                        {bill.vaccineList.length > 0 && (
                            <div className="bg-white rounded-xl border border-gray-200">
                                <div className="p-4">
                                    <h3 className="font-medium text-gray-900 mb-3">Vaccine List</h3>
                                    <div className="space-y-2">
                                        {bill.vaccineList.map((vaccine, index) => (
                                            <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                                                <div className="flex items-center gap-3">
                                                    <div className="bg-blue-100 p-2 rounded-lg">
                                                        <Vaccines className="w-4 h-4 text-blue-600" />
                                                    </div>
                                                    <span className="text-gray-900">{vaccine.name}</span>
                                                </div>
                                                <span className="font-medium text-gray-900">
                                                    {formatCurrency(vaccine.price * NumberOfChildren)} VND
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Combo Packages */}
                        {bill.comboList.length > 0 && (
                            <div className="bg-white rounded-xl border border-gray-200">
                                <div className="p-4">
                                    <h3 className="font-medium text-gray-900 mb-3">Vaccination Packages</h3>
                                    <div className="space-y-3">
                                        {bill.comboList.map((combo) => (
                                            <div key={combo.id} className="rounded-lg border border-gray-200">
                                                <div className="p-4">
                                                    <div className="flex justify-between items-start">
                                                        <div className="space-y-1">
                                                            <p className="font-medium text-gray-900">{combo.name}</p>
                                                            <div className="flex items-center gap-2">
                                                                <span className="px-2 py-0.5 text-xs bg-green-100 text-green-700 rounded-full">
                                                                    {combo.discount}% OFF
                                                                </span>
                                                                <span className="text-sm text-gray-500">
                                                                    {combo.vaccineResponeBooking.length} Vaccines
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <div className="text-right">
                                                            <p className="font-medium text-gray-900">
                                                                {formatCurrency(combo.finalPrice * NumberOfChildren)} VND
                                                            </p>
                                                            <p className="text-sm text-gray-500 line-through">
                                                                {formatCurrency(combo.totalPrice * NumberOfChildren)} VND
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <button
                                                        onClick={() => toggleComboExpand(combo.id)}
                                                        className="mt-2 flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700"
                                                    >
                                                        {expandedComboId === combo.id ? (
                                                            <>
                                                                <ExpandLess className="w-4 h-4" />
                                                                Hide Details
                                                            </>
                                                        ) : (
                                                            <>
                                                                <ExpandMore className="w-4 h-4" />
                                                                Show Details
                                                            </>
                                                        )}
                                                    </button>
                                                </div>

                                                {expandedComboId === combo.id && (
                                                    <div className="border-t border-gray-200 bg-gray-50 p-4 space-y-2">
                                                        {combo.vaccineResponeBooking.map((vaccine, idx) => (
                                                            <div key={idx} className="flex justify-between items-center py-2">
                                                                <span className="text-gray-700">{vaccine.name}</span>
                                                                <span className="text-gray-900 font-medium">
                                                                    {formatCurrency(vaccine.price)} VND
                                                                </span>
                                                            </div>
                                                        ))}
                                                        <div className="pt-2 border-t border-gray-200 flex justify-between items-center">
                                                            <span className="text-gray-700">Total Savings</span>
                                                            <span className="text-green-600 font-medium">
                                                                {formatCurrency(combo.totalPrice - combo.finalPrice)} VND
                                                            </span>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Payment Details */}
                        <div className="bg-white rounded-xl border border-gray-200">
                            <div className="p-4">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <h3 className="font-medium text-gray-900">Payment Method</h3>
                                        <p className="text-sm text-gray-500">{bill.paymentName || 'Not specified'}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-xl font-semibold text-gray-900">
                                            {formatCurrency(total)} VND
                                        </p>
                                        {bill.paymentName === 'Does not purchase yet' && (
                                            <span className="text-sm text-orange-600">Payment Pending</span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Advisory Notes */}
                        {bill.advisoryDetail && bill.advisoryDetail !== 'no' && (
                            <div className="bg-blue-50 rounded-xl p-4">
                                <div className="flex items-start gap-3">
                                    <Info className="w-5 h-5 text-blue-600 flex-shrink-0" />
                                    <p className="text-blue-900 text-sm">{bill.advisoryDetail}</p>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Right Column - Payment Methods */}
                    {bill.paymentName === 'Does not purchase yet' && (
                        <div className="w-full md:w-[320px] p-6 bg-gray-50 border-l border-gray-200">
                            <h3 className="text-lg font-medium text-gray-900 mb-4">Select Payment Method</h3>
                            <div className="space-y-3">
                                {paymentMethods.map((method) => (
                                    <button
                                        key={method.id}
                                        onClick={() => setSelectedMethod(method.id)}
                                        className={`w-full flex items-center gap-3 p-4 rounded-xl border transition-all
                                            ${selectedMethod === method.id
                                                ? `${method.bgColor} ${method.borderColor}`
                                                : 'bg-white border-gray-200 hover:border-gray-300'
                                            }
                                        `}
                                    >
                                        <span className="text-2xl">{method.icon}</span>
                                        <div className="flex-1 text-left">
                                            <p className="font-medium text-gray-900">{method.name}</p>
                                            <p className="text-sm text-gray-600">{method.desc}</p>
                                        </div>
                                        {selectedMethod === method.id && (
                                            <div className="w-4 h-4 rounded-full bg-blue-600 flex items-center justify-center">
                                                <div className="w-2 h-2 rounded-full bg-white"></div>
                                            </div>
                                        )}
                                    </button>
                                ))}
                            </div>

                            {error && (
                                <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                                    <p className="text-sm text-red-600">{error}</p>
                                </div>
                            )}

                            <button
                                onClick={handlePaymentSubmit}
                                disabled={!selectedMethod || isLoading}
                                className={`w-full mt-6 py-3 px-4 rounded-xl transition-all flex items-center justify-center gap-2 font-medium
                                    ${selectedMethod
                                        ? 'bg-blue-600 hover:bg-blue-700 text-white'
                                        : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                    }
                                `}
                            >
                                <Payment className="w-5 h-5" />
                                {isLoading ? 'Processing...' : 'Complete Payment'}
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PaymentModal; 