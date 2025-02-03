import React, { useContext } from 'react';
import { FaStar } from "react-icons/fa";
import { FeedbackContext } from '../../Context/FeedbackContext';
const ModalRating = ({ onClose}) => {
    const { 
        inputData,
        currentValue,
        hoverValue,
        handleSubmit,
        handleOnChange,
        handleClick,
        handleMouseLeave,
        handleMouseOver} =
        useContext(FeedbackContext)
     
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div className="bg-white rounded-lg shadow-xl overflow-hidden w-full max-w-md">
                <div className="p-6">
                    <h2 className="text-xl font-semibold text-center mb-4">Rate Our Service</h2>
                    <div className="flex justify-center gap-2 mb-4">
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
                    <textarea
                        id="description"
                        name="description"
                        value={inputData.description || ""}
                        onChange={handleOnChange}
                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="How do you feel about our service?"
                        rows="4"
                        required
                    />
                </div>
                <div className="bg-gray-50 px-6 py-4 flex justify-end gap-3">
                    <button
                        type="button"
                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                    <button
                        type="button"
                        className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        onClick={handleSubmit}
                    >
                        Submit
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ModalRating;