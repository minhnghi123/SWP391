// import React, { createContext, useState, useEffect } from 'react';
// import { fetchData, addData } from '../../Api/axios';
// // Tạo context
// export const FeedbackContext = createContext();

// export const FeedbackProvider = ({ children }) => {
//     const [feedback, setFeedback] = useState([]);
//     const [currentValue, setCurrentValue] = useState(0);
//     const [hoverValue, setHoverValue] = useState(undefined);
//     const [isSubmit, setSubmit] = useState(false);
//     const [inputData, setData] = useState({
//         username: "Tri",
//         description: '',
//         starRating: 0
//     });

//     useEffect(() => {
//         if (isSubmit) {
//             fetchData('patients')
//                 .then(res => setFeedback(res.data))
//                 .catch(() => console.log("Failed to fetch data"))
//                 .finally(() => setSubmit(false)); 
//         }
//     }, [isSubmit]);



//     useEffect(() => {
//         fetchData('patients')
//             .then(res => setFeedback(res.data))
//             .catch(() => console.log("Failed to fetch data"));
//     }, []);

//     const handleClick = (value) => {
//         setCurrentValue(value);
//         setData(prev => ({ ...prev, starRating: value }));
//     };

//     const handleMouseOver = (value) => setHoverValue(value);
//     const handleMouseLeave = () => setHoverValue(undefined);

//     const handleOnChange = (e) => {
//         const { name, value } = e.target;
//         setData(prev => ({ ...prev, [name]: value }));
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             await addData('patients', inputData);
//             toast.success('Successfully posted!');
//             setData({
//                 username: "Tri",
//                 description: '',
//                 starRating: 0
//             });
//             setCurrentValue(0);
//             setSubmit(true);
//         } catch (err) {
//             toast.error('Failed to submit feedback.');
//         }
//     };

//     return (
//         <FeedbackContext.Provider value={{
//             feedback,
//             inputData,
//             handleSubmit,
//             handleOnChange,
//             handleClick,
//             handleMouseLeave,
//             handleMouseOver,
//             currentValue,
//             hoverValue
//         }}>
//             {children}
//         </FeedbackContext.Provider>
//     );
// };
