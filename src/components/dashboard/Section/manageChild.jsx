import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import DateFormatter from "../../../utils/FormDate";
import AddChild from "../CRUD/addChild";
import DeleteComponent from "../CRUD/delete";

const ChildManagement = () => {
  const [children, setChildren] = useState([]);
  const [parents, setParents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  // Fetch danh sách children với token (nếu cần)
  const fetchChildren = async () => {
    try {
      const response = await axios.get("https://localhost:7280/api/Child/get-all-child-admin", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Failed to fetch children:", error);
      throw new Error("Failed to load children.");
    }
  };

  // Fetch danh sách parents
  const fetchParents = async () => {
    try {
      const response = await axios.get("https://localhost:7280/api/User/get-all-user-admin", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Failed to fetch parents:", error);
      throw new Error("Failed to load parents.");
    }
  };

  // Fetch cả children và parents khi component mount
  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        const [childrenData, parentsData] = await Promise.all([
          fetchChildren(),
          fetchParents(),
        ]);
        setChildren(childrenData);
        setParents(parentsData);
        setErrorMessage(null);
      } catch (error) {
        setErrorMessage(error.message || "Failed to load data. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredChildren = children.filter((child) =>
    child.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const refreshChildrenList = async () => {
    try {
      const response = await axios.get("https://localhost:7280/api/Child/get-all-child-admin", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setChildren(
        response.data.map((child) => ({
          ...child,
          status: child.status || "Active",
        }))
      );
    } catch (error) {
      console.error("Failed to refresh children list:", error);
      setErrorMessage("Failed to refresh children list.");
      toast.error("Error refreshing children list.");
    }
  };

  const handleDeleteSuccess = (deletedId) => {
    setChildren((prev) => prev.filter((child) => child.id !== deletedId));
  };

  // Hàm lấy tên parent dựa trên parentID
  const getParentName = (parentID) => {
    const parent = parents.find((p) => p.id === parentID); // Sửa từ p.parentID thành p.id
    return parent ? parent.name : "Unknown";
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Child Management</h1>
        <AddChild onAddSuccess={refreshChildrenList} />
      </div>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="w-full p-3 rounded-lg border border-gray-300 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {isLoading && <p className="text-center text-gray-500">Loading children...</p>}
      {errorMessage && <p className="text-center text-red-500">{errorMessage}</p>}

      {!isLoading && !errorMessage && (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full table-auto">
            <thead className="bg-gray-100 border-b">
              <tr>
                {[
                  "Name",
                  "Parent Name",
                  "Date of Birth",
                  "Gender",
                  "Status",
                  "Created At",
                  "Actions",
                ].map((header) => (
                  <th
                    key={header}
                    className="px-6 py-3 text-left text-sm font-medium text-gray-600"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredChildren.length > 0 ? (
                filteredChildren.map((child) => (
                  <tr key={child.id} className="border-b hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-800">{child.name}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {getParentName(child.parentID)}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {DateFormatter(child.dateOfBirth)}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {child.gender === 0 ? "Male" : "Female"}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{child.status}</td>
                    <td className="px-6 py-4 text-sm text-gray-800">
                      {DateFormatter(child.createdAt)}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-800">
                      <DeleteComponent
                        id={child.id}
                        endpoint="https://localhost:7280/api/Child/soft-delete-child/{id}"
                        entityName="Child"
                        onDeleteSuccess={handleDeleteSuccess}                 
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="px-6 py-4 text-center text-gray-500">
                    No children found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ChildManagement;