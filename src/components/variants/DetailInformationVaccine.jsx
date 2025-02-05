import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { fetchData } from '../../Api/axios';
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined';
const Detail = () => {
    const { idVaccine, type } = useParams();
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [vaccine, setVaccine] = useState(null);

    useEffect(() => {
        fetchData(`${type}/${idVaccine}`)
            .then((res) => setVaccine(res.data))
            .catch((err) => setError(err));
    }, [idVaccine]);

    if (error) {
        return <div className="text-red-500 text-center mt-10">Error: {error.message}</div>;
    }

    if (!vaccine) {
        return <div className="text-center mt-10">Loading...</div>;
    }

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-xl rounded-2xl mt-10 border border-gray-100">
            {/* Header Section */}
            <div className="flex justify-between items-start mb-8">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center text-blue-600 hover:text-blue-700 transition-colors group"
                >
                    <ArrowBackIosNewOutlinedIcon className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
                    <span className="font-medium">Back to Vaccines List</span>
                </button>
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                    {vaccine.status || 'Standard Vaccine'}
                </span>
            </div>

            {/* Main Content */}
            <div className="flex flex-col md:flex-row gap-8">
                {/* Vaccine Image */}
                <div className="md:w-1/3">
                    <div className="relative bg-gray-50 rounded-xl p-4 border border-gray-200">
                        <img
                            src={vaccine.image}
                            alt={vaccine.name}
                            className="w-full h-64 object-contain rounded-lg"
                            onError={(e) => e.target.src = '/vaccine-placeholder.svg'}
                        />
                        <div className="mt-4 text-center">
                            <span className="text-sm text-gray-500">Lot Number: {idVaccine}</span>
                        </div>
                    </div>
                </div>

                {/* Vaccine Details */}
                <div className="md:w-2/3 space-y-6">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">{vaccine.name}</h1>
                        <div className="flex items-center gap-3 text-sm text-gray-500">
                            <span>Manufacturer: {vaccine.manufacturer}</span>
                            <span className="h-1 w-1 bg-gray-400 rounded-full"></span>
                            <span>Approved for ages {vaccine.recommendedAge}</span>
                        </div>
                    </div>

                    {/* Key Information Grid */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 bg-blue-50 rounded-lg">
                            <h3 className="text-sm font-medium text-blue-800 mb-1">Next Due Date</h3>
                            <p className="text-lg font-semibold text-gray-900">
                                {vaccine.nextDoseDate || 'Not scheduled'}
                            </p>
                        </div>
                        <div className="p-4 bg-orange-50 rounded-lg">
                            <h3 className="text-sm font-medium text-orange-800 mb-1">Doses Required</h3>
                            <p className="text-lg font-semibold text-gray-900">
                                {vaccine.totalDoses} doses
                            </p>
                        </div>
                    </div>

                    {/* Progress Timeline */}
                    <div className="border-t border-gray-200 pt-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Vaccination Schedule</h3>
                        <div className="space-y-4">
                            {vaccine.doseSchedule?.map((dose, index) => (
                                <div key={index} className="flex items-center gap-4">
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center 
                                    ${dose.completed ? 'bg-green-500' : 'bg-gray-200'}`}>
                                        <CheckIcon className="w-4 h-4 text-white" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-medium text-gray-900">Dose {index + 1}</p>
                                        <p className="text-sm text-gray-500">
                                            {dose.completed
                                                ? `Administered on ${dose.date}`
                                                : `Recommended at ${dose.recommendedAge}`
                                            }
                                        </p>
                                    </div>
                                    {!dose.completed && (
                                        <button className="px-3 py-1.5 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700">
                                            Schedule Now
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Important Notes */}
                    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-lg">
                        <h3 className="text-sm font-medium text-yellow-800 mb-2">Important Notes</h3>
                        <ul className="list-disc pl-5 space-y-1 text-sm text-yellow-700">
                            <li>Required for school enrollment</li>
                            <li>Common side effects: Mild fever, soreness at injection site</li>
                            <li>Minimum 4-week interval between doses</li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Footer Actions */}
            <div className="mt-8 pt-6 border-t border-gray-200 flex justify-end gap-3">
                <button className="px-5 py-2.5 border border-gray-300 rounded-lg font-medium hover:bg-gray-50">
                    Print Record
                </button>
                <button className="px-5 py-2.5 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700">
                    Mark as Administered
                </button>
            </div>
        </div>
    );
};

export default Detail;
