import { useState } from "react";
import axios from "axios";
import { X, Refrigerator, Pill, Edit, Calendar, Save } from "lucide-react";

const DetailVaccine = ({ vaccine, isOpen, onClose, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ ...vaccine });
  const [error, setError] = useState(null);

  if (!isOpen || !vaccine) return null;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    if (!formData.name) {
      setError("Please fill in the name field.");
      return;
    }

    try {
      const isCombo = Array.isArray(vaccine.vaccines) && vaccine.vaccines.length > 0;
      const updateData = isCombo
        ? {
            name: formData.name,
            totalPrice: Number(formData.totalPrice) || 0,
            discount: Number(formData.discount) || 0,
            finalPrice: Number(formData.finalPrice) || 0,
          }
        : {
            name: formData.name,
            quantity: Number(formData.quantity) || 0,
            description: formData.description || "",
            price: Number(formData.price) || 0,
            doesTimes: Number(formData.doesTimes) || 0,
            suggestAgeMin: Number(formData.suggestAgeMin) || 0,
            suggestAgeMax: Number(formData.suggestAgeMax) || 0,
            timeExpired: formData.timeExpired ? new Date(formData.timeExpired).toISOString() : null,
            addressId: Number(formData.addressId) || 0,
            status: formData.status ?? 1,
            minimumIntervalDate: Number(formData.minimumIntervalDate) || 0,
            maximumIntervalDate: Number(formData.maximumIntervalDate) || 0,
            fromCountry: formData.fromCountry || "Unknown",
          };

      console.log("Sending data:", updateData);

      const response = await axios.put(
        `https://localhost:7280/api/Vaccine/update-vaccine/${formData.id}`,
        updateData
      );

      if (response.status === 200) {
        setIsEditing(false);
        onUpdate({ id: formData.id, ...updateData });
        setError(null);
        window.location.reload();
      }
    } catch (err) {
      console.error("Error updating vaccine:", err?.response?.data || err);
      setError("Failed to update vaccine. Please check your data and try again.");
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setFormData({ ...vaccine }); // Reset về dữ liệu gốc khi hủy
    setError(null);
  };

  const handleEditStart = () => {
    // Đảm bảo formData được khởi tạo đúng với dữ liệu vaccine khi bắt đầu chỉnh sửa
    setFormData({ ...vaccine });
    setIsEditing(true);
  };

  const isCombo = Array.isArray(vaccine.vaccines) && vaccine.vaccines.length > 0;

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
          <div className="sticky top-0 bg-white p-6 border-b border-gray-100 flex items-center justify-between z-10">
            <h2 className="text-xl font-bold text-gray-900">
              {isEditing ? "Edit Vaccine" : isCombo ? "Combo Vaccine Details" : "Vaccine Details"}
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X size={20} className="text-gray-500" />
            </button>
          </div>
          <div className="p-6">
            {error && <p className="text-red-500 mb-4">{error}</p>}

            {!isEditing ? (
              <>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-full bg-teal-50 flex items-center justify-center">
                    <Refrigerator className="w-8 h-8 text-teal-600" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">{vaccine.name}</h3>
                    <p className="text-sm text-gray-500">{vaccine.description}</p>
                  </div>
                </div>
                {isCombo ? (
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-gray-500 mb-3">Vaccines in Combo</h4>
                    <div className="space-y-4">
                      {vaccine.vaccines.map((comboVaccine) => (
                        <div
                          key={comboVaccine.id}
                          className="bg-gray-50 p-4 rounded-xl flex justify-between items-center"
                        >
                          <div>
                            <p className="font-medium text-gray-900">{comboVaccine.name}</p>
                            <p className="text-sm text-gray-500">ID: {comboVaccine.id}</p>
                          </div>
                          <p className="font-medium text-teal-600">
                            VND {comboVaccine.price.toLocaleString()}
                          </p>
                        </div>
                      ))}
                    </div>
                    <div className="mt-6">
                      <h4 className="text-sm font-semibold text-gray-500 mb-3">Pricing Details</h4>
                      <div className="space-y-3">
                        <div>
                          <span className="text-sm text-gray-500">Total Price:</span>
                          <p className="font-medium text-gray-900">
                            VND {vaccine.totalPrice?.toLocaleString()}
                          </p>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500">Discount:</span>
                          <p className="font-medium text-gray-900">
                            VND {vaccine.discount?.toLocaleString()}
                          </p>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500">Final Price:</span>
                          <p className="font-medium text-gray-900">
                            VND {vaccine.finalPrice?.toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div className="bg-gray-50 p-4 rounded-xl">
                        <h4 className="text-sm font-semibold text-gray-500 mb-3">
                          Inventory Information
                        </h4>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 text-gray-600">
                              <Pill className="w-4 h-4" />
                              <span>Doses Left</span>
                            </div>
                            <span className="font-medium text-teal-600">{vaccine.quantity}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 text-gray-600">
                              <Pill className="w-4 h-4" />
                              <span>Does Times</span>
                            </div>
                            <span className="font-medium text-teal-600">{vaccine.doesTimes}</span>
                          </div>
                        </div>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-xl">
                        <h4 className="text-sm font-semibold text-gray-500 mb-3">
                          Vaccine Details
                        </h4>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 text-gray-600">
                              <Calendar className="w-4 h-4" />
                              <span>Entry Date</span>
                            </div>
                            <span className="font-medium">
                              {new Date(vaccine.entryDate).toLocaleDateString()}
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 text-gray-600">
                              <Calendar className="w-4 h-4" />
                              <span>Expiry Date</span>
                            </div>
                            <span className="font-medium">
                              {new Date(vaccine.timeExpired).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <h4 className="text-sm font-semibold text-gray-500 mb-3">
                          Administration Details
                        </h4>
                        <div className="space-y-3">
                          <div>
                            <span className="text-sm text-gray-500">Price:</span>
                            <p className="font-medium text-gray-900">
                              VND {vaccine.price?.toLocaleString()} per dose
                            </p>
                          </div>
                          <div>
                            <span className="text-sm text-gray-500">Age Range:</span>
                            <p className="font-medium text-gray-900">
                              {vaccine.suggestAgeMin} - {vaccine.suggestAgeMax}
                            </p>
                          </div>
                          <div>
                            <span className="text-sm text-gray-500">Country of Origin:</span>
                            <p className="font-medium text-gray-900">{vaccine.fromCountry}</p>
                          </div>
                          <div>
                            <span className="text-sm text-gray-500">Interval Age:</span>
                            <p className="font-medium text-gray-900">
                              {vaccine.minimumIntervalDate} To {vaccine.maximumIntervalDate}
                            </p>
                          </div>
                          <div>
                            <span className="text-sm text-gray-500">Address ID:</span>
                            <p className="font-medium text-gray-900">{vaccine.addressId}</p>
                          </div>
                          <div>
                            <span className="text-sm text-gray-500">Status:</span>
                            <p className="font-medium text-gray-900">{vaccine.status}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {isCombo ? (
                  // Chỉnh sửa combo
                  <div>
                    <h4 className="text-sm font-semibold text-gray-500 mb-3">
                      Edit Combo Vaccine Information
                    </h4>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm text-gray-500">Name:</label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name || ""}
                          onChange={handleInputChange}
                          className="w-full p-2 border border-gray-300 rounded-lg"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-500">Total Price (VND):</label>
                        <input
                          type="number"
                          name="totalPrice"
                          value={formData.totalPrice || ""}
                          onChange={handleInputChange}
                          className="w-full p-2 border border-gray-300 rounded-lg"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-500">Discount (VND):</label>
                        <input
                          type="number"
                          name="discount"
                          value={formData.discount || ""}
                          onChange={handleInputChange}
                          className="w-full p-2 border border-gray-300 rounded-lg"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-500">Final Price (VND):</label>
                        <input
                          type="number"
                          name="finalPrice"
                          value={formData.finalPrice || ""}
                          onChange={handleInputChange}
                          className="w-full p-2 border border-gray-300 rounded-lg"
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  // Chỉnh sửa vaccine đơn
                  <>
                    <div>
                      <h4 className="text-sm font-semibold text-gray-500 mb-3">
                        Edit Vaccine Information
                      </h4>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm text-gray-500">Name:</label>
                          <input
                            type="text"
                            name="name"
                            value={formData.name || ""}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-gray-300 rounded-lg"
                          />
                        </div>
                        <div>
                          <label className="block text-sm text-gray-500">Description:</label>
                          <textarea
                            name="description"
                            value={formData.description || ""}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-gray-300 rounded-lg"
                          />
                        </div>
                        <div>
                          <label className="block text-sm text-gray-500">Doses Left:</label>
                          <input
                            type="number"
                            name="quantity"
                            value={formData.quantity || ""}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-gray-300 rounded-lg"
                          />
                        </div>
                        <div>
                          <label className="block text-sm text-gray-500">Does Times:</label>
                          <input
                            type="number"
                            name="doesTimes"
                            value={formData.doesTimes || ""}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-gray-300 rounded-lg"
                          />
                        </div>
                        <div>
                          <label className="block text-sm text-gray-500">Price (VND):</label>
                          <input
                            type="number"
                            name="price"
                            value={formData.price || ""}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-gray-300 rounded-lg"
                          />
                        </div>
                        <div>
                          <label className="block text-sm text-gray-500">Entry Date:</label>
                          <input
                            type="date"
                            name="entryDate"
                            value={formData.entryDate ? formData.entryDate.split("T")[0] : ""}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-gray-300 rounded-lg"
                          />
                        </div>
                        <div>
                          <label className="block text-sm text-gray-500">Expiry Date:</label>
                          <input
                            type="date"
                            name="timeExpired"
                            value={formData.timeExpired ? formData.timeExpired.split("T")[0] : ""}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-gray-300 rounded-lg"
                          />
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-gray-500 mb-3">
                        Administration Details
                      </h4>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm text-gray-500">Age Range (Min):</label>
                          <input
                            type="number"
                            name="suggestAgeMin"
                            value={formData.suggestAgeMin || ""}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-gray-300 rounded-lg"
                          />
                        </div>
                        <div>
                          <label className="block text-sm text-gray-500">Age Range (Max):</label>
                          <input
                            type="number"
                            name="suggestAgeMax"
                            value={formData.suggestAgeMax || ""}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-gray-300 rounded-lg"
                          />
                        </div>
                        <div>
                          <label className="block text-sm text-gray-500">Country of Origin:</label>
                          <input
                            type="text"
                            name="fromCountry"
                            value={formData.fromCountry || ""}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-gray-300 rounded-lg"
                          />
                        </div>
                        <div>
                          <label className="block text-sm text-gray-500">Interval Age (Min):</label>
                          <input
                            type="number"
                            name="minimumIntervalDate"
                            value={formData.minimumIntervalDate || ""}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-gray-300 rounded-lg"
                          />
                        </div>
                        <div>
                          <label className="block text-sm text-gray-500">Interval Age (Max):</label>
                          <input
                            type="number"
                            name="maximumIntervalDate"
                            value={formData.maximumIntervalDate || ""}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-gray-300 rounded-lg"
                          />
                        </div>
                        <div>
                          <label className="block text-sm text-gray-500">Address ID:</label>
                          <input
                            type="number"
                            name="addressId"
                            value={formData.addressId || ""}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-gray-300 rounded-lg"
                          />
                        </div>
                        <div>
                          <label className="block text-sm text-gray-500">Status:</label>
                          <input
                            type="text"
                            name="status"
                            value={formData.status || ""}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-gray-300 rounded-lg"
                          />
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}

            <div className="flex justify-end gap-3 mt-8">
              {!isEditing ? (
                <>
                  <button
                    onClick={onClose}
                    className="px-5 py-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    Close
                  </button>
                  <button
                    onClick={handleEditStart} // Sử dụng hàm mới để bắt đầu chỉnh sửa
                    className="px-5 py-2.5 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors flex items-center gap-2"
                  >
                    <Edit size={18} />
                    Edit Vaccine
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={handleCancelEdit}
                    className="px-5 py-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    className="px-5 py-2.5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2"
                  >
                    <Save size={18} />
                    Save Changes
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailVaccine;