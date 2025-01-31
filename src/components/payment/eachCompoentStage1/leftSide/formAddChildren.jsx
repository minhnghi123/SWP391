import React, { useState } from 'react';

const FormAddChildren = ({handleSubmit,handleOnchange}) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
       
            <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100">
                {/* Header Section */}
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                        <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-3 rounded-2xl">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold text-gray-900">New Patient Registration</h3>
                            <p className="text-sm text-gray-500 mt-1">Add a new child to your vaccination schedule</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-full text-center">

                        <span className="text-sm font-medium">Required Fields</span>
                    </div>
                </div>

                <form className="space-y-6" onSubmit={handleSubmit}>
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
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-teal-500 
                                                focus:ring-2 focus:ring-teal-200 outline-none transition-all"
                        />
                    </div>

                    {/* Date Fields */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="datOfBrith" className="block text-sm font-medium text-gray-700 mb-2">
                                Date of Birth
                            </label>
                            <input
                                type="date"
                                id="datOfBrith"
                                name="datOfBrith"
                                onChange={handleOnchange}
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-teal-500 
                                                    focus:ring-2 focus:ring-teal-200 outline-none transition-all"
                            />
                        </div>
                        <div>
                            <label htmlFor="dateInject" className="block text-sm font-medium text-gray-700 mb-2">
                                Vaccination Date
                            </label>
                            <input
                                type="date"
                                id="dateInject"
                                name="dateInject"
                                onChange={handleOnchange}
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-teal-500 
                                                    focus:ring-2 focus:ring-teal-200 outline-none transition-all"
                            />
                        </div>
                    </div>

                    {/* Gender Selection */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">Gender</label>
                        <div className="grid grid-cols-3 gap-4">
                            {['Male', 'Female', 'Other'].map((gender) => (
                                <div key={gender} className="relative">
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
                                                            cursor-pointer transition-all peer-checked:bg-teal-500 peer-checked:text-white 
                                                            peer-checked:border-teal-500 hover:border-teal-500"
                                    >
                                        {gender}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Advisory Section */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">
                            Does the child need special medical attention?
                        </label>
                        <div className="grid grid-cols-2 gap-4 mb-4">
                            <button
                                type="button"
                                onClick={() => setIsOpen(true)}
                                className={`px-4 py-3 rounded-xl border ${isOpen
                                    ? 'bg-teal-500 text-white border-teal-500'
                                    : 'border-gray-200 hover:border-teal-500'} transition-all`}
                            >
                                Yes
                            </button>
                            <button
                                type="button"
                                onClick={() => setIsOpen(false)}
                                className={`px-4 py-3 rounded-xl border ${!isOpen
                                    ? 'bg-teal-500 text-white border-teal-500'
                                    : 'border-gray-200 hover:border-teal-500'} transition-all`}
                            >
                                No
                            </button>
                        </div>

                        {isOpen && (
                            <div className="mt-4">
                                <label htmlFor="advisory" className="block text-sm font-medium text-gray-700 mb-2">
                                    Please provide medical details
                                </label>
                                <textarea
                                    id="advisory"
                                    name="advistory"
                                    rows="4"
                                    onChange={handleOnchange}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-teal-500 
                                                        focus:ring-2 focus:ring-teal-200 outline-none transition-all"
                                    placeholder="Enter any relevant medical information..."
                                />
                            </div>
                        )}
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full py-4 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-xl 
                                            font-medium shadow-md hover:from-teal-600 hover:to-teal-700 transition-all duration-300"
                    >
                        Save Information
                    </button>
                </form>
            </div>
        )
    
};

export default FormAddChildren;