import React, { useState } from "react";
import axios from "axios";
import useAxios from "../../../utils/useAxios";
const url = import.meta.env.VITE_BASE_URL_DB;

const UpdateUser = ({ user, onAddSuccess, setShowForm }) => {
  const api = useAxios();
  const [formData, setFormData] = useState({
    id: user.id || "", // Add id from user prop
    name: user.name || "", // Use "name" to match payload
    gmail: user.gmail || "",
    phoneNumber: user.phoneNumber || "",
    dateOfBirth: user.dateOfBirth
      ? new Date(user.dateOfBirth).toISOString().split("T")[0]
      : "",
    gender: user.gender !== undefined ? user.gender : 0,
    role: user.role || "",
    isDelete: user.isDelete === true, // Simplify to boolean
    avatar: user.avatar || "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "isDelete" ? value === "true" : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.id) {
      setErrorMessage("User ID is missing.");
      return;
    }
    if (!formData.name || !formData.gmail) {
      setErrorMessage("Name and email are required.");
      return;
    }

    try {
      const payload = {
        name: formData.name,
        dateOfBirth: formData.dateOfBirth
          ? new Date(formData.dateOfBirth).toISOString()
          : null, // Ensure ISO format for date
        gender: parseInt(formData.gender, 10),
        avatar: formData.avatar,
        isDeleted: formData.isDelete, // Rename to match payload
        gmail: formData.gmail,
        phoneNumber: formData.phoneNumber,
      };

      const response = await api.put(
        `${url}/User/update-user/${formData.id}`,
        payload
      );

      console.log("Update successful:", response.data);
      onAddSuccess();
      setShowForm(false);
    } catch (error) {
      console.error("Error updating user:", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
      });

      setErrorMessage(
        error.response?.data?.message ||
          "Failed to update user. Please check your input and try again."
      );
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-96">
        <h2 className="text-xl font-bold mb-4">Update User</h2>
        {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              name="name" // Match payload field
              value={formData.name}
              onChange={handleChange}
              placeholder="Name"
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="email"
              name="gmail"
              value={formData.gmail}
              onChange={handleChange}
              placeholder="Email"
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              placeholder="Phone Number"
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              name="avatar"
              value={formData.avatar}
              onChange={handleChange}
              placeholder="Avatar"
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <input
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            >
              <option value={0}>Male</option>
              <option value={1}>Female</option>
              <option value={2}>Other</option>
            </select>
          </div>
          <div className="mb-4">
            <input
              type="text"
              name="role"
              value={formData.role}
              onChange={handleChange}
              placeholder="Role"
              readOnly
              className="w-full p-2 border rounded bg-gray-100"
            />
          </div>
          <div className="mb-4">
            <select
              name="isDelete"
              value={formData.isDelete.toString()}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            >
              <option value="false">ACTIVE</option>
              <option value="true">INACTIVE</option>
            </select>
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="px-4 py-2 bg-gray-300 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-teal-500 text-white rounded"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateUser;