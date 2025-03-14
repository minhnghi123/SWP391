import { useState, useEffect } from "react";
import { Save, X } from "lucide-react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useAxios from "../../../utils/useAxios";

const url = import.meta.env.VITE_BASE_URL_DB;

const UpdateVaccine = ({ vaccine, onSave, onCancel }) => {
  const [formData, setFormData] = useState(null);
  const [error, setError] = useState(null);
  const api = useAxios();

  useEffect(() => {
    if (vaccine) {
      setFormData({
        ...vaccine,
        entryDate: vaccine.entryDate ? new Date(vaccine.entryDate).toISOString().split("T")[0] : "",
        timeExpired: vaccine.timeExpired ? new Date(vaccine.timeExpired).toISOString().split("T")[0] : "",
        status: vaccine.status === "AVAILABLE" ? "AVAILABLE" : "UNAVAILABLE", // Đồng bộ với AVAILABLE/UNAVAILABLE
      });
    }
  }, [vaccine]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

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

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (checked ? "AVAILABLE" : "UNAVAILABLE") : value, // Sửa thành AVAILABLE/UNAVAILABLE
    }));
  };

  const validateForm = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (!formData?.name) {
      return "Vaccine name is required.";
    }

    const minAge = parseInt(formData.suggestAgeMin) || 0;
    const maxAge = parseInt(formData.suggestAgeMax) || 0;
    if (formData.suggestAgeMin && formData.suggestAgeMax && minAge >= maxAge) {
      return "Minimum age must be less than maximum age.";
    }

    if (formData.entryDate) {
      const entryDate = new Date(formData.entryDate);
      if (entryDate > today) {
        return "Entry date must be in the past or today.";
      }
    }

    if (formData.timeExpired) {
      const expiredDate = new Date(formData.timeExpired);
      if (expiredDate <= today) {
        return "Expiration date must be in the future.";
      }
    }

    return null;
  };

  const handleSubmit = async () => {
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      toast.error(validationError, { autoClose: 3000 });
      return;
    }

    setError(null);

    const updateData = {
      id: formData.id,
      name: formData.name,
      quantity: Number(formData.quantity) || 0,
      description: formData.description || "",
      price: Number(formData.price) || 0,
      doesTimes: Number(formData.doesTimes) || 0,
      suggestAgeMin: Number(formData.suggestAgeMin) || 0,
      suggestAgeMax: Number(formData.suggestAgeMax) || 0,
      entryDate: formData.entryDate ? new Date(formData.entryDate).toISOString() : null,
      timeExpired: formData.timeExpired ? new Date(formData.timeExpired).toISOString() : null,
      addressId: Number(formData.addressId) || 0,
      status: formData.status, // Giữ nguyên AVAILABLE/UNAVAILABLE
      minimumIntervalDate: Number(formData.minimumIntervalDate) || 0,
      maximumIntervalDate: Number(formData.maximumIntervalDate) || 0,
      fromCountry: formData.fromCountry || "Unknown",
    };

    try {
      const response = await api.put(`${url}/Vaccine/update-vaccine/${formData.id}`, updateData);
      if (response.status === 200) {
        onSave(updateData);
        toast.success("Vaccine updated successfully!");
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Failed to update vaccine.";
      setError(errorMessage);
      toast.error(errorMessage, { autoClose: 3000 });
    }
  };

  const fields = [
    { label: "Name", name: "name", type: "text" },
    { label: "Description", name: "description", type: "textarea" },
    { label: "Doses Left", name: "quantity", type: "number" },
    { label: "Does Times", name: "doesTimes", type: "number" },
    { label: "Price (VND)", name: "price", type: "number" },
    { label: "Entry Date", name: "entryDate", type: "date" },
    { label: "Expiry Date", name: "timeExpired", type: "date" },
    { label: "Age Range (Min)", name: "suggestAgeMin", type: "number" },
    { label: "Age Range (Max)", name: "suggestAgeMax", type: "number" },
    { label: "Country of Origin", name: "fromCountry", type: "text" },
    { label: "Interval Age (Min)", name: "minimumIntervalDate", type: "number" },
    { label: "Interval Age (Max)", name: "maximumIntervalDate", type: "number" },
    { label: "Address ID", name: "addressId", type: "number" },
    { label: "Status", name: "status", type: "checkbox" },
  ];

  if (!formData) {
    return null;
  }

  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-20 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white p-6 border-b border-gray-100 flex items-center justify-between z-10">
          <h2 className="text-xl font-bold text-gray-900">Update Vaccine</h2>
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
                {field.type === "textarea" ? (
                  <textarea
                    name={field.name}
                    value={formData[field.name] || ""}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    rows={3}
                  />
                ) : field.type === "checkbox" ? (
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      name={field.name}
                      checked={formData[field.name] === "AVAILABLE"}
                      onChange={handleInputChange}
                      className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm text-gray-600">
                      {formData[field.name] === "AVAILABLE" ? "Available" : "Unavailable"}
                    </span>
                  </div>
                ) : (
                  <input
                    type={field.type}
                    name={field.name}
                    value={formData[field.name] || ""}
                    onChange={handleInputChange}
                    className={`w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                      (field.name === "name" && !formData[field.name]) ||
                      (field.name === "suggestAgeMin" && formData.suggestAgeMin && formData.suggestAgeMax && parseInt(formData.suggestAgeMin) >= parseInt(formData.suggestAgeMax)) ||
                      (field.name === "suggestAgeMax" && formData.suggestAgeMin && formData.suggestAgeMax && parseInt(formData.suggestAgeMin) >= parseInt(formData.suggestAgeMax)) ||
                      (field.name === "entryDate" && formData.entryDate && new Date(formData.entryDate) > new Date(today)) ||
                      (field.name === "timeExpired" && formData.timeExpired && new Date(formData.timeExpired) <= new Date(today))
                        ? "border-red-500"
                        : ""
                    }`}
                    min={field.type === "number" ? "0" : field.name === "timeExpired" ? today : undefined}
                    max={field.name === "entryDate" ? today : undefined}
                  />
                )}
              </div>
            ))}
          </div>

          {error && (
            <p className="text-red-500 text-sm mt-4">{error}</p>
          )}

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

export default UpdateVaccine;