import React, { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import { toast } from "react-toastify";
import useAxios from "../../../../utils/useAxios";
const url = import.meta.env.VITE_BASE_URL_DB;

const AddVaccineComboComponent = ({ onAddSuccess }) => {
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showVaccines, setShowVaccines] = useState(false);
  const [vaccines, setVaccines] = useState([]);
  const api = useAxios();

  const [newVaccineCombo, setNewVaccineCombo] = useState({
    comboName: "",
    discount: "",
    totalPrice: 0,
    finalPrice: 0,
    status: "Instock",
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
      status: e.target.checked ? "Instock" : "Outstock", // Sửa lại để có thể chọn trạng thái khác
    }));
  };

  const fetchAllVaccines = async () => {
    try {
      setLoading(true);
      const response = await api.get(`${url}/Vaccine/get-all-vaccines-admin`);
      setVaccines(response.data);
      setError(null);
    } catch (error) {
      console.error("Error fetching vaccines:", error);
      setError("Failed to fetch vaccines. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveVaccine = (vaccineId) => {
    setNewVaccineCombo((prev) => ({
      ...prev,
      vaccines: prev.vaccines.filter((v) => v.id !== vaccineId),
    }));
  };

  const handleVaccineSelect = (vaccine) => {
    // Không cho phép chọn vaccine có status "Outstock"
    if (vaccine.status === "Outstock") {
      toast.error("Cannot select an 'Outstock' vaccine.");
      return;
    }

    setNewVaccineCombo((prev) => {
      const updatedVaccines = prev.vaccines.some((v) => v.id === vaccine.id)
        ? prev.vaccines.filter((v) => v.id !== vaccine.id)
        : [...prev.vaccines, vaccine];
      return { ...prev, vaccines: updatedVaccines };
    });
  };

  const handleAddVaccine = async () => {
    console.log("handleAddVaccine called");

    if (!newVaccineCombo.comboName.trim()) {
      setError("Combo name is required and cannot be empty.");
      return;
    }
    if (
      newVaccineCombo.discount === "" ||
      isNaN(parseInt(newVaccineCombo.discount))
    ) {
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
      console.log("Sending API request with data:", vaccineComboData);
      const response = await api.post(
        `${url}/VaccineCombo/create-vaccine-combo`,
        vaccineComboData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("API response:", response);

      if (response.status === 201 || response.status === 200) {
        toast.success("Vaccine combo added successfully!");
        if (typeof onAddSuccess === "function") {
          onAddSuccess({
            ...vaccineComboData,
            id: response.data.id || Date.now(),
            vaccines: newVaccineCombo.vaccines,
          });
        }
        setNewVaccineCombo({
          comboName: "",
          discount: "",
          totalPrice: 0,
          finalPrice: 0,
          status: "Instock",
          vaccines: [],
        });
        setShowForm(false);
      } else {
        toast.error("Failed to add vaccine combo.");
      }
    } catch (error) {
      console.error(
        "Error adding vaccine combo:",
        error.response?.data || error
      );
      toast.error(
        error.response?.data?.message ||
          "Unknown error occurred while adding vaccine combo."
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
        className="bg-gradient-to-r from-blue-500 to-blue-500 text-white px-5 py-2.5 rounded-full hover:from-blue-600 hover:to-blue-600 transition-all duration-300 flex items-center gap-2 shadow-md hover:shadow-lg"
      >
        <Plus className="w-5 h-5" />
        <span className="font-medium">Add Combo Vaccine Stock</span>
      </button>

      {showForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-2xl shadow-2xl w-[600px] max-w-[90%] max-h-[90vh] overflow-y-auto text-center relative">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">
              Add Combo Vaccines
            </h2>

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
                  checked={newVaccineCombo.status === "Instock"}
                  onChange={handleStatusChange}
                  className="w-5 h-5 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                />
                <label className="text-sm text-gray-600">Instock</label>
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
                      {vaccines.map((vaccine) => {
                        const isSelected = newVaccineCombo.vaccines.some(
                          (v) => v.id === vaccine.id
                        );
                        const isOutstock = vaccine.status === "Outstock";
                        return (
                          <div
                            key={vaccine.id}
                            className={`flex items-center ${
                              isOutstock ? "opacity-50" : ""
                            }`}
                          >
                            <input
                              type="checkbox"
                              checked={isSelected}
                              onChange={() => handleVaccineSelect(vaccine)}
                              disabled={isOutstock} // Vô hiệu hóa nếu Outstock
                              className="w-5 h-5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:cursor-not-allowed"
                            />
                            <span className="ml-2 text-sm text-gray-600">
                              {vaccine.name} (ID: {vaccine.id}) (Price: {vaccine.price}) (Status: {vaccine.status})
                            </span>
                          </div>
                        );
                      })}
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
                          {vaccine.name} (ID: {vaccine.id}) (Price: {vaccine.price}) (Status: {vaccine.status})
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
                  console.log("Add button clicked");
                  handleAddVaccine();
                }}
                disabled={loading}
                className="bg-gradient-to-r from-blue-500 to-blue-500 text-white px-5 py-2.5 rounded-full hover:from-blue-600 hover:to-blue-600 transition-all duration-300 flex items-center gap-2 shadow-md hover:shadow-lg"
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