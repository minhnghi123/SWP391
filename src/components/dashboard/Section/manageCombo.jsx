import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Plus, Search, Trash2 } from "lucide-react";

// Delete Vaccine Combo Button Component
const DeleteVaccineComboButton = ({ comboId, onDeleteSuccess }) => {
  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `https://localhost:7280/api/VaccineCombo/delete-vaccine-combo/${encodeURIComponent(comboId)}`
      );

      if (response.status === 200 || response.status === 204) {
        toast.success("Vaccine combo deleted successfully!", { autoClose: 2000 });
        if (onDeleteSuccess) onDeleteSuccess(comboId);
      } else {
        toast.error("Failed to delete vaccine combo.", { autoClose: 3000 });
      }
    } catch (error) {
      console.error("Error deleting vaccine combo:", error);
      toast.error("Error deleting vaccine combo.", { autoClose: 3000 });
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="p-1.5 bg-rose-50 text-rose-600 rounded-md hover:bg-rose-100 transition-colors"
      title="Delete Combo"
    >
      <Trash2 size={16} />
    </button>
  );
};

// Add Vaccine Combo Component (slightly modified for consistency)
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

  const fetchAllVaccines = async () => {
    try {
      setLoading(true);
      const response = await axios.get("https://localhost:7280/api/Vaccine/get-all-vaccines");
      setVaccines(response.data);
      setError(null);
    } catch (error) {
      console.error("Error fetching vaccines:", error);
      setError("Failed to fetch vaccines.");
    } finally {
      setLoading(false);
    }
  };

  const handleVaccineSelect = (vaccine) => {
    setNewVaccineCombo((prev) => {
      const updatedVaccines = prev.vaccines.some((v) => v.id === vaccine.id)
        ? prev.vaccines.filter((v) => v.id !== vaccine.id)
        : [...prev.vaccines, vaccine];
      return { ...prev, vaccines: updatedVaccines };
    });
  };

  const handleRemoveVaccine = (vaccineId) => {
    setNewVaccineCombo((prev) => ({
      ...prev,
      vaccines: prev.vaccines.filter((v) => v.id !== vaccineId),
    }));
  };

  const handleAddVaccineCombo = async () => {
    if (!newVaccineCombo.comboName.trim()) {
      setError("Combo name is required.");
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
      const response = await axios.post(
        "https://localhost:7280/api/VaccineCombo/create-vaccine-combo",
        vaccineComboData,
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.status === 201 || response.status === 200) {
        toast.success("Vaccine combo added successfully!", { autoClose: 2000 });
        onAddSuccess({
          ...vaccineComboData,
          id: response.data.id || Date.now(),
          vaccines: newVaccineCombo.vaccines,
        });
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
        toast.error("Failed to add vaccine combo.", { autoClose: 3000 });
      }
    } catch (error) {
      console.error("Error adding vaccine combo:", error);
      toast.error("Error adding vaccine combo.", { autoClose: 3000 });
    } finally {
      setLoading(false);
    }
  };

  const toggleShowVaccines = () => {
    if (!showVaccines && vaccines.length === 0) fetchAllVaccines();
    setShowVaccines((prev) => !prev);
  };

  return (
    <>
      <button
        onClick={() => setShowForm(!showForm)}
        className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors shadow-md"
      >
        <Plus size={18} />
        Add Combo
      </button>

      {showForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-xl shadow-2xl w-[600px] max-w-[90%] max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Add Vaccine Combo</h2>
            {error && <div className="mb-4 text-red-500 text-sm">{error}</div>}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <input
                type="text"
                name="comboName"
                placeholder="Combo Name *"
                value={newVaccineCombo.comboName}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                disabled={loading}
              />
              <input
                type="number"
                name="discount"
                placeholder="Discount (%) *"
                value={newVaccineCombo.discount}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                min="0"
                disabled={loading}
              />
              <input
                type="number"
                name="totalPrice"
                value={newVaccineCombo.totalPrice}
                readOnly
                className="w-full p-2 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed"
              />
              <input
                type="number"
                name="finalPrice"
                value={newVaccineCombo.finalPrice}
                readOnly
                className="w-full p-2 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed"
              />
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="status"
                  checked={newVaccineCombo.status === "AVAILABLE"}
                  onChange={handleStatusChange}
                  className="w-4 h-4"
                  disabled={loading}
                />
                <label className="text-sm text-gray-600">Available</label>
              </div>
            </div>

            <div className="mb-6">
              <button
                onClick={toggleShowVaccines}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
                disabled={loading}
              >
                {showVaccines ? "Hide Vaccines" : "Show Vaccines"}
              </button>

              {showVaccines && (
                <div className="mt-4">
                  <h4 className="text-sm font-medium text-gray-700">Available Vaccines:</h4>
                  {loading ? (
                    <p className="text-gray-500">Loading vaccines...</p>
                  ) : error ? (
                    <p className="text-red-500">{error}</p>
                  ) : vaccines.length > 0 ? (
                    <div className="mt-2 max-h-40 overflow-y-auto space-y-2">
                      {vaccines.map((vaccine) => (
                        <div key={vaccine.id} className="flex items-center">
                          <input
                            type="checkbox"
                            checked={newVaccineCombo.vaccines.some((v) => v.id === vaccine.id)}
                            onChange={() => handleVaccineSelect(vaccine)}
                            className="w-4 h-4"
                            disabled={loading}
                          />
                          <span className="ml-2 text-sm text-gray-600">
                            {vaccine.name} (ID: {vaccine.id}, Price: {vaccine.price})
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
                  <h4 className="text-sm font-medium text-gray-700">Selected Vaccines:</h4>
                  <ul className="mt-2 space-y-2">
                    {newVaccineCombo.vaccines.map((vaccine) => (
                      <li key={vaccine.id} className="flex justify-between items-center bg-gray-50 p-2 rounded">
                        <span className="text-sm text-gray-600">
                          {vaccine.name} (ID: {vaccine.id}, Price: {vaccine.price})
                        </span>
                        <button
                          onClick={() => handleRemoveVaccine(vaccine.id)}
                          className="text-red-500 hover:text-red-700 text-sm"
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

            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowForm(false)}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors disabled:bg-gray-300"
                disabled={loading}
              >
                Cancel
              </button>
              <button
                onClick={handleAddVaccineCombo}
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors disabled:bg-indigo-400"
                disabled={loading}
              >
                {loading ? "Adding..." : "Add Combo"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

// Main Combo Vaccine Component
const ComboVaccine = () => {
  const [combos, setCombos] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDataAsync();
  }, []);

  const fetchDataAsync = async () => {
    try {
      setLoading(true);
      const response = await axios.get("https://localhost:7280/api/VaccineCombo/get-all-vaccine-combo");
      setCombos(response.data || []);
      setError(null);
    } catch (error) {
      console.error("Error fetching combos:", error);
      setError("Failed to fetch vaccine combos. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => setSearch(e.target.value);

  const handleAddSuccess = (newCombo) => {
    setCombos((prev) => [...prev, newCombo]);
  };

  const handleDeleteSuccess = (comboId) => {
    setCombos((prev) => prev.filter((combo) => combo.id !== comboId));
  };

  const filteredCombos = combos.filter((combo) =>
    combo.comboName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="max-w-6xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold text-gray-800">Combo Vaccine Management</h1>
          <AddVaccineComboComponent onAddSuccess={handleAddSuccess} />
        </div>

        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search by combo name..."
            value={search}
            onChange={handleSearch}
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
          />
        </div>

        {loading && (
          <div className="text-center py-10">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto"></div>
            <p className="mt-2 text-gray-600">Loading combos...</p>
          </div>
        )}
        {error && <p className="text-center text-red-600 bg-red-50 p-3 rounded-md">{error}</p>}

        {!loading && !error && (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
              <thead className="bg-indigo-50">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Name</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Discount</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Total Price</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Final Price</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredCombos.length > 0 ? (
                  filteredCombos.map((combo) => (
                    <tr key={combo.id} className="border-b hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 text-sm text-gray-800">{combo.comboName}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{combo.discount}%</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{combo.totalPrice}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{combo.finalPrice}</td>
                      <td className="px-6 py-4 text-sm">
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            combo.status === "AVAILABLE"
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {combo.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        <DeleteVaccineComboButton
                          comboId={combo.id}
                          onDeleteSuccess={handleDeleteSuccess}
                        />
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                      No combos found.
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

export default ComboVaccine;