import React, { useState, useEffect } from 'react';
import { updateData } from '../../../../Api/axios';
import { toast } from 'react-toastify';
import formatDate from '../../../../utils/FormDate';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const VaccineRescheduleModal = ({ currentAppointment, onClose, isOpen, setTrigger }) => {
  const [newDate, setNewDate] = useState('');
  const [newTime, setNewTime] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (currentAppointment?.vaccinationDate) {
      setNewDate(formatDate(currentAppointment.vaccinationDate))
    }
  }, [currentAppointment]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const data = {
        reschedule: newDate
      };
      const res = await updateData('VaccinesTracking/update-vaccine-user', currentAppointment.trackingID, data);
      if (res.status === 200) {
        toast.success("Appointment rescheduled successfully");
        setTrigger(prev => !prev);
        onClose();
      }
    } catch (error) {
      console.error("Error rescheduling appointment:", error);
      toast.error("Failed to reschedule appointment");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[500px] max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Reschedule Vaccination Appointment</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
            disabled={isSubmitting}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="mb-6">
          <div className="bg-gray-50 p-4 rounded-md mb-4">
            <h3 className="text-md font-medium text-gray-700 mb-2">Current Appointment</h3>
            <p className="text-gray-600">
              Vaccine: {currentAppointment?.vaccineName || 'Not specified'}
            </p>
            <p className="text-gray-600">
              Current Date: {currentAppointment?.vaccinationDate ? formatDate(currentAppointment.vaccinationDate) : 'Not specified'}
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                New Date
              </label>
              <input
                type="date"
                value={newDate}
                onChange={(e) => setNewDate(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                min={new Date().toISOString().split("T")[0]} // Ngày tối thiểu là hôm nay
                disabled={isSubmitting}
              />
            </div>
          </div>

          <div className="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Rescheduling...' : 'Reschedule'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VaccineRescheduleModal;
