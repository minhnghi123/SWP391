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
            className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow-sm"
            onSubmit={handleSubmit}
        >
            {/* User Info */}
            <div className="flex items-center gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
                <FaUserCircle className="w-10 h-10 text-blue-600" />
                <input
                    type="text"
                    value={user.name || ""}
                    readOnly
                    className="flex-1 px-3 py-2 bg-white border border-gray-200 rounded-lg text-gray-600 cursor-not-allowed"
                />
            </div>

            {/* Rating */}
            <div className="mb-6">
                <div className="flex justify-center gap-3 mb-2">
                    {[...Array(5)].map((_, index) => (
                        <FaStar
                            key={index}
                            size={32}
                            className={`cursor-pointer transition-colors
                                ${(hoverValue || currentValue) > index ? 'text-yellow-400' : 'text-gray-300'}`}
                            onClick={() => handleClick(index + 1)}
                            onMouseOver={() => handleMouseOver(index + 1)}
                            onMouseLeave={handleMouseLeave}
                        />
                    ))}
                </div>
                <p className="text-center text-sm text-gray-500">
                    {currentValue ? `Your rating: ${currentValue}/5` : 'Rate your experience'}
                </p>
            </div>

            {/* Feedback Text */}
            <div className="mb-6">
                <textarea
                    name="description"
                    value={inputData.description || ''}
                    onChange={handleOnChange}
                    placeholder="Share your vaccination experience..."
                    rows="4"
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 resize-none"
                    required
                ></textarea>
            </div>

            {/* Submit Button */}
            <button
                type="submit"
                disabled={!inputData.description || currentValue === 0}
                className={`w-full py-3 rounded-lg font-medium transition-colors
                    ${!inputData.description || currentValue === 0 
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                        : 'bg-blue-600 text-white hover:bg-blue-700'}`}
            >
                Submit Feedback
            </button>
        </form>
    );
};

export default FormFeedback;
