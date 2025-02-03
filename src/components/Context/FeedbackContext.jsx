import React, { createContext, useState, useEffect } from 'react';
import { fetchData, addData } from '../../Api/axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { fas } from '@fortawesome/free-solid-svg-icons';

export const FeedbackContext = createContext();
export const FeedbackProvider = ({ children }) => {
    const [username, setUsername] = useState(() => {
        return JSON.parse(localStorage.getItem('Account')) || {};
    });
    const [isOpenModal, setOpenModal] = useState(false)
    const [feedback, setFeedback] = useState([]);
    const [currentValue, setCurrentValue] = useState(0);
    const [hoverValue, setHoverValue] = useState(undefined);
    const [isSubmit, setSubmit] = useState(false)
    const [hasNewFeedback,setHasNewFeedback] = useState(false)
    const [inputData, setData] = useState({
        username: username.user|| "",
        description: '',
        starRating: 0
    });
    const handleOpenFeedback = ()=>{
        setOpenModal(true)
    }
    const handleCloseModal = () => {
        setOpenModal(false);
    };
   
    
    //
    useEffect(() => {
        fetchData('patients')
            .then(res => setFeedback(res.data))
            .catch(() => console.log("Failed to fetch data"));
        setSubmit(false);
        setHasNewFeedback(false)
    }, [isSubmit]);

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
            setSubmit(true);
            setHasNewFeedback(true); 
            setOpenModal(false)
        } catch (err) {
            toast.error('Failed to submit feedback.');
        }

    };
    const value = {
        isOpenModal,
        setOpenModal,
        feedback,
        setFeedback,
        inputData,
        setData,
        currentValue,
        setCurrentValue,
        hoverValue,
        setHoverValue,
        isSubmit,
        setSubmit,
        hasNewFeedback,
        setHasNewFeedback,


      
        handleSubmit,
        handleOnChange,
        handleClick,
        handleMouseLeave,
        handleMouseOver,
        handleOpenFeedback,
        handleCloseModal
    }

    return (
        <FeedbackContext.Provider value={value}>
            {children}
        </FeedbackContext.Provider>
    );
};
