import React, { useState } from 'react';
import { motion } from 'framer-motion';

const FormAddChildren = ({handleSubmit, handleOnchange, err}) => {
    const [isOpen, setIsOpen] = useState(false);
    
    // Animation variants
    const fadeInUp = {
        initial: {
            y: 20,
            opacity: 0,
        },
        animate: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.4,
                ease: [0.6, -0.05, 0.01, 0.99]
            }
        }
    };

    return (
        <motion.div 
            initial="initial"
            animate="animate"
            variants={fadeInUp}
            className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
        >
            {/* Header Section */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                    <div className="bg-gradient-to-r from-blue-500 to-blue-400 p-3 rounded-2xl shadow-md">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold text-gray-800">New Patient Registration</h3>
                        <p className="text-sm text-gray-500 mt-1">Add a new child to your vaccination schedule</p>
                    </div>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-full text-sm font-medium">
                    Required Fields
                </div>
            </div>

            <form className="space-y-5" onSubmit={handleSubmit}>
                {/* Name Input */}
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                        Child's Full Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Enter child's name"
                        onChange={handleOnchange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 
                                focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                    />
                </div>

                {/* Date Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700 mb-2">
                            Date of Birth
                        </label>
                        <input
                            type="date"
                            id="dateOfBirth"
                            name="dateOfBirth"
                            onChange={handleOnchange}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 
                                    focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                        />
                    </div>
                </div>

                {/* Gender Selection */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">Gender</label>
                    <div className="flex flex-row gap-4">
                        {['Male', 'Female'].map((gender) => (
                            <div key={gender} className="relative flex-1">
                                <input
                                    type="radio"
                                    id={gender}
                                    name="gender"
                                    value={gender}
                                    onChange={handleOnchange}
                                    className="peer hidden"
                                />
                                <label
                                    htmlFor={gender}
                                    className="block w-full px-4 py-3 text-center rounded-xl border border-gray-200 
                                            cursor-pointer transition-all peer-checked:bg-gradient-to-r peer-checked:from-blue-500 peer-checked:to-blue-400 
                                            peer-checked:text-white peer-checked:border-blue-500 hover:border-blue-500"
                                >
                                    {gender}
                                </label>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Error message */}
                {err && (
                    <div className="bg-red-50 text-red-500 p-3 rounded-xl text-sm">
                        {err}
                    </div>
                )}

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full py-4 bg-gradient-to-r from-blue-500 to-blue-400 text-white rounded-xl 
                            font-medium shadow-md hover:from-blue-600 hover:to-blue-500 transition-all duration-300"
                >
                    Save Information
                </button>
            </form>
        </motion.div>
    );
};

export default FormAddChildren;