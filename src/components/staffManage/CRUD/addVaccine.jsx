import React, { useState } from "react";
import axios from "axios";
import { Plus, Clock } from "lucide-react";
import { toast } from "react-toastify";

const AddVaccineComponent = ({ onAddSuccess }) => {
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const initialVaccineState = {
    name: "",
    quantity: "",
    description: "",
    price: "",
    doesTimes: "",
    suggestAgeMin: "",
    suggestAgeMax: "",
    entryDate: "",
    timeExpired: "",
    addressId: "",
    status: "AVAILABLE",
    minimumIntervalDate: "",
    maximumIntervalDate: "",
    fromCountry: "",
  };

  const [newVaccine, setNewVaccine] = useState(initialVaccineState);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewVaccine((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const resetForm = () => {
    setNewVaccine(initialVaccineState);
    setError(null);
  };

  const handleAddVaccine = async () => {
    setLoading(true);
    setError(null);

    const vaccineData = {
      name: newVaccine.name || "",
      quantity: parseInt(newVaccine.quantity) || 0,
      description: newVaccine.description || "",
      price: parseFloat(newVaccine.price) || 0,
      doesTimes: parseInt(newVaccine.doesTimes) || 0,
      suggestAgeMin: parseInt(newVaccine.suggestAgeMin) || 0,
      suggestAgeMax: parseInt(newVaccine.suggestAgeMax) || 0,
      entryDate: newVaccine.entryDate 
        ? new Date(newVaccine.entryDate).toISOString() 
        : new Date().toISOString(),
      timeExpired: newVaccine.timeExpired 
        ? new Date(newVaccine.timeExpired).toISOString() 
        : new Date().toISOString(),
      addressId: parseInt(newVaccine.addressId) || 0,
      status: newVaccine.status || "AVAILABLE",
      minimumIntervalDate: parseInt(newVaccine.minimumIntervalDate) || 0,
      maximumIntervalDate: parseInt(newVaccine.maximumIntervalDate) || 0,
      fromCountry: newVaccine.fromCountry || "",
    };

    console.log("Sending vaccine data:", vaccineData);

    try {
      const response = await axios.post(
        "https://localhost:7280/api/Vaccine/create-vaccine",
        vaccineData
      );

      if (response.status === 201 || response.status === 200) {
        toast.success("Vaccine added successfully!", { autoClose: 3000 });
        setShowForm(false);
        resetForm();
        onAddSuccess();
      } else {
        toast.error("Failed to add vaccine.", { autoClose: 3000 });
      }
    } catch (error) {
      console.error("Error adding vaccine:", error.response?.data || error);
      const errorMessage = error.response?.data?.message || "Unknown error occurred while adding vaccine.";
      setError(errorMessage);
      toast.error(errorMessage, { autoClose: 3000 });
    } finally {
      setLoading(false);
    }
  };

  const DateInput = ({ label, name, value, onChange }) => (
    <div className="relative">
      <label className="block text-sm font-medium text-gray-700 mb-1.5">
        {label}
      </label>
      <div className="relative group">
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 z-10">
          <Clock size={18} className="text-gray-400" />
        </div>
        <input
          type="date"
          name={name}
          value={value}
          onChange={onChange}
          className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg bg-white focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition-all duration-300 shadow-sm group-hover:shadow-md"
        />
      </div>
    </div>
  );

  return (
    <>
      <button
        onClick={() => {
          setShowForm(!showForm);
          if (showForm) resetForm();
        }}
        className="bg-gradient-to-r from-teal-500 to-emerald-500 text-white px-4 py-2 rounded-full hover:from-teal-600 hover:to-emerald-600 transition-all duration-300 flex items-center gap-2 shadow-lg shadow-teal-500/20"
      >
        <Plus className="w-5 h-5" />
        Add Vaccine Stock
      </button>

      {showForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-2xl shadow-2xl w-[600px] max-w-[90%] text-center relative">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">
              Add Vaccines
            </h2>

            {error && <div className="mb-4 text-red-500 text-sm">{error}</div>}

            <div className="grid grid-cols-2 gap-4 mb-6">
              <input
                type="text"
                name="name"
                placeholder="Vaccine Name"
                value={newVaccine.name}
                onChange={handleInputChange}
                className="w-full p-2.5 border border-gray-300 rounded-md focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors"
              />
              <input
                type="number"
                name="quantity"
                placeholder="Quantity"
                value={newVaccine.quantity}
                onChange={handleInputChange}
                className="w-full p-2.5 border border-gray-300 rounded-md focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors"
                min="0"
              />
              <input
                type="text"
                name="description"
                placeholder="Description"
                value={newVaccine.description}
                onChange={handleInputChange}
                className="w-full p-2.5 border border-gray-300 rounded-md focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors"
              />
              <input
                type="number"
                name="price"
                placeholder="Price"
                value={newVaccine.price}
                onChange={handleInputChange}
                className="w-full p-2.5 border border-gray-300 rounded-md focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors"
                min="0"
                step="0.01"
              />
              <input
                type="number"
                name="doesTimes"
                placeholder="Doses Times"
                value={newVaccine.doesTimes}
                onChange={handleInputChange}
                className="w-full p-2.5 border border-gray-300 rounded-md focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors"
                min="0"
              />
              <input
                type="text"
                name="fromCountry"
                placeholder="Country"
                value={newVaccine.fromCountry}
                onChange={handleInputChange}
                className="w-full p-2.5 border border-gray-300 rounded-md focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors"
              />
              <input
                type="number"
                name="suggestAgeMin"
                placeholder="Min Age"
                value={newVaccine.suggestAgeMin}
                onChange={handleInputChange}
                className="w-full p-2.5 border border-gray-300 rounded-md focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors"
                min="0"
              />
              <input
                type="number"
                name="suggestAgeMax"
                placeholder="Max Age"
                value={newVaccine.suggestAgeMax}
                onChange={handleInputChange}
                className="w-full p-2.5 border border-gray-300 rounded-md focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors"
                min="0"
              />
              <input
                type="number"
                name="addressId"
                placeholder="Address ID"
                value={newVaccine.addressId}
                onChange={handleInputChange}
                className="w-full p-2.5 border border-gray-300 rounded-md focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors"
                min="0"
              />
              <input
                type="number"
                name="minimumIntervalDate"
                placeholder="Min Interval (days)"
                value={newVaccine.minimumIntervalDate}
                onChange={handleInputChange}
                className="w-full p-2.5 border border-gray-300 rounded-md focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors"
                min="0"
              />
              <input
                type="number"
                name="maximumIntervalDate"
                placeholder="Max Interval (days)"
                value={newVaccine.maximumIntervalDate}
                onChange={handleInputChange}
                className="w-full p-2.5 border border-gray-300 rounded-md focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors"
                min="0"
              />
              <DateInput
                label="Entry Date"
                name="entryDate"
                value={newVaccine.entryDate}
                onChange={(e) => handleInputChange({ target: { name: "entryDate", value: e.target.value } })}
              />
              <DateInput
                label="Expiration Date"
                name="timeExpired"
                value={newVaccine.timeExpired}
                onChange={(e) => handleInputChange({ target: { name: "timeExpired", value: e.target.value } })}
              />
            </div>

            <div className="flex items-center space-x-2 mb-6">
              <input
                type="checkbox"
                name="status"
                checked={newVaccine.status === "AVAILABLE"}
                onChange={(e) =>
                  setNewVaccine((prev) => ({
                    ...prev,
                    status: e.target.checked ? "AVAILABLE" : "UNAVAILABLE",
                  }))
                }
                className="w-5 h-5 accent-teal-500"
              />
              <label className="text-gray-700">AVAILABLE</label>
            </div>

            <div className="mt-6 flex justify-end space-x-4">
              <button
                onClick={() => setShowForm(false)}
                className="px-6 py-2.5 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAddVaccine}
                disabled={loading}
                className="px-6 py-2.5 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors disabled:bg-teal-300"
              >
                {loading ? "Adding..." : "Add Vaccine"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AddVaccineComponent;