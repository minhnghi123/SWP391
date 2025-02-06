
import React, { useContext, useEffect, useState } from "react"
import ModalRating from './eachComponentStage3/modalRating'
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FeedbackContext } from "../Context/FeedbackContext";
export default function Stage3Payment() {
    const navigate = useNavigate()
    const {isOpenModal,handleOpenFeedback,handleCloseModal} = useContext(FeedbackContext)
    useEffect(() => {
        const id = setTimeout(() => {
            handleOpenFeedback()
        }, 3000)
        return (() => {
            clearTimeout(id)
        })
    }, [])
   
   
    return (
        <>
            {
                isOpenModal && <ModalRating onClose={handleCloseModal} />
            }
            <button onClick={handleOpenFeedback}>Feedback</button>
            <ToastContainer />
            <div className="min-h-screen flex items-center justify-center p-6">
                <div className="bg-white/20 backdrop-blur-lg shadow-2xl rounded-2xl p-8 max-w-md w-full text-center border border-white/30 relative overflow-hidden">
                    {/* Background Blob Animation */}
                    <div className="absolute -top-20 -left-20 w-64 h-64 bg-purple-300/30 rounded-full filter blur-3xl "></div>
                    <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-blue-300/30 rounded-full filter blur-3xl "></div>

                    {/* Success Icon */}
                    <div className="mb-6 flex justify-center">
                        <div className="bg-green-100 p-4 rounded-full backdrop-blur-md border border-green-200/30">
                            <svg className="w-16 h-16 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                    </div>

                    {/* Confirmation Message */}
                    <h2 className="text-3xl font-bold text-gray-800 mb-4">Payment Successful! 🎉</h2>
                    <p className="text-gray-600 mb-6">Your order has been successfully processed. Thank you for your purchase!</p>

                    {/* Buttons */}
                    <div className="flex flex-col space-y-4">
                        <button
                            onClick={() => navigate('/')}
                            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        >
                            Return Home
                        </button>

                        <button
                            onClick={() => navigate('/variantsPage')}
                            className="w-full bg-gradient-to-r from-green-600 to-teal-600 text-white py-3 rounded-xl font-semibold hover:from-green-700 hover:to-teal-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                        >
                            Continue Shopping
                        </button>
                    </div>
                </div>
            </div>

        </>

    )
}