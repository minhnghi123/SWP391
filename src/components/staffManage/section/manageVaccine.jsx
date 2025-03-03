import React, { useState, useEffect } from "react";
import { fetchData } from "../../../Api/axios";

import {
  Search,
  Filter,
  ArrowUpDown,
  Download,
  Printer,
  Trash2,
  Edit,
  Eye,
  Plus,
  Syringe,
  CalendarDays,
  CalendarClock,
  ChevronLeft,
  ChevronRight,
  Refrigerator,
  Thermometer,
  Calendar,
  Clock,
  TrendingUp,
  Pill,
  AlertCircle,
  CheckCircle,
  X,
} from "lucide-react";
import axios from "axios";

const ViewAllVaccines = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [selectedVaccine, setSelectedVaccine] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [showFormCombo, setShowFormCombo] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [loading, setLoading] = useState(false); // State cho trạng thái tải
  const [error, setError] = useState(null);
  const [dateValues, setDateValues] = useState({
    dosesTime: "",
    expiredTime: "",
    minInterval: "",
    maxInterval: "",
  });

  const [vaccines, setVaccines] = useState([]);

  useEffect(() => {
    const fetchDataAsync = async () => {
      try {
        setLoading(true);

        const rs = await axios.get(
          "https://localhost:7280/api/Vaccine/getAllVacines"
        ); // Lấy dữ liệu từ API
        setVaccines(rs.data);
        setError(null);
      } catch (error) {
        console.error("Error fetching API:", error);
        setError("Failed to fetch vaccines. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    const adData = async () => {
      try {
        setLoading(true);
        const rs = await axios.get(
          "https://localhost:7280/api/Vaccine/getAllVacines"
        ); // Lấy dữ liệu từ API
        setVaccines(rs.data);
        setError(null);
      } catch (error) {
        console.error("Error fetching API:", error);
        setError("Failed to fetch add. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchDataAsync();
  }, []);

  const DateInput = ({ label, value, onChange, icon, description }) => (
    <div className="relative">
      <label className="block text-sm font-medium text-gray-700 mb-1.5">
        {label}
      </label>
      <div className="relative group">
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 z-10">
          {icon}
        </div>
        <input
          type="date"
          value={value}
          onChange={onChange}
          className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg bg-white focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition-all duration-300 shadow-sm group-hover:shadow-md"
        />
        <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-teal-500/10 to-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
      </div>
      {description && (
        <p className="mt-1 text-xs text-gray-500">{description}</p>
      )}
    </div>
  );

  const handleDateChange = (field, value) => {
    setDateValues((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Filter vaccines based on search term
  const filteredVaccines = vaccines.filter((vaccine) => {
    const matchesSearch =
      (vaccine.name.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
      (vaccine.fromCountry.toLowerCase() || "").includes(
        searchTerm.toLowerCase()
      ) ||
      (vaccine.description.toLowerCase() || "").includes(
        searchTerm.toLowerCase()
      );

    return matchesSearch;
  });

  // Sort vaccines
  const sortedVaccines = [...filteredVaccines].sort((a, b) => {
    const valueA = a[sortBy] || "";
    const valueB = b[sortBy] || "";
    if (sortOrder === "asc") {
      return valueA > valueB ? 1 : -1;
    } else {
      return valueA < valueB ? 1 : -1;
    }
  });

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentVaccines = sortedVaccines.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(sortedVaccines.length / itemsPerPage);

  // Handle sort
  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("asc");
    }
  };

  // View vaccine details
  const handleViewVaccine = (vaccines) => {
    setSelectedVaccine(vaccines);
    setIsModalOpen(true);
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-xl shadow-teal-500/5 border border-gray-100">
      {/* Header with title and actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
        <h1 className="text-2xl font-bold text-gray-900">Vaccine Inventory</h1>
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-gradient-to-r from-teal-500 to-emerald-500 text-white px-4 py-2 rounded-full hover:from-teal-600 hover:to-emerald-600 transition-all duration-300 flex items-center gap-2 shadow-lg shadow-teal-500/20"
          >
            <Plus className="w-5 h-5" />
            Add Vaccine Stock
          </button>
          {showForm && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
              <div className="bg-white p-8 rounded-2xl shadow-2xl w-[600px] max-w-[90%] text-center relative">
                <h2 className="text-2xl font-bold mb-6 text-gray-800">
                  Add Vaccines
                </h2>

                {/* Dropdown chọn loại vaccine */}
                <div className="mb-6 text-left">
                  <label
                    htmlFor="vaccine"
                    className="block text-gray-700 font-medium mb-2"
                  >
                    Choose options:
                  </label>
                  <select
                    name="vaccine"
                    id="vaccine"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors"
                    onChange={(e) =>
                      setShowFormCombo(e.target.value === "combo")
                    }
                  >
                    <option value="single">Single Vaccine</option>
                    <option value="combo">Combo Vaccines</option>
                  </select>
                </div>

                {/* Inputs cho Single Vaccine */}
                {!showFormCombo && (
                  <>
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      {[
                        "Vaccine Name",
                        "Quantity",
                        "Description",
                        "Price",
                        "Age Min",
                        "Age Max",
                        "From Country",
                      ].map((placeholder, index) => (
                        <div key={index} className="flex flex-col space-y-1">
                          <input
                            type="text"
                            placeholder={placeholder}
                            className="w-full p-2.5 border border-gray-300 rounded-md focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors"
                          />
                        </div>
                      ))}
                    </div>

                    {/* Enhanced Date Inputs */}
                    <div className="grid grid-cols-2 gap-6 mb-6">
                      <DateInput
                        label="Doses Time"
                        value={dateValues.dosesTime}
                        onChange={(e) =>
                          handleDateChange("dosesTime", e.target.value)
                        }
                        icon={<Syringe className="w-5 h-5 text-teal-500" />}
                        description="When doses should be administered"
                      />

                      <DateInput
                        label="Expired Time"
                        value={dateValues.expiredTime}
                        onChange={(e) =>
                          handleDateChange("expiredTime", e.target.value)
                        }
                        icon={<Clock className="w-5 h-5 text-rose-500" />}
                        description="When vaccine expires"
                      />

                      <DateInput
                        label="Minimum Interval"
                        value={dateValues.minInterval}
                        onChange={(e) =>
                          handleDateChange("minInterval", e.target.value)
                        }
                        icon={
                          <CalendarDays className="w-5 h-5 text-blue-500" />
                        }
                        description="Minimum days between doses"
                      />

                      <DateInput
                        label="Maximum Interval"
                        value={dateValues.maxInterval}
                        onChange={(e) =>
                          handleDateChange("maxInterval", e.target.value)
                        }
                        icon={
                          <CalendarClock className="w-5 h-5 text-purple-500" />
                        }
                        description="Maximum days between doses"
                      />
                    </div>
                  </>
                )}

                {/* Inputs cho Combo Vaccine */}
                {showFormCombo && (
                  <div className="space-y-4">
                    {[
                      "Combo Vaccine Name",
                      "Vaccines",
                      "Quantity",
                      "Total Price",
                      "Discount",
                    ].map((placeholder, index) => (
                      <div key={index} className="w-full">
                        {placeholder === "Vaccines" ? (
                          <div className="border border-gray-300 p-4 rounded-lg">
                            <span className="text-gray-700">
                              Choose Vaccine:
                            </span>
                            <button
                              onClick={() => setShowOptions(!showOptions)}
                              className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                            >
                              {showOptions ? "Hide" : "Show"}
                            </button>
                            {showOptions && (
                              <div className="mt-3 space-y-2">
                                {[
                                  "Vaccine A",
                                  "Vaccine B",
                                  "Vaccine C",
                                  "Vaccine D",
                                ].map((vaccine, idx) => (
                                  <label
                                    key={idx}
                                    className="flex items-center space-x-2"
                                  >
                                    <input
                                      type="checkbox"
                                      className="w-5 h-5 text-blue-500 rounded focus:ring-blue-200"
                                    />
                                    <span className="text-gray-700">
                                      {vaccine}
                                    </span>
                                  </label>
                                ))}
                              </div>
                            )}
                          </div>
                        ) : (
                          <input
                            type="text"
                            placeholder={placeholder}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors"
                          />
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {/* Nút Close & Add */}
                <div className="mt-6 flex justify-end space-x-4">
                  <button
                    onClick={() => setShowForm(false)}
                    className="px-6 py-2.5 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                  >
                    Cancel
                  </button>
                  <button className="px-6 py-2.5 bg-gradient-to-r from-teal-500 to-emerald-500 text-white rounded-lg hover:from-teal-600 hover:to-emerald-600 transition-all duration-300 shadow-lg shadow-teal-500/20">
                    Add Vaccine
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Search and filters */}
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
            <option value="expired_time-asc">Expiry (Soonest)</option>
            <option value="expired_time-desc">Expiry (Latest)</option>
          </select>
        </div>
      </div>

      {/* Vaccines table */}
      <div className="overflow-x-auto">
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
                Price ($)
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
              currentVaccines.map((vaccines) => (
                <tr
                  key={vaccines.id}
                  className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                >
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-teal-50 flex items-center justify-center">
                        <Refrigerator className="w-5 h-5 text-teal-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">
                          {vaccines.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {vaccines.description}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-600">
                    {vaccines.description}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-600">
                    {vaccines.price.toLocaleString()}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-600">
                    {vaccines.fromCountry}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-600">
                    {vaccines.timeExpired}
                  </td>
                  <td className="px-4 py-4 text-sm font-medium text-teal-600">
                    {vaccines.quantity} doses
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleViewVaccine(vaccines)}
                        className="p-1.5 bg-teal-50 text-teal-600 rounded-md hover:bg-teal-100 transition-colors"
                        title="View details"
                      >
                        <Eye size={16} />
                      </button>
                      <button
                        className="p-1.5 bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100 transition-colors"
                        title="Edit"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        className="p-1.5 bg-rose-50 text-rose-600 rounded-md hover:bg-rose-100 transition-colors"
                        title="Delete"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={11}
                  className="px-4 py-8 text-center text-gray-500"
                >
                  No vaccines found matching your search criteria.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row items-center justify-between mt-6 gap-4">
        <div className="text-sm text-gray-500">
          Showing {indexOfFirstItem + 1} to{" "}
          {Math.min(indexOfLastItem, sortedVaccines.length)} of{" "}
          {sortedVaccines.length} vaccines
        </div>

        <div className="flex items-center gap-2">
          <select
            value={itemsPerPage}
            onChange={(e) => {
              setItemsPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
            className="p-2 border border-gray-200 rounded-md text-sm"
          >
            <option value={5}>5 per page</option>
            <option value={10}>10 per page</option>
            <option value={20}>20 per page</option>
          </select>

          <div className="flex items-center">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="p-2 border border-gray-200 rounded-l-md text-gray-600 disabled:text-gray-300 disabled:cursor-not-allowed"
            >
              <ChevronLeft size={18} />
            </button>

            <div className="px-4 py-2 border-t border-b border-gray-200 text-sm">
              {currentPage} of {totalPages}
            </div>

            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="p-2 border border-gray-200 rounded-r-md text-gray-600 disabled:text-gray-300 disabled:cursor-not-allowed"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Vaccine Detail Modal */}
      {isModalOpen && selectedVaccine && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white p-6 border-b border-gray-100 flex items-center justify-between z-10">
              <h2 className="text-xl font-bold text-gray-900">
                Vaccine Details
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X size={20} className="text-gray-500" />
              </button>
            </div>

            <div className="p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-full bg-teal-50 flex items-center justify-center">
                  <Refrigerator className="w-8 h-8 text-teal-600" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">
                    {selectedVaccine.name}
                  </h3>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-gray-50 p-4 rounded-xl">
                  <h4 className="text-sm font-semibold text-gray-500 mb-3">
                    Inventory Information
                  </h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Pill className="w-4 h-4" />
                        <span>Doses Left</span>
                      </div>
                      <span className="font-medium text-teal-600">
                        {selectedVaccine.quantity}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-xl">
                  <h4 className="text-sm font-semibold text-gray-500 mb-3">
                    Vaccine Details
                  </h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Calendar className="w-4 h-4" />
                        <span>Expiry Date</span>
                      </div>
                      <span className="font-medium">
                        {selectedVaccine.timeExpired}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="text-sm font-semibold text-gray-500 mb-3">
                    Administration Details
                  </h4>
                  <div className="space-y-3">
                    <div>
                      <span className="text-sm text-gray-500">Price:</span>
                      <p className="font-medium text-gray-900">
                        ${selectedVaccine.price.toLocaleString()} per dose
                      </p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Age Range:</span>
                      <p className="font-medium text-gray-900">
                        {selectedVaccine.suggestAgeMin} -{" "}
                        {selectedVaccine.suggestAgeMax}
                      </p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">
                        Country of Origin:
                      </span>
                      <p className="font-medium text-gray-900">
                        {selectedVaccine.fromCountry}
                      </p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">
                        Interval Age:
                      </span>
                      <p className="font-medium text-gray-900">
                        {selectedVaccine.minimumIntervalDate} To{" "}
                        {selectedVaccine.maximumIntervalDate}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-8">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Close
                </button>
                <button className="px-5 py-2.5 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors flex items-center gap-2">
                  <Edit size={18} />
                  Edit Vaccine
                </button>
                <button className="px-5 py-2.5 bg-gradient-to-r from-teal-500 to-emerald-500 text-white rounded-lg hover:from-teal-600 hover:to-emerald-600 transition-all duration-300 shadow-sm flex items-center gap-2">
                  <CheckCircle size={18} />
                  Update Stock
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewAllVaccines;
