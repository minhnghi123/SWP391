import React from "react";
import { X, User, Baby, Syringe, Package, Calendar, DollarSign } from "lucide-react";

const DetailAppoinment = ({ selectedBooking, setIsModalOpen, handleCompleteBooking, loading }) => {
  if (!selectedBooking) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-20 flex items-center justify-center z-50 p-2">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="sticky top-0 bg-white p-4 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-900">Booking Details</h2>
          <button
            onClick={() => setIsModalOpen(false)}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Close modal"
          >
            <X size={16} className="text-gray-500" />
          </button>
        </div>

        {/* Body */}
        <div className="p-4 grid grid-cols-12 gap-4 flex-1 overflow-y-auto">
          {/* Header Section */}
          <div className="col-span-12 flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-full bg-teal-50 flex items-center justify-center">
              <Calendar className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">Booking ID:{selectedBooking.id}</h3>
          </div>

          {/* Left Column - Booking Info, Parent Info, Children */}
          <div className="col-span-4 space-y-4">
            {/* Booking Information */}
            <div className="bg-gray-50 p-3 rounded-xl">
              <h4 className="text-xs font-semibold text-gray-500 mb-2">Booking Information</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-gray-600">
                    <Calendar className="w-3 h-3" />
                    Status
                  </div>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
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
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-gray-600">
                    <DollarSign className="w-3 h-3" />
                    Payment Method
                  </div>
                  <span className="font-medium">{selectedBooking.paymentMethod}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-gray-600">
                    <DollarSign className="w-3 h-3" />
                    Amount
                  </div>
                  <span className="font-medium text-teal-600">
                    {selectedBooking.amount.toLocaleString()} VND
                  </span>
                </div>
              </div>
            </div>

            {/* Parent Information */}
            <div className="bg-gray-50 p-3 rounded-xl">
              <h4 className="text-xs font-semibold text-gray-500 mb-2">Parent Information</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-gray-600">
                    <User className="w-3 h-3" />
                    Name
                  </div>
                  <span className="font-medium">{selectedBooking.parentName}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-gray-600">
                    <User className="w-3 h-3" />
                    Phone Number
                  </div>
                  <span className="font-medium">{selectedBooking.phoneNumber}</span>
                </div>
              </div>
            </div>

            {/* Children */}
            <div className="bg-gray-50 p-3 rounded-xl">
              <h4 className="text-xs font-semibold text-gray-500 mb-2">Children</h4>
              <div className="space-y-2 text-sm">
                {selectedBooking.childrenList.map((child) => (
                  <div
                    key={child.childId}
                    className="flex items-center justify-between p-2 bg-white rounded-md border border-gray-200"
                  >
                    <div className="flex items-center gap-1 text-gray-600">
                      <Baby className="w-3 h-3" />
                      <span>{child.name}</span>
                    </div>
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        child.gender === 1 ? "bg-blue-100 text-blue-800" : "bg-pink-100 text-pink-800"
                      }`}
                    >
                      {child.gender === 1 ? "Male" : "Female"}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Vaccines and Combos */}
          <div className="col-span-8">
            <div className="bg-gray-50 p-3 rounded-xl h-full space-y-4">
              {/* Vaccines */}
              <div>
                <h4 className="text-xs font-semibold text-gray-500 mb-2">Vaccines</h4>
                {selectedBooking.vaccineList.length > 0 ? (
                  <div className="space-y-2 text-sm">
                    {selectedBooking.vaccineList.map((vaccine) => (
                      <div
                        key={vaccine.id}
                        className="flex items-center justify-between p-2 bg-white rounded-md border border-gray-200"
                      >
                        <div className="flex items-center gap-1 text-gray-600">
                          <Syringe className="w-3 h-3" />
                          <span>{vaccine.name}</span>
                        </div>
                        <span className="font-medium text-teal-600">
                          {vaccine.price.toLocaleString()} VND
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-500">No individual vaccines selected</p>
                )}
              </div>

              {/* Vaccine Combos */}
              <div>
                <h4 className="text-xs font-semibold text-gray-500 mb-2">Vaccine Combos</h4>
                {selectedBooking.comboList.length > 0 ? (
                  <div className="space-y-2 text-sm">
                    {selectedBooking.comboList.map((combo) => (
                      <div
                        key={combo.id}
                        className="p-3 bg-white rounded-md border border-gray-200"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-1 text-gray-600">
                            <Package className="w-3 h-3" />
                            <span className="font-medium">{combo.name}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded-full">
                              {combo.discount}% off
                            </span>
                            <span className="font-medium text-teal-600">
                              {combo.finalPrice.toLocaleString()} VND
                            </span>
                          </div>
                        </div>
                        <div className="text-sm text-gray-500 line-through">
                          Original: {combo.totalPrice.toLocaleString()} VND
                        </div>
                        <div className="mt-2">
                          <h5 className="text-xs font-semibold text-gray-500 mb-1">
                            Included Vaccines:
                          </h5>
                          <div className="space-y-1">
                            {combo.vaccineResponeBooking.map((vaccine) => (
                              <div
                                key={vaccine.id}
                                className="flex items-center justify-between p-2 bg-gray-50 rounded-md"
                              >
                                <span className="text-gray-600">{vaccine.name}</span>
                                <span className="font-medium text-teal-600">
                                  {vaccine.price.toLocaleString()} VND
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-500">No vaccine combos selected</p>
                )}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="col-span-12 flex justify-end mt-2">
            <button
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-1 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors text-sm mr-2"
            >
              Close
            </button>
            {selectedBooking.status === "Pending" && (
              <button
                onClick={() => handleCompleteBooking(selectedBooking)}
                className="px-4 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm flex items-center gap-1"
                disabled={loading}
              >
                {loading ? "Loading..." : "Complete Booking"}
                {!loading && <Syringe size={14} />}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailAppoinment;