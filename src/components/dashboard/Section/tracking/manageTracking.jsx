import React, { useState, useEffect, useMemo } from "react";
import useAxios from "../../../../utils/useAxios";
import { toast } from "react-toastify";
import { Search, Syringe, Calendar, Eye, ChevronDown, ChevronUp } from "lucide-react";
import FormatDate from "../../../../utils/Date";
import Pagination from "../../../../utils/Pagination"; // Assuming this is the same Pagination
import ModalDetail from "./modalDetail";

const API_BASE_URL = import.meta.env.VITE_BASE_URL_DB;

const VaccinesTracking = () => {
  const api = useAxios();
  const [trackingData, setTrackingData] = useState([]);
  const [vaccineData, setVaccineData] = useState({});
  const [childData, setChildData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("vaccinationDate");
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [expandedRecord, setExpandedRecord] = useState(null);
  const [expandedChain, setExpandedChain] = useState([]);
  const [hasFetched, setHasFetched] = useState(false);
  const [vaccineChains, setVaccineChains] = useState([]);

  const buildVaccineChains = useMemo(() => {
    return (data) => {
      if (!data || data.length === 0) return [];
      const headers = data.filter((item) => item.previousVaccination === 0);
      return headers.map((header) => {
        const chain = [header];
        let currentId = header.trackingID;
        while (currentId) {
          const next = data.find((item) => item.previousVaccination === currentId);
          if (!next) break;
          chain.push(next);
          currentId = next.trackingID;
        }
        return chain;
      });
    };
  }, []);

  useEffect(() => {
    if (hasFetched) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        const [trackingResponse, childResponse] = await Promise.all([
          api.get(`${API_BASE_URL}/VaccinesTracking/get-all-admin`),
          api.get(`${API_BASE_URL}/Child/get-all-child`),
        ]);

        const tracking = trackingResponse.data || [];
        console.log("Raw tracking data:", tracking);
        setTrackingData(tracking);
        setFilteredData(tracking);
        setChildData(childResponse.data || []);
        setVaccineChains(buildVaccineChains(tracking));

        const uniqueVaccineIDs = [...new Set(tracking.map((item) => item.vaccineID))];
        const vaccinePromises = uniqueVaccineIDs.map((vaccineID) =>
          api
            .get(`${API_BASE_URL}/vaccine/get-vaccine-by-id-admin/${vaccineID}`)
            .then((res) => ({ vaccineID, doesTimes: res.data.doesTimes || 1 }))
        );

        const vaccineResults = await Promise.all(vaccinePromises);
        setVaccineData(
          vaccineResults.reduce((acc, { vaccineID, doesTimes }) => {
            acc[vaccineID] = doesTimes;
            return acc;
          }, {})
        );
        setHasFetched(true);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to fetch vaccines tracking data. Please try again later.");
        toast.error("Failed to fetch vaccination data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [api, hasFetched, buildVaccineChains]);

  const filteredRecords = filteredData.filter((record) => {
    const childName = childData.find((child) => child.id === record.childId)?.name || "";
    return (
      (statusFilter === "all" || record.status?.toLowerCase() === statusFilter) &&
      (record.vaccineName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        record.userName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        childName.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  });

  const sortedRecords = [...filteredRecords].sort((a, b) => {
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

  const topLevelRecords = sortedRecords.filter((item) => item.previousVaccination === 0);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentRecords = topLevelRecords.slice(indexOfFirstItem, indexOfLastItem);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const formatStatus = (status) => {
    switch (status?.toLowerCase()) {
      case "success":
        return "Success";
      case "schedule":
        return "Scheduled";
      case "waiting":
        return "Waiting";
      case "cancel":
        return "Cancel";
      default:
        return status || "Unknown";
    }
  };

  const getProgress = (record) => {
    const chain = vaccineChains.find((chain) =>
      chain.some((item) => item.trackingID === record.trackingID)
    );
    if (!chain) return "N/A";
    const totalDoses = chain.length;
    const completedDoses = chain.filter((item) => item.status?.toLowerCase() === "completed").length;
    return completedDoses === totalDoses ? "Completed" : `${completedDoses}/${totalDoses}`;
  };

  const handleExpand = (record) => {
    if (expandedRecord?.trackingID === record.trackingID) {
      setExpandedRecord(null);
      setExpandedChain([]);
    } else {
      setExpandedRecord(record);
      const chain = [record];
      let currentId = record.trackingID;
      while (currentId) {
        const next = trackingData.find((item) => item.previousVaccination === currentId);
        if (!next) break;
        chain.push(next);
        currentId = next.trackingID;
      }
      setExpandedChain(chain);
    }
  };

  const handleViewDetails = (record) => {
    setSelectedRecord(record);
    setIsDetailModalOpen(true);
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-xl shadow-teal-500/5 border border-gray-100">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
        <h1 className="text-2xl font-bold text-gray-900">Vaccines Tracking</h1>
      </div>

      <div className="flex grid-cols-1 md:grid-cols-3 gap-4 mb-6 justify-between">
        <div className="relative">
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={18}
          />
          <input
            type="text"
            placeholder="Search by vaccine, parent, or child name..."
            value={searchTerm}
            onChange={handleSearch}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 bg-gray-50"
          />
        </div>
        <div className="flex items-center gap-2">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="flex-1 p-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 bg-gray-50"
          >
            <option value="all">All Statuses</option>
            <option value="success">Success</option>
            <option value="schedule">Scheduled</option>
            <option value="waiting">Waiting</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        {loading ? (
          <p className="text-center text-gray-500 py-8">Loading vaccines tracking data...</p>
        ) : error ? (
          <p className="text-red-500 text-center py-8">Error: {error}</p>
        ) : (
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600"></th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">ID</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Vaccine</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Parent</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Child Name</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Vaccination Date</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Progress</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Status</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Reaction</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Action</th>
              </tr>
            </thead>
            <tbody>
              {currentRecords.length > 0 ? (
                currentRecords.map((record) => (
                  <React.Fragment key={record.trackingID}>
                    <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-4">
                        <button
                          onClick={() => handleExpand(record)}
                          className="text-teal-600 hover:text-teal-800 transition-colors"
                        >
                          {expandedRecord?.trackingID === record.trackingID ? (
                            <ChevronUp size={16} />
                          ) : (
                            <ChevronDown size={16} />
                          )}
                        </button>
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-600">#{record.trackingID}</td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-teal-50 flex items-center justify-center">
                            <Syringe className="w-5 h-5 text-blue-600" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{record.vaccineName}</p>
                            <p className="text-sm text-gray-500">ID: {record.vaccineID}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-600">{record.userName}</td>
                      <td className="px-4 py-4 text-sm text-gray-600">
                        {childData.find((child) => child.id === record.childId)?.name || "N/A"}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4 text-blue-600" />
                          {record.vaccinationDate ? FormatDate(record.vaccinationDate) : "N/A"}
                        </div>
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-600">{getProgress(record)}</td>
                      <td className="px-4 py-4">
                        <span
                          className={`inline-block px-2 py-1 text-sm font-medium rounded-full ${
                            record.status?.toLowerCase() === "success"
                              ? "bg-green-100 text-green-800"
                              : record.status?.toLowerCase() === "schedule"
                              ? "bg-yellow-100 text-yellow-800"
                              : record.status?.toLowerCase() === "waiting"
                              ? "bg-red-100 text-red-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {formatStatus(record.status)}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <span
                          className={`inline-block px-2 py-1 text-sm font-medium rounded-full ${
                            record.reaction?.toLowerCase() === "nothing"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-green-100 text-green-800"
                          }`}
                        >
                          {record.reaction || "N/A"}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <button
                          onClick={() => handleViewDetails(record)}
                          className="flex items-center gap-1 text-teal-600 hover:text-teal-800 transition-colors"
                          title="View Details"
                        >
                          <Eye size={16} />
                        </button>
                      </td>
                    </tr>
                    {expandedRecord?.trackingID === record.trackingID && (
                      <tr className="bg-gray-50">
                        <td colSpan={10} className="px-4 py-4">
                          <div className="p-4">
                            <h4 className="text-teal-700 font-medium mb-2">All Doses</h4>
                            {expandedChain.length > 0 ? (
                              <table className="w-full border-collapse">
                                <thead>
                                  <tr className="bg-teal-50 border-b border-teal-200">
                                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">ID</th>
                                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Vaccination Date</th>
                                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Status</th>
                                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Reaction</th>
                                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Action</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {expandedChain.map((item) => (
                                    <tr key={item.trackingID} className="border-b border-gray-100">
                                      <td className="px-4 py-4 text-sm text-gray-600">#{item.trackingID}</td>
                                      <td className="px-4 py-4 text-sm text-gray-600">
                                        {item.vaccinationDate ? FormatDate(item.vaccinationDate) : "N/A"}
                                      </td>
                                      <td className="px-4 py-4">
                                        <span
                                          className={`inline-block px-2 py-1 text-sm font-medium rounded-full ${
                                            item.status?.toLowerCase() === "success"
                                              ? "bg-green-100 text-green-800"
                                              : item.status?.toLowerCase() === "schedule"
                                              ? "bg-yellow-100 text-yellow-800"
                                              : item.status?.toLowerCase() === "waiting"
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
                                            item.reaction?.toLowerCase() === "nothing"
                                              ? "bg-yellow-100 text-yellow-800"
                                              : "bg-green-100 text-green-800"
                                          }`}
                                        >
                                          {item.reaction || "N/A"}
                                        </span>
                                      </td>
                                      <td className="px-4 py-4">
                                        <button
                                          onClick={() => handleViewDetails(item)}
                                          className="flex items-center gap-1 text-teal-600 hover:text-teal-800 transition-colors"
                                          title="View Details"
                                        >
                                          <Eye size={16} />
                                        </button>
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            ) : (
                              <p className="text-teal-600">No related records found.</p>
                            )}
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))
              ) : (
                <tr>
                  <td colSpan={10} className="px-4 py-8 text-center text-gray-500">
                    No tracking records found matching your search criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(topLevelRecords.length / itemsPerPage)}
        itemsPerPage={itemsPerPage}
        setCurrentPage={setCurrentPage}
        setItemsPerPage={setItemsPerPage}
        totalItems={topLevelRecords.length}
      />

      <ModalDetail
        isDetailModalOpen={isDetailModalOpen}
        setIsDetailModalOpen={setIsDetailModalOpen}
        selectedRecord={selectedRecord}
        childData={childData}
      />
    </div>
  );
};

export default VaccinesTracking;