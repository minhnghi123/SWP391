import React from 'react';

const UpcomingAppointments = () => {
    return (
        <div>
            <h5 className="font-semibold text-gray-900 mb-4">Upcoming Appointments</h5>
            <div className="bg-white rounded-xl p-4 border border-gray-200">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                    </div>
                    <div>
                        <h6 className="font-medium text-gray-900">Next Vaccination</h6>
                        <p className="text-sm text-gray-500">March 15, 2024 at 10:00 AM</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpcomingAppointments;