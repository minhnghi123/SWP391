import React, { useState } from "react";
import { FaChild, FaMars, FaVenus, FaCalendarAlt, FaChevronDown, FaChevronUp, FaHeartbeat, FaHistory, FaTrashAlt } from "react-icons/fa";
import { MdFamilyRestroom } from "react-icons/md";
import CalculateAge from '../../../../utils/calculateYearOld'
import ToUperCaseFirstLetter from '../../../../utils/upperCaseFirstLetter'
import { useDispatch, useSelector } from "react-redux";
import { fetchHistoryTracking, fetchBooking } from "../../../redux/actions/historyTracking";
import FormDate from '../../../../utils/Date'
import { useEffect } from "react";
import useAxios from "@/utils/useAxios";
import formatDate from "../../../../utils/Date";
import { FaSpinner } from "react-icons/fa";
const ChildInfoCard = ({ child, handleRemove, parentName, isVaccineSuitableForAnyChild, isComboSuitableForAnyChild }) => {

    // Add a warning message if the child is not suitable for any vaccine or combo

    const api = useAxios()
    const [isExpanded, setIsExpanded] = useState(false);
    const isVaccineSuitable = isVaccineSuitableForAnyChild(child);
    const isComboSuitable = isComboSuitableForAnyChild(child);
    const dispatch = useDispatch();
    const historyTracking = useSelector((state) => state.historyTracking.historyTracking);
    const booking = useSelector((state) => state.historyTracking.booking);
    const error = useSelector((state) => state.historyTracking.error);
    const loading = useSelector((state) => state.historyTracking.loading);
    const [vaccineChains, setVaccineChains] = useState([]);

    const createVaccineChains = (data) => {
        if (!data || data.length === 0) return [];

        const headers = data.filter(item => item.previousVaccination === 0);

        return headers.map(header => {
            let chain = [header];
            let currentId = header.trackingID;

            while (currentId) {
                const next = data.find(item => item.previousVaccination === currentId);
                if (!next) break;
                chain.push(next);
                currentId = next.trackingID;
            }
            return chain;
        });
    };

    useEffect(() => {
        if (!child.parentID) return;  // Prevents API call if parentID is missing
        dispatch(fetchHistoryTracking(api, child.parentID));
        dispatch(fetchBooking(api, child.parentID));
    }, [dispatch, child.parentID]);

    useEffect(() => {
        if (!historyTracking) return;
        const vaccineChains = createVaccineChains(historyTracking);
        setVaccineChains(vaccineChains);
    }, [historyTracking]);

    const totalVaccine = vaccineChains.filter(chain =>
        chain.every(item => item.status?.toLowerCase() === "success" && item.childId === child.id)
    ).length;

    const totalTracking = vaccineChains.filter(chain =>
        chain.some(item => ["schedule", "waiting"].includes(item.status?.toLowerCase()) && item.childId === child.id)
    ).length;
    const totalBooking = booking
        .filter(item => item.childrenList.some(childItem => childItem.childId === child.id))
        .length;
    // console.log(totalBooking)
    const lastBooking = booking
        .filter(item => item.childrenList.some(childItem => childItem.childId === child.id))
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))[0]; // Latest booking

    const isSuitableForVaccination = isVaccineSuitable || isComboSuitable;
    const mostRecentVaccinationDate = historyTracking.filter(item => item.childId === child.id && item.status.toLowerCase() === "success").sort((a, b) => new Date(b.vaccinationDate) - new Date(a.vaccinationDate))[0]?.vaccinationDate;
    const nextVaccinationDate = historyTracking.filter(item => item.childId === child.id && ["schedule", "waiting"].includes(item.status?.toLowerCase())).sort((a, b) => new Date(b.vaccinationDate) - new Date(a.vaccinationDate))[0]?.vaccinationDate;
    return (
        <div className="max-w-2xl mx-auto p-4">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300">
                <div className={`${child.status.toLowerCase() === "active" ? 'bg-gradient-to-r from-blue-50 via-white to-blue-50' : 'bg-gradient-to-r from-red-50 via-white to-orange-100'} p-4`}>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <div className="w-16 h-16 rounded-full object-cover border-4 border-white shadow-md flex items-center justify-center text-4xl">
                                {child?.gender === 0 ? '👦' : '👧'}
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-gray-800">{ToUperCaseFirstLetter(child.name)}</h2>
                                <div className="flex items-center space-x-2 text-gray-600">
                                    {child?.gender === 0 ? (
                                        <FaMars className="text-blue-500 text-2xl" />
                                    ) : (
                                        <FaVenus className="text-pink-500 text-2xl" />
                                    )}
                                    <span>{CalculateAge(child.dateOfBirth)} </span>
                                </div>

                                {/* Status and Creation Date */}
                                <div className="mt-1 text-sm">
                                    <span className={`px-2 py-1 rounded-full ${child.status === "Good" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}`}>
                                        {child.status}
                                    </span>
                                    <span className="ml-2 text-gray-600">Created: {FormDate(child.createdAt)}</span>
                                </div>

                                {/* Add warning if child is not suitable */}
                                {!isSuitableForVaccination && (
                                    <div className="mt-1">
                                        <span className="text-red-500 text-sm font-medium">
                                            Not eligible for available vaccines
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="flex items-center space-x-2">
                            <button
                                onClick={() => handleRemove(child.id)}
                                className="text-red-500 hover:text-red-700 transition-colors p-2 rounded-full hover:bg-red-100"
                                aria-label="Remove child"
                            >
                                <FaTrashAlt size={20} />
                            </button>
                            <button
                                onClick={() => setIsExpanded(!isExpanded)}
                                className="text-gray-600 hover:text-gray-800 transition-colors p-2 rounded-full hover:bg-gray-100"
                                aria-label={isExpanded ? "Collapse details" : "Expand details"}
                            >
                                {isExpanded ? <FaChevronUp size={20} /> : <FaChevronDown size={20} />}
                            </button>
                        </div>
                    </div>
                </div>
                {isExpanded && (
                    <div className="p-4 space-y-4 bg-gray-50">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-white p-5 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
                                <div className="flex items-center space-x-2 mb-4">
                                    <FaChild className="text-blue-500 text-xl" />
                                    <h3 className="font-semibold text-gray-800 text-lg ">Basic Information</h3>
                                </div>
                                <div className="space-y-3">
                                    <div className="flex items-center space-x-2 text-gray-700">
                                        <MdFamilyRestroom />
                                        <span className="font-medium">Parent Name:</span>
                                        <span className="">{ToUperCaseFirstLetter(parentName)}</span>
                                    </div>
                                    <div className="flex items-center space-x-2 text-gray-700">
                                        <FaCalendarAlt className="text-blue-400" />
                                        <span className="font-medium">Birth Date:</span>
                                        <span>{FormDate(child.dateOfBirth)}</span>
                                    </div>
                                    <div className="flex items-center space-x-2 text-gray-700">
                                        {child.gender === 0 ? (
                                            <FaMars className="text-blue-400" />
                                        ) : (
                                            <FaVenus className="text-pink-400" />
                                        )}
                                        <span className="font-medium">Gender:</span>
                                        <span className={child.gender === 0 ? "text-blue-600" : "text-pink-600"}>
                                            {child.gender === 0 ? "Male" : "Female"}
                                        </span>
                                    </div>

                                    <div className="flex items-center space-x-2 text-gray-700">
                                        <FaHeartbeat className="text-green-400" />
                                        <span className="font-medium">Status:</span>
                                        <span className={`px-2 py-1 rounded-full text-sm ${child.status.toLocaleLowerCase() === "active" ? "bg-green-100 text-green-800" : "bg-amber-100 text-amber-800"}`}>
                                            {child.status}
                                        </span>
                                    </div>
                                    <div className="flex items-center space-x-2 text-gray-700">
                                        <FaCalendarAlt className="text-purple-400" />
                                        <span className="font-medium">Created:</span>
                                        <span>{FormDate(child.createdAt)}</span>
                                    </div>
                                </div>
                            </div>
                            {
                                loading ? (
                                    <div className="bg-white p-5 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
                                        <div className="flex items-center space-x-2 mb-4">
                                            <FaSpinner className="text-blue-500 text-xl" />
                                        </div>
                                    </div>
                                ) :
                                    error ? (
                                        <div className="bg-white p-5 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
                                            <div className="flex items-center space-x-2 mb-4">
                                                <FaSpinner className="text-blue-500 text-xl" />
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="bg-white p-5 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
                                            <div className="flex items-center space-x-2 mb-4">
                                                <FaHistory className="text-purple-500 text-xl" />
                                                <h3 className="font-semibold text-gray-800 text-lg">History Tracking</h3>
                                            </div>
                                            <div className="space-y-4">
                                                <div className="border-l-2 border-purple-200 pl-4 space-y-3">
                                                    <div className="relative">
                                                        <div className="absolute -left-[23px] top-1 w-3 h-3 bg-purple-400 rounded-full"></div>
                                                        <div className="text-sm">

                                                            {
                                                                totalVaccine > 0 ? (
                                                                    <>
                                                                        <p className="text-gray-700 font-medium"> Completed Vaccine:{totalVaccine}{` `} does</p>
                                                                        <p className="text-gray-500">{formatDate(mostRecentVaccinationDate)}</p>
                                                                        <p className="text-gray-600 mt-1">Most Recent Vaccine</p>
                                                                    </>
                                                                ) : (
                                                                    <p className="text-gray-500">No completed vaccine</p>
                                                                )
                                                            }
                                                        </div>
                                                    </div>
                                                    <div className="relative">
                                                        <div className="absolute -left-[23px] top-1 w-3 h-3 bg-purple-400 rounded-full"></div>
                                                        <div className="text-sm">
                                                            {
                                                                totalTracking > 0 ? (
                                                                    <>
                                                                        <p className="text-gray-700 font-medium">Tracking:{totalTracking}{` `} does</p>
                                                                        <p className="text-gray-500"> Next Vaccine: {formatDate(nextVaccinationDate)}</p>
                                                                        <p className="text-gray-600 mt-1">Vaccination Progress</p>
                                                                    </>
                                                                ) : (
                                                                    <p className="text-gray-500">No tracking</p>
                                                                )
                                                            }
                                                        </div>
                                                    </div>
                                                    <div className="relative">
                                                        <div className="absolute -left-[23px] top-1 w-3 h-3 bg-purple-400 rounded-full"></div>
                                                        <div className="text-sm">
                                                            {
                                                                totalBooking > 0 ? (
                                                                    <>
                                                                        <p className="text-gray-700 font-medium">Booking Appointment</p>
                                                                        <p className="text-gray-500">{formatDate(lastBooking.arrivedAt)}</p>
                                                                        <p className="text-gray-600 mt-1">Last Booking Date</p>
                                                                    </>
                                                                ) : (
                                                                    <p className="text-gray-500">No booking</p>
                                                                )
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                            }
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ChildInfoCard;