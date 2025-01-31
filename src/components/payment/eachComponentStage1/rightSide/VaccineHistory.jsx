import React from 'react';

const VaccinationHistory = () => {
    const vaccines = [
        {
            name: 'DTaP (Diphtheria, Tetanus, Pertussis)',
            date: '2023-12-15',
            status: 'Completed',
            nextDue: '2024-06-15'
        },
        {
            name: 'MMR (Measles, Mumps, Rubella)',
            date: '2024-01-20',
            status: 'Scheduled',
            nextDue: null
        },
        {
            name: 'Hepatitis B',
            date: null,
            status: 'Pending',
            nextDue: '2024-03-01'
        }
    ];

    return (
        <div>
            <h5 className="font-semibold text-gray-900 mb-4">Vaccination History</h5>
            <div className="space-y-3">
                {vaccines.map((vaccine, idx) => (
                    <div key={idx} className="bg-white rounded-xl p-4 border border-gray-200">
                        <div className="flex items-center justify-between mb-2">
                            <span className="font-medium text-gray-900">{vaccine.name}</span>
                            <span className={`px-3 py-1 rounded-full text-xs font-medium
                                ${vaccine.status === 'Completed' ? 'bg-green-100 text-green-700' :
                                    vaccine.status === 'Scheduled' ? 'bg-blue-100 text-blue-700' :
                                        'bg-yellow-100 text-yellow-700'}`}>
                                {vaccine.status}
                            </span>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                            {vaccine.date && (
                                <span className="flex items-center gap-1">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    Last: {vaccine.date}
                                </span>
                            )}
                            {vaccine.nextDue && (
                                <span className="flex items-center gap-1">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    Next due: {vaccine.nextDue}
                                </span>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default VaccinationHistory;