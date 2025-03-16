import React, { useState } from "react";
import { Plus, Clock } from "lucide-react";
import { toast } from "react-toastify";
import useAxios from "../../../utils/useAxios";

const url = import.meta.env.VITE_BASE_URL_DB;

const AddVaccineComponent = ({ onAddSuccess }) => {
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const api = useAxios();

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
    const numericFields = [
      "quantity",
      "price",
      "doesTimes",
      "suggestAgeMin",
      "suggestAgeMax",
      "addressId",
      "minimumIntervalDate",
      "maximumIntervalDate",
    ];

    if (numericFields.includes(name)) {
      if (value && !/^[0-9]*\.?[0-9]*$/.test(value)) return;
      if (value.startsWith("-")) return;
    }

    setNewVaccine((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setNewVaccine(initialVaccineState);
    setError(null);
  };

  const validateForm = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const minAge = parseInt(newVaccine.suggestAgeMin) || 0;
    const maxAge = parseInt(newVaccine.suggestAgeMax) || 0;

    if (newVaccine.suggestAgeMin && newVaccine.suggestAgeMax && minAge >= maxAge) {
      return "Minimum age must be less than maximum age.";
    }

    if (newVaccine.entryDate) {
      const entryDate = new Date(newVaccine.entryDate);
      if (entryDate > today) {
        return "Entry date must be in the past or today.";
      }
    }

    if (newVaccine.timeExpired) {
      const expiredDate = new Date(newVaccine.timeExpired);
      if (expiredDate <= today) {
        return "Expiration date must be in the future.";
      }
    }

    return null;
  };

  const handleAddVaccine = async () => {
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

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
      status: newVaccine.status,
      minimumIntervalDate: parseInt(newVaccine.minimumIntervalDate) || 0,
      maximumIntervalDate: parseInt(newVaccine.maximumIntervalDate) || 0,
      fromCountry: newVaccine.fromCountry || "",
    };

    try {
      const response = await api.post(`${url}/Vaccine/create-vaccine`, vaccineData);
      if (response.status === 201 || response.status === 200) {
        toast.success("Vaccine added successfully!", { autoClose: 3000 });
        setShowForm(false);
        resetForm();
        onAddSuccess();
      } else {
        throw new Error("Failed to add vaccine.");
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Error adding vaccine.";
      setError(errorMessage);
      toast.error(errorMessage, { autoClose: 3000 });
    } finally {
      setLoading(false);
    }
  };

  const DateInput = ({ label, name, value, onChange }) => {
    const today = new Date().toISOString().split("T")[0];
    return (
      <div className="relative">
        <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
        <div className="relative">
          <Clock size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="date"
            name={name}
            value={value}
            onChange={onChange}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-teal-300 focus:border-teal-500 transition-all duration-200 hover:border-teal-400"
            max={name === "entryDate" ? today : undefined}
            min={name === "timeExpired" ? today : undefined}
          />
        </div>
      </div>
    );
  };

  return (
    <>
      <button
        onClick={() => {
          setShowForm(!showForm);
          if (showForm) resetForm();
        }}
        className="bg-gradient-to-r from-teal-500 to-emerald-500 text-white px-5 py-2.5 rounded-full hover:from-teal-600 hover:to-emerald-600 transition-all duration-300 flex items-center gap-2 shadow-md hover:shadow-lg"
      >
        <Plus className="w-5 h-5" />
        <span className="font-medium">Add Vaccine Stock</span>
      </button>

      {showForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-20 z-50">
          <div className="bg-white p-6 rounded-2xl shadow-2xl w-full max-w-lg transform transition-all duration-300 scale-100 hover:scale-[1.02]">
            <h2 className="text-2xl font-semibold text-gray-800 mb-5 text-center">Add New Vaccine</h2>
            {error && (
              <div className="mb-4 p-3 bg-red-100 text-red-700 text-sm rounded-md border border-red-300">{error}</div>
            )}

            <div className="grid grid-cols-2 gap-4 mb-6">
              <input
                type="text"
                name="name"
                placeholder="Vaccine Name"
                value={newVaccine.name}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-teal-300 focus:border-teal-500 transition-all duration-200 hover:border-teal-400 placeholder-gray-400"
              />
              <input
                type="number"
                name="quantity"
                placeholder="Quantity"
                value={newVaccine.quantity}
                onChange={handleInputChange}
                min="0"
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-teal-300 focus:border-teal-500 transition-all duration-200 hover:border-teal-400 placeholder-gray-400"
              />
              <input
                type="text"
                name="description"
                placeholder="Description"
                value={newVaccine.description}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-teal-300 focus:border-teal-500 transition-all duration-200 hover:border-teal-400 placeholder-gray-400"
              />
              <input
                type="number"
                name="price"
                placeholder="Price"
                value={newVaccine.price}
                onChange={handleInputChange}
                min="0"
                step="0.01"
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-teal-300 focus:border-teal-500 transition-all duration-200 hover:border-teal-400 placeholder-gray-400"
              />
              <input
                type="number"
                name="doesTimes"
                placeholder="Doses Times"
                value={newVaccine.doesTimes}
                onChange={handleInputChange}
                min="0"
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-teal-300 focus:border-teal-500 transition-all duration-200 hover:border-teal-400 placeholder-gray-400"
              />
              <input
                type="text"
                name="fromCountry"
                placeholder="Country"
                value={newVaccine.fromCountry}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-teal-300 focus:border-teal-500 transition-all duration-200 hover:border-teal-400 placeholder-gray-400"
              />
              <input
                type="number"
                name="suggestAgeMin"
                placeholder="Min Age"
                value={newVaccine.suggestAgeMin}
                onChange={handleInputChange}
                min="0"
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-teal-300 focus:border-teal-500 transition-all duration-200 hover:border-teal-400 placeholder-gray-400"
              />
              <input
                type="number"
                name="suggestAgeMax"
                placeholder="Max Age"
                value={newVaccine.suggestAgeMax}
                onChange={handleInputChange}
                min="0"
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-teal-300 focus:border-teal-500 transition-all duration-200 hover:border-teal-400 placeholder-gray-400"
              />
              <input
                type="number"
                name="addressId"
                placeholder="Address ID"
                value={newVaccine.addressId}
                onChange={handleInputChange}
                min="0"
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-teal-300 focus:border-teal-500 transition-all duration-200 hover:border-teal-400 placeholder-gray-400"
              />
              <input
                type="number"
                name="minimumIntervalDate"
                placeholder="Min Interval (days)"
                value={newVaccine.minimumIntervalDate}
                onChange={handleInputChange}
                min="0"
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-teal-300 focus:border-teal-500 transition-all duration-200 hover:border-teal-400 placeholder-gray-400"
              />
              <input
                type="number"
                name="maximumIntervalDate"
                placeholder="Max Interval (days)"
                value={newVaccine.maximumIntervalDate}
                onChange={handleInputChange}
                min="0"
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-teal-300 focus:border-teal-500 transition-all duration-200 hover:border-teal-400 placeholder-gray-400"
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

            <div className="flex items-center space-x-3 mb-6">
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
                className="w-5 h-5 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
              />
              <label className="text-gray-700 font-medium">Available</label>
            </div>

            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowForm(false)}
                className="px-5 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-all duration-200 shadow-sm hover:shadow-md"
              >
                Cancel
              </button>
              <button
                onClick={handleAddVaccine}
                disabled={loading}
                className="px-5 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-all duration-200 shadow-sm hover:shadow-md disabled:bg-teal-400 disabled:cursor-not-allowed"
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