import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSyringe, FaShieldVirus, FaChartLine, FaStar } from 'react-icons/fa';
import { ToastContainer } from "react-toastify";
import FormFeedback from './formFeedback';
import FeedbackParent from '../home/FeedbackParent';
import { FeedbackContext } from '../Context/FeedbackContext';
import { fetchData } from '../../Api/axios';
const BodyFeedback = () => {
    const navigate = useNavigate();
    const {
        feedback,
        inputData,
        currentValue,
        hoverValue,
        handleSubmit,
        handleOnChange,
        handleClick,
        handleMouseLeave,
        handleMouseOver
    } = useContext(FeedbackContext);

    const [sorted, setSorted] = useState(feedback);
    const [activeFilter, setActiveFilter] = useState(0);

    useEffect(() => {
        setSorted(feedback.sort((a, b) => (b.id - a.id)));
    }, [feedback]);

    const handleSortRating = (rating) => {
        setActiveFilter(rating);
        let newSorted;
        if (rating === 0) {
            newSorted = [...feedback].sort((a, b) => (b.id - a.id));
        } else {
            newSorted = feedback.filter(item => item.starRating === rating);
        }
        setSorted(newSorted);
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-50">
            <ToastContainer />
            
            {/* Header Banner */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="flex justify-between items-center">
                        <div>
                            <h1 className="text-3xl font-bold mb-2">Vaccine Tracking Feedback</h1>
                            <p className="text-blue-100">Help us improve your vaccination experience</p>
                        </div>
                        <button 
                            onClick={() => navigate(-1)}
                            className="px-6 py-2 bg-white text-blue-800 rounded-lg hover:bg-blue-50 transition-colors duration-200 font-semibold"
                        >
                            Back to Dashboard
                        </button>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Feature Cards */}
                <div className="grid md:grid-cols-3 gap-8 mb-16">
                    <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                        <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 bg-blue-100 rounded-full">
                            <FaSyringe className="w-8 h-8 text-blue-600" />
                        </div>
                        <h3 className="text-xl font-bold text-center text-gray-800 mb-3">Vaccination Process</h3>
                        <p className="text-gray-600 text-center">Share your experience with our vaccination services and procedures</p>
                    </div>

                    <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                        <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 bg-green-100 rounded-full">
                            <FaShieldVirus className="w-8 h-8 text-green-600" />
                        </div>
                        <h3 className="text-xl font-bold text-center text-gray-800 mb-3">Safety Measures</h3>
                        <p className="text-gray-600 text-center">Rate our health and safety protocols during your visit</p>
                    </div>

                    <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                        <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 bg-indigo-100 rounded-full">
                            <FaChartLine className="w-8 h-8 text-indigo-600" />
                        </div>
                        <h3 className="text-xl font-bold text-center text-gray-800 mb-3">Tracking System</h3>
                        <p className="text-gray-600 text-center">Evaluate our vaccine tracking and monitoring system</p>
                    </div>
                </div>

                {/* Feedback Form Section */}
                <div className="bg-white rounded-2xl shadow-lg p-8 mb-16">
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
                <div className="bg-white rounded-2xl shadow-lg p-8 mb-16">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Community Insights</h2>
                    
                    {/* Rating Filters */}
                    <div className="flex gap-4 overflow-x-auto pb-4 mb-8">
                        {[0, 1, 2, 3, 4, 5].map((rating) => (
                            <button
                                key={rating}
                                onClick={() => handleSortRating(rating)}
                                className={`px-6 py-3 rounded-lg flex items-center gap-2 whitespace-nowrap transition-all duration-200
                                    ${activeFilter === rating 
                                        ? 'bg-blue-600 text-white shadow-md' 
                                        : 'bg-gray-50 text-gray-700 hover:bg-gray-100'}`}
                            >
                                {rating === 0 ? 'All Feedback' : (
                                    <>
                                        {rating} <FaStar className={activeFilter === rating ? 'text-white' : 'text-yellow-400'} />
                                    </>
                                )}
                            </button>
                        ))}
                    </div>

                    {/* Feedback Grid */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {Array.isArray(sorted) && sorted.length > 0 ? (
                            sorted.map((eachFeedback) => (
                                <FeedbackParent
                                    key={eachFeedback.id}
                                    image={eachFeedback.image}
                                    randomNumber={eachFeedback.starRating}
                                    description={eachFeedback.description}
                                    username={eachFeedback.username}
                                />
                            ))
                        ) : (
                            <div className="col-span-full py-12 text-center">
                                <p className="text-gray-500 text-lg">No feedback available for this rating yet.</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Privacy Notice */}
                <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-8 text-center text-white">
                    <h3 className="text-2xl font-bold mb-4">
                        Your Privacy & Security
                    </h3>
                    <p className="text-blue-100 max-w-2xl mx-auto">
                        Your feedback helps us maintain and improve our vaccine tracking system. 
                        All information shared is protected and used exclusively for enhancing our services.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default BodyFeedback;
