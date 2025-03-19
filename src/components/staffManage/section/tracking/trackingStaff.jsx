import { useEffect, useState, useMemo } from "react";
import useAxios from "../../../../utils/useAxios";
import { toast } from "react-toastify";
import ModalDetail from "./modalDetail";
import "react-datepicker/dist/react-datepicker.css";
import ModalUpdateStatus from "./modalUpdateStatus";
import CartTable from "./carttable";
import SummaryCard from "./summartCard";
import ModalReaction from "./modalReaction";
import ModalChangeSchedule from "./modalChangeSchedule";

const url = import.meta.env.VITE_BASE_URL_DB;

export function VaccinationTrackingDashboard() {
  useEffect(() => {
    const styleElement = document.createElement("style");
    styleElement.textContent = datePickerStyles;
    document.head.appendChild(styleElement);
    return () => document.head.removeChild(styleElement);
  }, []);

  const api = useAxios();
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [childData, setChildData] = useState([]);
  const [status, setStatus] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState("asc");
  const [sortField, setSortField] = useState("vaccinationDate");
  const [searchQuery, setSearchQuery] = useState("");
  const [date, setDate] = useState(null);
  const rowsPerPage = 20;
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [newStatus, setNewStatus] = useState("");
  const [reaction, setReaction] = useState("");
  const [isReactionModalOpen, setIsReactionModalOpen] = useState(false);
  const [isChangeScheduleModalOpen, setIsChangeScheduleModalOpen] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [loading, setLoading] = useState(false);
  const [statusSuccess, setStatusSuccess] = useState([]);

  // Memoize the linkList function to avoid recalculating on every render
  const linkList = useMemo(() => {
    return (data) => {
      if (!data || data.length === 0) return [];

      const headers = data.filter((item) => item.previousVaccination === 0);
      const vaccineChains = headers.map((header) => {
        let chain = [header];
        let currentId = header.trackingID;

        while (currentId) {
          const next = data.find((item) => item.previousVaccination === currentId);
          if (!next) break;

          chain.push(next);
          currentId = next.trackingID;
        }

        return chain;
      });
      return vaccineChains;
    };
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [vaccineRes, childRes] = await Promise.all([
          api.get(`${url}/VaccinesTracking/get-all-staff`),
          api.get(`${url}/Child/get-all-child`),
        ]);
        if (vaccineRes.status === 200 && childRes.status === 200) {
          setData(vaccineRes.data || []);
          setChildData(childRes.data || []);
          setFilteredData(vaccineRes.data || []);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Failed to fetch vaccination data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    setStatusSuccess(linkList(data));
  }, [data, linkList]);

  // Combined filter, search, and sort logic
  useEffect(() => {
    let newFilteredData = [...data];

    // Apply status filter
    if (status !== "all") {
      newFilteredData = newFilteredData.filter(
        (item) => item.status.toLowerCase() === status
      );
    }

    // Apply search filter
    if (searchQuery) {
      newFilteredData = newFilteredData.filter((item) => {
        const childName = childData.find((child) => child.id === item.childId)?.name || "";
        return (
          item.userName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          childName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.vaccineName?.toLowerCase().includes(searchQuery.toLowerCase())
        );
      });
    }

    // Sort data
    const sortedData = sortData(newFilteredData);
    setFilteredData(sortedData);
    setCurrentPage(1); // Reset to first page on filter/sort change
  }, [data, childData, status, searchQuery, sortField, sortOrder]);

  const sortData = (dataToSort) => {
    return [...dataToSort].sort((a, b) => {
      if (!sortField) return 0;

      if (sortField === "status") {
        const statusOrder = { success: 1, schedule: 2, waiting: 3, cancel: 4 };
        const aValue = statusOrder[a.status?.toLowerCase()] || 999;
        const bValue = statusOrder[b.status?.toLowerCase()] || 999;
        return sortOrder === "asc" ? aValue - bValue : bValue - aValue;
      }

      if (sortField === "vaccinationDate") {
        const aDate = a.vaccinationDate ? new Date(a.vaccinationDate) : new Date(0);
        const bDate = b.vaccinationDate ? new Date(b.vaccinationDate) : new Date(0);
        if (isNaN(aDate) || isNaN(bDate)) return 0; // Handle invalid dates
        return sortOrder === "asc" ? aDate - bDate : bDate - aDate;
      }

      const aValue = (a[sortField] || "").toString().toLowerCase();
      const bValue = (b[sortField] || "").toString().toLowerCase();
      return sortOrder === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
    });
  };

  const handleFilter = (newStatus) => {
    setStatus(newStatus);
  };

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const [isExpand, setIsExpand] = useState(null);
  const [array, setArray] = useState([]);

  const linkList2 = (record) => {
    const detailAll = data.filter((item) => item.bookingId === record.bookingId);
    let trackingChain = [];
    let currentRecord = record;
    while (currentRecord) {
      trackingChain.push(currentRecord);
      currentRecord = detailAll.find(
        (item) =>
          item.previousVaccination === currentRecord.trackingID &&
          item.vaccineID === record.vaccineID &&
          item.bookingId === record.bookingId &&
          item.childId === record.childId &&
          item.vaccineName === record.vaccineName
      );
    }
    setArray(trackingChain);
  };

  const handleExpand = (record) => {
    if (isExpand?.trackingID === record.trackingID) {
      setIsExpand(null);
      setArray([]);
    } else {
      setIsExpand(record);
      linkList2(record);
    }
  };

  const handleViewDetails = (record) => {
    setSelectedRecord(record);
    setIsDetailModalOpen(true);
  };

  const handleUpdateStatus = (record) => {
    setSelectedRecord(record);
    setNewStatus(record.status);
    setIsStatusModalOpen(true);
  };

  const handleStatusUpdate = async () => {
    try {
      const value = { status: newStatus, reaction: "Nothing" };
      const res = await api.put(`${url}/VaccinesTracking/update-vaccine-staff/${selectedRecord.trackingID}`, value);
      if (res.status === 200) {
        // Update both data and array states
        const updatedData = data.map((item) =>
          item.trackingID === selectedRecord.trackingID ? { ...item, status: newStatus } : item
        );
        const updatedArray = array.map((item) =>
          item.trackingID === selectedRecord.trackingID ? { ...item, status: newStatus } : item
        );
        setData(updatedData);
        setArray(updatedArray);
        setSelectedRecord(null);
        setNewStatus("");
        setIsStatusModalOpen(false);
        toast.success("Status updated successfully");
      }
    } catch (error) {
      console.error("Failed to update status:", error);
      toast.error("Failed to update status");
    }
  };

  const handleReactionUpdate = async () => {
    try {
      const value = { reaction: reaction, status: "success" };
      const res = await api.put(`${url}/VaccinesTracking/update-vaccine-staff/${selectedRecord.trackingID}`, value);
      if (res.status === 200) {
        // Update both data and array states
        const updatedData = data.map((item) =>
          item.trackingID === selectedRecord.trackingID ? { ...item, reaction: reaction, status: "success" } : item
        );
        const updatedArray = array.map((item) =>
          item.trackingID === selectedRecord.trackingID ? { ...item, reaction: reaction, status: "success" } : item
        );
        setData(updatedData);
        setArray(updatedArray);
        setIsReactionModalOpen(false);
        setReaction("");
        setSelectedRecord(null);
        toast.success("Reaction updated successfully");
      }
    } catch (error) {
      console.error("Failed to update reaction:", error);
      toast.error("Failed to update reaction");
    }
  };

  const handleScheduleChange = async () => {
    try {
      const value = { status: "schedule", reschedule: date, reaction: "Nothing" };
      const res = await api.put(`${url}/VaccinesTracking/update-vaccine-staff/${selectedRecord.trackingID}`, value);
      if (res.status === 200) {
        // Update both data and array states
        const updatedData = data.map((item) =>
          item.trackingID === selectedRecord.trackingID ? { ...item, vaccinationDate: date, status: "schedule" } : item
        );
        const updatedArray = array.map((item) =>
          item.trackingID === selectedRecord.trackingID ? { ...item, vaccinationDate: date, status: "schedule" } : item
        );
        setData(updatedData);
        setArray(updatedArray);
        setIsChangeScheduleModalOpen(false);
        toast.success("Schedule changed successfully");
        setDate(null);
        setSelectedRecord(null);
      }
    } catch (error) {
      console.error("Failed to change schedule:", error);
      toast.error("Failed to change schedule");
    }
  };

  const totalItems = filteredData.filter((item) => item.previousVaccination === 0).length;
  const totalPages = Math.ceil(totalItems / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = Math.min(startIndex + rowsPerPage, totalItems);
  const paginatedData = filteredData.filter((item) => item.previousVaccination === 0).slice(startIndex, endIndex);

  const uniqueParents = new Set(data.map((item) => item.userName)).size;
  const totalVaccinations = data.length;
  const uniqueChildren = new Set(data.map((item) => item.childId)).size;

  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold text-blue-700">Vaccination Tracking Dashboard</h1>
      </div>

      {/* Summary */}
      <SummaryCard
        uniqueParents={uniqueParents}
        totalVaccinations={totalVaccinations}
        uniqueChildren={uniqueChildren}
      />

      {/* Table */}
      <CartTable
        setSelectedRecord={setSelectedRecord}
        setIsReactionModalOpen={setIsReactionModalOpen}
        setIsChangeScheduleModalOpen={setIsChangeScheduleModalOpen}
        filteredData={filteredData}
        setFilteredData={setFilteredData}
        sortData={sortData}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
        sortField={sortField}
        setSortField={setSortField}
        handleFilter={handleFilter}
        handleViewDetails={handleViewDetails}
        handleUpdateStatus={handleUpdateStatus}
        handlePageChange={handlePageChange}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        data={data}
        childData={childData}
        statusSuccess={statusSuccess}
        handleExpand={handleExpand}
        isExpand={isExpand}
        array={array}
        // Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        paginatedData={paginatedData}
        startIndex={startIndex}
        endIndex={endIndex}
        totalItems={totalItems}
        onPageChange={handlePageChange}
      />

      {/* Modal Detail */}
      <ModalDetail
        isDetailModalOpen={isDetailModalOpen}
        setIsDetailModalOpen={setIsDetailModalOpen}
        selectedRecord={selectedRecord}
        childData={childData}
      />

      {/* Modal Reaction */}
      <ModalReaction
        reaction={reaction}
        isReactionModalOpen={isReactionModalOpen}
        setIsReactionModalOpen={setIsReactionModalOpen}
        selectedRecord={selectedRecord}
        handleReactionUpdate={handleReactionUpdate}
        setReaction={setReaction}
      />

      {/* Modal Update Status */}
      <ModalUpdateStatus
        newStatus={newStatus}
        setNewStatus={setNewStatus}
        isStatusModalOpen={isStatusModalOpen}
        setIsStatusModalOpen={setIsStatusModalOpen}
        selectedRecord={selectedRecord}
        childData={childData}
        handleStatusUpdate={handleStatusUpdate}
      />

      {/* Modal Change Schedule */}
      <ModalChangeSchedule
        setDate={setDate}
        selectedRecord={selectedRecord}
        childData={childData}
        date={date}
        handleScheduleChange={handleScheduleChange}
        showCalendar={showCalendar}
        isChangeScheduleModalOpen={isChangeScheduleModalOpen}
        setIsChangeScheduleModalOpen={setIsChangeScheduleModalOpen}
      />
    </div>
  );
}

const datePickerStyles = `
  .react-datepicker {
    font-family: inherit;
    border-radius: 0.5rem;
    border: 1px solid #e2e8f0;
  }
  .react-datepicker__header {
    background-color: #f8fafc;
    border-bottom: 1px solid #e2e8f0;
    border-top-left-radius: 0.5rem;
    border-top-right-radius: 0.5rem;
    padding-top: 0.5rem;
  }
  .react-datepicker__day--selected {
    background-color: #2563eb !important;
    color: white !important;
  }
  .react-datepicker__day--keyboard-selected {
    background-color: #bfdbfe !important;
    color: #1e40af !important;
  }
  .react-datepicker__day:hover {
    background-color: #eff6ff !important;
  }
  .react-datepicker__day--disabled {
    color: #cbd5e1 !important;
  }
  .react-datepicker__navigation {
    top: 0.5rem;
  }
  .react-datepicker__day {
    border-radius: 0.375rem;
  }
`;

export default VaccinationTrackingDashboard;