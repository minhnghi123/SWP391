import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSyringe, FaShieldVirus, FaChartLine, FaStar, FaLock, FaInfoCircle, FaSearch, FaArrowLeft } from 'react-icons/fa';
import FormFeedback from './formFeedback';
import FeedbackParent from '../home/FeedbackParent';
import useAxios from '@/utils/useAxios';
import Pagination from '../../components/staffManage/Pagination'; // Đảm bảo đường dẫn đúng
import { useDispatch, useSelector } from 'react-redux';
import { fetchDataFeedback, fetchDataUser, fetchFeedback } from '../redux/actions/feedbackApi';
import Avatar from '@mui/material/Avatar';

const BodyFeedback = () => {
    const navigate = useNavigate();
    const [activeFeedbackTab, setActiveFeedbackTab] = useState('tracking');
    const [sorted, setSorted] = useState([]);
    const [activeFilter, setActiveFilter] = useState(0);
    const [searchQuery, setSearchQuery] = useState('');

    const api = useAxios();
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;
    const dispatch = useDispatch();

    const feedbackTracking = useSelector((state) => state.feedbackTracking.feedbackTracking);
    const loading = useSelector((state) => state.feedbackTracking.loading);
    const error = useSelector((state) => state.feedbackTracking.error);
    const user = useSelector((state) => state.feedbackTracking.user);
    const feedback = useSelector((state) => state.feedbackTracking.feedback);
    const tempFeedback = useSelector((state) => state.feedbackTracking.tempFeedback);
    const findFeedback = feedbackTracking.filter(item => item.status.toLowerCase() === "success" && item.reaction.toLowerCase() !== 'nothing');

    // Kết hợp feedback thực và tạm thời


    // Tính toán phân trang dựa trên sorted (danh sách đã lọc/sắp xếp)
    const totalItems = sorted.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedData = sorted.slice(startIndex, endIndex);

    useEffect(() => {
        dispatch(fetchDataFeedback(api));
        dispatch(fetchDataUser(api));
        dispatch(fetchFeedback(api));
    }, [dispatch]);

    useEffect(() => {
        const sortedFeedback = feedback.filter(item => item.ratingScore > 3);
        const allFeedback = [...sortedFeedback, ...tempFeedback];
        if (Array.isArray(allFeedback) && allFeedback.length > 0) {

            const sortedByDate = [...allFeedback].sort((a, b) => (b.id - a.id));
            setSorted(sortedByDate);
            setCurrentPage(1);
        }
    }, [feedback, tempFeedback]);

    const handleSortRating = (rating) => {
        setActiveFilter(rating);
        setCurrentPage(1);

        if (!Array.isArray(allFeedback) || allFeedback.length === 0) {
            setSorted([]);
            return;
        }

        let newSorted;
        if (rating === 0) {
            newSorted = [...allFeedback].sort((a, b) => (b.id - a.id));
        } else {
            newSorted = [...allFeedback].filter(item => Number(item.ratingScore) === rating);
        }
        setSorted(newSorted);
    };

    const filteredFeedbacks = paginatedData.filter(item => {
        const userName = user?.find(u => u.id === item.userId)?.name || 'Unknown User';
        return userName.toLowerCase().includes(searchQuery.toLowerCase());
    });

    const handleFindUser = (userId) => {
        return user?.find(u => u.id === userId) || { name: 'Unknown User', avatar: null };
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    useEffect(() => {
        setCurrentPage(1);
    }, [searchQuery]);

    const handleTabChange = (tab) => {
        setActiveFeedbackTab(tab);
        setCurrentPage(1);
        setActiveFilter(0);
        setSearchQuery('');
        if (tab === 'tracking') {
            const sortedByDate = [...allFeedback].sort((a, b) => (b.id - a.id));
            setSorted(sortedByDate);
        } else if (tab === 'vaccine') {
            setSorted(findFeedback);
        }
    };

    const safetyPolicy = {
        title: "Our Commitment to Safety",
        description: "We prioritize your safety by adhering to strict health protocols, including regular sanitization, mandatory mask-wearing, and social distancing measures at all vaccination centers. Our staff is trained to ensure a safe and comfortable experience for every visitor."
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
            {/* Header Banner */}
            <div className="bg-gradient-to-r from-blue-500 via-indigo-500 to-indigo-500 text-white shadow-lg">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
                    <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-6">
                        <div className="text-center sm:text-left w-full sm:w-auto">
                            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-3 sm:mb-4 tracking-tight animate-fade-in bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-100">
                                Vaccine Tracking Feedback
                            </h1>
                            <p className="text-blue-100 text-base sm:text-lg">Your feedback helps us enhance your vaccination experience.</p>
                        </div>
                        <button
                            onClick={() => navigate(-1)}
                            className="group flex items-center gap-2 px-6 sm:px-8 py-2.5 sm:py-3 bg-white/10 backdrop-blur-sm text-white rounded-full hover:bg-white/20 transition-all duration-300 font-semibold text-sm sm:text-base shadow-lg hover:shadow-xl w-full sm:w-auto justify-center sm:justify-start"
                        >
                            <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
                            Back to Dashboard
                        </button>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
                {/* Feature Cards (Tabs) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-8 sm:mb-12 lg:mb-16">
                    {[
                        { tab: 'tracking', icon: <FaChartLine className="w-8 h-8 sm:w-10 sm:h-10 text-indigo-500" />, title: 'Tracking System', desc: 'Evaluate our vaccine tracking system' },
                        { tab: 'vaccine', icon: <FaSyringe className="w-8 h-8 sm:w-10 sm:h-10 text-blue-500" />, title: 'Vaccine Process', desc: 'Share your vaccination experience' },
                        { tab: 'safety', icon: <FaShieldVirus className="w-8 h-8 sm:w-10 sm:h-10 text-green-500" />, title: 'Safety Measures', desc: 'Learn about our safety protocols' }
                    ].map(({ tab, icon, title, desc }) => (
                        <div
                            key={tab}
                            onClick={() => handleTabChange(tab)}
                            className={`group bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer border-2 ${activeFeedbackTab === tab
                                ? 'border-indigo-500 shadow-indigo-200 bg-gradient-to-br from-white to-indigo-50'
                                : 'border-gray-100 hover:border-indigo-200'
                                }`}
                        >
                            <div className={`flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 sm:mb-6 rounded-2xl transition-colors duration-300 ${activeFeedbackTab === tab ? 'bg-indigo-100' : 'bg-gray-50 group-hover:bg-indigo-50'
                                }`}>
                                {icon}
                            </div>
                            <h3 className="text-xl sm:text-2xl font-bold text-center text-gray-800 mb-2 sm:mb-3">{title}</h3>
                            <p className="text-gray-600 text-center text-sm sm:text-base leading-relaxed">{desc}</p>
                        </div>
                    ))}
                </div>

                {/* Feedback Form Section (Tracking System) */}
                {activeFeedbackTab === 'tracking' && (
                    <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl p-6 sm:p-8 mb-8 sm:mb-12 lg:mb-16 border border-gray-100 animate-slide-up backdrop-blur-sm bg-gradient-to-br from-white to-indigo-50">
                        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 sm:mb-8 flex items-center gap-3">
                            <span className="bg-indigo-100 p-2 sm:p-3 rounded-full">
                                <FaChartLine className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-600" />
                            </span>
                            Share Your Feedback
                        </h2>
                        <FormFeedback />
                    </div>
                )}

                {/* Community Feedback Section */}
                <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl p-6 sm:p-8 mb-8 sm:mb-12 lg:mb-16 border border-gray-100 backdrop-blur-sm">
                    <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-6 mb-6 sm:mb-8'>
                        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 flex items-center gap-3">
                            <span className={`p-2 sm:p-3 rounded-full ${activeFeedbackTab === 'tracking' ? 'bg-indigo-100' :
                                activeFeedbackTab === 'vaccine' ? 'bg-blue-100' :
                                    'bg-green-100'
                                }`}>
                                {activeFeedbackTab === 'tracking' && <FaChartLine className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-600" />}
                                {activeFeedbackTab === 'vaccine' && <FaSyringe className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />}
                                {activeFeedbackTab === 'safety' && <FaShieldVirus className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />}
                            </span>
                            {activeFeedbackTab === 'tracking' && 'Tracking System Feedback'}
                            {activeFeedbackTab === 'vaccine' && 'Vaccine Process Reactions'}
                            {activeFeedbackTab === 'safety' && 'Safety Measures Policy'}
                        </h2>
                        <div className="relative w-full sm:w-96">
                            <FaSearch className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search by username..."
                                className="w-full pl-10 sm:pl-12 pr-4 py-3 sm:py-4 rounded-xl border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent shadow-sm transition-all duration-300 text-sm sm:text-base"
                            />
                        </div>
                    </div>

                    {/* Rating Filters (Tracking System) */}
                    {activeFeedbackTab === 'tracking' && (
                        <div className="flex flex-wrap gap-2 sm:gap-4 mb-6 sm:mb-8">
                            <button
                                onClick={() => handleSortRating(0)}
                                className={`px-4 sm:px-6 py-2 sm:py-3 rounded-full transition-all duration-300 font-medium text-sm sm:text-base ${activeFilter === 0
                                    ? 'bg-indigo-600 text-white shadow-lg'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                            >
                                All Feedback
                            </button>
                            {[5, 4, 3, 2, 1].map((rating) => (
                                <button
                                    key={rating}
                                    onClick={() => handleSortRating(rating)}
                                    className={`px-4 sm:px-6 py-2 sm:py-3 rounded-full flex items-center gap-2 transition-all duration-300 font-medium text-sm sm:text-base ${activeFilter === rating
                                        ? 'bg-indigo-600 text-white shadow-lg'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                        }`}
                                >
                                    {rating} <FaStar className={activeFilter === rating ? 'text-white' : 'text-yellow-400'} />
                                </button>
                            ))}
                        </div>
                    )}

                    {/* Tab Content */}
                    {activeFeedbackTab === 'safety' ? (
                        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-lg border border-green-100 animate-fade-in">
                            <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                                <div className="bg-green-100 p-2 sm:p-3 rounded-full">
                                    <FaLock className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
                                </div>
                                <h3 className="text-xl sm:text-2xl font-semibold text-gray-800">{safetyPolicy.title}</h3>
                            </div>
                            <p className="text-gray-700 text-base sm:text-lg leading-relaxed">{safetyPolicy.description}</p>
                            <div className="mt-6 sm:mt-8 flex items-center gap-3 text-green-600 bg-green-50 p-3 sm:p-4 rounded-xl">
                                <FaInfoCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                                <p className="text-sm sm:text-base font-medium">Your safety is our top priority.</p>
                            </div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
                            {loading ? (
                                <div className="col-span-full py-8 sm:py-12 text-center">
                                    <div className="animate-pulse flex flex-col items-center gap-4">
                                        <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-200 rounded-full"></div>
                                        <div className="h-3 sm:h-4 bg-gray-200 rounded w-3/4"></div>
                                        <div className="h-3 sm:h-4 bg-gray-200 rounded w-1/2"></div>
                                    </div>
                                </div>
                            ) : error ? (
                                <div className="col-span-full py-12 text-center">
                                    <div className="bg-red-50 text-red-600 p-6 rounded-2xl">
                                        <p className="text-lg font-medium">Error loading feedback: {error}</p>
                                    </div>
                                </div>
                            ) :

                                filteredFeedbacks.length > 0 ? (
                                    filteredFeedbacks.map((eachFeedback) => (
                                        <div
                                            key={eachFeedback.id}
                                            className=""
                                        >
                                            {activeFeedbackTab === 'vaccine' ? (
                                                <div className='bg-gray-50 rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1'>
                                                    <div className="flex items-center gap-4 mb-4">
                                                        <Avatar
                                                            alt="User"
                                                            src={handleFindUser(eachFeedback.userId)?.avatar}
                                                            className="w-14 h-14 border-2 border-blue-200"
                                                        />
                                                        <div>
                                                            <p className="font-semibold text-gray-800 text-lg">
                                                                {handleFindUser(eachFeedback.userId)?.name || 'Unknown User'}
                                                            </p>
                                                            <p className="text-sm text-gray-500">{eachFeedback.vaccineName || 'Unknown Vaccine'}</p>
                                                        </div>
                                                    </div>
                                                    <p className="text-gray-700 text-base">
                                                        <span className="font-medium text-blue-600">Reaction: </span>
                                                        <span>{eachFeedback.reaction || 'No reaction recorded'}</span>
                                                    </p>
                                                </div>
                                            ) : (
                                                <FeedbackParent
                                                    image={user?.find(u => u.id === eachFeedback.userId)?.avatar}
                                                    randomNumber={eachFeedback.ratingScore}
                                                    description={eachFeedback.description}
                                                    username={user?.find(u => u.id === eachFeedback.userId)?.name || 'Unknown User'}
                                                    isTemp={eachFeedback.isTemp}
                                                />
                                            )}
                                        </div>
                                    ))
                                ) : (
                                    <div className="col-span-full py-12 text-center">
                                        <div className="bg-gray-50 p-8 rounded-2xl">
                                            <p className="text-gray-600 text-lg">
                                                {searchQuery && activeFeedbackTab === 'tracking' ? 'No feedback matches your search.' :
                                                    (activeFeedbackTab === 'vaccine' ? 'No reactions available yet.' : 'No feedback available yet.')}
                                            </p>
                                        </div>
                                    </div>
                                )}
                        </div>
                    )}

                    {/* Pagination */}
                    {activeFeedbackTab !== 'safety' && totalItems > 0 && (
                        <div className="mt-12">
                            <Pagination
                                currentPage={currentPage}
                                totalPages={totalPages}
                                startIndex={startIndex}
                                endIndex={endIndex}
                                totalItems={totalItems}
                                onPageChange={setCurrentPage}
                            />
                        </div>
                    )}
                </div>

                {/* Privacy Notice */}
                <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-3xl p-8 text-center text-white shadow-xl animate-fade-in">
                    <div className="max-w-2xl mx-auto">
                        <h3 className="text-2xl font-bold mb-4 flex items-center justify-center gap-3">
                            <FaLock className="w-6 h-6" />
                            Your Privacy & Security
                        </h3>
                        <p className="text-blue-100 text-lg leading-relaxed">
                            Your feedback helps us improve our vaccine tracking system. All information shared is protected and used exclusively for enhancing our services.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BodyFeedback;