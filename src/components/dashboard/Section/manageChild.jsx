import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import DateFormatter from "../../../utils/FormDate";
import AddChild from "../CRUD/addChild";
import DeleteComponent from "../CRUD/delete"; // Import component chung

const ChildManagement = () => {
  const [children, setChildren] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  const fetchChildren = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get("https://localhost:7280/api/Child/get-all-child-admin");
      setChildren(response.data);
      setErrorMessage(null);
    } catch (error) {
      console.error("Failed to fetch children:", error);
      setErrorMessage("Failed to load children. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchChildren();
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
                {["Name", "Date of Birth", "Gender", "Status", "Created At", "Actions"].map(
                  (header) => (
                    <th
                      key={header}
                      className="px-6 py-3 text-left text-sm font-medium text-gray-600"
                    >
                      {header}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody>
              {filteredChildren.length > 0 ? (
                filteredChildren.map((child) => (
                  <tr key={child.id} className="border-b hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-800">{child.name}</td>
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
                  <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
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