import { useState, useEffect } from "react"; // Added useEffect
import axios from "axios";
import { Save, X } from "lucide-react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UpdateVaccine = ({ vaccine, onSave, onCancel }) => {
  // Initialize formData with vaccine data when component mounts
  const [formData, setFormData] = useState(null); // Changed to null initially
  const [error, setError] = useState(null);

  // Set initial form data when vaccine prop changes
  useEffect(() => {
    if (vaccine) {
      setFormData({
        ...vaccine,
        // Ensure date fields are in correct format for input[type="date"]
        entryDate: vaccine.entryDate ? new Date(vaccine.entryDate).toISOString().split('T')[0] : '',
        timeExpired: vaccine.timeExpired ? new Date(vaccine.timeExpired).toISOString().split('T')[0] : '',
        status: vaccine.status === "ACTIVE" // Convert to boolean for checkbox
      });
    }
  }, [vaccine]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (checked ? "ACTIVE" : "INACTIVE") : value,
    }));
  };

  const handleSubmit = async () => {
    if (!formData?.name) {
      setError("Please fill in the name field.");
      toast.error("Please fill in the name field.");
      return;
    }

    try {
      const updateData = {
        id: formData.id, // Ensure ID is included
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
        status: formData.status,
        minimumIntervalDate: Number(formData.minimumIntervalDate) || 0,
        maximumIntervalDate: Number(formData.maximumIntervalDate) || 0,
        fromCountry: formData.fromCountry || "Unknown",
      };

      console.log("Sending data:", updateData);

      const response = await axios.put(
        `http://localhost:5272/api/Vaccine/update-vaccine/${formData.id}`,
        updateData
      );

      if (response.status === 200) {
        onSave(updateData); // Pass the full updated object
        toast.success("Vaccine updated successfully!");
      }
    } catch (err) {
      console.error("Error updating vaccine:", err?.response?.data || err);
      setError("Failed to update vaccine. Please check your data and try again.");
      toast.error("Failed to update vaccine. Please check your data and try again.");
    }
  };

  const fields = [
    { label: "Name", name: "name", type: "text" },
    { label: "Description", name: "description", type: "textarea" },
    { label: "Doses Left", name: "quantity", type: "number" },
    { label: "Does Times", name: "doesTimes", type: "number" },
    { label: "Price (VND)", name: "price", type: "number" },
    { label: "Entry Date", name: "entryDate", type: "date" }, // Added entryDate field
    { label: "Expiry Date", name: "timeExpired", type: "date" },
    { label: "Age Range (Min)", name: "suggestAgeMin", type: "number" },
    { label: "Age Range (Max)", name: "suggestAgeMax", type: "number" },
    { label: "Country of Origin", name: "fromCountry", type: "text" },
    { label: "Interval Age (Min)", name: "minimumIntervalDate", type: "number" },
    { label: "Interval Age (Max)", name: "maximumIntervalDate", type: "number" },
    { label: "Address ID", name: "addressId", type: "number" },
    { label: "Status", name: "status", type: "checkbox" },
  ];

  // Show loading state while formData is being initialized
  if (!formData) {
    return null; // Or a loading spinner
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
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
                      checked={formData[field.name] === "ACTIVE"}
                      onChange={handleInputChange}
                      className="w-5 h-5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    />
                    <span className="ml-2 text-sm text-gray-600">
                      {formData[field.name] === "ACTIVE" ? "Active" : "Inactive"}
                    </span>
                  </div>
                ) : (
                  <input
                    type={field.type}
                    name={field.name}
                    value={formData[field.name] || ""}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
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