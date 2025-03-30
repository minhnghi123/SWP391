import React, { useState, useEffect } from "react";
import { SquarePen } from "lucide-react";
import { toast } from "react-toastify";
import useAxios from "../../../../utils/useAxios";

const url = import.meta.env.VITE_BASE_URL_DB;

const UpdateChild = ({ child, userId, onUpdateSuccess, onCancel }) => {
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const api = useAxios();

  const [updatedChild, setUpdatedChild] = useState({});

  // Initialize or reset form data when child changes or form opens
  useEffect(() => {
    if (child && showForm) {
      setUpdatedChild({
        id: child.id || "",
        parentID: userId || child.parentID || "",
        name: child.name || "",
        dateOfBirth: child.dateOfBirth
          ? new Date(child.dateOfBirth).toISOString().split("T")[0]
          : "",
        gender: child.gender !== undefined ? child.gender.toString() : "0",
        status: child.status || "Active", // Default to "Active" if undefined
      });
    }
  }, [child, userId, showForm]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      // Toggle between "Active" and "Inactive" for status
      setUpdatedChild((prev) => ({
        ...prev,
        status: checked ? "Active" : "Inactive",
      }));
    } else {
      setUpdatedChild((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleUpdateChild = async () => {
    if (!updatedChild.name.trim()) {
      setError("Child's name is required.");
      return;
    }
    if (!updatedChild.dateOfBirth) {
      setError("Date of birth is required.");
      return;
    }
    if (!updatedChild.parentID) {
      setError("Parent ID is required.");
      return;
    }

    const selectedDate = new Date(updatedChild.dateOfBirth);
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    if (selectedDate > currentDate) {
      setError("Date of birth cannot be in the future.");
      return;
    }

    setLoading(true);
    setError(null);

    const childData = {
      ...updatedChild,
      id: updatedChild.id,
      parentID: updatedChild.parentID,
      name: updatedChild.name.trim(),
      dateOfBirth: updatedChild.dateOfBirth,
      gender: parseInt(updatedChild.gender),
      status: updatedChild.status, // String: "Active" or "Inactive"
    };

    try {
      const response = await api.put(
        `${url}/Child/update-child/${updatedChild.id}`,
        childData
      );

      if (response.status === 200) {
        toast.success("Child updated successfully!");
        if (typeof onUpdateSuccess === "function") {
          onUpdateSuccess(childData);
        }
        setShowForm(false);
        if (typeof onCancel === "function") {
          onCancel();
        }
      }
    } catch (error) {
      console.error("Error updating child:", error.response?.data || error);
      toast.error(
        error.response?.data?.message || "Error occurred while updating child."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setShowForm(true)}
        className="p-1.5 bg-teal-50 text-blue-600 rounded-md hover:bg-teal-100 transition-colors"
        title="Edit child"
      >
        <SquarePen size={16} />
      </button>

      {showForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-2xl shadow-2xl w-[500px] max-w-[90%] max-h-[90vh] overflow-y-auto text-center relative">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">
              Update Child
            </h2>

            {error && <div className="mb-4 text-red-500 text-sm">{error}</div>}

            <div className="grid grid-cols-1 gap-4 mb-6">
              <div className="w-full p-2.5 border border-gray-300 rounded-md bg-gray-100 text-gray-700">
                Parent ID: {updatedChild.parentID}
              </div>

              <input
                type="text"
                name="name"
                placeholder="Child's Name"
                value={updatedChild.name}
                onChange={handleInputChange}
                className="w-full p-2.5 border border-gray-300 rounded-md focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors"
                required
              />
              <input
                type="date"
                name="dateOfBirth"
                value={updatedChild.dateOfBirth}
                onChange={handleInputChange}
                max={new Date().toISOString().split("T")[0]}
                className="w-full p-2.5 border border-gray-300 rounded-md focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors"
                required
              />
              <select
                name="gender"
                value={updatedChild.gender}
                onChange={handleInputChange}
                className="w-full p-2.5 border border-gray-300 rounded-md focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors"
              >
                <option value="0">Male</option>
                <option value="1">Female</option>
              </select>

              <div className="flex items-center justify-start gap-2">
                <input
                  type="checkbox"
                  name="status"
                  checked={updatedChild.status === "Active"} // Check if status is "Active"
                  onChange={handleInputChange}
                  className="w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
                />
                <label className="text-gray-700">
                  Active{/* Display "Active" or "Inactive" */}
                </label>
              </div>
            </div>

            <div className="mt-6 flex justify-end space-x-4">
              <button
                onClick={() => {
                  setShowForm(false);
                  if (typeof onCancel === "function") onCancel();
                }}
                className="px-6 py-2.5 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                disabled={loading}
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateChild}
                disabled={loading}
                className="px-6 py-2.5 bg-gradient-to-r from-blue-500 to-blue-500 text-white rounded-lg hover:from-blue-600 hover:to-blue-600 transition-all duration-300 shadow-lg shadow-teal-500/20 disabled:from-blue-300 disabled:to-blue-300"
              >
                {loading ? "Updating..." : "Update Child"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UpdateChild;