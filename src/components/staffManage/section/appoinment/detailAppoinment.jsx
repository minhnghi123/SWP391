const DetailAppoinment = ({selectedBooking, setIsModalOpen, handleCompleteBooking, loading}) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-60 transition-opacity duration-300 p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] flex flex-col">
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 sm:px-6 py-3 sm:py-4 rounded-t-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                    <div className="flex items-center">
                        <svg className="h-5 w-5 sm:h-6 sm:w-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                        <h3 className="text-lg sm:text-xl font-bold">Booking Details #{selectedBooking?.id}</h3>
                    </div>
                    <button
                        className="text-white hover:bg-blue-700 p-1 rounded-full transition duration-150 focus:outline-none focus:ring-2 focus:ring-white"
                        onClick={() => setIsModalOpen(false)}
                        aria-label="Close modal"
                    >
                        <svg className="h-5 w-5 sm:h-6 sm:w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-4 bg-gray-50">
                    {selectedBooking && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                            <div className="space-y-4 sm:space-y-6">
                                <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300">
                                    <div className="flex items-center mb-4">
                                        <svg className="h-5 w-5 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <h4 className="text-lg font-semibold text-gray-800">Booking Information</h4>
                                    </div>
                                    <div className="space-y-3 text-gray-700">
                                        <div className="flex justify-between items-center py-2 border-b border-gray-100">
                                            <span className="font-medium text-gray-500">Booking ID:</span>
                                            <span className="font-medium text-blue-600">#{selectedBooking.id}</span>
                                        </div>
                                        <div className="flex justify-between items-center py-2 border-b border-gray-100">
                                            <span className="font-medium text-gray-500">Status:</span>
                                            <span
                                                className={`px-3 py-1 rounded-full text-sm font-medium ${
                                                    selectedBooking.status === "Pending"
                                                        ? "bg-yellow-100 text-yellow-800"
                                                        : selectedBooking.status === "Success"
                                                            ? "bg-green-100 text-green-800"
                                                            : selectedBooking.status === "Refund"
                                                                ? "bg-red-100 text-red-800"
                                                                : "bg-gray-100 text-gray-800"
                                                }`}
                                            >
                                                {selectedBooking.status}
                                            </span>
                                        </div>
                                        <div className="flex justify-between items-center py-2 border-b border-gray-100">
                                            <span className="font-medium text-gray-500">Payment Method:</span>
                                            <div className="flex items-center">
                                                {selectedBooking.paymentMethod === "Cash" ? (
                                                    <svg className="h-5 w-5 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                                                    </svg>
                                                ) : (
                                                    <svg className="h-5 w-5 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                                                    </svg>
                                                )}
                                                <span className="font-medium">{selectedBooking.paymentMethod}</span>
                                            </div>
                                        </div>
                                        <div className="flex justify-between items-center py-2">
                                            <span className="font-medium text-gray-500">Amount:</span>
                                            <span className="font-medium text-lg text-green-700">{selectedBooking.amount.toLocaleString()} VND</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300">
                                    <div className="flex items-center mb-4">
                                        <svg className="h-5 w-5 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                        <h4 className="text-lg font-semibold text-gray-800">Parent Information</h4>
                                    </div>
                                    <div className="space-y-3 text-gray-700">
                                        <div className="flex justify-between items-center py-2 border-b border-gray-100">
                                            <span className="font-medium text-gray-500">Name:</span>
                                            <span className="font-medium">{selectedBooking.parentName}</span>
                                        </div>
                                        <div className="flex justify-between items-center py-2">
                                            <span className="font-medium text-gray-500">Phone Number:</span>
                                            <span className="font-medium">{selectedBooking.phoneNumber}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300">
                                    <div className="flex items-center mb-4">
                                        <svg className="h-5 w-5 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                        </svg>
                                        <h4 className="text-lg font-semibold text-gray-800">Children</h4>
                                    </div>
                                    <div className="space-y-3">
                                        {selectedBooking.childrenList.map((child) => (
                                            <div
                                                key={child.childId}
                                                className="p-4 bg-gray-50 rounded-md border border-gray-200 hover:bg-blue-50 hover:border-blue-200 transition-colors duration-200"
                                            >
                                                <div className="flex justify-between items-center">
                                                    <div className="flex items-center">
                                                        <svg className="h-5 w-5 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                        </svg>
                                                        <span className="font-medium text-gray-800">{child.name}</span>
                                                    </div>
                                                    <span className="text-sm px-3 py-1 rounded-full bg-blue-100 text-blue-800 border border-blue-200">
                                                        {child.gender === 1 ? "Male" : "Female"}
                                                    </span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4 sm:space-y-6">
                                <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300">
                                    <div className="flex items-center mb-4">
                                        <svg className="h-5 w-5 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                                        </svg>
                                        <h4 className="text-lg font-semibold text-gray-800">Vaccines</h4>
                                    </div>
                                    {selectedBooking.vaccineList.length > 0 ? (
                                        <div className="space-y-3">
                                            {selectedBooking.vaccineList.map((vaccine) => (
                                                <div
                                                    key={vaccine.id}
                                                    className="flex justify-between items-center p-4 bg-gray-50 rounded-md border border-gray-200 hover:bg-blue-50 hover:border-blue-200 transition-colors duration-200"
                                                >
                                                    <div className="flex items-center">
                                                        <svg className="h-5 w-5 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                        </svg>
                                                        <span className="font-medium text-gray-800">{vaccine.name}</span>
                                                    </div>
                                                    <span className="text-blue-700 font-medium">{vaccine.price.toLocaleString()} VND</span>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="text-center py-4 text-gray-500">No individual vaccines selected</div>
                                    )}
                                </div>

                                <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300">
                                    <div className="flex items-center mb-4">
                                        <svg className="h-5 w-5 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                        </svg>
                                        <h4 className="text-lg font-semibold text-gray-800">Vaccine Combos</h4>
                                    </div>
                                    {selectedBooking.comboList.length > 0 ? (
                                        <div className="space-y-4">
                                            {selectedBooking.comboList.map((combo) => (
                                                <div
                                                    key={combo.id}
                                                    className="p-4 bg-gray-50 rounded-md border border-gray-200 hover:bg-blue-50 hover:border-blue-200 transition-colors duration-200"
                                                >
                                                    <div className="flex justify-between items-center mb-3">
                                                        <div className="flex items-center">
                                                            <svg className="h-5 w-5 text-purple-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                                                            </svg>
                                                            <span className="font-medium text-gray-800">{combo.name}</span>
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            <span className="text-sm px-3 py-1 bg-green-100 text-green-800 rounded-full border border-green-200">
                                                                {combo.discount}% off
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className="flex justify-between items-center mb-3 px-2">
                                                        <span className="text-sm text-gray-500 line-through">{combo.totalPrice.toLocaleString()} VND</span>
                                                        <span className="text-lg text-green-700 font-medium">{combo.finalPrice.toLocaleString()} VND</span>
                                                    </div>
                                                    <div className="mt-3 bg-white p-3 rounded-md border border-gray-200">
                                                        <div className="flex items-center mb-2">
                                                            <svg className="h-4 w-4 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                            </svg>
                                                            <span className="font-medium text-gray-700">Included Vaccines:</span>
                                                        </div>
                                                        <ul className="space-y-2 mt-2">
                                                            {combo.vaccineResponeBooking.map((vaccine) => (
                                                                <li key={vaccine.id} className="flex justify-between items-center px-3 py-2 bg-gray-50 rounded-md">
                                                                    <span className="text-gray-800">{vaccine.name}</span>
                                                                    <span className="text-blue-700">{vaccine.price.toLocaleString()} VND</span>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="text-center py-4 text-gray-500">No vaccine combos selected</div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                <div className="px-4 sm:px-6 py-3 sm:py-4 border-t border-gray-200 bg-white flex flex-col sm:flex-row justify-between gap-2 rounded-b-lg">
                    <button
                        className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition duration-150 focus:ring-2 focus:ring-gray-400"
                        onClick={() => setIsModalOpen(false)}
                    >
                        Close
                    </button>
                    <div>
                        {selectedBooking && selectedBooking.status === "Pending" && (
                            <button
                                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition duration-150 focus:ring-2 focus:ring-green-400"
                                onClick={() => handleCompleteBooking(selectedBooking)}
                            >
                                <div className="flex items-center">
                                    <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                    </svg>
                                    {loading ? "Loading..." : "Complete Booking"}
                                </div>
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DetailAppoinment;
