import React, { useState, useEffect } from "react";
import axios from "axios";
import AddVaccine from "./addVaccine"; // Thay bằng AddVaccineCombo nếu có
import DeleteVaccine from "../components/deleteVaccine"; // Thay bằng DeleteVaccineCombo nếu có
import Pagination from "../../../utils/pagination";
import VaccineDetails from "./detailVaccine"; // Thay bằng ComboDetails nếu có
import { ToastContainer } from "react-toastify";
import {
  Search,
  ArrowUpDown,
  Refrigerator,
  Eye,
  SquarePen,
} from "lucide-react";
import UpdateVaccine from "./updateVaccine";

const VaccineList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("comboName");
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [selectedCombo, setSelectedCombo] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedComboForUpdate, setSelectedComboForUpdate] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [combos, setCombos] = useState([]);

  const fetchCombos = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "https://localhost:7280/api/VaccineCombo/get-all-vaccine-combo" // Thay API phù hợp
      );
      setCombos(response.data);
      setError(null);
    } catch (error) {
      console.error("Error fetching combos:", error);
      setError("Failed to fetch combos. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCombos();
  }, []);

  const handleDeleteSuccess = () => {
    fetchCombos();
  };

  const filteredItems = combos.filter((item) => {
    return (
      (item.comboName?.toLowerCase() || "").includes(searchTerm.toLowerCase())
    );
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

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleViewItem = (item) => {
    setSelectedCombo(item);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCombo(null);
  };

  const handleOpenUpdateModal = (item) => {
    setSelectedComboForUpdate(item);
    setIsUpdateModalOpen(true);
  };

  const handleCloseUpdateModal = () => {
    setIsUpdateModalOpen(false);
    setSelectedComboForUpdate(null);
  };

  const handleUpdateSuccess = (updatedCombo) => {
    setCombos((prev) =>
      prev.map((item) => (item.id === updatedCombo.id ? updatedCombo : item))
    );
    handleCloseUpdateModal();
  };

  const handleAddSuccess = () => {
    fetchCombos();
  };

  return (
    <>
      <ToastContainer />
      <div className="bg-white p-6 rounded-2xl shadow-xl shadow-teal-500/5 border border-gray-100">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
          <h1 className="text-2xl font-bold text-gray-900">Vaccine Combos</h1>
          <AddVaccine onAddSuccess={handleAddSuccess} /> {/* Thay bằng AddVaccineCombo nếu có */}
        </div>

        <div className="flex grid-cols-1 md:grid-cols-3 gap-4 mb-6 justify-between">
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Search combos..."
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
              <option value="comboName-asc">Name (A-Z)</option>
              <option value="comboName-desc">Name (Z-A)</option>
              <option value="discount-asc">Discount (Low to High)</option>
              <option value="discount-desc">Discount (High to Low)</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          {loading ? (
            <p>Loading combos...</p>
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
                    Combo Name
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                    Discount (%)
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
                              {item.comboName}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-600">
                        {item.discount}%
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-600">
                        {item.status}
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
                            title="Edit combo"
                          >
                            <SquarePen size={16} />
                          </button>
                          <DeleteVaccine
                            vaccineId={item.id}
                            onDeleteSuccess={handleDeleteSuccess}
                          />
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-4 py-8 text-center text-gray-500"
                    >
                      No combos found matching your search criteria.
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

        {isModalOpen && selectedCombo && (
          <VaccineDetails
            vaccine={selectedCombo}
            isOpen={isModalOpen}
            onClose={handleCloseModal}
          />
        )}

        {isUpdateModalOpen && selectedComboForUpdate && (
          <UpdateVaccine
            combo={selectedComboForUpdate} // Truyền combo thay vì vaccine
            isOpen={isUpdateModalOpen}
            onSave={handleUpdateSuccess}
            onCancel={handleCloseUpdateModal}
          />
        )}
      </div>
    </>
  );
};

export default VaccineList;