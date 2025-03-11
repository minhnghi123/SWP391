import React, { useState, useEffect } from "react";
import AddUser from "../CRUD/addUser";
import DeleteUser from "../CRUD/delete";
import { Plus, Clock } from "lucide-react";
import axios from "axios";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    const fetchDataAsync = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "https://localhost:7280/api/User/get-all-user",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        // Assuming the API returns status as "Active" or "Inactive", if not, adjust accordingly
        setUsers(
          response.data.map((user) => ({
            ...user,
            status: user.status || "Active",
          }))
        );
        setError(null);
      } catch (error) {
        console.error("Error fetching API:", error);
        setError("Failed to fetch users. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchDataAsync();
  }, []);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const filteredUsers = users.filter((user) =>
    user.username.toLowerCase().includes(search.toLowerCase())
  );

  const handleAddSuccess = () => {
    const fetchDataAsync = async () => {
      try {
        const response = await axios.get(
          "https://localhost:7280/api/User/get-all-user",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setUsers(
          response.data.map((user) => ({
            ...user,
            status: user.status || "Active",
          }))
        );
      } catch (error) {
        console.error("Error refreshing user list:", error);
        setError("Failed to refresh user list.");
      }
    };
    fetchDataAsync();
  };

  const handleDeleteSuccess = (deletedId) => {
    // Update the status locally without refetching the entire list
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === deletedId ? { ...user, status: "Inactive" } : user
      )
    );
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">User Management</h1>
        <button
          onClick={() => setShowAddForm(true)}
          className="px-4 py-2 bg-gradient-to-r from-teal-500 to-emerald-500 text-white rounded-full hover:from-teal-600 hover:to-emerald-600 transition-all duration-300 flex items-center gap-2 shadow-lg shadow-teal-500/20"
        >
          <Plus className="w-5 h-5" />
          Add User
        </button>
      </div>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by username..."
          value={search}
          onChange={handleSearch}
          className="w-full p-3 rounded-lg border border-gray-300 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {loading && <p className="text-center text-gray-500">Loading Users...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {!loading && !error && (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full table-auto">
            <thead className="bg-gray-100 border-b">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">
                  Username
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">
                  Phone
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">
                  DOB
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">
                  Gender
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.username} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-800">
                    {user.name}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {user.username}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {user.gmail}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {user.phoneNumber}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {new Date(user.dateOfBirth).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {user.gender === 0
                      ? "Male"
                      : user.gender === 1
                      ? "Female"
                      : "Other"}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {user.role || "N/A"}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {user.status}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    <DeleteUser
                      id={user.id}
                      onDeleteSuccess={handleDeleteSuccess}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showAddForm && (
        <AddUser onAddSuccess={handleAddSuccess} setShowForm={setShowAddForm} />
      )}
    </div>
  );
};

export default UserManagement;
