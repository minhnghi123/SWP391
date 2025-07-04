import { useSelector } from 'react-redux';
import formatDecimal from '../../../../utils/calculateMoney';
import formatDate from '../../../../utils/Date';
import { memo } from 'react';
const SummaryCard = ({ CalculateTotal }) => {
    const advitory_detail = useSelector((state) => state.children.advitory_detail);
    const arriveDate = useSelector((state) => state.children.arriveDate);
    return (
        <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between mb-8">
                <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">Payment Summary</h3>
                <span className="px-4 py-1.5 bg-gradient-to-r from-green-50 to-emerald-50 text-emerald-600 rounded-full text-sm font-medium border border-emerald-100">
                    Due Today
                </span>
            </div>

            <div className="space-y-4">
                {/* Consultation Fee */}
                <div className="flex justify-between items-center p-5 bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl hover:shadow-md transition-all">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                            </svg>
                        </div>
                        <div>
                            <p className="font-medium text-gray-900">Arrive Date</p>
                            <p className="text-sm text-gray-500">Notice to arrive at the hospital</p>
                        </div>
                    </div>
                    <span className="text-lg font-semibold text-gray-900">
                        {formatDate(arriveDate)}
                    </span>
                </div>

                {/* Service Fee */}
                <div className="flex justify-between items-center p-5 bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl hover:shadow-md transition-all" >
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                            <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <div>
                            <p className="font-medium text-gray-900">Advitory Detail</p>
                            <p className="text-sm text-gray-500">Your advitory detail</p>
                        </div>
                    </div>
                    <span className="text-lg font-semibold text-gray-900">
                        {advitory_detail ? advitory_detail : 'No advitory detail'}
                    </span>
                </div>

                {/* Total Amount */}
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
                    <span className="text-2xl font-bold text-blue-600">
                        {formatDecimal(CalculateTotal)} VNĐ
                    </span>
                </div>
            </div>
        </div>
    );
};

export default memo(SummaryCard);
