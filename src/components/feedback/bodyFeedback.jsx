import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSyringe, FaShieldVirus, FaChartLine, FaStar } from 'react-icons/fa';
import { ToastContainer } from "react-toastify";
import FormFeedback from './formFeedback';
import FeedbackParent from '../home/FeedbackParent';
import { FeedbackContext } from '../Context/FeedbackContext';
import useAxios from '@/utils/useAxios';
import Pagination from '../../utils/pagination'; // Import Pagination component

const url = import.meta.env.VITE_BASE_URL_DB;

const BodyFeedback = () => {
    const navigate = useNavigate();
    const {
        feedback,
        setFeedback,
        inputData,
        currentValue,
        hoverValue,
        handleSubmit,
        handleOnChange,
        handleClick,
        handleMouseLeave,
        handleMouseOver
    } = useContext(FeedbackContext);

    const [sorted, setSorted] = useState([]);
    const [activeFilter, setActiveFilter] = useState(0);
    const [user, setUser] = useState();
    const api = useAxios();

    // Pagination states
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5); // Mặc định 5 feedback mỗi trang

    // Tính toán totalPages và danh sách feedback hiển thị trên trang hiện tại
    const totalItems = sorted.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentFeedbacks = sorted.slice(indexOfFirstItem, indexOfLastItem);

    // Fetch feedback data when component mounts
    useEffect(() => {
        const fetchFeedbackData = async () => {
            try {
                const resUser = await api.get(`${url}/User/get-all-user`);
                if (resUser.status === 200) {
                    setUser(resUser.data);
                }
            } catch (error) {
                console.error("Failed to fetch feedback data:", error);
            }
        };

        fetchFeedbackData();
    }, []);

    // Update sorted data whenever feedback changes
    useEffect(() => {
        if (Array.isArray(feedback) && feedback.length > 0) {
            const sortedByDate = [...feedback].sort((a, b) => (b.id - a.id));
            setSorted(sortedByDate);
            setCurrentPage(1); // Reset về trang 1 khi feedback thay đổi
        }
    }, [feedback]);

    const handleSortRating = (rating) => {
        setActiveFilter(rating);
        setCurrentPage(1); // Reset về trang 1 khi thay đổi bộ lọc

        if (!Array.isArray(feedback) || feedback.length === 0) {
            setSorted([]);
            return;
        }

        let newSorted;
        if (rating === 0) {
            newSorted = [...feedback].sort((a, b) => (b.id - a.id));
        } else {
            newSorted = [...feedback].filter(item => Number(item.ratingScore) === rating);
        }

        setSorted(newSorted);
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-50">
            {/* <ToastContainer /> */}

            {/* Header Banner */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                        <div>
                            <h1 className="text-2xl sm:text-3xl font-bold mb-2">Vaccine Tracking Feedback</h1>
                            <p className="text-blue-100 text-sm sm:text-base">Help us improve your vaccination experience</p>
                        </div>
                        <button
                            onClick={() => navigate(-1)}
                            className="px-4 sm:px-6 py-2 bg-white text-blue-800 rounded-lg hover:bg-blue-50 transition-colors duration-200 font-semibold text-sm sm:text-base"
                        >
                            Back to Dashboard
                        </button>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Feature Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-12 md:mb-16">
                    <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                        <div className="flex items-center justify-center w-12 h-12 md:w-16 md:h-16 mx-auto mb-4 md:mb-6 bg-blue-100 rounded-full">
                            <FaSyringe className="w-6 h-6 md:w-8 md:h-8 text-blue-600" />
                        </div>
                        <h3 className="text-lg md:text-xl font-bold text-center text-gray-800 mb-3">Vaccination Process</h3>
                        <p className="text-gray-600 text-center text-sm md:text-base">Share your experience with our vaccination services and procedures</p>
                    </div>

                    <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                        <div className="flex items-center justify-center w-12 h-12 md:w-16 md:h-16 mx-auto mb-4 md:mb-6 bg-green-100 rounded-full">
                            <FaShieldVirus className="w-6 h-6 md:w-8 md:h-8 text-green-600" />
                        </div>
                        <h3 className="text-lg md:text-xl font-bold text-center text-gray-800 mb-3">Safety Measures</h3>
                        <p className="text-gray-600 text-center text-sm md:text-base">Rate our health and safety protocols during your visit</p>
                    </div>

                    <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                        <div className="flex items-center justify-center w-12 h-12 md:w-16 md:h-16 mx-auto mb-4 md:mb-6 bg-indigo-100 rounded-full">
                            <FaChartLine className="w-6 h-6 md:w-8 md:h-8 text-indigo-600" />
                        </div>
                        <h3 className="text-lg md:text-xl font-bold text-center text-gray-800 mb-3">Tracking System</h3>
                        <p className="text-gray-600 text-center text-sm md:text-base">Evaluate our vaccine tracking and monitoring system</p>
                    </div>
                </div>

                {/* Feedback Form Section */}
                <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 mb-12 md:mb-16">
                    <FormFeedback
                        inputData={inputData}
                        handleClick={handleClick}
                        handleMouseLeave={handleMouseLeave}
                        handleMouseOver={handleMouseOver}
                        handleOnChange={handleOnChange}
                        handleSubmit={handleSubmit}
                        currentValue={currentValue}
                        hoverValue={hoverValue}
                    />
                </div>

                {/* Community Feedback Section */}
                <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 mb-12 md:mb-16">
                    <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-6">Community Insights</h2>

                    {/* Rating Filters */}
                    <div className="flex gap-3 md:gap-4 overflow-x-auto pb-4 mb-6 md:mb-8">
                        <button
                            onClick={() => handleSortRating(0)}
                            className={`px-4 md:px-6 py-2 md:py-3 rounded-lg whitespace-nowrap transition-all duration-200 text-sm md:text-base
                                ${activeFilter === 0
                                    ? 'bg-blue-600 text-white shadow-md'
                                    : 'bg-gray-50 text-gray-700 hover:bg-gray-100'}`}
                        >
                            All Feedback
                        </button>
                        {[5, 4, 3, 2, 1].map((rating) => (
                            <button
                                key={rating}
                                onClick={() => handleSortRating(rating)}
                                className={`px-4 md:px-6 py-2 md:py-3 rounded-lg flex items-center gap-2 whitespace-nowrap transition-all duration-200 text-sm md:text-base
                                    ${activeFilter === rating
                                        ? 'bg-blue-600 text-white shadow-md'
                                        : 'bg-gray-50 text-gray-700 hover:bg-gray-100'}`}
                            >
                                {rating} <FaStar className={activeFilter === rating ? 'text-white' : 'text-yellow-400'} />
                            </button>
                        ))}
                    </div>

                    {/* Feedback Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                        {Array.isArray(currentFeedbacks) && currentFeedbacks.length > 0 ? (
                            currentFeedbacks.map((eachFeedback) => (
                                <FeedbackParent
                                    key={eachFeedback.id}
                                    image={user && user.find ? user.find(u => u.id === eachFeedback.userId)?.avatar : 'Unknown'}
                                    randomNumber={eachFeedback.ratingScore}
                                    description={eachFeedback.description}
                                    username={user && user.find ? user.find(u => u.id === eachFeedback.userId)?.name : 'Unknown'}
                                />
                            ))
                        ) : (
                            <div className="col-span-full py-12 text-center">
                                <p className="text-gray-500 text-base md:text-lg">No feedback available for this rating yet.</p>
                            </div>
                        )}
                    </div>

                    {/* Pagination */}
                    {Array.isArray(sorted) && sorted.length > 0 && (
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            itemsPerPage={itemsPerPage}
                            setCurrentPage={setCurrentPage}
                            setItemsPerPage={setItemsPerPage}
                            totalItems={totalItems}
                        />
                    )}
                </div>

                {/* Privacy Notice */}
                <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-6 md:p-8 text-center text-white">
                    <h3 className="text-xl md:text-2xl font-bold mb-4">
                        Your Privacy & Security
                    </h3>
                    <p className="text-blue-100 max-w-2xl mx-auto text-sm md:text-base">
                        Your feedback helps us maintain and improve our vaccine tracking system.
                        All information shared is protected and used exclusively for enhancing our services.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default BodyFeedback;