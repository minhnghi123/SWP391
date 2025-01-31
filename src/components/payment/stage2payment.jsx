import { useState, useContext, useMemo, useEffect } from 'react';
import { VaccineContext } from '../Context/ChildrenSelected';
import { NumberOfPeopleContext } from "../Context/NumberOfPeopleVacines";
import formatDecimal from '../../utils/calculateMoney';
import { useNavigate } from 'react-router-dom';
import ToUpperCaseWords from '../../utils/upperCaseFirstLetter'
import CalculateAge from "../../utils/calculateYearOld"
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
export default function Stage2Payment({ isopennextstep }) {

    const [paymentMethod, setPaymentMethod] = useState(1);
    const [isOpenDetail, setIsOpenDetail] = useState(false);

    const handleNextStep = () => {
        isopennextstep(3)
    }
    const [items, setItems] = useState([{
        name: "Consultation Fee",
        price: 100000,
        quantity: 1,
        total: 100000
    }, {
        name: "Consultation Sencond",
        price: 100000,
        quantity: 1,
        total: 100000
    }
    ]);

    const { handleRemoveVaccine } = useContext(VaccineContext);

    

    const [valueSelectVaccine, setSelectedVaccines] = useState(() => {
        return JSON.parse(localStorage.getItem('AddItems')) || [];
    });
    const [childrenVaccines, setChildrenVaccine] = useState(() => {
        return JSON.parse(localStorage.getItem('childrenSelectedvaccines')) || [];
    })
    const {handleRemmoveChildren,isIDChildren } = useContext(NumberOfPeopleContext);
    useEffect (()=>{
        setChildrenVaccine(JSON.parse(localStorage.getItem('childrenSelectedvaccines')) || [])
       
    },[isIDChildren])
   
    const CalculateTotal = useMemo(() => {
        const totalPrice = valueSelectVaccine.reduce((total, vaccine) => total + vaccine.price, 0);
        const total = childrenVaccines.length * totalPrice;
        return total;
    }, [valueSelectVaccine, childrenVaccines]);

console.log(isIDChildren)



    return (
        <div className='max-w-7xl mx-auto px-4 py-16'>
            <div className='flex flex-col lg:flex-row  gap-12'>

                <div className="w-full lg:w-[600px] space-y-8">
                    {/* Header Section */}
                    <div className="bg-gradient-to-r from-blue-600 to-indigo-500 rounded-3xl p-8 text-white shadow-lg">
                        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                            <div>
                                <h2 className="text-2xl font-bold">Children Vaccination</h2>
                                <p className="text-blue-100 text-sm">
                                    Review selected vaccines for {childrenVaccines.length} children
                                </p>
                            </div>
                            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-md">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                        d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/* Children List */}
                    {childrenVaccines.map((child, index) => (
                        <div key={index} className=" bg-white rounded-3xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300">
                            {/* Child Header */}

                            <div className="flex items-center justify-between mb-6">

                                <div className="flex items-center space-x-4">
                                    <div className={`p-3 rounded-full ${child.gender.toLowerCase() === 'male' ? 'bg-blue-50' : 'bg-pink-50'}`}>
                                        <span className="text-3xl">
                                            {child.gender.toLowerCase() === 'male' ? '👦' : '👧'}
                                        </span>
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-semibold text-gray-800 tracking-tight">
                                            {ToUpperCaseWords(child.name)}
                                        </h2>
                                        <p className="text-sm text-gray-500 mt-1">
                                            {CalculateAge(child.datOfBrith)} years old
                                        </p>
                                    </div>
                                </div>
                                <div className='flex flex-row gap-3 items-center'>
                                    <span className="px-4 py-2 bg-gradient-to-r from-blue-100 to-indigo-100 text-indigo-600 rounded-full text-sm font-semibold shadow-md transition-all duration-300">
                                        {valueSelectVaccine.length} {valueSelectVaccine.length === 1 ? 'Vaccine' : 'Vaccines'}
                                    </span>
                                    <div onClick={()=>handleRemmoveChildren(child.id)} className="hover:bg-gray-300 rounded-full p-2 transition-all duration-300 ease-in-out transform hover:scale-105 cursor-pointer">
                                        <DeleteOutlineOutlinedIcon className="w-5 h-5 text-gray-500 " />
                                    </div>

                                </div>


                            </div>

                            {/* Vaccine List */}
                            <div className="space-y-4">
                                {valueSelectVaccine.map((vaccine, idx) => (
                                    <div key={idx} className="flex justify-between items-center p-4 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-all">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                                                <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                            </div>
                                            <div>
                                                <p className="font-medium text-gray-900">{vaccine.name}</p>
                                                <p className="text-sm text-gray-500">Vaccine</p>
                                            </div>
                                        </div>
                                        <span className="text-lg font-semibold text-gray-900">
                                            {formatDecimal(vaccine.price)} VNĐ
                                        </span>
                                    </div>
                                ))}
                            </div>

                            {/* Child Total */}
                            <div className="flex justify-between items-center p-4 mt-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-100 shadow-sm">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
                                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="font-bold text-gray-900">Subtotal</p>
                                        <p className="text-sm text-gray-500">For {valueSelectVaccine.length === 1 ? 'vaccine' : 'vaccines'} </p>
                                    </div>
                                </div>
                                <span className="text-xl font-bold text-blue-600">
                                    {formatDecimal(valueSelectVaccine.reduce((total, v) => total + v.price, 0))} VNĐ
                                </span>
                            </div>
                        </div>
                    ))}
                </div>




                <div className="w-full lg:w-[600px] space-y-8  ">
                    {/* Summary Header Card */}
                    <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-3xl p-8 text-white">
                        <div className="flex items-center justify-between">
                            <div>
                                <h2 className="text-2xl font-bold mb-2">Payment Details</h2>
                                <p className="text-blue-100">Review your payment information</p>
                            </div>
                            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                        d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                                    />
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/* Payment Summary Card */}



                    <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100  hover:shadow-xl transition-all duration-300"
                    >
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                                    Payment Summary
                                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                    </svg>
                                </h3>
                                <p className="text-sm text-gray-500 mt-1">Click to view detailed breakdown</p>
                            </div>
                            <span className="px-4 py-1.5 bg-gradient-to-r from-green-50 to-emerald-50 text-emerald-600 rounded-full text-sm font-medium border border-emerald-100">
                                Due Today
                            </span>
                        </div>

                        <div className="space-y-4">
                            <div className="flex justify-between items-center p-5 bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl hover:shadow-sm transition-all">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                                        <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-900">Consultation Fee</p>
                                        <p className="text-sm text-gray-500">General checkup</p>
                                    </div>
                                </div>
                                <span className="text-lg font-semibold text-gray-900">$100.00</span>
                            </div>

                            <div className="flex justify-between items-center p-5 bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl hover:shadow-sm transition-all">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                                        <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-900">Service Fee</p>
                                        <p className="text-sm text-gray-500">Processing fee</p>
                                    </div>
                                </div>
                                <span className="text-lg font-semibold text-gray-900">$20.00</span>
                            </div>

                            <div className="flex justify-between items-center p-5 mt-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-100">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center">
                                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="font-bold text-gray-900">Total Amount</p>
                                        <p className="text-sm text-gray-500">Including all fees</p>
                                    </div>
                                </div>
                                <span className="text-2xl font-bold text-blue-600">{formatDecimal(CalculateTotal)} {''} VNĐ</span>
                            </div>
                        </div>
                    </div>





                    {/* Payment Method Card */}
                    <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100">
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <h3 className="text-xl font-bold text-gray-900">Payment Method</h3>
                                <p className="text-sm text-gray-500 mt-1">Select your preferred method</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mb-8">
                            {[
                                { id: 1, name: 'Credit Card', icon: '💳', desc: 'All cards accepted' },
                                { id: 2, name: 'MoMo', icon: '📱', desc: 'Mobile payment' },
                                { id: 3, name: 'VnPay', icon: '🏦', desc: 'Online banking' },
                                { id: 4, name: 'Cash', icon: '💵', desc: 'Pay at location' }
                            ].map((method) => (
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

                        <button onClick={handleNextStep} className="w-full py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-2xl font-medium shadow-lg hover:from-blue-600
                     hover:to-blue-700 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={childrenVaccines.length === 0} >
                            {formatDecimal(CalculateTotal)} {''} VNĐ
                        </button>





                    </div>
                </div>
            </div>
        </div>



    )
}