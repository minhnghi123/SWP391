import React, { useState, useEffect } from "react";
import { Clock } from "lucide-react";
import { toast } from "react-toastify";
import useAxios from "../../../../utils/useAxios";
import axios from "axios";
const url = import.meta.env.VITE_BASE_URL_DB;

const AddUserComponent = ({ onAddSuccess, setShowForm }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const api = useAxios();

  const initialUserState = {
    name: "",
    username: "",
    gmail: "",
    password: "",
    phoneNumber: "",
    dateOfBirth: "",
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

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError("File size must be less than 5MB");
        return;
      }
      if (!file.type.match("image.*")) {
        setError("Please select an image file");
        return;
      }

      setAvatarFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const resetForm = () => {
    setNewUser(initialUserState);
    setError(null);
    setAvatarFile(null);
    setAvatarPreview(null);
  };

  const validatePhoneNumber = (phone) => {
    const phoneRegex = /^(03|05|07|08|09)[0-9]{8}$/;
    return phoneRegex.test(phone);
  };

  const validateDateOfBirth = (date) => {
    const selectedDate = new Date(date);
    const currentDate = new Date();
    return selectedDate <= currentDate;
  };

  const handleAddUser = async () => {
    setLoading(true);
    setError(null);

    if (
      !newUser.name ||
      !newUser.username ||
      !newUser.gmail ||
      !newUser.password
    ) {
      setError("Name, username, email, and password are required.");
      setLoading(false);
      return;
    }

    if (newUser.phoneNumber && !validatePhoneNumber(newUser.phoneNumber)) {
      setError(
        "Invalid phone number. It must be a 10-digit number starting with 03, 05, 07, 08, or 09."
      );
      setLoading(false);
      return;
    }

    if (newUser.dateOfBirth && !validateDateOfBirth(newUser.dateOfBirth)) {
      setError("Date of birth cannot be in the future.");
      setLoading(false);
      return;
    }

    try {
      let imageUrl = "";

      // Upload avatar to Cloudinary if a file is selected
      if (avatarFile) {
        const formData = new FormData();
        formData.append("file", avatarFile);
        formData.append("upload_preset", "First_time_using");
        formData.append("cloud_name", "dzmx76ojp");

        const uploadResponse = await axios.post(
          "https://api.cloudinary.com/v1_1/dzmx76ojp/image/upload",
          formData
        );

        imageUrl = uploadResponse.data.secure_url;
      }

      const userData = {
        name: newUser.name.trim(),
        username: newUser.username.trim(),
        gmail: newUser.gmail.trim(),
        password: newUser.password,
        phoneNumber: newUser.phoneNumber ? newUser.phoneNumber.trim() : "",
        dateOfBirth: newUser.dateOfBirth
          ? new Date(newUser.dateOfBirth).toISOString()
          : "",
        avatar: imageUrl,
        gender: parseInt(newUser.gender, 10),
      };
      // console.log(userData)

      const response = await api.post(`${url}/User/create-staff`, userData);

      if (response.status === 201 || response.status === 200) {
        toast.success("User added successfully!", { autoClose: 3000 });
        setShowForm(false);
        resetForm();
        onAddSuccess();
      } else {
        throw new Error("Unexpected response from server");
      }
    } catch (error) {
      console.error("Error adding user:", error.response?.data || error);
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to add user. Please check your input and try again.";
      setError(errorMessage);
      toast.error(errorMessage, { autoClose: 3000 });
    } finally {
      setLoading(false);
    }
  };

  // Cleanup preview URL on component unmount or when new file is selected
  useEffect(() => {
    return () => {
      if (avatarPreview) {
        URL.revokeObjectURL(avatarPreview);
      }
    };
  }, [avatarPreview]);

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
          max={new Date().toISOString().split("T")[0]}
          className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg bg-white focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition-all duration-300 shadow-sm group-hover:shadow-md"
        />
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-[600px] max-w-[90%] text-center relative">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Add Staff</h2>

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
          <div className="flex flex-col">
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Avatar
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
            {avatarPreview && (
              <img
                src={avatarPreview}
                alt="Avatar preview"
                className="mt-2 w-20 h-20 object-cover rounded-full mx-auto"
              />
            )}
          </div>
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
            className="bg-gradient-to-r from-blue-500 to-blue-500 text-white px-5 py-2.5 rounded-full hover:from-blue-600 hover:to-blue-600 transition-all duration-300 flex items-center gap-2 shadow-md hover:shadow-lg"
          >
            {loading ? "Adding..." : "Add User"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddUserComponent;
