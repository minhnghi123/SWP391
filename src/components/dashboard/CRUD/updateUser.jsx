import React, { useState } from "react";
import { Clock } from "lucide-react";
import { toast } from "react-toastify"; // Thêm toast để đồng bộ với AddUserComponent
import useAxios from "../../../utils/useAxios";
const url = import.meta.env.VITE_BASE_URL_DB;

const UpdateUser = ({ user, onAddSuccess, setShowForm }) => {
  const api = useAxios();
  const [formData, setFormData] = useState({
    id: user.id || "",
    name: user.name || "",
    gmail: user.gmail || "",
    phoneNumber: user.phoneNumber || "",
    dateOfBirth: user.dateOfBirth
      ? new Date(user.dateOfBirth).toISOString().split("T")[0]
      : "",
    gender: user.gender !== undefined ? user.gender : 0,
    role: user.role || "",
    isDelete: user.isDelete === true,
    avatar: user.avatar || "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false); // Thêm loading để đồng bộ

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "isDelete" ? value === "true" : value,
    }));
  };

  // Hàm validate số điện thoại Việt Nam
  const validatePhoneNumber = (phone) => {
    const phoneRegex = /^(03|05|07|08|09)[0-9]{8}$/;
    return phoneRegex.test(phone);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(null);

    // Basic validation
    if (!formData.id) {
      setErrorMessage("User ID is missing.");
      setLoading(false);
      return;
    }
    if (!formData.name || !formData.gmail) {
      setErrorMessage("Name and email are required.");
      setLoading(false);
      return;
    }

    // Validate phone number nếu có nhập
    if (formData.phoneNumber && !validatePhoneNumber(formData.phoneNumber)) {
      setErrorMessage(
        "Invalid phone number. It must be a 10-digit number starting with 03, 05, 07, 08, or 09."
      );
      setLoading(false);
      return;
    }

    try {
      const payload = {
        name: formData.name,
        dateOfBirth: formData.dateOfBirth
          ? new Date(formData.dateOfBirth).toISOString()
          : null,
        gender: parseInt(formData.gender, 10),
        avatar: formData.avatar,
        isDeleted: formData.isDelete,
        gmail: formData.gmail,
        phoneNumber: formData.phoneNumber || null,
      };

      const response = await api.put(
        `${url}/User/update-user/${formData.id}`,
        payload
      );

      console.log("Update successful:", response.data);
      toast.success("User updated successfully!", { autoClose: 3000 }); // Thêm toast
      onAddSuccess();
      setShowForm(false);
    } catch (error) {
      console.error("Error updating user:", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
      });

      const errorMsg =
        error.response?.data?.message ||
        "Failed to update user. Please check your input and try again.";
      setErrorMessage(errorMsg);
      toast.error(errorMsg, { autoClose: 3000 }); // Thêm toast
    } finally {
      setLoading(false);
    }
  };

  const DateInput = ({ label, name, value, onChange }) => (
    <div className="relative">
      <label className="block text-sm font-medium text-gray-700 mb-1.5">
        {label}
      </label>
      <div className="relative group">
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 z-10">
          <Clock size={18} className="text-gray-400" />
        </div>
        <input
          type="date"
          name={name}
          value={value}
          onChange={onChange}
          className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg bg-white focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition-all duration-300 shadow-sm group-hover:shadow-md"
        />
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-[600px] max-w-[90%] text-center relative">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Update User</h2>

        {errorMessage && (
          <div className="mb-4 text-red-500 text-sm">{errorMessage}</div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2.5 border border-gray-300 rounded-md focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors"
              required
            />
            <input
              type="email"
              name="gmail"
              placeholder="Gmail"
              value={formData.gmail}
              onChange={handleChange}
              className="w-full p-2.5 border border-gray-300 rounded-md focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors"
              required
            />
            <input
              type="tel"
              name="phoneNumber"
              placeholder="Phone Number (e.g., 0912345678)"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="w-full p-2.5 border border-gray-300 rounded-md focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors"
            />
            <input
              type="text"
              name="avatar"
              placeholder="Avatar URL"
              value={formData.avatar}
              onChange={handleChange}
              className="w-full p-2.5 border border-gray-300 rounded-md focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors"
            />
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full p-2.5 border border-gray-300 rounded-md focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors"
            >
              <option value={0}>Male</option>
              <option value={1}>Female</option>
              <option value={2}>Other</option>
            </select>
            <DateInput
              label="Date of Birth"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={(e) =>
                handleChange({
                  target: { name: "dateOfBirth", value: e.target.value },
                })
              }
            />
            <input
              type="text"
              name="role"
              placeholder="Role"
              value={formData.role}
              onChange={handleChange}
              readOnly
              className="w-full p-2.5 border border-gray-300 rounded-md bg-gray-100 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors"
            />
            <select
              name="isDelete"
              value={formData.isDelete.toString()}
              onChange={handleChange}
              className="w-full p-2.5 border border-gray-300 rounded-md focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors"
            >
              <option value="false">ACTIVE</option>
              <option value="true">INACTIVE</option>
            </select>
          </div>

          <div className="mt-6 flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="px-6 py-2.5 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2.5 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors disabled:bg-teal-300"
            >
              {loading ? "Updating..." : "Update"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateUser;