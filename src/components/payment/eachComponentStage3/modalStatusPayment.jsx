import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiCheckCircle, FiXCircle, FiX } from "react-icons/fi";
import { fas } from "@fortawesome/free-solid-svg-icons";

const PaymentStatusModal = ({ isSuccess, setIsSuccess, showModal, setShowModal }) => {


    const handleClose = () => {
        setShowModal(false);
    };

    useEffect(() => {
        const handleEscapeKey = (e) => {
            if (e.key === "Escape") {
                handleClose();
            }
        };
        window.addEventListener("keydown", handleEscapeKey);
        return () => window.removeEventListener("keydown", handleEscapeKey);
    }, []);

    const modalVariants = {
        hidden: { opacity: 0, scale: 0.95 },
        visible: { opacity: 1, scale: 1 },
        exit: { opacity: 0, scale: 0.95 }
    };

    const iconVariants = {
        hidden: { scale: 0 },
        visible: {
            scale: 1,
            transition: {
                type: "spring",
                stiffness: 200,
                damping: 10
            }
        }
    };

    const failureVariants = {
        hidden: { x: 0 },
        visible: {
            x: [0, -10, 10, -10, 10, 0],
            transition: { duration: 0.5 }
        }
    };

    return (
        <AnimatePresence>
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <div
                        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
                        onClick={handleClose}
                    />
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        variants={isSuccess ? modalVariants : failureVariants}
                        className={`relative w-full max-w-md transform overflow-hidden rounded-lg p-6 text-left shadow-xl transition-all sm:w-[70%] md:w-[500px] ${isSuccess ? "bg-gradient-to-br from-green-50 to-green-100" : "bg-gradient-to-br from-red-50 to-red-100"}`}
                    >
                        <div className="absolute right-4 top-4">
                            <button
                                onClick={handleClose}
                                className="text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2"
                            >
                                <FiX className="h-6 w-6" />
                            </button>
                        </div>

                        <div className="flex flex-col items-center justify-center">
                            <motion.div
                                variants={iconVariants}
                                className="mb-4"
                            >
                                {isSuccess ? (
                                    <FiCheckCircle className="h-16 w-16 text-green-500" />
                                ) : (
                                    <FiXCircle className="h-16 w-16 text-red-500" />
                                )}
                            </motion.div>

                            <h3 className={`text-2xl font-bold ${isSuccess ? "text-green-800" : "text-red-800"}`}>
                                {isSuccess ? "Payment Successful" : "Payment Failed"}
                            </h3>

                            <p className="mt-2 text-center text-gray-600">
                                {isSuccess
                                    ? "Thank you! Your vaccination appointment is confirmed."
                                    : "Payment failed. Please try again or contact support."}
                            </p>



                            <div className="mt-6">
                                <button
                                    onClick={handleClose}
                                    className={`rounded-lg px-6 py-2 text-white transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 ${isSuccess
                                        ? "bg-green-500 hover:bg-green-600 focus:ring-green-500"
                                        : "bg-red-500 hover:bg-red-600 focus:ring-red-500"
                                        }`}
                                >
                                    {isSuccess ? "Continue" : "Try Again"}
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default PaymentStatusModal;