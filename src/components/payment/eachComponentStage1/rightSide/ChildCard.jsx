import React, { useState } from "react";
import { FaChild, FaMars, FaVenus, FaCalendarAlt, FaChevronDown, FaChevronUp, FaHeartbeat, FaHistory  } from "react-icons/fa";
import { MdFamilyRestroom } from "react-icons/md";
import CalculateAge from '../../../../utils/calculateYearOld'
import ToUperCaseFirstLetter from '../../../../utils/upperCaseFirstLetter'

const ChildInfoCard = ({ child, handleRemove,parentName}) => {
    const [isExpanded, setIsExpanded] = useState(false);
    return (
        <div className="max-w-2xl mx-auto p-4">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300">
                <div className="bg-gradient-to-r from-blue-100 to-purple-100 p-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <div className="w-16 h-16 rounded-full object-cover border-4 border-white shadow-md flex items-center justify-center text-4xl">
                                {ToUperCaseFirstLetter(child?.gender) === 'Male' ? '👦' : '👧'}
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-gray-800">{child.name}</h2>
                                <div className="flex items-center space-x-2 text-gray-600">
                                    {ToUperCaseFirstLetter(child?.gender) === "Male" ? (
                                        <FaMars className="text-blue-500 text-2xl" /> 
                                    ) : (
                                        <FaVenus className="text-pink-500 text-2xl" /> 
                                    )}
                                    <span>{CalculateAge(child.dateOfBirth)} years old</span>
                                </div>

                                {/* Status and Creation Date */}
                                <div className="mt-1 text-sm">
                                    <span className={`px-2 py-1 rounded-full ${child.status === "Good" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}`}>
                                        {child.status}
                                    </span>
                                    <span className="ml-2 text-gray-600">Created: {child.createDate}</span>
                                </div>
                            </div>
                        </div>

                        <button
                            onClick={() => setIsExpanded(!isExpanded)}
                            className="text-gray-600 hover:text-gray-800 transition-colors"
                        >
                            {isExpanded ? <FaChevronUp size={24} /> : <FaChevronDown size={24} />}
                        </button>
                    </div>
                </div>
                {isExpanded && (
                    <div className="p-6 space-y-6 bg-gray-50">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-white p-5 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
                                <div className="flex items-center space-x-2 mb-4">
                                    <FaChild className="text-blue-500 text-xl" />
                                    <h3 className="font-semibold text-gray-800 text-lg ">Basic Information</h3>
                                </div>
                                <div className="space-y-3">
                                    <div className="flex items-center space-x-2 text-gray-700">
                                        <MdFamilyRestroom/>
                                        <span className="font-medium">Parent Name:</span>
                                        <span className="">{parentName}</span>
                                    </div>
                                    <div className="flex items-center space-x-2 text-gray-700">
                                        <FaCalendarAlt className="text-blue-400" />
                                        <span className="font-medium">Birth Date:</span>
                                        <span>{child.dateOfBirth}</span>
                                    </div>
                                    <div className="flex items-center space-x-2 text-gray-700">
                                        {child.gender === "Male" ?
                                            <FaMars className="text-blue-400" /> :
                                            <FaVenus className="text-pink-400" />}
                                        <span className="font-medium">Gender:</span>
                                        <span>{child.gender}</span>
                                    </div>
                                    <div className="flex items-center space-x-2 text-gray-700">
                                        <FaHeartbeat className="text-green-400" />
                                        <span className="font-medium">Status:</span>
                                        <span className={`px-2 py-1 rounded-full text-sm ${child.status === "Good" ? "bg-green-100 text-green-800" : "bg-gray-100 text-red-500"}`}>
                                            {child.status}
                                        </span>
                                    </div>
                                    <div className="flex items-center space-x-2 text-gray-700">
                                        <FaCalendarAlt className="text-purple-400" />
                                        <span className="font-medium">Created:</span>
                                        <span>{new Date(child.createDate).toLocaleDateString()}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white p-5 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
                                <div className="flex items-center space-x-2 mb-4">
                                    <FaHistory className="text-purple-500 text-xl" />
                                    <h3 className="font-semibold text-gray-800 text-lg">History</h3>
                                </div>
                                <div className="space-y-4">
                                    <div className="border-l-2 border-purple-200 pl-4 space-y-3">
                                        <div className="relative">
                                            <div className="absolute -left-5 top-1 w-3 h-3 bg-purple-400 rounded-full"></div>
                                            <div className="text-sm">
                                                <p className="text-gray-700 font-medium">Checkup Appointment</p>
                                                <p className="text-gray-500">February 15, 2024</p>
                                                <p className="text-gray-600 mt-1">Regular health checkup completed</p>
                                            </div>
                                        </div>
                                        <div className="relative">
                                            <div className="absolute -left-5 top-1 w-3 h-3 bg-purple-400 rounded-full"></div>
                                            <div className="text-sm">
                                                <p className="text-gray-700 font-medium">Vaccination</p>
                                                <p className="text-gray-500">January 10, 2024</p>
                                                <p className="text-gray-600 mt-1">Routine vaccination administered</p>
                                            </div>
                                        </div>
                                        <div className="relative">
                                            <div className="absolute -left-5 top-1 w-3 h-3 bg-purple-400 rounded-full"></div>
                                            <div className="text-sm">
                                                <p className="text-gray-700 font-medium">Initial Registration</p>
                                                <p className="text-gray-500">{new Date(child.createDate).toLocaleDateString()}</p>
                                                <p className="text-gray-600 mt-1">Child profile created</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ChildInfoCard;