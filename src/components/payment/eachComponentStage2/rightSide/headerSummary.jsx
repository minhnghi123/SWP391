import React from 'react';

const SummaryHeaderCard = () => (
    <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-3xl p-8 text-white">
        <div className="flex items-center justify-between">
            <div>
                <h2 className="text-2xl font-bold mb-2">Payment Details</h2>
                <p className="text-blue-100">Review your payment information</p>
            </div>
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                        d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
            </div>
        </div>
    </div>
);

export default SummaryHeaderCard;