import React, { useState, useEffect } from "react";
import AddUser from "../CRUD/addUser";
import DeleteComponent from "../CRUD/delete";
import Pagination from "../../../utils/pagination";
import { Search, User, SquarePen, Plus, ChevronDown, ChevronUp } from "lucide-react";
import AddStaff from "../CRUD/addStaff";
import UpdateUser from "../CRUD/updateUser";
import { ToastContainer } from "react-toastify";
import useAxios from "../../../utils/useAxios";
import AddChildren from "../CRUD/addChild";

const url = import.meta.env.VITE_BASE_URL_DB;

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddUserForm, setShowAddUserForm] = useState(false);
  const [showAddStaffForm, setShowAddStaffForm] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [expandedUserId, setExpandedUserId] = useState(null);
  const [childrenData, setChildrenData] = useState({});
  const [showAddChildrenForm, setShowAddChildrenForm] = useState(false);
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

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

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
        setShowAddChildrenForm(false);
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
    handleAddSuccess();
  };

  const handleUpdateClick = (user) => {
    setSelectedUser(user);
    setShowUpdateForm(true);
  };

  const handleExpandUser = async (user) => {
    if (expandedUserId === user.id) {
      setExpandedUserId(null);
      setError(null);
    } else {
      try {
        setLoading(true);
        const response = await api.get(`${url}/Child/get-child-by-parents-id/${user.id}`);
        setChildrenData((prev) => ({
          ...prev,
          [user.id]: response.data || [],
        }));
        setExpandedUserId(user.id);
        setSelectedUser(user);
        setError(null);
      } catch (error) {
        console.error("Error fetching children:", error);
        if (error.response?.status === 404) {
          setChildrenData((prev) => ({
            ...prev,
            [user.id]: [],
          }));
          setExpandedUserId(user.id);
          setSelectedUser(user);
          setError(null);
        } else {
          setError("Failed to fetch children data.");
        }
      } finally {
        setLoading(false);
      }
    }
  };

  // Callback để refresh children sau khi update
  const refreshChildren = async (userId) => {
    try {
      const response = await api.get(`${url}/Child/get-child-by-parents-id/${userId}`);
      setChildrenData((prev) => ({
        ...prev,
        [userId]: response.data || [],
      }));
    } catch (error) {
      console.error("Error refreshing children:", error);
      if (error.response?.status === 404) {
        setChildrenData((prev) => ({
          ...prev,
          [userId]: [],
        }));
      } else {
        setError("Failed to refresh children data.");
      }
    }
  };

  const handleAddChildrenSuccess = () => {
    handleExpandUser(selectedUser);
    setShowAddChildrenForm(false);
  };

  // Tính toán phân trang
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <>
      <ToastContainer />
      <div className="bg-white p-6 rounded-2xl shadow-xl shadow-teal-500/5 border border-gray-100">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
          <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
          <div className="flex gap-4">
            <button
              onClick={() => setShowAddUserForm(true)}
              className="bg-gradient-to-r from-teal-500 to-emerald-500 text-white px-5 py-2.5 rounded-full hover:from-teal-600 hover:to-emerald-600 transition-all duration-300 flex items-center gap-2 shadow-md hover:shadow-lg"
            >
              <Plus className="w-5 h-5" />
              <span className="font-medium">Add User</span>
            </button>
            <button
              onClick={() => setShowAddStaffForm(true)}
              className="bg-gradient-to-r from-teal-500 to-emerald-500 text-white px-5 py-2.5 rounded-full hover:from-teal-600 hover:to-emerald-600 transition-all duration-300 flex items-center gap-2 shadow-md hover:shadow-lg"
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
          ) : error ? (
            <p className="text-red-500 text-center">{error}</p>
          ) : currentItems.length > 0 ? (
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                    ID
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                    Name
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                    Username
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                    Email
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                    Phone
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                    DOB
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                    Gender
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                    Role
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                    Actions
                  </th>
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
                            <User className="w-5 h-5 text-teal-600" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{user.name}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-600">{user.username}</td>
                      <td className="px-4 py-4 text-sm text-gray-600">{user.gmail}</td>
                      <td className="px-4 py-4 text-sm text-gray-600">{user.phoneNumber}</td>
                      <td className="px-4 py-4 text-sm text-gray-600">
                        {new Date(user.dateOfBirth).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-600">
                        {user.gender === 0 ? "Male" : user.gender === 1 ? "Female" : "Other"}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-600">{user.role || "N/A"}</td>
                      <td
                        className={`inline-block mt-2 px-4 py-4 text-sm font-medium rounded-full ${
                          user.status.toLowerCase() === "active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                        }`}
                      >
                        {user.status}
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleExpandUser(user)}
                            className="p-1.5 bg-teal-50 text-teal-600 rounded-md hover:bg-teal-100 transition-colors"
                            title="View Children"
                          >
                            {expandedUserId === user.id ? (
                              <ChevronUp size={16} />
                            ) : (
                              <ChevronDown size={16} />
                            )}
                          </button>
                          <DeleteComponent
                            id={user.id}
                            isUser={true}
                            onDeleteSuccess={handleDeleteSuccess}
                          />
                        </div>
                      </td>
                    </tr>
                    {/* Phần mở rộng hiển thị children */}
                    {expandedUserId === user.id && (
                      <tr>
                        <td colSpan="10" className="px-4 py-4 bg-gray-50">
                          <div className="ml-12">
                            <div className="flex gap-4 mb-4">
                              <AddChildren
                                userId={user.id}
                                onAddSuccess={handleAddChildrenSuccess}
                              />
                              <button
                                onClick={() => handleUpdateClick(user)}
                                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 flex items-center gap-2"
                              >
                                <SquarePen size={16} />
                                Update User
                              </button>
                            </div>
                            <table className="w-full border-collapse">
                              <thead>
                                <tr className="bg-gray-100">
                                  <th className="p-2 text-left text-sm font-semibold text-gray-600">ID</th>
                                  <th className="p-2 text-left text-sm font-semibold text-gray-600">Name</th>
                                  <th className="p-2 text-left text-sm font-semibold text-gray-600">DOB</th>
                                  <th className="p-2 text-left text-sm font-semibold text-gray-600">Gender</th>
                                </tr>
                              </thead>
                              <tbody>
                                {childrenData[user.id]?.length > 0 ? (
                                  childrenData[user.id].map((child) => (
                                    <tr key={child.id} className="border-b">
                                      <td className="p-2 text-sm text-gray-600">{child.id}</td>
                                      <td className="p-2 text-sm text-gray-600">{child.name}</td>
                                      <td className="p-2 text-sm text-gray-600">
                                        {new Date(child.dateOfBirth).toLocaleDateString()}
                                      </td>
                                      <td className="p-2 text-sm text-gray-600">
                                        {child.gender === 0 ? "Male" : child.gender === 1 ? "Female" : "Other"}
                                      </td>
                                    </tr>
                                  ))
                                ) : (
                                  <tr>
                                    <td colSpan="4" className="p-2 text-center text-gray-500">
                                      This user has no children.
                                    </td>
                                  </tr>
                                )}
                              </tbody>
                            </table>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-gray-500 text-center py-8">
              No users found matching your search criteria.
            </p>
          )}
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(filteredUsers.length / itemsPerPage)}
          itemsPerPage={itemsPerPage}
          setCurrentPage={setCurrentPage}
          setItemsPerPage={setItemsPerPage}
          totalItems={filteredUsers.length}
        />

        {showAddUserForm && (
          <AddUser
            onAddSuccess={handleAddSuccess}
            setShowForm={setShowAddUserForm}
          />
        )}

        {showAddStaffForm && (
          <AddStaff
            onAddSuccess={handleAddSuccess}
            setShowForm={setShowAddStaffForm}
          />
        )}

        {showUpdateForm && selectedUser && (
          <UpdateUser
            user={selectedUser}
            onAddSuccess={handleAddSuccess}
            setShowForm={setShowUpdateForm}
            refreshChildren={refreshChildren} // Truyền callback để refresh children
          />
        )}
      </div>
    </>
  );
};

export default UserManagement;