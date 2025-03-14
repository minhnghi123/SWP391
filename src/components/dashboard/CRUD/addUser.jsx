import React, { useState, useEffect } from "react";
import { Plus, Clock } from "lucide-react";
import { toast } from "react-toastify";
import useAxios from "../../../utils/useAxios";
const url = import.meta.env.VITE_BASE_URL_DB;

const AddUserComponent = ({ onAddSuccess, setShowForm }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const api = useAxios();

  const initialUserState = {
    name: "",
    username: "",
    gmail: "",
    password: "",
    phoneNumber: "",
    dateOfBirth: "",
    avatar: "",
    gender: 0,
  };

  const [newUser, setNewUser] = useState(initialUserState);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const resetForm = () => {
    setNewUser(initialUserState);
    setError(null);
  };

  // Hàm validate số điện thoại Việt Nam
  const validatePhoneNumber = (phone) => {
    const phoneRegex = /^(03|05|07|08|09)[0-9]{8}$/;
    return phoneRegex.test(phone);
  };

  const handleAddUser = async () => {
    setLoading(true);
    setError(null);

    // Basic validation
    if (!newUser.name || !newUser.username || !newUser.gmail || !newUser.password) {
      setError("Name, username, email, and password are required.");
      setLoading(false);
      return;
    }

    // Validate phone number nếu có nhập
    if (newUser.phoneNumber && !validatePhoneNumber(newUser.phoneNumber)) {
      setError(
        "Invalid phone number. It must be a 10-digit number starting with 03, 05, 07, 08, or 09."
      );
      setLoading(false);
      return;
    }

    const userData = {
      name: newUser.name,
      username: newUser.username,
      gmail: newUser.gmail,
      password: newUser.password,
      phoneNumber: newUser.phoneNumber || null, // Gửi null nếu không có
      dateOfBirth: newUser.dateOfBirth
        ? new Date(newUser.dateOfBirth).toISOString()
        : null, // Gửi null nếu không nhập
      avatar: newUser.avatar || null,
      gender: parseInt(newUser.gender, 10) || 0,
    };

    try {
      const response = await api.post(`${url}/User/register`, userData);

      if (response.status === 201 || response.status === 200) {
        toast.success("User added successfully!", { autoClose: 3000 });
        setShowForm(false);
        resetForm();
        onAddSuccess();
      } else {
        toast.error("Failed to add user.", { autoClose: 3000 });
        setError("Unexpected response from server.");
      }
    } catch (error) {
      console.error("Error adding user:", error.response?.data || error);
      const errorMessage =
        error.response?.data?.message ||
        "Failed to add user. Please check your input and try again.";
      setError(errorMessage);
      toast.error(errorMessage, { autoClose: 3000 });
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
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Add User</h2>

        {error && <div className="mb-4 text-red-500 text-sm">{error}</div>}

        <div className="grid grid-cols-2 gap-4 mb-6">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={newUser.name}
            onChange={handleInputChange}
            className="w-full p-2.5 border border-gray-300 rounded-md focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors"
            required
          />
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={newUser.username}
            onChange={handleInputChange}
            className="w-full p-2.5 border border-gray-300 rounded-md focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors"
            required
          />
          <input
            type="email"
            name="gmail"
            placeholder="Gmail"
            value={newUser.gmail}
            onChange={handleInputChange}
            className="w-full p-2.5 border border-gray-300 rounded-md focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={newUser.password}
            onChange={handleInputChange}
            className="w-full p-2.5 border border-gray-300 rounded-md focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors"
            required
          />
          <input
            type="tel"
            name="phoneNumber"
            placeholder="Phone Number (e.g., 0912345678)"
            value={newUser.phoneNumber}
            onChange={handleInputChange}
            className="w-full p-2.5 border border-gray-300 rounded-md focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors"
          />
          <input
            type="text"
            name="avatar"
            placeholder="Avatar URL"
            value={newUser.avatar}
            onChange={handleInputChange}
            className="w-full p-2.5 border border-gray-300 rounded-md focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors"
          />
          <select
            name="gender"
            value={newUser.gender}
            onChange={handleInputChange}
            className="w-full p-2.5 border border-gray-300 rounded-md focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors"
          >
            <option value={0}>Male</option>
            <option value={1}>Female</option>
            <option value={2}>Other</option>
          </select>
          <DateInput
            label="Date of Birth"
            name="dateOfBirth"
            value={newUser.dateOfBirth}
            onChange={(e) =>
              handleInputChange({
                target: { name: "dateOfBirth", value: e.target.value },
              })
            }
          />
        </div>

        <div className="mt-6 flex justify-end space-x-4">
          <button
            onClick={() => setShowForm(false)}
            className="px-6 py-2.5 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleAddUser}
            disabled={loading}
            className="px-6 py-2.5 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors disabled:bg-teal-300"
          >
            {loading ? "Adding..." : "Add User"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddUserComponent;