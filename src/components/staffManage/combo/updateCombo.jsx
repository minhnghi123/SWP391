import { useState, useEffect } from "react";
import axios from "axios";
import { Save, X } from "lucide-react";
import { toast } from "react-toastify";

const UpdateVaccineCombo = ({ combo, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    comboName: combo.comboName || "",
    discount: combo.discount || 0,
    totalPrice: combo.totalPrice || 0,
    finalPrice: combo.finalPrice || 0,
    status: combo.status === "ACTIVE",
    vaccineIds: combo.vaccineIds || [],
  });
  const [error, setError] = useState(null);
  const [showVaccines, setShowVaccines] = useState(false);
  const [vaccines, setVaccines] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch combo details from server on mount
  useEffect(() => {
    const fetchComboDetails = async () => {
      if (!combo?.id) {
        setError("Combo ID is missing");
        toast.error("Combo ID is missing");
        return;
      }

      try {
        setLoading(true);
        const response = await axios.get(
          `https://localhost:7280/api/VaccineCombo/get-vaccine-combo-detail/${combo.id}`
        );
        const comboData = response.data;
        console.log("Fetched combo data:", comboData); // Debug dữ liệu từ server
        setFormData({
          comboName: comboData.comboName || "",
          discount: comboData.discount || 0,
          totalPrice: comboData.totalPrice || 0,
          finalPrice: comboData.finalPrice || 0,
          status: comboData.status === "ACTIVE",
          vaccineIds: comboData.vaccineIds || comboData.vaccines?.map((v) => v.id) || [],
        });
      } catch (err) {
        console.error("Error fetching combo details:", err);
        setError("Failed to load combo details");
        toast.error("Failed to load combo details");
      } finally {
        setLoading(false);
      }
    };

    fetchComboDetails();
  }, [combo?.id]);

  // Calculate total price based on vaccineIds
  const calculateTotalPrice = async (vaccineIds) => {
    try {
      const total = await Promise.all(
        vaccineIds.map(async (id) => {
          const response = await axios.get(
            `https://localhost:7280/api/Vaccine/get-vaccine-by-id/${id}`
          );
          return response.data.price || 0;
        })
      );
      return total.reduce((sum, price) => sum + price, 0);
    } catch (error) {
      console.error("Error calculating total price:", error);
      setError("Failed to calculate total price.");
      return 0;
    }
  };

  // Calculate final price
  const calculateFinalPrice = (totalPrice, discount) => {
    const discountValue = parseFloat(discount) || 0;
    return totalPrice - (totalPrice * discountValue) / 100;
  };

  useEffect(() => {
    const updatePrices = async () => {
      const total = await calculateTotalPrice(formData.vaccineIds);
      const final = calculateFinalPrice(total, formData.discount);
      setFormData((prev) => ({
        ...prev,
        totalPrice: total,
        finalPrice: final,
      }));
    };
    updatePrices();
  }, [formData.vaccineIds, formData.discount]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
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
      setError("Failed to fetch vaccines. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleVaccineSelect = (vaccineId) => {
    const isSelected = formData.vaccineIds.includes(vaccineId);
    const updatedVaccineIds = isSelected
      ? formData.vaccineIds.filter((id) => id !== vaccineId)
      : [...formData.vaccineIds, vaccineId];

    setFormData((prev) => ({
      ...prev,
      vaccineIds: updatedVaccineIds,
    }));
  };

  const handleSubmit = async () => {
    if (!formData.comboName) {
      setError("Please fill in the combo name field.");
      return;
    }

    try {
      const updateData = {
        comboName: formData.comboName,
        discount: Number(formData.discount) || 0,
        totalPrice: Number(formData.totalPrice),
        finalPrice: Number(formData.finalPrice),
        status: formData.status ? "ACTIVE" : "INACTIVE",
        vaccineIds: formData.vaccineIds,
      };

      console.log("Sending update data to server:", updateData); // Debug dữ liệu gửi lên
      const response = await axios.put(
        `https://localhost:7280/api/VaccineCombo/update-vaccine-combo-by-id/${combo.id}`,
        updateData
      );

      console.log("Server response:", response.data); // Debug phản hồi từ server
      if (response.status === 200) {
        onSave({ id: combo.id, ...updateData });
        toast.success("Vaccine combo updated successfully!");
        // Fetch lại combo sau khi cập nhật để đảm bảo đồng bộ
        const updatedCombo = await axios.get(
          `https://localhost:7280/api/VaccineCombo/get-vaccine-combo-detail/${combo.id}`
        );
        setFormData({
          ...formData,
          vaccineIds: updatedCombo.data.vaccineIds || updatedCombo.data.vaccines?.map((v) => v.id) || [],
        });
      }
    } catch (err) {
      console.error("Error updating vaccine combo:", err?.response?.data || err);
      setError("Failed to update vaccine combo. Please check your data and try again.");
      toast.error("Failed to update vaccine combo. Please check your data and try again.");
    }
  };

  const toggleShowVaccines = () => {
    if (!showVaccines && vaccines.length === 0) {
      fetchAllVaccines();
    }
    setShowVaccines((prev) => !prev);
  };

  const fields = [
    { label: "Combo Name", name: "comboName", type: "text" },
    { label: "Discount (%)", name: "discount", type: "number" },
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white p-6 border-b border-gray-100 flex items-center justify-between z-10">
          <h2 className="text-xl font-bold text-gray-900">Update Vaccine Combo</h2>
          <button
            onClick={onCancel}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={20} className="text-gray-500" />
          </button>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {fields.map((field) => (
              <div key={field.name}>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {field.label}:
                </label>
                <input
                  type={field.type}
                  name={field.name}
                  value={formData[field.name] || ""}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  min={field.type === "number" ? "0" : undefined}
                />
              </div>
            ))}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Total Price:
              </label>
              <input
                type="number"
                value={formData.totalPrice}
                readOnly
                className="w-full p-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Final Price:
              </label>
              <input
                type="number"
                value={formData.finalPrice}
                readOnly
                className="w-full p-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Status:
              </label>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="status"
                  checked={formData.status}
                  onChange={handleInputChange}
                  className="w-5 h-5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                />
                <span className="ml-2 text-sm text-gray-600">
                  {formData.status ? "ACTIVE" : "INACTIVE"}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-6">
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
                    const isSelected = formData.vaccineIds.includes(vaccine.id);
                    return (
                      <div
                        key={vaccine.id}
                        className={`flex items-center p-2 rounded-lg border ${
                          isSelected ? "bg-blue-50 border-blue-200" : "bg-white border-gray-200"
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => handleVaccineSelect(vaccine.id)}
                          className="w-5 h-5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                        <span
                          className={`ml-2 text-sm ${
                            isSelected ? "text-blue-600 font-semibold" : "text-gray-600"
                          }`}
                        >
                          {vaccine.name} (ID: {vaccine.id}) (Price: {vaccine.price})
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

          {error && <p className="text-red-500 text-sm mt-4">{error}</p>}

          <div className="flex justify-end gap-3 mt-8">
            <button
              onClick={onCancel}
              className="px-5 py-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="px-5 py-2.5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2"
            >
              <Save size={18} />
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateVaccineCombo;