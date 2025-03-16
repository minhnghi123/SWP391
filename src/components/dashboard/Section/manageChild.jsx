import React, { useState, useEffect } from "react";
import { Search, ArrowUpDown, BabyIcon, SquarePen } from "lucide-react";
import { ToastContainer } from "react-toastify";
import DateFormatter from "../../../utils/FormDate";
import UpdateChild from "../CRUD/updateChildren";
import DeleteComponent from "../CRUD/delete";
import useAxios from "../../../utils/useAxios";
import Pagination from "../../../utils/pagination";

const url = import.meta.env.VITE_BASE_URL_DB;

const ChildManagement = () => {
  const [children, setChildren] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const api = useAxios();

  const fetchChildren = async () => {
    try {
      setIsLoading(true);
      const childrenResponse = await api.get(`${url}/Child/get-all-child-admin`);
      const childrenData = childrenResponse.data.map((child) => ({
        ...child,
        status: child.status || "Active",
      }));
      setChildren(childrenData);
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

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleUpdateSuccess = (updatedChild) => {
    setChildren((prev) =>
      prev.map((child) =>
        child.id === updatedChild.id ? { ...child, ...updatedChild } : child
      )
    );
  };

  const handleDeleteSuccess = () => {
    fetchChildren();
  };

  const filteredChildren = children.filter((child) =>
    (child.name?.toLowerCase() || "").includes(searchTerm.toLowerCase())
  );

  const sortedChildren = [...filteredChildren].sort((a, b) => {
    const valueA = a[sortBy] || "";
    const valueB = b[sortBy] || "";
    return sortOrder === "asc"
      ? valueA > valueB
        ? 1
        : -1
      : valueA < valueB
      ? 1
      : -1;
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentChildren = sortedChildren.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <>
      <ToastContainer />
      <div className="bg-white p-6 rounded-2xl shadow-xl shadow-teal-500/5 border border-gray-100">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
          <h1 className="text-2xl font-bold text-gray-900">Child Management</h1>
        </div>

        <div className="flex grid-cols-1 md:grid-cols-3 gap-4 mb-6 justify-between">
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Search children by name..."
              value={searchTerm}
              onChange={handleSearch}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 bg-gray-50"
            />
          </div>
          <div className="flex items-center gap-2">
            <ArrowUpDown size={18} className="text-gray-500" />
            <select
              value={`${sortBy}-${sortOrder}`}
              onChange={(e) => {
                const [field, order] = e.target.value.split("-");
                setSortBy(field);
                setSortOrder(order);
              }}
              className="flex-1 p-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 bg-gray-50"
            >
              <option value="name-asc">Name (A-Z)</option>
              <option value="name-desc">Name (Z-A)</option>
              <option value="dateOfBirth-asc">Date of Birth (Oldest)</option>
              <option value="dateOfBirth-desc">Date of Birth (Newest)</option>
              <option value="createdAt-asc">Created At (Oldest)</option>
              <option value="createdAt-desc">Created At (Newest)</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          {isLoading ? (
            <p className="text-gray-500 text-center">Loading children...</p>
          ) : errorMessage ? (
            <p className="text-red-500 text-center">{errorMessage}</p>
          ) : (
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
                    Date of Birth
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                    Gender
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                    Created At
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentChildren.length > 0 ? (
                  currentChildren.map((child) => (
                    <tr
                      key={child.id}
                      className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-4 py-4 text-sm text-gray-600">
                        {child.id}
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-teal-50 flex items-center justify-center">
                            <BabyIcon className="w-5 h-5 text-teal-600" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">
                              {child.name}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-600">
                        {DateFormatter(child.dateOfBirth)}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-600">
                        {child.gender === 0
                          ? "Male"
                          : child.gender === 1
                          ? "Female"
                          : "Other"}
                      </td>
                      <td
                        className={`inline-block mt-2 px-4 py-4 text-sm font-medium rounded-full ${
                          child.status.toLowerCase() === "active"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {child.status}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-600">
                        {DateFormatter(child.createdAt)}
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-2">
                          <UpdateChild
                            child={child}
                            onUpdateSuccess={handleUpdateSuccess}
                            onCancel={() => {}}
                          />
                          <DeleteComponent
                            id={child.id}
                            onDeleteSuccess={handleDeleteSuccess}
                          />
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={7}
                      className="px-4 py-8 text-center text-gray-500"
                    >
                      No children found matching your search criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(sortedChildren.length / itemsPerPage)}
          itemsPerPage={itemsPerPage}
          setCurrentPage={setCurrentPage}
          setItemsPerPage={setItemsPerPage}
          totalItems={sortedChildren.length}
        />
      </div>
    </>
  );
};

export default ChildManagement;