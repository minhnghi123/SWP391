import React, { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import {
  Search,
  ArrowUpDown,
  Refrigerator,
  Eye,
  SquarePen,
} from "lucide-react";
import AddVaccineComboComponent from "../../staffManage/CRUD/addComboVaccine";
import DeleteVaccine from "../../staffManage/CRUD/deleteVaccine";
import Pagination from "../../../utils/pagination";
import DetailCombo from "../../staffManage/combo/detailsCombo";
import UpdateVaccineCombo from "../../staffManage/CRUD/updateCombo";
import useAxios from "../../../utils/useAxios";

const url = import.meta.env.VITE_BASE_URL_DB;

const ManageCombo = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("comboName");
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [selectedVaccine, setSelectedVaccine] = useState(null);
  const [selectedVaccineForUpdate, setSelectedVaccineForUpdate] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [vaccineCombos, setVaccineCombos] = useState([]);
  const api = useAxios();

  const fetchVaccineCombos = async () => {
    try {
      setLoading(true);
      const response = await api.get(`${url}/VaccineCombo/get-all-vaccine-combo-admin`);
      setVaccineCombos(response.data);
      setError(null);
    } catch (error) {
      console.error("Error fetching vaccine combos:", error);
      setError("Failed to fetch vaccine combos. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVaccineCombos();
  }, []);

  // Filter, Sort, Pagination logic
  const filteredItems = vaccineCombos.filter((item) =>
    (item.comboName?.toLowerCase() || "").includes(searchTerm.toLowerCase())
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

  const handleSuccess = () => {
    fetchVaccineCombos();
  };

  const handleViewItem = (item) => {
    console.log("Viewing combo with ID:", item.id); // Debug log
    setSelectedVaccine(item);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedVaccine(null);
  };

  const handleOpenUpdateModal = (item) => {
    setSelectedVaccineForUpdate(item);
    setIsUpdateModalOpen(true);
  };

  const handleCloseUpdateModal = () => {
    setIsUpdateModalOpen(false);
    setSelectedVaccineForUpdate(null);
  };

  const handleUpdateSuccess = (updatedCombo) => {
    setVaccineCombos((prev) =>
      prev.map((item) => (item.id === updatedCombo.id ? updatedCombo : item))
    );
    handleCloseUpdateModal();
  };

  return (
    <>
      <ToastContainer />
      <div className="bg-white p-6 rounded-2xl shadow-xl shadow-teal-500/5 border border-gray-100">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
          <h1 className="text-2xl font-bold text-gray-900">Vaccine Combo List</h1>
          <AddVaccineComboComponent onAddSuccess={handleSuccess} />
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
              <option value="totalPrice-asc">Price (Low to High)</option>
              <option value="totalPrice-desc">Price (High to Low)</option>
              <option value="discount-asc">Discount (Low to High)</option>
              <option value="discount-desc">Discount (High to Low)</option>
            </select>
          </div>
        </div>

        {/* Table */}
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
                    Discount
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                    Total Price (VND)
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                    Final Price (VND)
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
                        {item.totalPrice?.toLocaleString()}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-600">
                        {(
                          item.totalPrice * (1 - item.discount / 100)
                        )?.toLocaleString()}
                      </td>
                      <td
                        className={`inline-block mt-2 px-4 py-4 text-sm font-medium rounded-full ${
                          item.status.toLowerCase() === "available"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
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
                            isCombo={true}
                            onDeleteSuccess={handleSuccess}
                          />
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
                      No combos found matching your search criteria.
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

        {/* Vaccine Combo Details Modal */}
        {isModalOpen && selectedVaccine && (
          <DetailCombo
            vaccineId={selectedVaccine.id}
            isOpen={isModalOpen}
            onClose={handleCloseModal}
          />
        )}

        {/* Update Vaccine Combo Modal */}
        {isUpdateModalOpen && selectedVaccineForUpdate && (
          <UpdateVaccineCombo
            combo={selectedVaccineForUpdate}
            onSave={handleUpdateSuccess}
            onCancel={handleCloseUpdateModal}
          />
        )}
      </div>
    </>
  );
};

export default ManageCombo;