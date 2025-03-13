import { useState, useEffect } from "react";
import axios from "axios";
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
        entryDate: vaccine.entryDate ? new Date(vaccine.entryDate).toISOString().split('T')[0] : '',
        timeExpired: vaccine.timeExpired ? new Date(vaccine.timeExpired).toISOString().split('T')[0] : '',
        status: vaccine.status === "ACTIVE",
      });
    }
  }, [vaccine]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    // Ngăn nhập dấu - và ký tự không phải số cho các trường number
    if (
      [
        "quantity",
        "price",
        "doesTimes",
        "suggestAgeMin",
        "suggestAgeMax",
        "addressId",
        "minimumIntervalDate",
        "maximumIntervalDate",
      ].includes(name)
    ) {
      if (value && !/^[0-9]*\.?[0-9]*$/.test(value)) {
        return;
      }
      if (value.startsWith("-")) {
        return;
      }
    }

    // Validation cho entryDate và timeExpired ngay khi thay đổi
    if (name === "entryDate" && value) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const entryDate = new Date(value);
      if (entryDate > today) {
        setError("Ngày nhập kho phải là ngày trong quá khứ hoặc hôm nay.");
        toast.error("Ngày nhập kho không hợp lệ!", { autoClose: 3000 });
      } else {
        setError(null); // Xóa lỗi nếu hợp lệ
      }
    }

    if (name === "timeExpired" && value) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const expiredDate = new Date(value);
      if (expiredDate <= today) {
        setError("Ngày hết hạn phải là ngày trong tương lai.");
        toast.error("Ngày hết hạn không hợp lệ!", { autoClose: 3000 });
      } else {
        setError(null); // Xóa lỗi nếu hợp lệ
      }
    }

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

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Validate suggestAgeMin < suggestAgeMax
    const minAge = parseInt(formData.suggestAgeMin) || 0;
    const maxAge = parseInt(formData.suggestAgeMax) || 0;
    if (formData.suggestAgeMin && formData.suggestAgeMax && minAge >= maxAge) {
      setError("Độ tuổi tối thiểu phải nhỏ hơn độ tuổi tối đa.");
      toast.error("Độ tuổi tối thiểu phải nhỏ hơn độ tuổi tối đa!", { autoClose: 3000 });
      return;
    }

    // Validate entryDate phải là quá khứ hoặc hôm nay
    if (formData.entryDate) {
      const entryDate = new Date(formData.entryDate);
      if (entryDate > today) {
        setError("Ngày nhập kho phải là ngày trong quá khứ hoặc hôm nay.");
        toast.error("Ngày nhập kho không hợp lệ!", { autoClose: 3000 });
        return;
      }
    }

    // Validate timeExpired phải là tương lai
    if (formData.timeExpired) {
      const expiredDate = new Date(formData.timeExpired);
      if (expiredDate <= today) {
        setError("Ngày hết hạn phải là ngày trong tương lai.");
        toast.error("Ngày hết hạn không hợp lệ!", { autoClose: 3000 });
        return;
      }
    }

    try {
      const updateData = {
        id: formData.id,
        name: formData.name,
        quantity: Number(formData.quantity) || 0,
        description: formData.description || "",
        price: Number(formData.price) || 0,
        doesTimes: Number(formData.doesTimes) || 0,
        suggestAgeMin: minAge,
        suggestAgeMax: maxAge,
        entryDate: formData.entryDate ? new Date(formData.entryDate).toISOString() : null,
        timeExpired: formData.timeExpired ? new Date(formData.timeExpired).toISOString() : null,
        addressId: Number(formData.addressId) || 0,
        status: formData.status,
        minimumIntervalDate: Number(formData.minimumIntervalDate) || 0,
        maximumIntervalDate: Number(formData.maximumIntervalDate) || 0,
        fromCountry: formData.fromCountry || "Unknown",
      };

      console.log("Sending data:", updateData);

      const response = await api.put(
        `${url}/Vaccine/update-vaccine/${formData.id}`,
        updateData
      );

      if (response.status === 200) {
        onSave(updateData);
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
                    className={`w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
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