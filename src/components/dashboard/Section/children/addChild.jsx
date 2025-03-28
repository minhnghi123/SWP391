import React, { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import { toast } from "react-toastify";
import useAxios from "../../../../utils/useAxios";
const url = import.meta.env.VITE_BASE_URL_DB;

const AddChild = ({ onAddSuccess, parentId }) => {
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [parents, setParents] = useState([]);
  const api = useAxios();

  const [newChild, setNewChild] = useState({
    parentID: parentId || "",
    name: "",
    dateOfBirth: "",
    gender: "0",
  });

  const fetchParents = async () => {
    try {
      const response = await api.get(`${url}/User/get-all-user-admin`);
      setParents(response.data);
    } catch (error) {
      console.error("Error fetching parents:", error);
      setError("Failed to load parent list. Please try again.");
    }
  };

  useEffect(() => {
    if (showForm) {
      fetchParents();
      setNewChild((prev) => ({
        ...prev,
        parentID: parentId || "",
      }));
    }
  }, [showForm, parentId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewChild((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddChild = async () => {
    if (!newChild.name.trim()) {
      setError("Child's name is required.");
      return;
    }
    if (!newChild.dateOfBirth) {
      setError("Date of birth is required.");
      return;
    }
    if (!newChild.parentID) {
      setError("Parent ID is required.");
      return;
    }

    // Kiểm tra nếu ngày sinh trong tương lai
    const today = new Date();
    const dob = new Date(newChild.dateOfBirth);
    if (dob > today) {
      setError("Date of birth cannot be in the future.");
      return;
    }

    setLoading(true);
    setError(null);

    const childData = {
      parentID: newChild.parentID,
      name: newChild.name.trim(),
      dateOfBirth: newChild.dateOfBirth,
      gender: parseInt(newChild.gender),
    };

    try {
      const response = await api.post(`${url}/Child/create-child`, childData);

      if (response.status === 201 || response.status === 200) {
        toast.success("Child added successfully!");
        if (typeof onAddSuccess === "function") {
          onAddSuccess({
            ...childData,
            id: response.data.id || Date.now(),
          });
        }
        setNewChild({
          parentID: parentId || "",
          name: "",
          dateOfBirth: "",
          gender: "0",
        });
        setShowForm(false);
      }
    } catch (error) {
      console.error("Error adding child:", error.response?.data || error);
      toast.error(
        error.response?.data?.message || "Error occurred while adding child."
      );
    } finally {
      setLoading(false);
    }
  };

  // Định dạng ngày hôm nay theo yyyy-mm-dd để dùng cho thuộc tính max
  const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0"); // Tháng bắt đầu từ 0
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  return (
    <>
      <button
        onClick={() => setShowForm(!showForm)}
        className="bg-gradient-to-r from-blue-500 to-blue-500 text-white px-4 py-2 rounded-full hover:from-blue-600 hover:to-blue-600 transition-all duration-300 flex items-center gap-2 shadow-lg shadow-teal-500/20"
      >
        <Plus className="w-5 h-5" />
        Add Child
      </button>

      {showForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-2xl shadow-2xl w-[500px] max-w-[90%] max-h-[90vh] overflow-y-auto text-center relative">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Add New Child</h2>

            {error && <div className="mb-4 text-red-500 text-sm">{error}</div>}

            <div className="grid grid-cols-1 gap-4 mb-6">
              <select
                name="parentID"
                value={newChild.parentID}
                onChange={handleInputChange}
                className="w-full p-2.5 border border-gray-300 rounded-md focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors"
                required
              >
                <option value="">Select Parent</option>
                {parents.length > 0 ? (
                  parents.map((parent) => (
                    <option key={parent.id} value={parent.id}>
                      {parent.name} (ID: {parent.id})
                    </option>
                  ))
                ) : (
                  <option disabled>Loading parents...</option>
                )}
              </select>

              <input
                type="text"
                name="name"
                placeholder="Child's Name"
                value={newChild.name}
                onChange={handleInputChange}
                className="w-full p-2.5 border border-gray-300 rounded-md focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors"
                required
              />
              <input
                type="date"
                name="dateOfBirth"
                value={newChild.dateOfBirth}
                onChange={handleInputChange}
                max={getTodayDate()} // Giới hạn ngày tối đa là hôm nay
                className="w-full p-2.5 border border-gray-300 rounded-md focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors"
                required
              />
              <select
                name="gender"
                value={newChild.gender}
                onChange={handleInputChange}
                className="w-full p-2.5 border border-gray-300 rounded-md focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors"
              >
                <option value="0">Male</option>
                <option value="1">Female</option>
              </select>
            </div>

            <div className="mt-6 flex justify-end space-x-4">
              <button
                onClick={() => setShowForm(false)}
                className="px-6 py-2.5 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                disabled={loading}
              >
                Cancel
              </button>
              <button
                onClick={handleAddChild}
                disabled={loading}
                className="px-6 py-2.5 bg-gradient-to-r from-teal-500 to-emerald-500 text-white rounded-lg hover:from-teal-600 hover:to-emerald-600 transition-all duration-300 shadow-lg shadow-teal-500/20 disabled:from-teal-300 disabled:to-emerald-300"
              >
                {loading ? "Adding..." : "Add Child"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AddChild;