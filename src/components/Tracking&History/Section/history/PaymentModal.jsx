import { Close, Info, Payment, LocalOffer, Vaccines, ExpandMore, ExpandLess } from '@mui/icons-material';
import formatCurrency from '../../../../utils/calculateMoney';
import { useState } from 'react';
import { addData } from '../../../../Api/axios';
import { toast } from 'react-toastify';

const PaymentModal = ({ onClose, bill, id }) => {
    const [selectedMethod, setSelectedMethod] = useState(1);
    const [expandedComboId, setExpandedComboId] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isTrigger, setIsTrigger] = useState(false);
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
    console.log('bill', bill);
    const totalPrice = bill.amount;
    const childrenIds = bill.childrenList.map(child => child.idid);
    const NumberOfChildren = childrenIds.length;
    const total = totalPrice * NumberOfChildren;

    const handlePaymentSubmit = async () => {
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
           
            const res = await addData('Booking/add-booking', value);

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

    const toggleComboExpand = (comboId) => {
        setExpandedComboId(expandedComboId === comboId ? null : comboId);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">

            <div className="bg-white rounded-xl w-full max-w-5xl mx-4 overflow-hidden shadow-xl">
                {/* Header */}
                <div className="flex justify-between items-center p-6 border-b border-gray-200 bg-gray-50">
                    <h2 className="text-2xl font-semibold text-gray-800">Payment Details</h2>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-200 rounded-full transition-colors"
                        aria-label="Close modal"
                    >
                        <Close className="w-6 h-6 text-gray-500" />
                    </button>
                </div>

                {/* Content */}
                <div className="flex flex-col md:flex-row max-h-[80vh] overflow-auto">
                    {/* Left Column - Cart Details */}
                    <div className="flex-1 p-6 border-r border-gray-200">
                        <div className="space-y-6">
                            {/* Customer Details */}
                            <div className="bg-white rounded-lg shadow-sm border border-gray-100">
                                <h3 className="text-lg font-semibold p-4 border-b border-gray-100 flex items-center gap-2">
                                    👤 Customer Information
                                </h3>
                                <div className="p-4 space-y-2">
                                    <div className="flex items-center gap-2">
                                        <span className="font-medium text-gray-700">Patient:</span>
                                        <span className="text-gray-800">{bill.childrenList.map(child => child.name).join(', ')}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="font-medium text-gray-700">Appointment:</span>
                                        <span className="text-gray-800">{new Date(bill.arrivedAt).toLocaleString()}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="font-medium text-gray-700">Status:</span>
                                        <span className="px-2 py-1 rounded-full text-sm bg-yellow-100 text-yellow-800">
                                            {bill.status}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Individual Vaccines */}
                            {bill.vaccineList.length > 0 && (
                                <div className="bg-white rounded-lg shadow-sm border border-gray-100">
                                    <h3 className="text-lg font-semibold p-4 border-b border-gray-100 flex items-center gap-2">
                                        💉 Individual Vaccines
                                    </h3>
                                    <div className="divide-y divide-gray-100">
                                        {bill.vaccineList.map((vaccine, index) => (
                                            <div key={index} className="p-4 hover:bg-gray-50 transition-colors">
                                                <div className="flex justify-between items-start">
                                                    <div className="space-y-1">
                                                        <p className="font-medium text-gray-800">{vaccine.name} x {NumberOfChildren}</p>
                                                        <p className="text-sm text-gray-500">Single Dose Vaccine</p>
                                                    </div>
                                                    <p className="font-semibold text-blue-600">
                                                        {formatCurrency(vaccine.price * NumberOfChildren)} VND
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Combo Packages */}
                            {bill.comboList.length > 0 && (
                                <div className="bg-white rounded-lg shadow-sm border border-gray-100">
                                    <h3 className="text-lg font-semibold p-4 border-b border-gray-100 flex items-center gap-2">
                                        <LocalOffer className="w-5 h-5 text-blue-500" />
                                        Vaccination Packages
                                    </h3>
                                    <div className="divide-y divide-gray-100">
                                        {bill.comboList.map((combo) => (
                                            <div key={combo.id} className="hover:bg-gray-50 transition-colors">
                                                <div className="p-4">
                                                    <div className="flex justify-between items-start mb-2">
                                                        <div className="space-y-1">
                                                            <p className="font-medium text-gray-800">{combo.name} x {NumberOfChildren}</p>
                                                            <div className="flex items-center gap-2">
                                                                <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                                                                    {combo.discount}% OFF
                                                                </span>
                                                                <span className="text-sm text-gray-500">
                                                                    {combo.vaccineResponeBooking.length} Vaccines
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <div className="text-right">
                                                            <p className="font-semibold text-blue-600">
                                                                {formatCurrency(combo.finalPrice * NumberOfChildren)} VND
                                                            </p>
                                                            <p className="text-sm text-gray-500 line-through">
                                                                {formatCurrency(combo.totalPrice * NumberOfChildren)} VND
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <button
                                                        onClick={() => toggleComboExpand(combo.id)}
                                                        className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700"
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

                                                {/* Expanded Vaccine List */}
                                                {expandedComboId === combo.id && (
                                                    <div className="bg-gray-50 p-4 space-y-2">
                                                        {combo.vaccineResponeBooking.map((vaccine, idx) => (
                                                            <div key={idx} className="flex justify-between items-center py-2 px-4 bg-white rounded-lg">
                                                                <div className="flex items-center gap-2">
                                                                    <Vaccines className="w-4 h-4 text-gray-400" />
                                                                    <span className="text-gray-700">{vaccine.name}</span>
                                                                </div>
                                                                <span className="text-gray-600">
                                                                    {formatCurrency(vaccine.price)} VND
                                                                </span>
                                                            </div>
                                                        ))}
                                                        <div className="flex justify-between items-center pt-2 text-sm text-gray-500">
                                                            <span>Total Savings</span>
                                                            <span className="font-medium text-green-600">
                                                                {formatCurrency(combo.totalPrice - combo.finalPrice)} VND
                                                            </span>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Advisory Section */}
                            {bill.advisoryDetail && bill.advisoryDetail !== 'no' && (
                                <div className="bg-white rounded-lg shadow-sm border border-gray-100">
                                    <h3 className="text-lg font-semibold p-4 border-b border-gray-100 flex items-center gap-2">
                                        ℹ️ Advisory Notes
                                    </h3>
                                    <div className="p-4 bg-blue-50">
                                        <div className="flex items-start gap-3">
                                            <Info className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                                            <p className="text-blue-700">{bill.advisoryDetail}</p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Total */}
                            <div className="bg-white rounded-lg shadow-sm border border-gray-100">
                                <div className="p-4">
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <p className="text-lg font-semibold text-gray-800">Total Amount</p>
                                            <p className="text-sm text-gray-500">Including all taxes</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-2xl font-bold text-blue-600">
                                                {formatCurrency(total)} VND
                                            </p>
                                            {bill.paymentName === 'Does not purchase yet' && (
                                                <span className="text-sm text-orange-600">Payment Pending</span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Payment Methods */}
                    <div className="w-full md:w-[400px] p-6 bg-gray-50">
                        <h3 className="text-lg font-semibold mb-4 text-gray-800">Select Payment Method</h3>
                        <div className="space-y-3">
                            {paymentMethods.map((method) => (
                                <button
                                    key={method.id}
                                    onClick={() => setSelectedMethod(method.id)}
                                    className={`w-full flex items-center gap-4 p-4 rounded-lg border-2 transition-all duration-200
                                        ${selectedMethod === method.id
                                            ? `${method.bgColor} border-2 ${method.borderColor}`
                                            : 'bg-white border-transparent hover:border-gray-300'
                                        }
                                    `}
                                >
                                    <div className="flex-shrink-0 text-2xl">
                                        {method.icon}
                                    </div>
                                    <div className="flex-1 text-left">
                                        <p className="font-medium text-gray-800">{method.name}</p>
                                        <p className="text-sm text-gray-600">{method.desc}</p>
                                    </div>
                                    {selectedMethod === method.id && (
                                        <div className="w-4 h-4 rounded-full bg-green-500 flex items-center justify-center">
                                            <div className="w-2 h-2 rounded-full bg-white"></div>
                                        </div>
                                    )}
                                </button>
                            ))}
                        </div>

                        {/* Proceed Button */}
                        {error && <p className='text-red-500'>{error}</p>}
                        <button
                            onClick={handlePaymentSubmit}
                            disabled={!selectedMethod}
                            className={`w-full mt-6 font-medium py-3 px-4 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md flex items-center justify-center gap-2
        ${selectedMethod
                                    ? 'bg-blue-500 hover:bg-blue-600 text-white'
                                    : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                                }
    `}
                        >
                            <Payment className="w-5 h-5" />
                            {isLoading ? 'Processing...' : 'Complete Payment'}
                        </button>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentModal; 