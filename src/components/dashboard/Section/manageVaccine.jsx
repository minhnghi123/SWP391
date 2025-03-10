import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Plus, Search, Trash2, Clock } from "lucide-react";

// Delete Vaccine Button Component
const DeleteVaccineButton = ({ vaccineId, onDeleteSuccess }) => {
  const handleDeleteVaccine = async () => {
    try {
      const response = await axios.delete(
        `https://localhost:7280/api/Vaccine/delete-vaccine-by-id/${encodeURIComponent(vaccineId)}`
      );

      if (response.status === 200 || response.status === 204) {
        toast.success("Vaccine deleted successfully!", { autoClose: 2000 });
        if (onDeleteSuccess) onDeleteSuccess(vaccineId);
      } else {
        toast.error("Failed to delete vaccine.", { autoClose: 3000 });
      }
    } catch (error) {
      console.error("Error deleting vaccine:", error);
      toast.error("Error deleting vaccine.", { autoClose: 3000 });
    }
  };

  return (
    <button
      onClick={handleDeleteVaccine}
      className="p-1.5 bg-rose-50 text-rose-600 rounded-md hover:bg-rose-100 transition-colors"
      title="Delete Vaccine"
    >
      <Trash2 size={16} />
    </button>
  );
};

// Add Vaccine Component
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
    fromCountry: "",
    suggestAgeMin: "",
    suggestAgeMax: "",
    entryDate: "",
    timeExpired: "",
    status: "ACTIVE",
    addressId: 1,
    minimumIntervalDate: "",
    maximumIntervalDate: "",
  };

  const [newVaccine, setNewVaccine] = useState(initialVaccineState);

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

  const resetForm = () => {
    setNewVaccine(initialVaccineState);
    setError(null);
  };

  const handleAddVaccine = async () => {
    if (!newVaccine.name.trim()) {
      setError("Vaccine name is required.");
      return;
    }

    setLoading(true);
    setError(null);

    const vaccineData = {
      name: newVaccine.name.trim(),
      quantity: parseInt(newVaccine.quantity) || 0,
      description: newVaccine.description || "",
      price: parseFloat(newVaccine.price) || 0.0,
      doesTimes: parseInt(newVaccine.doesTimes) || 0,
      fromCountry: newVaccine.fromCountry || "",
      suggestAgeMin: parseInt(newVaccine.suggestAgeMin) || 0,
      suggestAgeMax: parseInt(newVaccine.suggestAgeMax) || 0,
      entryDate: newVaccine.entryDate ? new Date(newVaccine.entryDate).toISOString() : new Date().toISOString(),
      timeExpired: newVaccine.timeExpired ? new Date(newVaccine.timeExpired).toISOString() : new Date().toISOString(),
      status: newVaccine.status || "ACTIVE",
      addressId: parseInt(newVaccine.addressId) || 1,
      minimumIntervalDate: parseInt(newVaccine.minimumIntervalDate) || 0,
      maximumIntervalDate: parseInt(newVaccine.maximumIntervalDate) || 0,
    };

    try {
      const response = await axios.post(
        "https://localhost:7280/api/Vaccine/create-vaccine",
        vaccineData
      );

      if (response.status === 201 || response.status === 200) {
        toast.success("Vaccine added successfully!", { autoClose: 2000 });
        setShowForm(false);
        resetForm();
        onAddSuccess(response.data);
      } else {
        toast.error("Failed to add vaccine.", { autoClose: 3000 });
      }
    } catch (error) {
      console.error("Error adding vaccine:", error.response?.data || error);
      setError(error.response?.data?.message || "Error adding vaccine.");
      toast.error(error.response?.data?.message || "Error adding vaccine.", { autoClose: 3000 });
    } finally {
      setLoading(false);
    }
  };

  const DateInput = ({ label, value, onChange, icon, description }) => (
    <div className="relative">
      <label className="block text-sm font-medium text-gray-700 mb-1.5">{label}</label>
      <div className="relative group">
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 z-10">{icon}</div>
        <input
          type="date"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-300 shadow-sm group-hover:shadow-md"
          disabled={loading}
        />
      </div>
      {description && <p className="mt-1 text-xs text-gray-500">{description}</p>}
    </div>
  );

  return (
    <>
      <button
        onClick={() => {
          setShowForm(!showForm);
          if (showForm) resetForm();
        }}
        className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors shadow-md"
      >
        <Plus size={18} />
        Add Vaccine
      </button>

      {showForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-2xl shadow-2xl w-[600px] max-w-[90%] max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Add New Vaccine</h2>

            {error && <div className="mb-4 text-red-500 text-sm text-center">{error}</div>}

            <div className="grid grid-cols-2 gap-4 mb-6">
              {[
                { name: "name", placeholder: "Vaccine Name *", type: "text" },
                { name: "quantity", placeholder: "Quantity", type: "number" },
                { name: "description", placeholder: "Description", type: "text" },
                { name: "price", placeholder: "Price", type: "number" },
                { name: "doesTimes", placeholder: "Dose Times", type: "number" },
                { name: "fromCountry", placeholder: "From Country", type: "text" },
                { name: "suggestAgeMin", placeholder: "Min Age", type: "number" },
                { name: "suggestAgeMax", placeholder: "Max Age", type: "number" },
                { name: "status", placeholder: "Status (e.g., ACTIVE)", type: "text" },
                { name: "addressId", placeholder: "Address ID", type: "number" },
                { name: "minimumIntervalDate", placeholder: "Min Interval (days)", type: "number" },
                { name: "maximumIntervalDate", placeholder: "Max Interval (days)", type: "number" },
              ].map((field) => (
                <input
                  key={field.name}
                  type={field.type}
                  name={field.name}
                  placeholder={field.placeholder}
                  value={newVaccine[field.name]}
                  onChange={handleInputChange}
                  className="w-full p-2.5 border border-gray-300 rounded-md focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-colors disabled:bg-gray-100"
                  min={field.type === "number" ? "0" : undefined}
                  disabled={loading}
                />
              ))}
            </div>

            <div className="grid grid-cols-2 gap-6 mb-6">
              <DateInput
                label="Entry Date"
                value={newVaccine.entryDate}
                onChange={(value) => handleDateChange("entryDate", value)}
                icon={<Clock className="w-5 h-5 text-indigo-500" />}
                description="Date vaccine was received"
              />
              <DateInput
                label="Expiration Date"
                value={newVaccine.timeExpired}
                onChange={(value) => handleDateChange("timeExpired", value)}
                icon={<Clock className="w-5 h-5 text-indigo-500" />}
                description="Date vaccine expires"
              />
            </div>

            <div className="flex justify-end gap-4">
              <button
                onClick={() => {
                  setShowForm(false);
                  resetForm();
                }}
                className="px-6 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors disabled:bg-gray-300"
                disabled={loading}
              >
                Cancel
              </button>
              <button
                onClick={handleAddVaccine}
                className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors disabled:bg-indigo-400"
                disabled={loading}
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

// Main Vaccine Component
const Vaccine = () => {
  const [vaccines, setVaccines] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDataAsync();
  }, []);

  const fetchDataAsync = async () => {
    try {
      setLoading(true);
      const response = await axios.get("https://localhost:7280/api/Vaccine/get-all-vaccines");
      setVaccines(response.data || []);
      setError(null);
    } catch (error) {
      console.error("Error fetching vaccines:", error);
      setError("Failed to fetch vaccines. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => setSearch(e.target.value);

  const handleAddSuccess = (newVaccine) => {
    setVaccines((prev) => [...prev, newVaccine]);
  };

  const handleDeleteSuccess = (vaccineId) => {
    setVaccines((prev) => prev.filter((vaccine) => vaccine.id !== vaccineId));
  };

  const filteredVaccines = vaccines.filter((vaccine) =>
    vaccine.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="max-w-6xl mx-auto bg-white p-6 rounded-lg shadow-md">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold text-gray-800">Vaccine Management</h1>
          <AddVaccineComponent onAddSuccess={handleAddSuccess} />
        </div>

        {/* Search Bar */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search by vaccine name..."
            value={search}
            onChange={handleSearch}
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
          />
        </div>

        {/* Loading/Error States */}
        {loading && (
          <div className="text-center py-10">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto"></div>
            <p className="mt-2 text-gray-600">Loading vaccines...</p>
          </div>
        )}
        {error && <p className="text-center text-red-600 bg-red-50 p-3 rounded-md">{error}</p>}

        {/* Vaccines Table */}
        {!loading && !error && (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
              <thead className="bg-indigo-50">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Name</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Quantity</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Description</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Price</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Dose Times</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">From Country</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredVaccines.length > 0 ? (
                  filteredVaccines.map((vaccine) => (
                    <tr key={vaccine.id} className="border-b hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 text-sm text-gray-800">{vaccine.name}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{vaccine.quantity}</td>
                      <td className="px-6 py-4 text-sm text-gray-600 max-w-xs truncate">{vaccine.description}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{vaccine.price}</td>
                      <td className="px-6 py-4 text-sm text-gray-800">{vaccine.doesTimes}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{vaccine.fromCountry}</td>
                      <td className="px-6 py-4 text-sm">
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            vaccine.status === "AVAILABLE" || vaccine.status === "ACTIVE"
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {vaccine.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        <DeleteVaccineButton
                          vaccineId={vaccine.id}
                          onDeleteSuccess={handleDeleteSuccess}
                        />
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="px-6 py-4 text-center text-gray-500">
                      No vaccines found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Vaccine;