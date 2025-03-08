import { Close, Info, Payment } from '@mui/icons-material';
import formatCurrency from '../../../utils/calculateMoney';
import { useState } from 'react';

const PaymentModal = ({ onClose, bill }) => {
    const [selectedMethod, setSelectedMethod] = useState(null);
    
    const paymentMethods = [
        { 
            id: 1, 
            name: 'Cash', 
            icon: '💵', 
            desc: 'Pay at location',
            bgColor: 'bg-green-50',
            hoverColor: 'hover:bg-green-100',
            borderColor: 'border-green-500'
        },
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
    
    const handlePaymentSubmit = () => {
        if (!selectedMethod) {
            alert('Please select a payment method');
            return;
        }
        // Handle payment logic here
        console.log('Processing payment with method:', selectedMethod);
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
                            <div>
                                <h3 className="text-lg font-semibold mb-3 text-gray-800 flex items-center gap-2">
                                    👤 Customer Information
                                </h3>
                                <div className="bg-gray-50 rounded-lg p-4">
                                    <p className="text-gray-700">
                                        <span className="font-medium">Children:</span>{' '}
                                        {bill.childrenIds.map(child => child.name).join(', ')}
                                    </p>
                                </div>
                            </div>

                            {/* Vaccine List */}
                            <div>
                                <h3 className="text-lg font-semibold mb-3 text-gray-800 flex items-center gap-2">
                                    💉 Vaccine Details
                                </h3>
                                <div className="space-y-3">
                                    {bill.vaccineList.map((vaccine, index) => (
                                        <div key={index} className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors">
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <p className="font-medium text-gray-800">{vaccine.name}</p>
                                                    <p className="text-sm text-gray-600">{vaccine.disease}</p>
                                                </div>
                                                <p className="font-semibold text-blue-600">
                                                    {formatCurrency(vaccine.price)} VND
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                    {bill.comboList.map((combo, index) => (
                                        <div key={index} className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors">
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <p className="font-medium text-gray-800">{combo.name}</p>
                                                    <p className="text-sm text-gray-600">Combo Package</p>
                                                </div>
                                                <p className="font-semibold text-blue-600">
                                                    {formatCurrency(combo.price)} VND
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Advisory Section */}
                            {bill.advisory && bill.advisory !== 'no' && (
                                <div>
                                    <h3 className="text-lg font-semibold mb-3 text-gray-800 flex items-center gap-2">
                                        ℹ️ Advisory Notes
                                    </h3>
                                    <div className="bg-blue-50 rounded-lg p-4 flex items-start gap-3">
                                        <Info className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                                        <p className="text-blue-700">{bill.advisory}</p>
                                    </div>
                                </div>
                            )}

                            {/* Total */}
                            <div className="border-t border-gray-200 pt-4">
                                <div className="flex justify-between items-center bg-gray-50 p-4 rounded-lg">
                                    <p className="text-lg font-semibold text-gray-800">Total Amount</p>
                                    <p className="text-2xl font-bold text-blue-600">
                                        {formatCurrency(bill.amount)} VND
                                    </p>
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
                        <button 
                            onClick={handlePaymentSubmit}
                            className={`w-full mt-6 font-medium py-3 px-4 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md flex items-center justify-center gap-2
                                ${selectedMethod 
                                    ? 'bg-blue-500 hover:bg-blue-600 text-white' 
                                    : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                                }
                            `}
                        >
                            <Payment className="w-5 h-5" />
                            {selectedMethod ? 'Complete Payment' : 'Select Payment Method'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentModal; 