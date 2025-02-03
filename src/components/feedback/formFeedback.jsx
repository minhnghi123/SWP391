import { FaStar } from 'react-icons/fa';

const FormFeedback = ({
    inputData,
    handleSubmit,
    handleOnChange,
    handleClick,
    handleMouseLeave,
    handleMouseOver,
    currentValue,
    hoverValue,
}) => {

    
    return (
        <form className="w-full max-w-lg mx-auto p-6 md:p-8 rounded-xl" onSubmit={handleSubmit}>
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
                Leave Your Feedback
            </h2>

            {/* Parent Name (Read-Only) */}
            <div className="mb-4">
                <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                    UserName
                </label>
                <input
                    type="text"
                    id="username"
                    name="username"
                    value={inputData.username || ""}
                    readOnly
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-500 cursor-not-allowed"
                />
            </div>

            {/* Feedback Description */}
            <div className="mb-4">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                    Feedback
                </label>
                <textarea
                    id="description"
                    name="description"
                    value={inputData.description || ''}
                    onChange={handleOnChange}
                    placeholder="Share your experience..."
                    rows="4"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-500"
                    required
                ></textarea>
            </div>

            {/* Rating */}
            <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Rating
                </label>
                <div className="flex gap-2 justify-center">
                    {[...Array(5)].map((_, index) => (
                        <FaStar
                            key={index}
                            size={32}
                            className="cursor-pointer transition-colors duration-200"
                            color={(hoverValue || currentValue) > index ? '#FFA500' : '#CCCCCC'}
                            onClick={() => handleClick(index + 1)}
                            onMouseOver={() => handleMouseOver(index + 1)}
                            onMouseLeave={handleMouseLeave}
                            aria-label={`Rate ${index + 1} out of 5`}
                        />
                    ))}
                </div>
            </div>

            {/* Submit Button */}
            <button
                type="submit"
                disabled={!inputData.description || currentValue === 0}
                className={`w-full py-2 px-4 mt-4 rounded-lg text-white transition-colors duration-300 
                    ${!inputData.description || currentValue === 0 ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
            >
                Submit Feedback
            </button>
        </form>
    );
};

export default FormFeedback;
