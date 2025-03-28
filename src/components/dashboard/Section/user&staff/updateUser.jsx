import React, { useState, useEffect } from "react";
import { Calendar } from "lucide-react";
import { toast } from "react-toastify";
import useAxios from "../../../../utils/useAxios";
import axios from "axios";

const url = import.meta.env.VITE_BASE_URL_DB;

const UpdateUser = ({ user, setShowForm, onAddSuccess }) => {
  const api = useAxios();

  // Khởi tạo trạng thái form
  const [formData, setFormData] = useState({
    name: user.name || "",
    dateOfBirth: user.dateOfBirth
      ? new Date(user.dateOfBirth).toISOString().split("T")[0]
      : "",
    gender: user.gender !== undefined ? user.gender : 0,
    avatar: user.avatar || "",
    gmail: user.gmail || "",
    phoneNumber: user.phoneNumber || "",
    status: user.status || "Active",
  });

  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(user.avatar || null);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [hasTrackingChild, setHasTrackingChild] = useState(false);

  // Gọi API để lấy thông tin children của user khi component mount
  useEffect(() => {
    const fetchUserChildren = async () => {
      try {
        const response = await api.get(`${url}/User/get-user-child/${user.id}`);
        const children = response.data.children || [];
        const trackingExists = children.some(
          (child) => (child.status || "").toLowerCase() === "tracking"
        );
        setHasTrackingChild(trackingExists);
      } catch (error) {
        console.error("Error fetching user children:", error);
        toast.error("Failed to fetch user children data.");
      }
    };

    if (user.id) {
      fetchUserChildren();
    }
  }, [user.id, api]);

  // Xử lý thay đổi input trong form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "gender" ? parseInt(value, 10) : value,
    }));
  };

  // Validate phone number
  const validatePhoneNumber = (phone) => {
    const phoneRegex = /^(03|05|07|08|09)[0-9]{8}$/;
    return phoneRegex.test(phone);
  };

  // Validate date of birth - Chỉ cho phép ngày hiện tại hoặc quá khứ
  const validateDateOfBirth = (date) => {
    const selectedDate = new Date(date);
    const today = new Date();
    return selectedDate <= today;
  };

  // Xử lý chọn file avatar
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setErrorMessage("File size must be less than 5MB");
        return;
      }
      if (!file.type.match("image.*")) {
        setErrorMessage("Please select an image file");
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

  // Xử lý submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (hasTrackingChild) {
      toast.error("Cannot update user with children in 'Tracking' status.");
      return;
    }

    setLoading(true);
    setErrorMessage(null);

    if (!user.id) {
      setErrorMessage("User ID is missing.");
      setLoading(false);
      return;
    }
    if (!formData.name || !formData.gmail) {
      setErrorMessage("Name and email are required.");
      setLoading(false);
      return;
    }
    if (formData.phoneNumber && !validatePhoneNumber(formData.phoneNumber)) {
      setErrorMessage(
        "Invalid phone number. It must be a 10-digit number starting with 03, 05, 07, 08, or 09."
      );
      setLoading(false);
      return;
    }
    if (formData.dateOfBirth && !validateDateOfBirth(formData.dateOfBirth)) {
      setErrorMessage("Date of birth must be today or in the past.");
      setLoading(false);
      return;
    }

    try {
      let imageUrl = formData.avatar;

      // Upload avatar to Cloudinary nếu có file được chọn
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

      const payload = {
        name: formData.name,
        dateOfBirth: formData.dateOfBirth
          ? new Date(formData.dateOfBirth).toISOString()
          : null,
        gender: formData.gender,
        avatar: imageUrl,
        gmail: formData.gmail,
        phoneNumber: formData.phoneNumber || "",
        status: formData.status,
      };

      const response = await api.put(
        `${url}/User/update-user-admin/${user.id}`,
        payload
      );
      toast.success("User updated successfully!", { autoClose: 3000 });

      if (onAddSuccess) onAddSuccess();
      setShowForm(false);
    } catch (error) {
      toast.error(
        "Failed to update user. Please check your input and try again.",
        { autoClose: 3000 }
      );
    } finally {
      setLoading(false);
    }
  };

  // Component con để hiển thị input ngày tháng
  const DateInput = ({ label, name, value, onChange }) => (
    <div className="relative">
      <label className="block text-sm font-medium text-gray-700 mb-1.5">
        {label}
      </label>
      <div className="relative group">
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 z-10">
          <Calendar size={18} className="text-gray-400" />
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
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-[600px] max-w-[90%] text-center relative max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Update User</h2>
        {errorMessage && (
          <div className="mb-4 text-red-500 text-sm">{errorMessage}</div>
        )}
        {hasTrackingChild && (
          <div className="mb-4 text-red-500 text-sm">
            Cannot update user because they have children in "Tracking" status.
          </div>
        )}
        {avatarPreview && (
          <img
            src={avatarPreview}
            alt="Avatar preview"
            className="mt-2 w-20 h-20 object-cover rounded-full mx-auto"
          />
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
            </div>
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
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full p-2.5 border border-gray-300 rounded-md focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
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
              disabled={loading || hasTrackingChild}
              className={`bg-gradient-to-r from-blue-500 to-blue-500 text-white px-5 py-2.5 rounded-full transition-all duration-300 flex items-center gap-2 shadow-md hover:shadow-lg ${
                loading || hasTrackingChild
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:from-blue-600 hover:to-blue-600"
              }`}
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