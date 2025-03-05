import React, { useState } from "react";
import axios from "axios";
import { Plus, Clock } from "lucide-react";

const AddVaccineComponent = () => {
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [newVaccine, setNewVaccine] = useState({
    name: "",
    quantity: "",
    description: "",
    price: "",
    doesTimes: "",
    fromCountry: "",
    suggestAgeMin: "",
    suggestAgeMax: "",
    entryDate: "",
    timeExpired: "",
    status: "",
    addressId: 1,
    // Remove these fields from the state since they're not in the JSON
    // minimumIntervalDate: "",
    // maximumIntervalDate: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewVaccine((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDateChange = (field, value) => {
    setNewVaccine((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleAddVaccine = async () => {
    setLoading(true);
    setError(null);

    // Transform data to match the provided JSON field names and types
    const vaccineData = {
      name: newVaccine.name || "", // Ensure string, even if empty
      quantity: parseInt(newVaccine.quantity) || 0, // Default to 0 if empty or invalid
      description: newVaccine.description || "", // Ensure string, even if empty
      price: parseFloat(newVaccine.price) || 0.0, // Default to 0.0 if empty or invalid
      doesTimes: parseInt(newVaccine.doesTimes) || 0, // Default to 0 if empty or invalid
      fromCountry: newVaccine.fromCountry || "", // Ensure string, even if empty
      suggestAgeMin: parseInt(newVaccine.suggestAgeMin) || 0, // Default to 0 if empty or invalid
      suggestAgeMax: parseInt(newVaccine.suggestAgeMax) || 0, // Default to 0 if empty or invalid
      entryDate: newVaccine.entryDate ? new Date(newVaccine.entryDate).toISOString() : new Date().toISOString(), // Default to current date if empty
      timeExpired: newVaccine.timeExpired ? new Date(newVaccine.timeExpired).toISOString() : new Date().toISOString(), // Default to current date if empty
      status: newVaccine.status || "", // Ensure string, even if empty
      addressId: parseInt(newVaccine.addressId) || 1, // Default to 1 if empty or invalid
    };    
    console.log("Sending vaccine data:", vaccineData);

    try {
      const response = await axios.post(
        "https://localhost:7280/api/Vaccine/createVaccine",
        vaccineData
      );

      if (response.status === 201 || response.status === 200) {
        alert("Vaccine added successfully!");
        setShowForm(false);
        window.location.reload(); // Reload page after successful addition
      } else {
        alert("Failed to add vaccine.");
      }
    } catch (error) {
      console.error("Error adding vaccine:", error.response?.data || error);
      setError(
        error.response?.data?.message || "Unknown error occurred while adding vaccine."
      );
    } finally {
      setLoading(false);
    }
  };

  const DateInput = ({ label, value, onChange, icon, description }) => (
    <div className="relative">
      <label className="block text-sm font-medium text-gray-700 mb-1.5">
        {label}
      </label>
      <div className="relative group">
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 z-10">
          {icon}
        </div>
        <input
          type="date"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg bg-white focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition-all duration-300 shadow-sm group-hover:shadow-md"
        />
      </div>
      {description && (
        <p className="mt-1 text-xs text-gray-500">{description}</p>
      )}
    </div>
  );

  return (
    <>
      <button
        onClick={() => setShowForm(!showForm)}
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
              {[
                { name: "name", placeholder: "Vaccine Name", type: "text" },
                { name: "quantity", placeholder: "Quantity", type: "number" },
                { name: "description", placeholder: "Description", type: "text" },
                { name: "price", placeholder: "Price", type: "number" },
                { name: "doesTimes", placeholder: "Doses Times", type: "number" },
                { name: "fromCountry", placeholder: "Country", type: "text" },
                { name: "suggestAgeMin", placeholder: "Min Age", type: "number" },
                { name: "suggestAgeMax", placeholder: "Max Age", type: "number" },
                { name: "status", placeholder: "Status", type: "text" },
                { name: "addressId", placeholder: "Address ID", type: "number" },
                // Remove these fields from the form since they're not in the JSON
                // { name: "minimumIntervalDate", placeholder: "Min Interval Date (Optional)", type: "number" },
                // { name: "maximumIntervalDate", placeholder: "Max Interval Date (Optional)", type: "number" },
              ].map((field, index) => (
                <input
                  key={index}
                  type={field.type}
                  name={field.name}
                  placeholder={field.placeholder}
                  value={newVaccine[field.name]}
                  onChange={handleInputChange}
                  className="w-full p-2.5 border border-gray-300 rounded-md focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors"
                  min={field.type === "number" ? "0" : undefined}
                />
              ))}
            </div>

            <div className="grid grid-cols-2 gap-6 mb-6">
              <DateInput
                label="Entry Date"
                value={newVaccine.entryDate}
                onChange={(value) => handleDateChange("entryDate", value)}
                icon={<Clock className="w-5 h-5 text-rose-500" />}
                description="When vaccine was entered"
              />
              <DateInput
                label="Expired Time"
                value={newVaccine.timeExpired}
                onChange={(value) => handleDateChange("timeExpired", value)}
                icon={<Clock className="w-5 h-5 text-rose-500" />}
                description="When vaccine expires"
              />
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
                className="px-6 py-2.5 bg-gradient-to-r from-teal-500 to-emerald-500 text-white rounded-lg hover:from-teal-600 hover:to-emerald-600 transition-all duration-300 shadow-lg shadow-teal-500/20"
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