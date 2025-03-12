import React, { useState } from "react";
import axios from "axios";

const UpdateUser = ({ user, onAddSuccess, setShowForm }) => {
  const [formData, setFormData] = useState({
    id: user.id || "",
    name: user.name || "",
    username: user.username || "",
    gmail: user.gmail || "",
    phoneNumber: user.phoneNumber || "",
    dateOfBirth: user.dateOfBirth
      ? new Date(user.dateOfBirth).toISOString().split("T")[0]
      : "",
    gender: user.gender !== undefined ? user.gender : 0,
    role: user.role || "",
    status: user.status || "Active",
    avatar: user.avatar || "",
  });
  const [errorMessage, setErrorMessage] = useState(""); // Add state for error display

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Ensure gender is sent as an integer
      const payload = {
        ...formData,
        gender: parseInt(formData.gender, 10), // Convert gender to integer
      };

      const response = await axios.put(
        `https://localhost:7280/api/User/update-user/${formData.id}`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json", // Explicitly set content type
          },
        }
      );

      console.log("Update successful:", response.data); // Log success for debugging
      onAddSuccess();
      setShowForm(false);
    } catch (error) {
      // Enhanced error logging
      console.error("Error updating user:", {
        message: error.message,
        response: error.response?.data, // Server response details
        status: error.response?.status,
      });

      // Display user-friendly error message
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
        {errorMessage && (
          <p className="text-red-500 mb-4">{errorMessage}</p> // Display error to user
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Name"
              className="w-full p-2 border rounded"
              required // Add basic validation
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Username"
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
              className="w-full p-2 border rounded bg-gray-100" // Visual cue for read-only
            />
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