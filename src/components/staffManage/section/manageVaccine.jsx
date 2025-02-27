import React, { useState, useEffect } from "react";
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

// Extended vaccine data for the full view
const allVaccines = [
  {
    id: 1,
    name: "Pfizer COVID-19",
    batchNumber: "PFZ-2023-001",
    expiryDate: "2024-12-31",
    temperature: "-70°C",
    dosesLeft: 150,
    status: "Available",
    manufacturer: "Pfizer-BioNTech",
    storageLocation: "Ultra-cold Freezer 1",
    reorderPoint: 50,
    lastChecked: "2 hours ago",
    nextDelivery: "2024-03-20",
    price: "$24.50",
    ageRange: "12+ years",
    doseSchedule: "2 doses, 21 days apart",
    origin: "USA",
    notes: "Handle with care. Requires special storage conditions.",
  },
  {
    id: 2,
    name: "Moderna COVID-19",
    batchNumber: "MOD-2023-045",
    expiryDate: "2024-11-30",
    temperature: "-20°C",
    dosesLeft: 85,
    status: "Low Stock",
    manufacturer: "Moderna",
    storageLocation: "Medical Freezer 2",
    reorderPoint: 100,
    lastChecked: "1 hour ago",
    nextDelivery: "2024-03-15",
    price: "$25.75",
    ageRange: "18+ years",
    doseSchedule: "2 doses, 28 days apart",
    origin: "USA",
    notes: "Approaching reorder point. Place new order soon.",
  },
  {
    id: 3,
    name: "Influenza Vaccine",
    batchNumber: "FLU-2023-089",
    expiryDate: "2024-06-30",
    temperature: "2-8°C",
    dosesLeft: 200,
    status: "Available",
    manufacturer: "Sanofi Pasteur",
    storageLocation: "Refrigerator 3",
    reorderPoint: 75,
    lastChecked: "30 mins ago",
    nextDelivery: "2024-04-01",
    price: "$18.25",
    ageRange: "6+ months",
    doseSchedule: "1 dose annually",
    origin: "France",
    notes: "Seasonal vaccine. High demand expected in fall.",
  },
  {
    id: 4,
    name: "Hepatitis B Vaccine",
    batchNumber: "HEP-2023-112",
    expiryDate: "2025-01-15",
    temperature: "2-8°C",
    dosesLeft: 175,
    status: "Available",
    manufacturer: "GlaxoSmithKline",
    storageLocation: "Refrigerator 2",
    reorderPoint: 50,
    lastChecked: "1 hour ago",
    nextDelivery: "2024-05-10",
    price: "$22.00",
    ageRange: "All ages",
    doseSchedule: "3 doses over 6 months",
    origin: "UK",
    notes: "Standard storage conditions required.",
  },
  {
    id: 5,
    name: "Pneumococcal Vaccine",
    batchNumber: "PNE-2023-067",
    expiryDate: "2024-09-22",
    temperature: "2-8°C",
    dosesLeft: 45,
    status: "Low Stock",
    manufacturer: "Merck",
    storageLocation: "Refrigerator 1",
    reorderPoint: 50,
    lastChecked: "3 hours ago",
    nextDelivery: "2024-03-05",
    price: "$29.75",
    ageRange: "65+ years",
    doseSchedule: "1 dose",
    origin: "Germany",
    notes: "Below reorder point. New shipment arriving soon.",
  },
  {
    id: 6,
    name: "MMR Vaccine",
    batchNumber: "MMR-2023-034",
    expiryDate: "2024-08-10",
    temperature: "2-8°C",
    dosesLeft: 120,
    status: "Available",
    manufacturer: "Merck",
    storageLocation: "Refrigerator 4",
    reorderPoint: 40,
    lastChecked: "2 hours ago",
    nextDelivery: "2024-04-15",
    price: "$21.50",
    ageRange: "12 months - 12 years",
    doseSchedule: "2 doses",
    origin: "USA",
    notes: "Protect from light. Standard refrigeration required.",
  },
  {
    id: 7,
    name: "Tetanus Toxoid",
    batchNumber: "TET-2023-091",
    expiryDate: "2024-07-05",
    temperature: "2-8°C",
    dosesLeft: 15,
    status: "Critical Stock",
    manufacturer: "Sanofi Pasteur",
    storageLocation: "Refrigerator 2",
    reorderPoint: 30,
    lastChecked: "1 hour ago",
    nextDelivery: "2024-03-01",
    price: "$15.25",
    ageRange: "All ages",
    doseSchedule: "Booster every 10 years",
    origin: "France",
    notes: "Critically low stock. Expedite next delivery.",
  },
  {
    id: 8,
    name: "HPV Vaccine",
    batchNumber: "HPV-2023-056",
    expiryDate: "2025-02-28",
    temperature: "2-8°C",
    dosesLeft: 90,
    status: "Available",
    manufacturer: "Merck",
    storageLocation: "Refrigerator 3",
    reorderPoint: 40,
    lastChecked: "4 hours ago",
    nextDelivery: "2024-06-10",
    price: "$32.75",
    ageRange: "9-26 years",
    doseSchedule: "2-3 doses",
    origin: "USA",
    notes: "Store in original packaging to protect from light.",
  },
  {
    id: 9,
    name: "Rabies Vaccine",
    batchNumber: "RAB-2023-023",
    expiryDate: "2024-05-15",
    temperature: "2-8°C",
    dosesLeft: 25,
    status: "Low Stock",
    manufacturer: "Novartis",
    storageLocation: "Refrigerator 1",
    reorderPoint: 20,
    lastChecked: "2 hours ago",
    nextDelivery: "2024-03-10",
    price: "$45.00",
    ageRange: "All ages",
    doseSchedule: "Post-exposure: 4-5 doses",
    origin: "Switzerland",
    notes: "Used primarily for post-exposure prophylaxis.",
  },
  {
    id: 10,
    name: "Yellow Fever Vaccine",
    batchNumber: "YF-2023-078",
    expiryDate: "2024-10-20",
    temperature: "2-8°C",
    dosesLeft: 60,
    status: "Available",
    manufacturer: "Sanofi Pasteur",
    storageLocation: "Refrigerator 4",
    reorderPoint: 30,
    lastChecked: "5 hours ago",
    nextDelivery: "2024-05-15",
    price: "$38.50",
    ageRange: "9 months+",
    doseSchedule: "Single dose",
    origin: "France",
    notes: "Required for travel to certain countries.",
  },
];

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
  const [dateValues, setDateValues] = useState({
    dosesTime: "",
    expiredTime: "",
    minInterval: "",
    maxInterval: "",
  });
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

  // Filter vaccines based on search term and status
  const filteredVaccines = allVaccines.filter((vaccine) => {
    const matchesSearch =
      vaccine.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vaccine.batchNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vaccine.manufacturer.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "All" || vaccine.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Sort vaccines
  const sortedVaccines = [...filteredVaccines].sort((a, b) => {
    if (sortOrder === "asc") {
      return a[sortBy] > b[sortBy] ? 1 : -1;
    } else {
      return a[sortBy] < b[sortBy] ? 1 : -1;
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
  const handleViewVaccine = (vaccine) => {
    setSelectedVaccine(vaccine);
    setIsModalOpen(true);
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-xl shadow-teal-500/5 border border-gray-100">
      {/* Header with title and actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
        <h1 className="text-2xl font-bold text-gray-900">Vaccine Inventory</h1>
        <div className="flex flex-wrap items-center gap-3">
          <button className="px-4 py-2 bg-teal-50 text-teal-600 rounded-lg flex items-center gap-2 hover:bg-teal-100 transition-colors">
            <Download size={18} />
            <span className="hidden sm:inline">Export</span>
          </button>
          <button className="px-4 py-2 bg-teal-50 text-teal-600 rounded-lg flex items-center gap-2 hover:bg-teal-100 transition-colors">
            <Printer size={18} />
            <span className="hidden sm:inline">Print</span>
          </button>
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
          <button className="px-4 py-2 bg-gradient-to-r from-teal-500 to-emerald-500 text-white rounded-lg flex items-center gap-2 hover:from-teal-600 hover:to-emerald-600 transition-all duration-300 shadow-sm">
            <Eye size={18} />
            <span>View Report</span>
          </button>
        </div>
      </div>

      {/* Search and filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
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
          <Filter size={18} className="text-gray-500" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="flex-1 p-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 bg-gray-50"
          >
            <option value="All">All Status</option>
            <option value="Available">Available</option>
            <option value="Low Stock">Low Stock</option>
            <option value="Critical Stock">Critical Stock</option>
          </select>
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
            <option value="dosesLeft-asc">Stock (Low to High)</option>
            <option value="dosesLeft-desc">Stock (High to Low)</option>
            <option value="expiryDate-asc">Expiry (Soonest)</option>
            <option value="expiryDate-desc">Expiry (Latest)</option>
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
                Batch
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                Manufacturer
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                Expiry
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                Stock
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
                          {vaccine.temperature}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-600">
                    {vaccine.batchNumber}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-600">
                    {vaccine.manufacturer}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-600">
                    {vaccine.expiryDate}
                  </td>
                  <td className="px-4 py-4 text-sm font-medium text-teal-600">
                    {vaccine.dosesLeft} doses
                  </td>
                  <td className="px-4 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        vaccine.status === "Available"
                          ? "bg-emerald-100 text-emerald-700"
                          : vaccine.status === "Low Stock"
                          ? "bg-amber-100 text-amber-700"
                          : "bg-rose-100 text-rose-700"
                      }`}
                    >
                      {vaccine.status}
                    </span>
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
                <td colSpan={7} className="px-4 py-8 text-center text-gray-500">
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
                  <div className="flex items-center gap-2 mt-1">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        selectedVaccine.status === "Available"
                          ? "bg-emerald-100 text-emerald-700"
                          : selectedVaccine.status === "Low Stock"
                          ? "bg-amber-100 text-amber-700"
                          : "bg-rose-100 text-rose-700"
                      }`}
                    >
                      {selectedVaccine.status}
                    </span>
                    <span className="text-sm text-gray-500">
                      Manufactured by {selectedVaccine.manufacturer}
                    </span>
                  </div>
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
                        {selectedVaccine.dosesLeft}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-gray-600">
                        <TrendingUp className="w-4 h-4" />
                        <span>Reorder Point</span>
                      </div>
                      <span className="font-medium">
                        {selectedVaccine.reorderPoint}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Calendar className="w-4 h-4" />
                        <span>Next Delivery</span>
                      </div>
                      <span className="font-medium">
                        {selectedVaccine.nextDelivery}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Refrigerator className="w-4 h-4" />
                        <span>Storage Location</span>
                      </div>
                      <span className="font-medium">
                        {selectedVaccine.storageLocation}
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
                        {selectedVaccine.expiryDate}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Thermometer className="w-4 h-4" />
                        <span>Storage Temp</span>
                      </div>
                      <span className="font-medium">
                        {selectedVaccine.temperature}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Clock className="w-4 h-4" />
                        <span>Last Checked</span>
                      </div>
                      <span className="font-medium">
                        {selectedVaccine.lastChecked}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-gray-600">
                        <AlertCircle className="w-4 h-4" />
                        <span>Batch Number</span>
                      </div>
                      <span className="font-medium">
                        {selectedVaccine.batchNumber}
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
                        {selectedVaccine.price} per dose
                      </p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Age Range:</span>
                      <p className="font-medium text-gray-900">
                        {selectedVaccine.ageRange}
                      </p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">
                        Dose Schedule:
                      </span>
                      <p className="font-medium text-gray-900">
                        {selectedVaccine.doseSchedule}
                      </p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">
                        Country of Origin:
                      </span>
                      <p className="font-medium text-gray-900">
                        {selectedVaccine.origin}
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-gray-500 mb-3">
                    Notes
                  </h4>
                  <p className="text-gray-700 bg-gray-50 p-3 rounded-lg border border-gray-100 min-h-[100px]">
                    {selectedVaccine.notes}
                  </p>
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
