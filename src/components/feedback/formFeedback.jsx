import { FaStar, FaUserCircle } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import useAxios from '@/utils/useAxios';
import { postFeedback } from '../redux/actions/feedbackApi';
import { toast } from 'react-toastify';
import { feedbackTrackingActions } from '../redux/reducers/feedbackTracking';
const FormFeedback = () => {
    const user = useSelector((state) => state.account.user);
    const [inputData, setInputData] = useState({
        userId: user.id,
        ratingScore: 0,
        description: '',
    });
    const [currentValue, setCurrentValue] = useState(0);
    const [hoverValue, setHoverValue] = useState(undefined);

    const handleClick = (value) => {
        let newValue = value === currentValue ? Math.max(value - 1, 0) : value;
        setCurrentValue(newValue);
        setInputData((prev) => ({ ...prev, ratingScore: newValue }));
    };

    const handleMouseOver = (value) => setHoverValue(value);
    const handleMouseLeave = () => setHoverValue(undefined);
    const api = useAxios();
    const dispatch = useDispatch();

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setInputData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (inputData.ratingScore === 0) {
            toast.error('Please select a rating score');
            return;
        }
        if (inputData.description.trim() === '') {
            toast.error('Please enter a description');
            return;
        }

        // Chỉ dispatch API call nếu ratingScore > 3
        if (inputData.ratingScore > 3) {
            dispatch(postFeedback(api, inputData));
        } else {
            // Nếu rating <= 3, chỉ dispatch action để thêm vào tempFeedback
            // dispatch(postFeedback(api, inputData));
            dispatch(feedbackTrackingActions.setPostFeedback(inputData));
        }

        toast.success('Thank you for your feedback!');
        setInputData({
            userId: user.id,
            ratingScore: 0,
            description: '',
        });
        setCurrentValue(0);
    }

    return (
        <form
            className="max-w-xl mx-auto bg-white p-6 sm:p-8 rounded-xl sm:rounded-2xl shadow-lg border border-gray-100 transform transition-all duration-300 hover:shadow-xl"
            onSubmit={handleSubmit}
        >
            {/* User Info */}
            <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8 p-3 sm:p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl shadow-sm">
                <div className='w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden'>
                    <img src={user?.avatar} alt="" className='w-full h-full object-cover rounded-full' />
                </div>
                <input
                    type="text"
                    value={user?.name || 'Guest User'}
                    readOnly
                    className="flex-1 px-3 sm:px-4 py-2 bg-white border border-gray-200 rounded-lg text-gray-700 font-medium shadow-inner cursor-not-allowed focus:outline-none text-sm sm:text-base"
                />
            </div>

            {/* Rating */}
            <div className="mb-6 sm:mb-8">
                <div className="flex justify-center gap-2 sm:gap-4 mb-2 sm:mb-3">
                    {[...Array(5)].map((_, index) => (
                        <FaStar
                            key={index}
                            size={window.innerWidth < 640 ? 28 : 36}
                            className={`cursor-pointer transition-all duration-200 transform hover:scale-110 ${(hoverValue || currentValue) > index
                                ? 'text-yellow-400 drop-shadow-md'
                                : 'text-gray-300'
                                }`}
                            onClick={() => handleClick(index + 1)}
                            onMouseOver={() => handleMouseOver(index + 1)}
                            onMouseLeave={handleMouseLeave}
                        />
                    ))}
                </div>
                <p className="text-center text-xs sm:text-sm font-medium text-gray-600 animate-fade-in">
                    {currentValue ? `Your rating: ${currentValue}/5` : 'How would you rate your experience?'}
                </p>
            </div>

            {/* Feedback Text */}
            <div className="mb-6 sm:mb-8">
                <textarea
                    name="description"
                    value={inputData.description || ''}
                    onChange={handleOnChange}
                    placeholder="Share your vaccination experience..."
                    rows="4"
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-200 rounded-xl bg-gray-50 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm transition-all duration-300 resize-none hover:bg-white text-sm sm:text-base"
                    required
                />
            </div>

            {/* Submit Button */}
            <button
                type="submit"
                disabled={!inputData.description || currentValue === 0}
                className={`w-full py-2.5 sm:py-3 rounded-xl font-semibold text-base sm:text-lg transition-all duration-300 shadow-md ${!inputData.description || currentValue === 0
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 hover:shadow-lg transform hover:-translate-y-1'
                    }`}
            >
                Submit Feedback
            </button>
        </form>
    );
};

export default FormFeedback;