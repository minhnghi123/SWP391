import React, { useState, useEffect } from "react";
import { Clock, ChevronDown, ChevronUp } from "lucide-react";
import { toast } from "react-toastify";
import useAxios from "../../../utils/useAxios";

const url = import.meta.env.VITE_BASE_URL_DB;

// Component con để hiển thị danh sách children
const ChildList = ({ children, selectedChildIds, handleChildSelect, loading, error }) => {
  if (loading) {
    return <p className="text-gray-500">Loading children...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (!children.length) {
    return <p className="text-gray-600">This user has no children.</p>;
  }

  return (
    <div className="grid grid-cols-1 gap-2 mt-2 max-h-40 overflow-y-auto">
      {children.map((child) => {
        const isActive = child.status === "Active";
        const isSelected = selectedChildIds.includes(child.id);

        return (
          <div
            key={child.id}
            className={`flex items-center p-2 rounded-lg border ${
              isSelected && isActive ? "bg-blue-50 border-blue-200" : "bg-white border-gray-200"
            }`}
          >
            <input
              type="checkbox"
              checked={isSelected}
              onChange={() => handleChildSelect(child.id, isActive)}
              className="w-5 h-5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <span
              className={`ml-2 text-sm ${
                isSelected && isActive ? "text-blue-600 font-semibold" : "text-gray-600"
              }`}
            >
              {child.name} (ID: {child.id}) (DOB: {new Date(child.dateOfBirth).toLocaleDateString()}){" "}
              {child.status === "Inactive" ? "(Inactive)" : ""}
            </span>
          </div>
        );
      })}
    </div>
  );
};

const UpdateUser = ({ user, setShowForm, onAddSuccess, refreshChildren }) => {
  const api = useAxios();

  // Khởi tạo trạng thái form
  const [formData, setFormData] = useState({
    name: user.name || "",
    dateOfBirth: user.dateOfBirth ? new Date(user.dateOfBirth).toISOString().split("T")[0] : "",
    gender: user.gender !== undefined ? user.gender : 0,
    avatar: user.avatar || "",
    gmail: user.gmail || "",
    phoneNumber: user.phoneNumber || "",
    status: user.status || "Active",
  });

  // Quản lý trạng thái tick của children
  const [selectedChildIds, setSelectedChildIds] = useState([]);
  const [children, setChildren] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [childFetchError, setChildFetchError] = useState(""); // Lỗi khi fetch children
  const [loading, setLoading] = useState(false);
  const [showChildren, setShowChildren] = useState(false);

  // Fetch danh sách children từ API
  useEffect(() => {
    const fetchChildren = async () => {
      if (!user.id) {
        setChildFetchError("User ID is missing.");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setChildFetchError(""); // Reset lỗi
        console.log("Fetching children for user ID:", user.id); // Log user.id
        const response = await api.get(`${url}/User/get-user-child/${user.id}`);
        console.log("API Response:", response.data); // Log dữ liệu trả về

        const userChildren = Array.isArray(response.data.children)
          ? response.data.children
          : Array.isArray(response.data)
          ? response.data
          : [];
        setChildren(userChildren);

        // Chỉ tick sẵn các children "Active" có trong user.childIds
        const initialSelectedIds = userChildren
          .filter((child) => child.status === "Active" && user.childIds?.includes(child.id))
          .map((child) => child.id);
        setSelectedChildIds(initialSelectedIds);
        console.log("Initial selectedChildIds:", initialSelectedIds); // Log để kiểm tra
      } catch (error) {
        console.error("Error fetching children:", error);
        setChildren([]);
        setChildFetchError("Failed to fetch children. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchChildren();
  }, [user.id, user.childIds]); // Loại bỏ dependency api vì useAxios không thay đổi

  // Xử lý thay đổi input trong form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "gender" ? parseInt(value, 10) : value,
    }));
  };

  // Xử lý tick/untick children
  const handleChildSelect = (childId, isActive) => {
    setSelectedChildIds((prev) => {
      const isSelected = prev.includes(childId);
      if (isSelected) {
        return prev.filter((id) => id !== childId); // Bỏ tick
      } else {
        return [...prev, childId]; // Thêm tick
      }
    });
  };

  // Validate phone number
  const validatePhoneNumber = (phone) => {
    const phoneRegex = /^(03|05|07|08|09)[0-9]{8}$/;
    return phoneRegex.test(phone);
  };

  // Validate date of birth
  const validateDateOfBirth = (date) => {
    const selectedDate = new Date(date);
    const today = new Date();
    return selectedDate <= today;
  };

  // Xử lý submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
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
      setErrorMessage("Date of birth must be in the past or today.");
      setLoading(false);
      return;
    }

    try {
      const payload = {
        name: formData.name,
        dateOfBirth: formData.dateOfBirth ? new Date(formData.dateOfBirth).toISOString() : null,
        gender: formData.gender,
        avatar: formData.avatar || "",
        gmail: formData.gmail,
        phoneNumber: formData.phoneNumber || "",
        status: formData.status,
        childIds: selectedChildIds,
      };

      const response = await api.put(`${url}/User/update-user-admin/${user.id}`, payload);
      toast.success("User updated successfully!", { autoClose: 3000 });

      if (onAddSuccess) onAddSuccess();
      if (refreshChildren) await refreshChildren(user.id);
      setShowForm(false);
    } catch (error) {
      const errorMsg =
        error.response?.status === 404
          ? "User not found. Please check the user ID or API endpoint."
          : error.response?.data?.message || "Failed to update user. Please check your input and try again.";
      setErrorMessage(errorMsg);
      toast.error(errorMsg, { autoClose: 3000 });
    } finally {
      setLoading(false);
    }
  };

  // Component con để hiển thị input ngày tháng
  const DateInput = ({ label, name, value, onChange }) => (
    <div className="relative">
      <label className="block text-sm font-medium text-gray-700 mb-1.5">{label}</label>
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
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-[600px] max-w-[90%] text-center relative max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Update User</h2>

        {errorMessage && <div className="mb-4 text-red-500 text-sm">{errorMessage}</div>}

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

          {/* Nút Show/Hide Children */}
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

          {/* Hiển thị danh sách children */}
          {showChildren && (
            <div className="mt-4">
              <h4 className="text-sm font-medium">User's Children:</h4>
              <ChildList
                children={children}
                selectedChildIds={selectedChildIds}
                handleChildSelect={handleChildSelect}
                loading={loading}
                error={childFetchError}
              />
            </div>
          )}

          {/* Nút Cancel và Update */}
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