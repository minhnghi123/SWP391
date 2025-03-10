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
          "https://localhost:7280/api/Vaccine/get-all-vaccines"
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
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white p-6 rounded-2xl shadow-xl shadow-teal-500/5 border border-gray-100 mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Manage Vaccines</h1>
          <div className="flex flex-col sm:flex-row gap-4">
          <button
              onClick={() => setView("vaccine")}
              className={`px-6 py-2.5 rounded-lg font-medium transition-colors ${
                view === "vaccine"
                  ? "bg-teal-500 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-teal-100"
              }`}
            >
              View Vaccines
            </button>
            <button
              onClick={() => setView("combo")}
              className={`px-6 py-2.5 rounded-lg font-medium transition-colors ${
                view === "combo"
                  ? "bg-teal-500 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-teal-100"
              }`}
            >
              View Combos
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="transition-opacity duration-300">
          {view === "combo" && <ViewAllCombo />}
          {view === "vaccine" && <ViewAllVaccine />}
          {!view && (
            <div className="bg-white p-6 rounded-2xl shadow-xl shadow-teal-500/5 border border-gray-100 text-center">
              <p className="text-gray-500 text-lg">
                Select an option above to view vaccines or combos.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageVaccine;