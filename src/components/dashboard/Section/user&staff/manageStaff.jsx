import React, { useState, useEffect } from "react";
import AddUser from "./addUser";
import DeleteComponent from "./delete";
import Pagination from "../../../../utils/pagination";
import {
  Search,
  User,
  SquarePen,
  Plus,
  ChevronDown,
  ChevronUp,
  ArrowUpDown,
} from "lucide-react";
import AddStaff from "./addStaff";
import UpdateUser from "./updateUser";
import { ToastContainer } from "react-toastify";
import useAxios from "../../../../utils/useAxios";
import ExpandedUser from "./ExpandedChild"; // Import component mới

const url = import.meta.env.VITE_BASE_URL_DB;

const StaffManagement = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddUserForm, setShowAddUserForm] = useState(false);
  const [showAddStaffForm, setShowAddStaffForm] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [expandedUserId, setExpandedUserId] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const api = useAxios();

  useEffect(() => {
    const fetchDataAsync = async () => {
      try {
        setLoading(true);
        const response = await api.get(`${url}/User/get-all-user-admin`);
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
    setCurrentPage(1);
  };

  const filteredUsers = users
    .filter((user) => user.role?.toLowerCase() !== "admin" && user.role?.toLowerCase() !== "user")
    .filter((user) => user.name.toLowerCase().includes(search.toLowerCase()));

  const sortedUsers = [...filteredUsers].sort((a, b) => {
    const valueA = sortBy === "role" ? (a.role || "").toLowerCase() : a[sortBy] || "";
    const valueB = sortBy === "role" ? (b.role || "").toLowerCase() : b[sortBy] || "";
    return sortOrder === "asc" ? (valueA > valueB ? 1 : -1) : (valueA < valueB ? 1 : -1);
  });

  const handleAddSuccess = () => {
    const fetchDataAsync = async () => {
      try {
        const response = await api.get(`${url}/User/get-all-user-admin`);
        setUsers(
          response.data.map((user) => ({
            ...user,
            status: user.status || "Active",
          }))
        );
        setShowAddUserForm(false);
        setShowAddStaffForm(false);
        setShowUpdateForm(false);
        setExpandedUserId(null);
      } catch (error) {
        console.error("Error refreshing user list:", error);
        setError("Failed to refresh user list.");
      }
    };
    fetchDataAsync();
  };

  const handleDeleteSuccess = (deletedId) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === deletedId ? { ...user, isDelete: true } : user
      )
    );
    if (expandedUserId === deletedId) {
      setExpandedUserId(null);
    }
    handleAddSuccess();
  };

  const handleUpdateClick = (user) => {
    setSelectedUser(user);
    setShowUpdateForm(true);
    if (expandedUserId === user.id) {
      setExpandedUserId(null);
    }
  };

  const handleAddChildrenSuccess = () => {
    if (selectedUser) {
      handleExpandUser(selectedUser);
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedUsers.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <>
      <ToastContainer position="bottom-right" />
      <div className="bg-white p-6 rounded-2xl shadow-xl shadow-teal-500/5 border border-gray-100">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
          <h1 className="text-2xl font-bold text-gray-900">Staff Management</h1>
          <div className="flex gap-4">
            <button
              onClick={() => setShowAddStaffForm(true)}
              className="bg-gradient-to-r from-blue-500 to-blue-500 text-white px-5 py-2.5 rounded-full hover:from-blue-600 hover:to-blue-600 transition-all duration-300 flex items-center gap-2 shadow-md hover:shadow-lg"
            >
              <Plus className="w-5 h-5" />
              <span className="font-medium">Add Staff</span>
            </button>
          </div>
        </div>

        <div className="flex grid-cols-1 md:grid-cols-3 gap-4 mb-6 justify-between">
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Search users by name"
              value={search}
              onChange={handleSearch}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 bg-gray-50"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          {loading ? (
            <p className="text-gray-500 text-center">Loading users...</p>
          ) : error && !expandedUserId ? (
            <p className="text-red-500 text-center">{error}</p>
          ) : currentItems.length > 0 ? (
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">ID</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Name</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Username</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Email</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Phone</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">DOB</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Gender</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Role</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Status</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((user) => (
                  <React.Fragment key={user.id}>
                    <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-4 text-sm text-gray-600">{user.id}</td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-teal-50 flex items-center justify-center">
                            <User className="w-5 h-5 text-blue-600" />
                          </div>
                          <div className="max-w-[200px] overflow-hidden whitespace-nowrap text-ellipsis">
                            <p className="font-medium text-gray-900">{user.name}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-600 max-w-[100px] overflow-hidden whitespace-nowrap text-ellipsis">
                        {user.username}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-600 max-w-[100px] overflow-hidden whitespace-nowrap text-ellipsis">
                        {user.gmail}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-600">{user.phoneNumber}</td>
                      <td className="px-4 py-4 text-sm text-gray-600">
                        {new Date(user.dateOfBirth).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-600">
                        {user.gender === 0 ? "Male" : user.gender === 1 ? "Female" : "Other"}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-600">{user.role || "N/A"}</td>
                      <td className="px-4 py-4">
                        <span
                          className={`inline-block px-2 py-1 text-sm font-medium rounded-full ${
                            (user.status || "active").toLowerCase() === "active"
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {user.status || "UNKNOWN"}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleUpdateClick(user)}
                            className="p-1.5 bg-teal-50 text-teal-600 rounded-md hover:bg-teal-100 transition-colors"
                          >
                            <SquarePen size={16} />
                          </button>
                          <DeleteComponent
                            id={user.id}
                            isUser={true}
                            onDeleteSuccess={handleDeleteSuccess}
                          />
                        </div>
                      </td>
                    </tr>
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-gray-500 text-center py-8">No users found matching your search criteria.</p>
          )}
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(sortedUsers.length / itemsPerPage)}
          itemsPerPage={itemsPerPage}
          setCurrentPage={setCurrentPage}
          setItemsPerPage={setItemsPerPage}
          totalItems={sortedUsers.length}
        />

        {showAddStaffForm && (
          <AddStaff onAddSuccess={handleAddSuccess} setShowForm={setShowAddStaffForm} />
        )}
        {showUpdateForm && selectedUser && (
          <UpdateUser
            user={selectedUser}
            onAddSuccess={handleAddSuccess}
            setShowForm={setShowUpdateForm}
          />
        )}
      </div>
    </>
  );
};

export default StaffManagement;