import React from 'react';
import { format } from 'date-fns';

const DetailsAppointments = ({ booking, isOpen, onClose }) => {
  const calculateTotalAmount = () => {
    const vaccineTotal = booking?.vaccineList?.reduce((sum, vaccine) => sum + vaccine?.price, 0) || 0;
    const comboTotal = booking?.comboList?.reduce((sum, combo) => sum + combo?.finalPrice, 0) || 0;
    return vaccineTotal + comboTotal;
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'success':
        return 'bg-green-100 text-green-800';
      case 'deposited':
        return 'bg-blue-100 text-blue-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatPrice = (price) => {
    return typeof price === 'number' ? `$${price.toFixed(2)}` : price;
  };

  if (!isOpen || !booking) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative bg-white rounded-xl max-w-5xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header with Close Button */}
        <div className="sticky top-0 bg-white px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Appointment Details</h2>
            <p className="text-sm text-gray-500">ID: #{booking.id}</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500 hover:bg-gray-100 rounded-full p-2 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-6 space-y-8">
          {/* Main Info Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-6">
              {/* Basic Info */}
              <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                <h3 className="font-semibold text-gray-900">Basic Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Parent Name</p>
                    <p className="font-medium text-gray-900">{booking.parentName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Phone Number</p>
                    <p className="font-medium text-gray-900">{booking.phoneNumber}</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Status</p>
                  <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium mt-1 ${getStatusColor(booking.status)}`}>
                    {booking.status}
                  </span>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Arrival Time</p>
                  <p className="font-medium text-gray-900">
                    {format(new Date(booking.arrivedAt), 'PPpp')}
                  </p>
                </div>
              </div>

              {/* Children List */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-3">Children</h3>
                <div className="space-y-3">
                  {booking.childrenList.map((child) => (
                    <div key={child.childId} 
                      className="bg-white p-3 rounded-lg border border-gray-200 flex justify-between items-center">
                      <div>
                        <p className="font-medium text-gray-900">{child.name}</p>
                        <p className="text-sm text-gray-500">ID: #{child.childId}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm ${
                        child.gender === 1 ? 'bg-blue-100 text-blue-800' : 'bg-pink-100 text-pink-800'
                      }`}>
                        {child.gender === 1 ? 'Male' : 'Female'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Advisory Details */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">Advisory Details</h3>
                <p className="text-gray-700 bg-white p-3 rounded-lg border border-gray-200">
                  {booking.advisoryDetail}
                </p>
              </div>

              {/* Payment Information */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-3">Payment Information</h3>
                <div className="space-y-3">
                  {booking.payment.map((payment, index) => (
                    <div key={payment.paymentId} 
                      className="bg-white p-3 rounded-lg border border-gray-200 flex justify-between items-center">
                      <div>
                        <p className="text-sm text-gray-500">
                          {index === 0 ? 'Deposit' : 'Remaining Payment'}
                        </p>
                        <p className="font-medium text-gray-900 capitalize">
                          {payment.paymentName}
                        </p>
                      </div>
                      <p className="font-semibold text-green-600">{payment.amount}</p>
                    </div>
                  ))}
                  <div className="bg-blue-50 p-3 rounded-lg border border-blue-200 flex justify-between items-center">
                    <p className="font-semibold text-blue-900">Total Amount</p>
                    <p className="font-bold text-blue-600">${calculateTotalAmount()}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Services Section */}
          <div className="border-t border-gray-200 pt-6">
            <h3 className="font-semibold text-gray-900 mb-4">Selected Services</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Individual Vaccines */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-3">Individual Vaccines</h4>
                <div className="space-y-2">
                  {booking.vaccineList.map((vaccine) => (
                    <div key={vaccine.id} 
                      className="bg-white p-3 rounded-lg border border-gray-200 flex justify-between items-center">
                      <p className="font-medium text-gray-900">{vaccine.name}</p>
                      <p className="font-semibold text-gray-700">{formatPrice(vaccine.price)}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Combo Packages */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-3">Combo Packages</h4>
                <div className="space-y-4">
                  {booking.comboList.map((combo) => (
                    <div key={combo.id} className="bg-white p-4 rounded-lg border border-gray-200">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <p className="font-medium text-gray-900">{combo.name}</p>
                          <p className="text-sm text-green-600">
                            {combo.discount}% Discount Applied
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-500 line-through">
                            ${combo.totalPrice}
                          </p>
                          <p className="font-bold text-blue-600">
                            ${combo.finalPrice}
                          </p>
                        </div>
                      </div>
                      {combo.vaccineResponeBooking && (
                        <div className="mt-2 pt-2 border-t border-gray-100">
                          <p className="text-sm text-gray-500 mb-2">Included Vaccines:</p>
                          <div className="space-y-1">
                            {combo.vaccineResponeBooking.map((vaccine) => (
                              <div key={vaccine.id} 
                                className="flex justify-between text-sm">
                                <span className="text-gray-700">{vaccine.name}</span>
                                <span className="text-gray-600">{formatPrice(vaccine.price)}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsAppointments;
