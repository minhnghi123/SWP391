import React, { useState, useEffect } from "react";
import axios from "axios";
import AddVaccine from "../../staffManage/components/addVaccine";
import DeleteVaccine from "../components/vaccineDeleteAdmin";
import Pagination from "../../../utils/pagination";
import VaccineDetails from "../../staffManage/components/detailVaccine"; // Đảm bảo tên file khớp
import { ToastContainer } from "react-toastify";
import {
  Search,
  ArrowUpDown,

  Refrigerator,
  Eye,
} from "lucide-react";

const ViewAllVaccines = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [selectedVaccine, setSelectedVaccine] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [vaccines, setVaccines] = useState([]);

  // Fetch dữ liệu vaccines từ API
  useEffect(() => {
    const fetchVaccines = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "https://localhost:7280/api/Vaccine/get-all-vaccines-admin"
        );
        setVaccines(response.data);
        setError(null);
      } catch (error) {
        console.error("Error fetching vaccines:", error);
        setError("Failed to fetch vaccines. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchVaccines();
  }, []);

  // Filter, Sort, Pagination logic
  const filteredVaccines = vaccines.filter((vaccine) => {
    const matchesSearch =
      (vaccine.name?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
      (vaccine.fromCountry?.toLowerCase() || "").includes(
        searchTerm.toLowerCase()
      ) ||
      (vaccine.description?.toLowerCase() || "").includes(
        searchTerm.toLowerCase()
      );
    return matchesSearch;
  });

  const sortedVaccines = [...filteredVaccines].sort((a, b) => {
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
  const currentVaccines = sortedVaccines.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  
  // Xem chi tiết vaccine và mở modal
  const handleViewVaccine = (vaccine) => {
    setSelectedVaccine(vaccine);
    setIsModalOpen(true); // Mở modal
  };

  // Đóng modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedVaccine(null); // Xóa vaccine đã chọn khi đóng
  };

  const handleUpdateVaccine = (updatedVaccine) => {
    setVaccines((prevVaccines) =>
      prevVaccines.map((vaccine) =>
        vaccine.id === updatedVaccine.id ? updatedVaccine : vaccine
      )
    );
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-xl shadow-teal-500/5 border border-gray-100">
            <ToastContainer />
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
        <h1 className="text-2xl font-bold text-gray-900">Vaccine Inventory</h1>
        <AddVaccine />
      </div>

      {/* Search and Filters */}
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
            onChange={(e) => setSearchTerm(e.target.value)}
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
            <option value="quantity-asc">Stock (Low to High)</option>
            <option value="quantity-desc">Stock (High to Low)</option>
            <option value="timeExpired-asc">Expiry (Soonest)</option>
            <option value="timeExpired-desc">Expiry (Latest)</option>
          </select>
        </div>
      </div>

      {/* Vaccines Table */}
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
                  Vaccine
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                  Description
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                  Price (VND)
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                  Country
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                  Expiry
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                  Stock
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {currentVaccines.length > 0 ? (
                currentVaccines.map((vaccine) => (
                  <tr
                    key={vaccine.id}
                    className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-teal-50 flex items-center justify-center">
                          <Refrigerator className="w-5 h-5 text-teal-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">
                            {vaccine.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {vaccine.description}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-600">
                      {vaccine.description}
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-600">
                      {vaccine.price?.toLocaleString()}
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-600">
                      {vaccine.fromCountry}
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-600">
                      {vaccine.timeExpired ? new Date(vaccine.timeExpired).toLocaleDateString() : "N/A"}
                    </td>
                    <td className="px-4 py-4 text-sm font-medium text-teal-600">
                      {vaccine.quantity} doses
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleViewVaccine(vaccine)}
                          className="p-1.5 bg-teal-50 text-teal-600 rounded-md hover:bg-teal-100 transition-colors"
                          title="View details"
                        >
                          <Eye size={16} />
                        </button>
                        <DeleteVaccine vaccineId={vaccine.id} />
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
                    No vaccines found matching your search criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(sortedVaccines.length / itemsPerPage)}
        itemsPerPage={itemsPerPage}
        setCurrentPage={setCurrentPage}
        setItemsPerPage={setItemsPerPage}
        totalItems={sortedVaccines.length}
      />
      {/* Hiển thị modal chi tiết vaccine */}
      <VaccineDetails
        vaccine={selectedVaccine}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onUpdate={handleUpdateVaccine}
      />
    </div>
  );
};

export default ViewAllVaccines;