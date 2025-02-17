import { useEffect, useState } from "react";
import formatDecimal from '../../../../utils/calculateMoney';
import { useDispatch } from "react-redux";
import { methodPaymentAction } from "../../../redux/reducers/methodPaymentlice";
const MenthodPayment = ({ childrenVaccines, handleNextStep }) => {
    const [paymentMethod, setPaymentMethod] = useState(1);
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(methodPaymentAction.setMethodPayment(paymentMethod))
    }, [paymentMethod])
    const menthodPayment = ([

        { id: 1, name: 'Credit Card', icon: '💳', desc: 'All cards accepted' },
        { id: 2, name: 'MoMo', icon: '📱', desc: 'Mobile payment' },
        { id: 3, name: 'VnPay', icon: '🏦', desc: 'Online banking' },
        { id: 4, name: 'Cash', icon: '💵', desc: 'Pay at location' }

    ])
    return (
        <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h3 className="text-xl font-bold text-gray-900">Payment Method</h3>
                    <p className="text-sm text-gray-500 mt-1">Select your preferred method</p>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-8">
                {menthodPayment.map((method) => (
                    <label
                        key={method.id}
                        className={`relative flex flex-col p-4 rounded-2xl border-2 cursor-pointer transition-all
                            ${paymentMethod === method.id
                                ? 'border-blue-500 bg-blue-50'
                                : 'border-gray-200 hover:border-blue-200'}`}
                    >
                        <input
                            type="radio"
                            name="paymentMethod"
                            value={method.id}
                            className="sr-only"
                            checked={paymentMethod === method.id}
                            onChange={() => setPaymentMethod(method.id)}
                        />
                        <span className="text-2xl mb-2">{method.icon}</span>
                        <span className="font-medium text-gray-900">{method.name}</span>
                        <span className="text-xs text-gray-500 mt-1">{method.desc}</span>
                        {paymentMethod === method.id && (
                            <div className="absolute top-2 right-2">
                                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                            </div>
                        )}
                    </label>
                ))}
            </div>

            {paymentMethod === 1 && (
                <div className="space-y-4 p-4 bg-gray-50 rounded-2xl mb-6">
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Card Number</label>
                        <input
                            type="text"
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="1234 5678 9012 3456"
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">Expiry Date</label>
                            <input
                                type="text"
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="MM/YY"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">CVV</label>
                            <input
                                type="text"
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="123"
                            />
                        </div>
                    </div>
                </div>
            )}

            <button onClick={handleNextStep}
                className="w-full py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-2xl font-medium shadow-lg hover:from-blue-600
          hover:to-blue-700 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={childrenVaccines.length === 0} >
                Payment
            </button>





        </div>
    )
}
export default MenthodPayment