import React, { useState, useEffect } from "react";
import Pagination from "../../../../utils/pagination";
import VaccineDetails from "../vaccine/detailVaccine"; // Updated to match file name
import { ToastContainer } from "react-toastify";
import { Search, ArrowUpDown, Refrigerator, Eye } from "lucide-react";
import useAxios from "../../../../utils/useAxios";

const url = import.meta.env.VITE_BASE_URL_DB;

const VaccineList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [selectedVaccine, setSelectedVaccine] = useState(null); // Changed to store full vaccine object
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [vaccines, setVaccines] = useState([]);

  const api = useAxios();

  const fetchVaccines = async () => {
    try {
      setLoading(true);
      const response = await api.get(`${url}/Vaccine/get-all-vaccines`);
      setVaccines(Array.isArray(response.data) ? response.data : []);
      setError(null);
    } catch (error) {
      console.error("Error fetching vaccines:", error);
      setError(
        error.response?.data?.message ||
          "Failed to fetch vaccines. Please try again later."
      );
      setVaccines([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVaccines();
  }, []);

  const filteredItems = vaccines.filter(
    (item) =>
      item?.name?.toLowerCase().includes(searchTerm.toLowerCase()) || false
  );

  const sortedItems = [...filteredItems].sort((a, b) => {
    const valueA = a[sortBy] ?? "";
    const valueB = b[sortBy] ?? "";
    if (sortBy === "price" || sortBy === "quantity") {
      return sortOrder === "asc"
        ? Number(valueA) - Number(valueB)
        : Number(valueB) - Number(valueA);
    }
    return sortOrder === "asc"
      ? String(valueA).localeCompare(String(valueB))
      : String(valueB).localeCompare(String(valueA));
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedItems.slice(indexOfFirstItem, indexOfLastItem);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleViewItem = (item) => {
    if (item) {
      setSelectedVaccine(item); // Store the full vaccine object
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedVaccine(null);
  };

  return (
    <>
      <ToastContainer />
      <div className="bg-white p-6 rounded-2xl shadow-xl shadow-teal-500/5 border border-gray-100">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
          <h1 className="text-2xl font-bold text-gray-900">
            Vaccine Inventory
          </h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
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
                setCurrentPage(1);
              }}
              className="w-full p-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 bg-gray-50"
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
            <div className="text-center py-8">
              <p className="text-gray-600">Loading vaccines...</p>
            </div>
          ) : error ? (
            <div className="text-center py-8">
              <p className="text-red-500">{error}</p>
              <button
                onClick={fetchVaccines}
                className="mt-2 px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600"
              >
                Retry
              </button>
            </div>
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
                          <p className="font-medium text-gray-900">
                            {item.name || "N/A"}
                          </p>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-600">
                        {item.quantity ?? 0}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-600">
                        ${item.price?.toFixed(2) ?? "0.00"}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-600">
                        {item.fromCountry || "N/A"}
                      </td>
                      <td className="px-4 py-4">
                        <span
                          className={`inline-block px-2 py-1 text-sm font-medium rounded-full ${
                            item.status === "AVAILABLE"
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {item.status || "UNKNOWN"}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <button
                          onClick={() => handleViewItem(item)}
                          className="p-1.5 bg-teal-50 text-teal-600 rounded-md hover:bg-teal-100 transition-colors"
                          title="View details"
                        >
                          <Eye size={16} />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={6} // Adjusted to match column count
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

        {!loading && !error && (
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(sortedItems.length / itemsPerPage)}
            itemsPerPage={itemsPerPage}
            setCurrentPage={setCurrentPage}
            setItemsPerPage={setItemsPerPage}
            totalItems={sortedItems.length}
          />
        )}

        {isModalOpen && selectedVaccine && (
          <VaccineDetails
            id={selectedVaccine.id}
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            vaccineData={selectedVaccine} // Pass full vaccine object
          />
        )}
      </div>
    </>
  );
};

export default VaccineList;
