import React, { useState, useEffect } from "react";
import axios from "axios";
import AddVaccine from "../components/addVaccine";
import DeleteVaccine from "../components/deleteVaccine";
import Pagination from "../../../utils/pagination";
import VaccineDetails from "../components/detailVaccine";
import AddVaccineComboComponent from "../components/addComboVaccine";
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
  const [vaccineCombos, setVaccineCombos] = useState([]);
  const [viewMode, setViewMode] = useState("vaccines"); // "vaccines" or "combos"

  // Fetch vaccines and vaccine combos from APIs
  useEffect(() => {
    const fetchVaccines = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "https://localhost:5272/api/Vaccine/get-all-vaccines"
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

    const fetchVaccineCombos = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "https://localhost:7280/api/VaccineCombo/getVaccineCombo"
        );
        setVaccineCombos(response.data);
        setError(null);
      } catch (error) {
        console.error("Error fetching vaccine combos:", error);
        setError("Failed to fetch vaccine combos. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchVaccines();
    fetchVaccineCombos();
  }, []);

  // Filter, Sort, Pagination logic
  const filteredItems = (
    viewMode === "vaccines" ? vaccines : vaccineCombos
  ).filter((item) => {
    const matchesSearch =
      (
        item.comboName?.toLowerCase() ||
        item.name?.toLowerCase() ||
        ""
      ).includes(searchTerm.toLowerCase()) ||
      (item.description?.toLowerCase() || "").includes(
        searchTerm.toLowerCase()
      ) ||
      (item.fromCountry?.toLowerCase() || "").includes(
        searchTerm.toLowerCase()
      );
    return matchesSearch;
  });

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

  // Handle view vaccine/combo details
  const handleViewItem = (item) => {
    setSelectedVaccine(item);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedVaccine(null);
  };

  const handleUpdateVaccine = (updatedVaccine) => {
    if (viewMode === "vaccines") {
      setVaccines((prevVaccines) =>
        prevVaccines.map((vaccine) =>
          vaccine.id === updatedVaccine.id ? updatedVaccine : vaccine
        )
      );
    } else {
      setVaccineCombos((prevCombos) =>
        prevCombos.map((combo) =>
          combo.id === updatedVaccine.id ? updatedVaccine : combo
        )
      );
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-xl shadow-teal-500/5 border border-gray-100">
      <ToastContainer />
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
        <h1 className="text-2xl font-bold text-gray-900">
          {viewMode === "vaccines"
            ? "Vaccine Inventory"
            : "Vaccine Combo Inventory"}
        </h1>
        <div className="flex gap-4">
          <button
            onClick={() => setViewMode("vaccines")}
            className={`px-4 py-2 rounded-lg ${
              viewMode === "vaccines"
                ? "bg-teal-500 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            Vaccines
          </button>
          <button
            onClick={() => setViewMode("combos")}
            className={`px-4 py-2 rounded-lg ${
              viewMode === "combos"
                ? "bg-teal-500 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            Combos
          </button>
          {viewMode === "vaccines" ? (
            <AddVaccine />
          ) : (
            <AddVaccineComboComponent />
          )}
        </div>
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
            placeholder={`Search ${
              viewMode === "vaccines" ? "vaccines" : "combos"
            }...`}
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
            {viewMode === "vaccines" ? (
              <>
                <option value="quantity-asc">Stock (Low to High)</option>
                <option value="quantity-desc">Stock (High to Low)</option>
                <option value="timeExpired-asc">Expiry (Soonest)</option>
                <option value="timeExpired-desc">Expiry (Latest)</option>
              </>
            ) : (
              <>
                <option value="totalPrice-asc">Price (Low to High)</option>
                <option value="totalPrice-desc">Price (High to Low)</option>
                <option value="discount-asc">Discount (Low to High)</option>
                <option value="discount-desc">Discount (High to Low)</option>
              </>
            )}
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        {loading ? (
          <p>Loading {viewMode === "vaccines" ? "vaccines" : "combos"}...</p>
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
                  {viewMode === "vaccines" ? "Vaccine" : "Combo Name"}
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                  {viewMode === "vaccines" && "Description"}
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                  {viewMode === "vaccines"
                    ? "Price (VND)"
                    : "Total Price (VND)"}
                </th>
                {viewMode === "vaccines" ? (
                  <>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                      Country
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                      Expiry
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                      Stock
                    </th>
                  </>
                ) : (
                  <>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                      Discount
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                      Final Price
                    </th>
                  </>
                )}
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
                          <Refrigerator className="w-5 h-5 text-teal-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">
                            {item.name || item.comboName}
                          </p>
                          <p className="text-xs text-gray-500">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-600">
                      {item.description}
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-600">
                      {(item.price || item.totalPrice)?.toLocaleString()}
                    </td>
                    {viewMode === "vaccines" ? (
                      <>
                        <td className="px-4 py-4 text-sm text-gray-600">
                          {item.fromCountry}
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-600">
                          {item.timeExpired
                            ? new Date(item.timeExpired).toLocaleDateString()
                            : "N/A"}
                        </td>
                        <td className="px-4 py-4 text-sm font-medium text-teal-600">
                          {item.quantity} doses
                        </td>
                      </>
                    ) : (
                      <>
                        <td className="px-4 py-4 text-sm text-gray-600">
                          {item.discount}%
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-600">
                          {item.totalPrice * (1 - item.discount / 100)}
                        </td>
                      </>
                    )}
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleViewItem(item)}
                          className="p-1.5 bg-teal-50 text-teal-600 rounded-md hover:bg-teal-100 transition-colors"
                          title="View details"
                        >
                          <Eye size={16} />
                        </button>
                        <DeleteVaccine
                          vaccineId={item.id}
                          isCombo={item.isCombo}
                        />
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={viewMode === "vaccines" ? 8 : 6}
                    className="px-4 py-8 text-center text-gray-500"
                  >
                    No {viewMode === "vaccines" ? "vaccines" : "combos"} found
                    matching your search criteria.
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
        totalPages={Math.ceil(sortedItems.length / itemsPerPage)}
        itemsPerPage={itemsPerPage}
        setCurrentPage={setCurrentPage}
        setItemsPerPage={setItemsPerPage}
        totalItems={sortedItems.length}
      />

      {/* Vaccine/Combo Details Modal */}
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
