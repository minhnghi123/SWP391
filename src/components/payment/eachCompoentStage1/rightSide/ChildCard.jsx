import React from 'react';
import VaccinationHistory from './VaccineHistory';
import HealthInformation from './HealthInFormation';
import UpcomingAppointments from './UpComingAppointments';
import CalculateAge  from '../../../../utils/calculateYearOld'
const ChildCard = ({ child, handleChoose }) => {
    return (
        <div className="bg-gray-50 rounded-2xl overflow-hidden border border-gray-200">
            {/* Child Header with Photo */}
            <div className="bg-gradient-to-r from-teal-500 to-teal-600 p-6 text-white">
                <div className="flex items-center gap-4">
                    <div className="w-20 h-20 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-4xl">
                        {child.gender.toLowerCase() === 'male' ? '👦' : '👧'}
                    </div>
                    <div className="flex-1">
                        <h4 className="text-2xl font-bold">{child.name}</h4>
                        <div className="flex items-center gap-4 mt-2">
                            <span className="flex items-center gap-1">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                        d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.701 2.701 0 00-1.5-.454M9 6v2m3-2v2m3-2v2M9 3h.01M12 3h.01M15 3h.01M21 21v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7h18zm-3-9v-2a2 2 0 00-2-2H8a2 2 0 00-2 2v2h12z" />
                                </svg>
                                {CalculateAge(child.datOfBrith)} years old
                            </span>
                            <span className="flex items-center gap-1">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                                {child.gender}
                            </span>
                        </div>
                    </div>
                    <button
                        onClick={() => handleChoose(child)}
                        className="p-2 hover:bg-white/10 rounded-xl transition-all"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Medical Information */}
            <div className="p-6 space-y-6">
                <VaccinationHistory />
                <HealthInformation child={child} />
                <UpcomingAppointments />
            </div>
        </div>
    );
};

export default ChildCard;