import React, { useState, useEffect } from "react";
import { Clock, ChevronDown, ChevronUp } from "lucide-react";
import { toast } from "react-toastify";
import useAxios from "../../../utils/useAxios";

const url = import.meta.env.VITE_BASE_URL_DB;

const UpdateUser = ({ user, onAddSuccess, setShowForm }) => {
  const api = useAxios();
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
    childIds: [], // Ban đầu để trống, sẽ được cập nhật từ API
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showChildren, setShowChildren] = useState(false);
  const [children, setChildren] = useState([]); // Chỉ lưu children của user

  // Fetch children hiện tại của user
  useEffect(() => {
    const fetchChildren = async () => {
      try {
        setLoading(true);
        const response = await api.get(`${url}/Child/get-child-by-parents-id/${user.id}`);
        const userChildren = response.data || [];
        setChildren(userChildren);
        setFormData((prev) => ({
          ...prev,
          childIds: userChildren.map((child) => child.id), // Cập nhật childIds
        }));
      } catch (error) {
        console.error("Error fetching children:", error);
        setErrorMessage("Failed to load children data.");
      } finally {
        setLoading(false);
      }
    };
    fetchChildren();
  }, [user.id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "gender" ? parseInt(value, 10) : value,
    }));
  };

  // Hàm validate số điện thoại Việt Nam
  const validatePhoneNumber = (phone) => {
    const phoneRegex = /^(03|05|07|08|09)[0-9]{8}$/;
    return phoneRegex.test(phone);
  };

  // Xử lý chọn/bỏ chọn child
  const handleChildSelect = (childId) => {
    const isSelected = formData.childIds.includes(childId);
    const updatedChildIds = isSelected
      ? formData.childIds.filter((id) => id !== childId)
      : [...formData.childIds, childId];

    setFormData((prev) => ({
      ...prev,
      childIds: updatedChildIds,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(null);

    // Basic validation
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

    try {
      const payload = {
        name: formData.name,
        dateOfBirth: formData.dateOfBirth
          ? new Date(formData.dateOfBirth).toISOString()
          : null,
        gender: formData.gender,
        avatar: formData.avatar || "",
        gmail: formData.gmail,
        phoneNumber: formData.phoneNumber || "",
        status: formData.status,
        childIds: formData.childIds,
      };

      const response = await api.put(
        `${url}/User/update-user/admin/${user.id}`,
        payload
      );

      console.log("Update successful:", response.data);
      toast.success("User updated successfully!", { autoClose: 3000 });
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
      toast.error(errorMsg, { autoClose: 3000 });
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
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-[600px] max-w-[90%] text-center relative max-h-[90vh] overflow-y-auto">
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

          {/* Nút hiển thị/ẩn danh sách children */}
          <div className="mt-6">
            <button
              type="button"
              onClick={() => setShowChildren((prev) => !prev)}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors flex items-center gap-2"
            >
              {showChildren ? (
                <>
                  <ChevronUp size={18} /> Hide Children
                </>
              ) : (
                <>
                  <ChevronDown size={18} /> Show Children
                </>
              )}
            </button>
          </div>

          {/* Danh sách children của user */}
          {showChildren && (
            <div className="mt-4">
              <h4 className="text-sm font-medium">User's Children:</h4>
              {loading ? (
                <p className="text-gray-500">Loading children...</p>
              ) : children.length > 0 ? (
                <div className="grid grid-cols-1 gap-2 mt-2 max-h-40 overflow-y-auto">
                  {children.map((child) => {
                    const isSelected = formData.childIds.includes(child.id);
                    return (
                      <div
                        key={child.id}
                        className={`flex items-center p-2 rounded-lg border ${
                          isSelected ? "bg-blue-50 border-blue-200" : "bg-white border-gray-200"
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => handleChildSelect(child.id)}
                          className="w-5 h-5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                        <span
                          className={`ml-2 text-sm ${
                            isSelected ? "text-blue-600 font-semibold" : "text-gray-600"
                          }`}
                        >
                          {child.name} (ID: {child.id}) (DOB:{" "}
                          {new Date(child.dateOfBirth).toLocaleDateString()})
                        </span>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="text-gray-500">No children assigned to this user.</p>
              )}
            </div>
          )}

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