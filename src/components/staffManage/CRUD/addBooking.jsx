import React, { useState } from "react";
import axios from "axios";
import { PlusCircle, X, Loader2 } from "lucide-react";
import useAxios from "../../../utils/useAxios";
const url = import.meta.env.VITE_BASE_URL_DB;

const AddBooking = ({ onBookingAdded, onClose }) => {
  const [newBooking, setNewBooking] = useState({
    parentId: 0,
    advisoryDetail: "",
    totalPrice: 0,
    arrivedAt: new Date().toISOString(),
    paymentId: 0,
    childrenIds: [],
    vaccineIds: [],
    vaccineComboIds: [],
    bookingID: 0,
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const api = useAxios();


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newBooking.advisoryDetail.trim()) {
      setError("Advisory Detail is required.");
      return;
    }
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    const payload = {
      parentId: newBooking.parentId,
      advisoryDetail: newBooking.advisoryDetail,
      totalPrice: newBooking.totalPrice,
      arrivedAt: newBooking.arrivedAt,
      paymentId: newBooking.paymentId,
      childrenIds: newBooking.childrenIds.length ? newBooking.childrenIds : [0],
      vaccineIds: newBooking.vaccineIds.length ? newBooking.vaccineIds : [0],
      vaccineComboIds: newBooking.vaccineComboIds.length ? newBooking.vaccineComboIds : [0],
      bookingID: newBooking.bookingID,
    };

    try {
      console.log("Payload being sent:", payload);
      const response = await api.post(
        `${id}/Booking/add-booking`,
        payload
      );
      onBookingAdded(response.data);
      setSuccess("Booking added successfully!");
      setTimeout(() => {
        onClose();
      }, 1500);
    } catch (error) {
      console.error("Error adding booking:", error);
      console.log("Response data:", error.response?.data);
      setError(
        error.response?.data?.message || "Failed to add booking. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewBooking((prev) => ({
      ...prev,
      [name]:
        name === "parentId" || name === "totalPrice" || name === "paymentId" || name === "bookingID"
          ? Number(value)
          : value,
    }));
  };

  const handleArrayChange = (e, fieldName) => {
    const value = e.target.value;
    const arrayValue = value
      .split(",")
      .map((num) => Number(num.trim()))
      .filter((num) => !isNaN(num));
    setNewBooking((prev) => ({
      ...prev,
      [fieldName]: arrayValue,
    }));
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-60 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center p-5 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">Add New Booking</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Parent ID <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="parentId"
              value={newBooking.parentId}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Enter Parent ID"
              required
              min="0"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Advisory Detail <span className="text-red-500">*</span>
            </label>
            <textarea
              name="advisoryDetail"
              value={newBooking.advisoryDetail}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 resize-none"
              placeholder="Describe the booking details"
              required
              rows="2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Total Price <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="totalPrice"
              value={newBooking.totalPrice}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., 100.50"
              step="0.01"
              required
              min="0"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Arrived At <span className="text-red-500">*</span>
            </label>
            <input
              type="datetime-local"
              name="arrivedAt"
              value={newBooking.arrivedAt.slice(0, 16)}
              onChange={(e) =>
                setNewBooking((prev) => ({
                  ...prev,
                  arrivedAt: new Date(e.target.value).toISOString(),
                }))
              }
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Payment ID <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="paymentId"
              value={newBooking.paymentId}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Enter Payment ID"
              required
              min="0"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Children IDs (comma-separated)
            </label>
            <input
              type="text"
              value={newBooking.childrenIds.join(",")}
              onChange={(e) => handleArrayChange(e, "childrenIds")}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., 1, 2, 3 (leave blank for default)"
            />
            <p className="text-xs text-gray-500 mt-1">Defaults to [0] if empty</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Vaccine IDs (comma-separated)
            </label>
            <input
              type="text"
              value={newBooking.vaccineIds.join(",")}
              onChange={(e) => handleArrayChange(e, "vaccineIds")}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., 1, 2, 3 (leave blank for default)"
            />
            <p className="text-xs text-gray-500 mt-1">Defaults to [0] if empty</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Vaccine Combo IDs (comma-separated)
            </label>
            <input
              type="text"
              value={newBooking.vaccineComboIds.join(",")}
              onChange={(e) => handleArrayChange(e, "vaccineComboIds")}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., 1, 2, 3 (leave blank for default)"
            />
            <p className="text-xs text-gray-500 mt-1">Defaults to [0] if empty</p>
          </div>

          {error && (
            <p className="text-red-600 bg-red-50 p-2 rounded-lg text-sm">{error}</p>
          )}
          {success && (
            <p className="text-green-600 bg-green-50 p-2 rounded-lg text-sm">{success}</p>
          )}

          <div className="flex justify-end gap-3 pt-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors disabled:bg-blue-400"
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 size={18} className="animate-spin" />
              ) : (
                <PlusCircle size={18} />
              )}
              {isLoading ? "Adding..." : "Add Booking"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBooking;