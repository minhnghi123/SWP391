import React, { useState, useEffect } from "react";
import AddVaccineComponent from "./addVaccine";
import DeleteVaccine from "./deleteVaccine";
import Pagination from "../../../../utils/pagination";
import VaccineDetails from "./detailVaccine";
import { ToastContainer } from "react-toastify";
import {
  Search,
  ArrowUpDown,
  Syringe,
  Eye,
  SquarePen,
} from "lucide-react";
import UpdateVaccine from "./updateVaccine";
import useAxios from "../../../../utils/useAxios";
import RestoreVaccine from "./restoreVaccine";
const url = import.meta.env.VITE_BASE_URL_DB;

const VaccineList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [selectedVaccineId, setSelectedVaccineId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedVaccineForUpdate, setSelectedVaccineForUpdate] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [vaccines, setVaccines] = useState([]);

  const api = useAxios();

  const fetchVaccines = async () => {
    try {
      setLoading(true);
      const response = await api.get(`${url}/Vaccine/get-all-vaccines-admin`);
      setVaccines(response.data);
      setError(null);
    } catch (error) {
      console.error("Error fetching vaccines:", error);
      setError("Failed to fetch vaccines. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVaccines();
  }, []);

  const handleDeleteSuccess = () => {
    fetchVaccines();
  };

  const filteredItems = vaccines.filter((item) =>
    (item.name?.toLowerCase() || "").includes(searchTerm.toLowerCase())
  );

  const sortedItems = [...filteredItems].sort((a, b) => {
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
  const currentItems = sortedItems.slice(indexOfFirstItem, indexOfLastItem);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleViewItem = (item) => {
    console.log("Viewing vaccine with ID:", item.id); // Debug log
    setSelectedVaccineId(item.id);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedVaccineId(null);
  };

  const handleOpenUpdateModal = (item) => {
    setSelectedVaccineForUpdate(item);
    setIsUpdateModalOpen(true);
  };

  const handleCloseUpdateModal = () => {
    setIsUpdateModalOpen(false);
    setSelectedVaccineForUpdate(null);
  };

  const handleUpdateSuccess = (updatedVaccine) => {
    setVaccines((prev) =>
      prev.map((item) =>
        item.id === updatedVaccine.id ? updatedVaccine : item
      )
    );
    handleCloseUpdateModal();
  };

  const handleAddSuccess = () => {
    fetchVaccines();
  };

  // Helper function to format status for display
  const formatStatus = (status) => {
    switch (status) {
      case "Instock":
        return "In Stock";
      case "Nearlyoutstock":
        return "Nearly Out of Stock";
      case "Outstock":
        return "Out of Stock";
      default:
        return "Unknown";
    }
  };

  const formateDelete = (isDeleted) => {
    return isDeleted ? "Deleted" : "Not Deleted";
  };

  return (
    <>
      <ToastContainer position="bottom-right" />
      <div className="bg-white p-6 rounded-2xl shadow-xl shadow-teal-500/5 border border-gray-100">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
          <h1 className="text-2xl font-bold text-gray-900">Vaccine Inventory</h1>
          <AddVaccineComponent onAddSuccess={handleAddSuccess} />
        </div>

        <div className="flex grid-cols-1 md:grid-cols-3 gap-4 mb-6 justify-between">
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Search vaccines..."
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
              <option value="price-asc">Price (Low to High)</option>
              <option value="price-desc">Price (High to Low)</option>
              <option value="quantity-asc">Quantity (Low to High)</option>
              <option value="quantity-desc">Quantity (High to Low)</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          {loading ? (
            <p>Loading vaccines...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                    Id
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                    Name
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                    Quantity
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                    Price
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                    From Country
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                    Delete
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentItems.length > 0 ? (
                  currentItems.map((item) => (
                    <tr
                      key={item.id}
                      className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-4 py-4 text-sm text-gray-600">
                        {item.id}
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-teal-50 flex items-center justify-center">
                            <Syringe className="w-5 h-5 text-blue-600" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">
                              {item.name}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-600">
                        {item.quantity}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-600">
                      {item.price.toLocaleString()} VND
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-600">
                        {item.fromCountry}
                      </td>
                      <td className="px-4 py-4">
                        <span
                          className={`inline-block px-2 py-1 text-sm font-medium rounded-full ${
                            item.status.toLowerCase() === "instock"
                              ? "bg-green-100 text-green-800"
                              : item.status.toLowerCase() === "nearlyoutstock"
                              ? "bg-yellow-100 text-yellow-800"
                              : item.status.toLowerCase() === "outstock"
                              ? "bg-red-100 text-red-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {formatStatus(item.status)}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <span
                          className={`inline-block px-2 py-1 text-sm font-medium rounded-full ${
                            item.isDeleted
                              ? "bg-red-100 text-red-800"
                              : "bg-green-100 text-green-800"
                          }`}
                        >
                          {formateDelete(item.isDeleted)}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleViewItem(item)}
                            className="p-1.5 bg-teal-50 text-teal-600 rounded-md hover:bg-teal-100 transition-colors"
                            title="View details"
                          >
                            <Eye size={16} />
                          </button>
                          <button
                            onClick={() => handleOpenUpdateModal(item)}
                            className="p-1.5 bg-teal-50 text-teal-600 rounded-md hover:bg-teal-100 transition-colors"
                            title="Edit vaccine"
                          >
                            <SquarePen size={16} />
                          </button>
                          <DeleteVaccine
                            vaccineId={item.id}
                            onDeleteSuccess={handleDeleteSuccess}
                          />
                          <RestoreVaccine item={item.id} onRestoreSuccess={handleAddSuccess}/>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={8}
                      className="px-4 py-8 text-center text-gray-500"
                    >
                      No vaccines found matching your search criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(sortedItems.length / itemsPerPage)}
          itemsPerPage={itemsPerPage}
          setCurrentPage={setCurrentPage}
          setItemsPerPage={setItemsPerPage}
          totalItems={sortedItems.length}
        />

        {isModalOpen && selectedVaccineId && (
          <VaccineDetails
            id={selectedVaccineId}
            isOpen={isModalOpen}
            onClose={handleCloseModal}
          />
        )}

        {isUpdateModalOpen && selectedVaccineForUpdate && (
          <UpdateVaccine
            vaccine={selectedVaccineForUpdate}
            onSave={handleUpdateSuccess}
            onCancel={handleCloseUpdateModal}
          />
        )}
      </div>
    </>
  );
};

export default VaccineList;