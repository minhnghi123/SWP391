import { FaStar, FaUserCircle } from 'react-icons/fa';
import { useSelector } from 'react-redux';

const FormFeedback = ({
    username,
    inputData,
    handleSubmit,
    handleOnChange,
    handleClick,
    handleMouseLeave,
    handleMouseOver,
    currentValue,
    hoverValue,
}) => {
    const user = useSelector((state) => state.account.user);

    return (
        <form
            className="max-w-xl mx-auto bg-white p-8 rounded-2xl shadow-lg border border-gray-100 transform transition-all duration-300 hover:shadow-xl"
            onSubmit={handleSubmit}
        >
            {/* User Info */}
            <div className="flex items-center gap-4 mb-8 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl shadow-sm">
               <div className='w-12 h-12 rounded-full'>
                <img src={user?.avatar} alt="" className='w-12 h-12 rounded-full' />
               </div>
                <input
                    type="text"
                    value={user?.name || 'Guest User'}
                    readOnly
                    className="flex-1 px-4 py-2 bg-white border border-gray-200 rounded-lg text-gray-700 font-medium shadow-inner cursor-not-allowed focus:outline-none"
                />
            </div>

            {/* Rating */}
            <div className="mb-8">
                <div className="flex justify-center gap-4 mb-3">
                    {[...Array(5)].map((_, index) => (
                        <FaStar
                            key={index}
                            size={36}
                            className={`cursor-pointer transition-all duration-200 transform hover:scale-110 ${
                                (hoverValue || currentValue) > index
                                    ? 'text-yellow-400 drop-shadow-md'
                                    : 'text-gray-300'
                            }`}
                            onClick={() => handleClick(index + 1)}
                            onMouseOver={() => handleMouseOver(index + 1)}
                            onMouseLeave={handleMouseLeave}
                        />
                    ))}
                </div>
                <p className="text-center text-sm font-medium text-gray-600 animate-fade-in">
                    {currentValue ? `Your rating: ${currentValue}/5` : 'How would you rate your experience?'}
                </p>
            </div>

            {/* Feedback Text */}
            <div className="mb-8">
                <textarea
                    name="description"
                    value={inputData.description || ''}
                    onChange={handleOnChange}
                    placeholder="Share your vaccination experience..."
                    rows="5"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm transition-all duration-300 resize-none hover:bg-white"
                    required
                />
            </div>

            {/* Submit Button */}
            <button
                type="submit"
                disabled={!inputData.description || currentValue === 0}
                className={`w-full py-3 rounded-xl font-semibold text-lg transition-all duration-300 shadow-md ${
                    !inputData.description || currentValue === 0
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