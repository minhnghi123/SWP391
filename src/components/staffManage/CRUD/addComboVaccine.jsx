import React, { useState, useEffect } from "react";
import axios from "axios";
import { Plus } from "lucide-react";
import { toast } from "react-toastify";

const AddVaccineComboComponent = ({ onAddSuccess }) => {
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showVaccines, setShowVaccines] = useState(false);
  const [vaccines, setVaccines] = useState([]);

  const [newVaccineCombo, setNewVaccineCombo] = useState({
    comboName: "",
    discount: "",
    totalPrice: 0,
    finalPrice: 0,
    status: "AVAILABLE",
    vaccines: [],
  });

  const calculateTotalPrice = (vaccines) => {
    return vaccines.reduce((total, vaccine) => total + (vaccine.price || 0), 0);
  };

  const calculateFinalPrice = (totalPrice, discount) => {
    return totalPrice * (1 - discount / 100);
  };

  useEffect(() => {
    const total = calculateTotalPrice(newVaccineCombo.vaccines);
    const discount = parseFloat(newVaccineCombo.discount) || 0;
    const final = calculateFinalPrice(total, discount);

    setNewVaccineCombo((prev) => ({
      ...prev,
      totalPrice: total,
      finalPrice: final,
    }));
  }, [newVaccineCombo.vaccines, newVaccineCombo.discount]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "discount" && value !== "") {
      const numValue = Number(value);
      if (numValue < 0) return;
    }

    setNewVaccineCombo((prev) => ({
      ...prev,
      [name]: value || "",
    }));
  };

  const handleStatusChange = (e) => {
    setNewVaccineCombo((prev) => ({
      ...prev,
      status: e.target.checked ? "AVAILABLE" : "UNAVAILABLE",
    }));
  };

  const fetchVaccineById = async (id) => {
    try {
      const response = await axios.get(
        `https://localhost:7280/api/Vaccine/get-vaccine-by-id/${id}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching vaccine:", error);
      throw new Error("Failed to fetch vaccine details");
    }
  };

  const fetchAllVaccines = async () => {
    try {
      setLoading(true);
      const response = await axios.get("https://localhost:7280/api/Vaccine/get-all-vaccines");
      setVaccines(response.data);
      setError(null);
    } catch (error) {
      console.error("Error fetching vaccines:", error);
      setError("Failed to fetch vaccines. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleAddVaccineToCombo = async (vaccineId) => {
    const id = parseInt(vaccineId);
    if (!isNaN(id) && id >= 0 && !newVaccineCombo.vaccines.some((v) => v.id === id)) {
      try {
        setLoading(true);
        const vaccineData = await fetchVaccineById(id);
        setNewVaccineCombo((prev) => ({
          ...prev,
          vaccines: [...prev.vaccines, vaccineData],
        }));
      } catch (error) {
        setError("Could not add vaccine: " + error.message);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleRemoveVaccine = (vaccineId) => {
    setNewVaccineCombo((prev) => ({
      ...prev,
      vaccines: prev.vaccines.filter((v) => v.id !== vaccineId),
    }));
  };

  const handleVaccineSelect = (vaccine) => {
    setNewVaccineCombo((prev) => {
      const updatedVaccines = prev.vaccines.some((v) => v.id === vaccine.id)
        ? prev.vaccines.filter((v) => v.id !== vaccine.id)
        : [...prev.vaccines, vaccine];
      return { ...prev, vaccines: updatedVaccines };
    });
  };

  const handleAddVaccine = async () => {
    console.log("handleAddVaccine called"); // Debug log to confirm function is triggered

    if (!newVaccineCombo.comboName.trim()) {
      setError("Combo name is required and cannot be empty.");
      return;
    }
    if (newVaccineCombo.discount === "" || isNaN(parseInt(newVaccineCombo.discount))) {
      setError("Discount is required and must be a valid number.");
      return;
    }
    if (newVaccineCombo.vaccines.length === 0) {
      setError("At least one vaccine must be selected.");
      return;
    }
    if (newVaccineCombo.totalPrice < 0) {
      setError("Total Price cannot be negative.");
      return;
    }

    setLoading(true);
    setError(null);

    const vaccineComboData = {
      comboName: newVaccineCombo.comboName.trim(),
      discount: parseInt(newVaccineCombo.discount) || 0,
      totalPrice: Number(newVaccineCombo.totalPrice),
      finalPrice: Number(newVaccineCombo.finalPrice),
      status: newVaccineCombo.status,
      vaccines: newVaccineCombo.vaccines.map((vaccine) => vaccine.id),
    };

    try {
      console.log("Sending API request with data:", vaccineComboData); // Debug log
      const response = await axios.post(
        "https://localhost:7280/api/VaccineCombo/create-vaccine-combo",
        vaccineComboData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("API response:", response); // Debug log

      if (response.status === 201 || response.status === 200) {
        toast.success("Vaccine combo added successfully!");
        if (typeof onAddSuccess === "function") {
          onAddSuccess({
            ...vaccineComboData,
            id: response.data.id || Date.now(),
            vaccines: newVaccineCombo.vaccines,
          });
        }
        // Reset form after successful submission
        setNewVaccineCombo({
          comboName: "",
          discount: "",
          totalPrice: 0,
          finalPrice: 0,
          status: "AVAILABLE",
          vaccines: [],
        });
        setShowForm(false);
      } else {
        toast.error("Failed to add vaccine combo.");
      }
    } catch (error) {
      console.error("Error adding vaccine combo:", error.response?.data || error);
      toast.error(
        error.response?.data?.message || "Unknown error occurred while adding vaccine combo."
      );
    } finally {
      setLoading(false);
    }
  };

  const toggleShowVaccines = () => {
    if (!showVaccines && vaccines.length === 0) {
      fetchAllVaccines();
    }
    setShowVaccines((prev) => !prev);
  };

  return (
    <>
      <button
        onClick={() => setShowForm(!showForm)}
        className="bg-gradient-to-r from-teal-500 to-emerald-500 text-white px-4 py-2 rounded-full hover:from-teal-600 hover:to-emerald-600 transition-all duration-300 flex items-center gap-2 shadow-lg shadow-teal-500/20"
      >
        <Plus className="w-5 h-5" />
        Add Combo Vaccine Stock
      </button>

      {showForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-2xl shadow-2xl w-[600px] max-w-[90%] max-h-[90vh] overflow-y-auto text-center relative">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Add Combo Vaccines</h2>

            {error && <div className="mb-4 text-red-500 text-sm">{error}</div>}

            <div className="grid grid-cols-2 gap-4 mb-6">
              <input
                type="text"
                name="comboName"
                placeholder="Combo Vaccine Name"
                value={newVaccineCombo.comboName}
                onChange={handleInputChange}
                className="w-full p-2.5 border border-gray-300 rounded-md focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors"
                required
              />
              <input
                type="number"
                name="discount"
                placeholder="Discount (%)"
                value={newVaccineCombo.discount}
                onChange={handleInputChange}
                className="w-full p-2.5 border border-gray-300 rounded-md focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors"
                min="0"
                required
              />
              <input
                type="number"
                name="totalPrice"
                placeholder="Total Price (Auto-calculated)"
                value={newVaccineCombo.totalPrice}
                readOnly
                className="w-full p-2.5 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed"
              />
              <input
                type="number"
                name="finalPrice"
                placeholder="Final Price (Auto-calculated)"
                value={newVaccineCombo.finalPrice}
                readOnly
                className="w-full p-2.5 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed"
              />
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="status"
                  checked={newVaccineCombo.status === "AVAILABLE"}
                  onChange={handleStatusChange}
                  className="w-5 h-5 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                />
                <label className="text-sm text-gray-600">AVAILABLE</label>
              </div>
            </div>

            <div className="mb-6">
              <div className="mt-4">
                <button
                  onClick={toggleShowVaccines}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  {showVaccines ? "Hide Vaccines" : "Show Vaccines"}
                </button>
              </div>

              {showVaccines && (
                <div className="mt-4">
                  <h4 className="text-sm font-medium">Available Vaccines:</h4>
                  {loading ? (
                    <p className="text-gray-500">Loading vaccines...</p>
                  ) : error ? (
                    <p className="text-red-500">{error}</p>
                  ) : vaccines.length > 0 ? (
                    <div className="grid grid-cols-1 gap-2 mt-2 max-h-40 overflow-y-auto">
                      {vaccines.map((vaccine) => (
                        <div key={vaccine.id} className="flex items-center">
                          <input
                            type="checkbox"
                            checked={newVaccineCombo.vaccines.some((v) => v.id === vaccine.id)}
                            onChange={() => handleVaccineSelect(vaccine)}
                            className="w-5 h-5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                          <span className="ml-2 text-sm text-gray-600">
                            {vaccine.name} (ID: {vaccine.id}) (Price: {vaccine.price})
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500">No vaccines available.</p>
                  )}
                </div>
              )}

              {newVaccineCombo.vaccines.length > 0 && (
                <div className="mt-4">
                  <h4 className="text-sm font-medium">Selected Vaccines:</h4>
                  <ul className="mt-2 space-y-2">
                    {newVaccineCombo.vaccines.map((vaccine) => (
                      <li
                        key={vaccine.id}
                        className="flex justify-between items-center bg-gray-100 p-2 rounded"
                      >
                        <span>
                          ID: {vaccine.id} {vaccine.name ? `- ${vaccine.name}` : ""} (Price:{" "}
                          {vaccine.price})
                        </span>
                        <button
                          onClick={() => handleRemoveVaccine(vaccine.id)}
                          className="text-red-500 hover:text-red-700"
                          disabled={loading}
                        >
                          Remove
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="mt-6 flex justify-end space-x-4">
              <button
                onClick={() => setShowForm(false)}
                className="px-6 py-2.5 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                disabled={loading}
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  console.log("Add button clicked"); // Debug log
                  handleAddVaccine();
                }}
                disabled={loading}
                className="px-6 py-2.5 bg-gradient-to-r from-teal-500 to-emerald-500 text-white rounded-lg hover:from-teal-600 hover:to-emerald-600 transition-all duration-300 shadow-lg shadow-teal-500/20 disabled:from-teal-300 disabled:to-emerald-300"
              >
                {loading ? "Adding..." : "Add Vaccine Combo"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AddVaccineComboComponent;