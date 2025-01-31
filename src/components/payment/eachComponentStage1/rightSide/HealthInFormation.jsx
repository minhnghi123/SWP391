import React from 'react';
import ToUpperCaseWords from '../../../../utils/upperCaseFirstLetter'
const HealthInformation = ({ child }) => {
    return (
        <div>
            <h5 className="font-semibold text-gray-900 mb-4">Information Details</h5>
            <div className="bg-white rounded-xl p-4 border border-gray-200">
                <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-1">
                        <span className="text-sm text-gray-500">Full Name</span>
                        <p className="font-medium text-gray-900">{child.name}</p>
                    </div>

                    <div className="space-y-1">
                        <span className="text-sm text-gray-500">Date of Birth</span>
                        <p className="font-medium text-gray-900">
                            {new Date(child.datOfBrith).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            })}
                        </p>
                    </div>

                    <div className="space-y-1">
                        <span className="text-sm text-gray-500">Gender</span>
                        <p className="font-medium text-gray-900 flex items-center gap-2">
                            {child.gender}
                            <span className={`inline-block w-2 h-2 rounded-full ${child.gender.toLowerCase() === 'male'
                                ? 'bg-blue-400'
                                : 'bg-pink-400'
                                }`} />
                        </p>
                    </div>

                    <div className="space-y-1">
                        <span className="text-sm text-gray-500">Special Medical Attention</span>
                        <p className={`font-medium ${child.advistory
                            ? 'text-amber-600'
                            : 'text-green-600'
                            }`}>
                            {child.advistory ? 'Required' : 'Not Required'}
                        </p>
                    </div>
                </div>

                {child.advistory && (
                    <div className="mt-4 pt-4 border-t border-gray-100">
                        <span className="text-sm text-gray-500">Medical Notes</span>
                        <p className="mt-1 text-red-500 ">{ToUpperCaseWords(child.advistory)}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default HealthInformation;