import { useState } from "react";
import axios from "axios";
import {
  X,
  Calendar,
  Clock,
  User,
  Scissors,
  DollarSign,
  Save,
  Edit,
} from "lucide-react";

const DetailsAppointment = ({ booking, isOpen, onClose, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false); // Manage edit mode
  const [formData, setFormData] = useState({ ...booking }); // Form data initialized from booking
  const [error, setError] = useState(null); // Store errors if any

  if (!isOpen || !booking) return null; // Don't render if no data

  // Handle input changes in the form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission to update booking via API
  const handleSave = async () => {
    if (!formData.customerName || !formData.date || !formData.time || !formData.service || !formData.price) {
      setError("Please fill in all required fields.");
      return;
    }

    try {
      const updateData = {
        customerName: formData.customerName,
        date: formData.date,
        time: formData.time,
        service: formData.service,
        price: Number(formData.price) || 0,
        status: formData.status || "pending",
      };

      console.log("Sending data:", updateData);

      const response = await axios.put(
        `https://localhost:7280/api/Booking/update-booking/${formData.id}`,
        updateData
      );

      if (response.status === 200) {
        setIsEditing(false);
        onUpdate({ id: formData.id, ...updateData });
        setError(null);
        // Optionally reload or just update the parent state
      }
    } catch (err) {
      console.error("Error updating booking:", err?.response?.data || err);
      setError("Failed to update booking. Please check your data and try again.");
    }
  };

  // Cancel editing
  const handleCancelEdit = () => {
    setIsEditing(false);
    setFormData({ ...booking }); // Reset form to initial data
    setError(null);
  };

  // Determine status color
  const getStatusColor = (status) => {
    switch (status) {
      case "confirmed":
        return "bg-emerald-100 text-emerald-800";
      case "pending":
        return "bg-amber-100 text-amber-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
          <div className="sticky top-0 bg-white p-6 border-b border-gray-100 flex items-center justify-between z-10">
            <h2 className="text-xl font-bold text-gray-900">
              {isEditing ? "Edit Booking" : "Booking Details"}
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X size={20} className="text-gray-500" />
            </button>
          </div>
          <div className="p-6">
            {error && <p className="text-red-500 mb-4">{error}</p>}

            {/* View mode */}
            {!isEditing ? (
              <>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-full bg-teal-50 flex items-center justify-center">
                    <User className="w-8 h-8 text-teal-600" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">
                      {booking.customerName}
                    </h3>
                    <p className="text-sm text-gray-500">{booking.service}</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="bg-gray-50 p-4 rounded-xl">
                    <h4 className="text-sm font-semibold text-gray-500 mb-3">
                      Appointment Information
                    </h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-gray-600">
                          <Calendar className="w-4 h-4" />
                          <span>Date</span>
                        </div>
                        <span className="font-medium text-teal-600">
                          {booking.date}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-gray-600">
                          <Clock className="w-4 h-4" />
                          <span>Time</span>
                        </div>
                        <span className="font-medium text-teal-600">
                          {booking.time}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-xl">
                    <h4 className="text-sm font-semibold text-gray-500 mb-3">
                      Service Details
                    </h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-gray-600">
                          <Scissors className="w-4 h-4" />
                          <span>Service</span>
                        </div>
                        <span className="font-medium">{booking.service}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-gray-600">
                          <DollarSign className="w-4 h-4" />
                          <span>Price</span>
                        </div>
                        <span className="font-medium">
                          {booking.price.toLocaleString()} VND
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h4 className="text-sm font-semibold text-gray-500 mb-3">
                      Additional Details
                    </h4>
                    <div className="space-y-3">
                      <div>
                        <span className="text-sm text-gray-500">Status:</span>
                        <span
                          className={`mt-1 px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                            booking.status
                          )}`}
                        >
                          {booking.status}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              /* Edit mode */
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="text-sm font-semibold text-gray-500 mb-3">
                    Edit Appointment Information
                  </h4>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm text-gray-500">Customer Name:</label>
                      <input
                        type="text"
                        name="customerName"
                        value={formData.customerName}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-500">Date:</label>
                      <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-500">Time:</label>
                      <input
                        type="time"
                        name="time"
                        value={formData.time}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded-lg"
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-gray-500 mb-3">
                    Edit Service Details
                  </h4>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm text-gray-500">Service:</label>
                      <input
                        type="text"
                        name="service"
                        value={formData.service}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-500">Price (VND):</label>
                      <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-500">Status:</label>
                      <select
                        name="status"
                        value={formData.status}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded-lg"
                      >
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Control buttons */}
            <div className="flex justify-end gap-3 mt-8">
              {!isEditing ? (
                <>
                  <button
                    onClick={onClose}
                    className="px-5 py-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    Close
                  </button>
                  <button
                    onClick={() => setIsEditing(true)}
                    className="px-5 py-2.5 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors flex items-center gap-2"
                  >
                    <Edit size={18} />
                    Edit Booking
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={handleCancelEdit}
                    className="px-5 py-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    className="px-5 py-2.5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2"
                  >
                    <Save size={18} />
                    Save Changes
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailsAppointment;