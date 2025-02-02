import React, { useEffect, useState } from 'react';
import FeedbackParent from '../home/FeddbackParent';
import { addData, fetchData } from '../../Api/axios';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FormFeedback from './formFeedback';
import { FaStar } from 'react-icons/fa';


const BodyFeedback = () => {
    const [username, setUsername] = useState(() => {
        return JSON.parse(localStorage.getItem('Account')) || [];
    });
    const [feedback, setFeedback] = useState([]);
    const [currentValue, setCurrentValue] = useState(0);
    const [hoverValue, setHoverValue] = useState(undefined);
    const [isSubmit, setSubmit] = useState(false)
    const [inputData, setData] = useState({
        username: username.user,
        description: '',
        starRating: 0,
        babyName: ''
    });



    useEffect(() => {
        if (isSubmit) {
            fetchData('patients')
                .then(res => setFeedback(res.data))
                .catch(() => console.log("Failed to fetch data"));
            setSubmit(false);
        }
    }, [isSubmit]);


    useEffect(() => {
        fetchData('patients')
            .then(res => setFeedback(res.data))
            .catch(() => console.log("Failed to fetch data"));
    }, []);






    const handleClick = (value) => {
        let newValue = value;

        if (value === currentValue) {
            newValue = value === 1 ? 0 : value - 1;
        }

        setCurrentValue(newValue);
        setData(prev => ({ ...prev, starRating: newValue }));
    };

    const handleMouseOver = (value) => setHoverValue(value);
    const handleMouseLeave = () => setHoverValue(undefined);


    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setData(prev => ({ ...prev, [name]: value }));
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await addData('patients', inputData);
            toast.success('Successfully posted!');
            setData({
                parentName: username.user,
                description: '',
                starRating: 0,

            });
            setCurrentValue(0);
            setSubmit(true)
        } catch (err) {
            toast.error('Failed to submit feedback.');
        }

    };

    return (
        <div className="flex flex-col md:flex-row gap-8 p-8 bg-gray-100 rounded-xl shadow-lg">
            {/* Feedback Form */}
            <div className="w-full md:w-1/3 h-[650px] bg-white p-6 rounded-xl shadow-md flex flex-col items-center">
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

            <div className="w-full md:w-2/3 h-[650px]  overflow-x-auto scrollbar-hide scroll-smooth">
                <div className='flex flex-row gap-4 mb-5 ju'>
                    <div className=' w-10 h-10 flex flex-row gap-2 items-center p-2 bg-green-100'>
                        5 <FaStar size={20} />
                    </div>
                    <div className=' w-10 h-10 flex flex-row gap-2 items-center p-2 bg-green-100'>
                        4 <FaStar size={20} />
                    </div>
                    <div className=' w-10 h-10 flex flex-row gap-2 items-center p-2 bg-green-100'>
                        3 <FaStar size={20} />
                    </div>
                    <div className=' w-10 h-10 flex flex-row gap-2 items-center p-2 bg-green-100'>
                        2 <FaStar size={20} />
                    </div>
                    <div className=' w-10 h-10 flex flex-row gap-2 items-center p-2 bg-green-100'>
                        1 <FaStar size={20} />
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {Array.isArray(feedback) && feedback.length > 0 ? (
                        feedback.map((eachFeedback) => (
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
