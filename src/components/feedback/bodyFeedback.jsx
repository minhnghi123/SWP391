import React, { useContext, useEffect, useState } from 'react';
import FeedbackParent from '../home/FeedbackParent';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FormFeedback from './formFeedback';
import { FaStar } from 'react-icons/fa';
import { FeedbackContext } from '../Context/FeedbackContext';
import { useNavigate } from 'react-router-dom';
import { fetchData } from '../../Api/axios';
const BodyFeedback = () => {
    const navigate = useNavigate()

    const {
        feedback,
        inputData,
        currentValue,
        hoverValue,
        handleSubmit,
        handleOnChange,
        handleClick,
        handleMouseLeave,
        handleMouseOver } =
        useContext(FeedbackContext)


    const [sorted, setSorted] = useState(feedback);
    useEffect(() => {
        setSorted(feedback.sort((a, b) => (b.id - a.id)));
    }, [feedback]);

    const handleSortRating = (data) => {
        let newSorted;
        if(data === 0){
            newSorted = [...feedback]
        }
        else {
             newSorted = feedback.filter(eachFeedback => eachFeedback.starRating === data);
        }
      
        setSorted(newSorted);
    }
    console.log(sorted)
    return (
        <div className="flex flex-col md:flex-row gap-8 p-8 bg-gray-100 rounded-xl shadow-lg">
            {/* Feedback Form */}
            <div className="w-full md:w-1/3 h-[650px] bg-white p-6 rounded-xl shadow-md flex flex-col items-start">
                <button onClick={() => navigate(-1)} className='bg-blue-300 py-2 px-3 rounded-md'>Back</button>
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

            {/* Feedback List */}
            <ToastContainer />

            <div className="w-full md:w-2/3 h-[650px] overflow-x-auto scrollbar-hide scroll-smooth">
                <div className='flex flex-row gap-4 mb-5 ju'>
                    <button onClick={() => handleSortRating(0)} className='w-10 h-10 flex flex-row gap-2 items-center p-2 bg-green-100'>
                       All
                    </button>
                    <button onClick={() => handleSortRating(5)} className='w-10 h-10 flex flex-row gap-2 items-center p-2 bg-green-100'>
                        5 <FaStar size={20} />
                    </button>
                    <button onClick={() => handleSortRating(4)} className='w-10 h-10 flex flex-row gap-2 items-center p-2 bg-green-100'>
                        4 <FaStar size={20} />
                    </button>
                    <button onClick={() => handleSortRating(3)} className='w-10 h-10 flex flex-row gap-2 items-center p-2 bg-green-100'>
                        3 <FaStar size={20} />
                    </button>
                    <button onClick={() => handleSortRating(2)} className='w-10 h-10 flex flex-row gap-2 items-center p-2 bg-green-100'>
                        2 <FaStar size={20} />
                    </button>
                    <button onClick={() => handleSortRating(1)} className='w-10 h-10 flex flex-row gap-2 items-center p-2 bg-green-100'>
                        1 <FaStar size={20} />
                    </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                        <p className="text-gray-500 text-center w-full">No feedback available.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default BodyFeedback;
