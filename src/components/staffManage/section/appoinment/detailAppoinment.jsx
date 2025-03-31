const DetailAppoinment = ({selectedBooking, setIsModalOpen, handleCompleteBooking, loading}) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/70 backdrop-blur-sm p-4">
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col">
                {/* Header */}
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-4 rounded-t-3xl flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-white/10 rounded-xl">
                            <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold text-white">Booking Details #{selectedBooking?.id}</h3>
                    </div>
                    <button
                        onClick={() => setIsModalOpen(false)}
                        className="p-2 hover:bg-white/10 rounded-xl transition-colors"
                    >
                        <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto px-6 py-6 bg-gray-50">
                    {selectedBooking && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Left Column */}
                            <div className="space-y-6">
                                {/* Booking Information */}
                                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="p-2 bg-blue-50 rounded-xl">
                                            <svg className="h-5 w-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                                                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        </div>
                                        <h4 className="text-lg font-semibold text-gray-800">Booking Information</h4>
                                    </div>
                                    <div className="space-y-4">
                                        <div className="flex justify-between items-center py-3 border-b border-gray-100">
                                            <span className="text-gray-600">Booking ID</span>
                                            <span className="font-medium text-blue-600">#{selectedBooking.id}</span>
                                        </div>
                                        <div className="flex justify-between items-center py-3 border-b border-gray-100">
                                            <span className="text-gray-600">Status</span>
                                            <span className={`px-4 py-1.5 rounded-full text-sm font-medium ${
                                                selectedBooking.status === "Pending"
                                                    ? "bg-yellow-50 text-yellow-700 border border-yellow-200"
                                                    : selectedBooking.status === "Success"
                                                        ? "bg-green-50 text-green-700 border border-green-200"
                                                        : selectedBooking.status === "Refund"
                                                            ? "bg-red-50 text-red-700 border border-red-200"
                                                            : "bg-gray-50 text-gray-700 border border-gray-200"
                                            }`}>
                                                {selectedBooking.status}
                                            </span>
                                        </div>
                                        <div className="flex justify-between items-center py-3 border-b border-gray-100">
                                            <span className="text-gray-600">Payment Method</span>
                                            <div className="flex items-center gap-2">
                                                {selectedBooking.paymentMethod === "Cash" ? (
                                                    <svg className="h-5 w-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                                                              d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                                                    </svg>
                                                ) : (
                                                    <svg className="h-5 w-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                                                              d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                                                    </svg>
                                                )}
                                                <span className="font-medium">{selectedBooking.paymentMethod}</span>
                                            </div>
                                        </div>
                                        <div className="flex justify-between items-center py-3">
                                            <span className="text-gray-600">Amount</span>
                                            <span className="text-lg font-semibold text-green-600">
                                                {selectedBooking.amount.toLocaleString()} VND
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Parent Information */}
                                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="p-2 bg-blue-50 rounded-xl">
                                            <svg className="h-5 w-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                                                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                            </svg>
                                        </div>
                                        <h4 className="text-lg font-semibold text-gray-800">Parent Information</h4>
                                    </div>
                                    <div className="space-y-4">
                                        <div className="flex justify-between items-center py-3 border-b border-gray-100">
                                            <span className="text-gray-600">Name</span>
                                            <span className="font-medium text-gray-800">{selectedBooking.parentName}</span>
                                        </div>
                                        <div className="flex justify-between items-center py-3">
                                            <span className="text-gray-600">Phone Number</span>
                                            <span className="font-medium text-gray-800">{selectedBooking.phoneNumber}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Children List */}
                                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="p-2 bg-blue-50 rounded-xl">
                                            <svg className="h-5 w-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                                                      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                            </svg>
                                        </div>
                                        <h4 className="text-lg font-semibold text-gray-800">Children</h4>
                                    </div>
                                    <div className="space-y-3">
                                        {selectedBooking.childrenList.map((child) => (
                                            <div key={child.childId} 
                                                 className="p-4 bg-gray-50 rounded-xl border border-gray-100 hover:bg-blue-50 hover:border-blue-100 transition-all">
                                                <div className="flex justify-between items-center">
                                                    <div className="flex items-center gap-3">
                                                        <div className="p-2 bg-white rounded-xl">
                                                            <svg className="h-5 w-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                                                                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                            </svg>
                                                        </div>
                                                        <span className="font-medium text-gray-800">{child.name}</span>
                                                    </div>
                                                    <span className="px-4 py-1.5 rounded-full text-sm font-medium bg-blue-50 text-blue-700 border border-blue-100">
                                                        {child.gender === 1 ? "Male" : "Female"}
                                                    </span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Right Column */}
                            <div className="space-y-6">
                                {/* Vaccines */}
                                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="p-2 bg-blue-50 rounded-xl">
                                            <svg className="h-5 w-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                                                      d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                                            </svg>
                                        </div>
                                        <h4 className="text-lg font-semibold text-gray-800">Vaccines</h4>
                                    </div>
                                    {selectedBooking.vaccineList.length > 0 ? (
                                        <div className="space-y-3">
                                            {selectedBooking.vaccineList.map((vaccine) => (
                                                <div key={vaccine.id} 
                                                     className="flex justify-between items-center p-4 bg-gray-50 rounded-xl border border-gray-100 hover:bg-blue-50 hover:border-blue-100 transition-all">
                                                    <div className="flex items-center gap-3">
                                                        <div className="p-2 bg-white rounded-xl">
                                                            <svg className="h-5 w-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                                                                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                            </svg>
                                                        </div>
                                                        <span className="font-medium text-gray-800">{vaccine.name}</span>
                                                    </div>
                                                    <span className="font-medium text-blue-600">{vaccine.price.toLocaleString()} VND</span>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="text-center py-8 text-gray-500">No individual vaccines selected</div>
                                    )}
                                </div>

                                {/* Vaccine Combos */}
                                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="p-2 bg-blue-50 rounded-xl">
                                            <svg className="h-5 w-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                                                      d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                            </svg>
                                        </div>
                                        <h4 className="text-lg font-semibold text-gray-800">Vaccine Combos</h4>
                                    </div>
                                    {selectedBooking.comboList.length > 0 ? (
                                        <div className="space-y-4">
                                            {selectedBooking.comboList.map((combo) => (
                                                <div key={combo.id} 
                                                     className="p-4 bg-gray-50 rounded-xl border border-gray-100 hover:bg-blue-50 hover:border-blue-100 transition-all">
                                                    <div className="flex justify-between items-center mb-3">
                                                        <div className="flex items-center gap-3">
                                                            <div className="p-2 bg-white rounded-xl">
                                                                <svg className="h-5 w-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                                                                          d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                                                                </svg>
                                                            </div>
                                                            <span className="font-medium text-gray-800">{combo.name}</span>
                                                        </div>
                                                        <span className="px-4 py-1.5 rounded-full text-sm font-medium bg-green-50 text-green-700 border border-green-100">
                                                            {combo.discount}% off
                                                        </span>
                                                    </div>
                                                    <div className="flex justify-between items-center mb-3 px-4">
                                                        <span className="text-sm text-gray-500 line-through">
                                                            {combo.totalPrice.toLocaleString()} VND
                                                        </span>
                                                        <span className="text-lg font-medium text-green-600">
                                                            {combo.finalPrice.toLocaleString()} VND
                                                        </span>
                                                    </div>
                                                    <div className="mt-3 bg-white p-4 rounded-xl border border-gray-100">
                                                        <div className="flex items-center gap-2 mb-3">
                                                            <svg className="h-5 w-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                                                                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                            </svg>
                                                            <span className="font-medium text-gray-700">Included Vaccines:</span>
                                                        </div>
                                                        <div className="space-y-2">
                                                            {combo.vaccineResponeBooking.map((vaccine) => (
                                                                <div key={vaccine.id} 
                                                                     className="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
                                                                    <span className="text-gray-800">{vaccine.name}</span>
                                                                    <span className="text-blue-600">{vaccine.price.toLocaleString()} VND</span>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="text-center py-8 text-gray-500">No vaccine combos selected</div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="px-6 py-4 border-t border-gray-100 bg-white rounded-b-3xl flex justify-between items-center">
                    <button
                        onClick={() => setIsModalOpen(false)}
                        className="px-6 py-2.5 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all"
                    >
                        Close
                    </button>
                    {selectedBooking && selectedBooking.status === "Pending" && (
                        <button
                            onClick={() => handleCompleteBooking(selectedBooking)}
                            className="px-6 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all flex items-center gap-2"
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
                                    <span>Processing...</span>
                                </>
                            ) : (
                                <>
                                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                    </svg>
                                    <span>Complete Booking</span>
                                </>
                            )}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DetailAppoinment;
