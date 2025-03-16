import { format, parseISO } from "date-fns";
import { useEffect, useState } from "react";
import useAxios from "../../../utils/useAxios";
import { toast } from "react-toastify";
import ModalDetail from "./tracking/modalDetail";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ModalUpdateStatus from "./tracking/modalUpdateStatus";
import CartTable from "./tracking/carttable";
import SummaryCard from "./tracking/summartCard";
import ModalReaction from "./tracking/modalReaction";
import ModalChangeSchedule from "./tracking/modalChangeSchedule";

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

const url = import.meta.env.VITE_BASE_URL_DB;

export function VaccinationTrackingDashboard() {
  useEffect(() => {
    const styleElement = document.createElement('style');
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
  const [selectRecordArray, setSelectRecordArray] = useState([]);
  const [reaction, setReaction] = useState("");
  const [isReactionModalOpen, setIsReactionModalOpen] = useState(false);
  const [isChangeScheduleModalOpen, setIsChangeScheduleModalOpen] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [vaccineRes, childRes] = await Promise.all([
          api.get(`${url}/VaccinesTracking/get-all-staff`),
          api.get(`${url}/Child/get-all-child`)
        ]);
        if (vaccineRes.status === 200 && childRes.status === 200) {
          setData(vaccineRes.data);
          setChildData(childRes.data);
          setFilteredData(vaccineRes.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const sortData = (dataToSort) => {
    return [...dataToSort].sort((a, b) => {
      if (!sortField) return 0;
      
      if (sortField === "status") {
        const statusOrder = { success: 1, schedule: 2, waiting: 3, cancel: 4 };
        const aValue = statusOrder[a.status.toLowerCase()] || 999;
        const bValue = statusOrder[b.status.toLowerCase()] || 999;
        return sortOrder === "asc" ? aValue - bValue : bValue - aValue;
      }

      if (sortField === "vaccinationDate") {
        const aDate = a.vaccinationDate ? new Date(a.vaccinationDate) : new Date(0);
        const bDate = b.vaccinationDate ? new Date(b.vaccinationDate) : new Date(0);
        return sortOrder === "asc" ? aDate - bDate : bDate - aDate;
      }

      const aValue = (a[sortField] || "").toString().toLowerCase();
      const bValue = (b[sortField] || "").toString().toLowerCase();
      return sortOrder === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
    });
  };

  // Combined filter and search logic
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
          item.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          childName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.vaccineName.toLowerCase().includes(searchQuery.toLowerCase())
        );
      });
    }

    setFilteredData(sortData(newFilteredData));
    setCurrentPage(1);
  }, [data, childData, status, searchQuery, sortField, sortOrder]);

  const handleFilter = (newStatus) => {
    setStatus(newStatus);
  };

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  const handleViewDetails = (record) => {
    const detailAll = data.filter((item) => item.bookingId === record.bookingId);
    let trackingChain = [];
    let currentRecord = record;
    while (currentRecord) {
      trackingChain.push(currentRecord);
      currentRecord = detailAll.find(item => item.previousVaccination === currentRecord.trackingID);
    }
    setSelectRecordArray(trackingChain);
    setIsDetailModalOpen(true);
  };

  const handleUpdateStatus = (record) => {
    setSelectedRecord(record);
    setNewStatus(record.status);
    setIsStatusModalOpen(true);
  };

  const handleStatusUpdate = async () => {
    try {
      const value = { status: newStatus, reaction: 'Nothing' };
      const res = await api.put(`${url}/VaccinesTracking/update-vaccine-staff/${selectedRecord.trackingID}`, value);
      if (res.status === 200) {
        const updatedData = data.map(item =>
          item.trackingID === selectedRecord.trackingID ? { ...item, status: newStatus } : item
        );
        setData(updatedData);
        setSelectedRecord(null);
        setNewStatus('');
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
      const value = { reaction: reaction, status: 'success' };
      const res = await api.put(`${url}/VaccinesTracking/update-vaccine-staff/${selectedRecord.trackingID}`, value);
      if (res.status === 200) {
        setData(data.map(item =>
          item.trackingID === selectedRecord.trackingID ? { ...item, reaction: reaction } : item
        ));
        setIsReactionModalOpen(false);
        setReaction('');
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
      const value = { status: 'schedule', reschedule: date, reaction: 'Nothing' };
      const res = await api.put(`${url}/VaccinesTracking/update-vaccine-staff/${selectedRecord.trackingID}`, value);
      if (res.status === 200) {
        setData(data.map(item =>
          item.trackingID === selectedRecord.trackingID ? { ...item, vaccinationDate: date } : item
        ));
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

  const uniqueParents = new Set(data.map((item) => item.userName)).size;
  const totalVaccinations = data.length;
  const uniqueChildren = new Set(data.map((item) => item.childId)).size;

  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold text-blue-700">Vaccination Tracking Dashboard</h1>
      </div>
      <SummaryCard uniqueParents={uniqueParents} totalVaccinations={totalVaccinations} uniqueChildren={uniqueChildren} />
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
        currentPage={currentPage}
        totalPages={totalPages}
        rowsPerPage={rowsPerPage}
        paginatedData={paginatedData}
        childData={childData}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <ModalDetail isDetailModalOpen={isDetailModalOpen} setIsDetailModalOpen={setIsDetailModalOpen} selectRecordArray={selectRecordArray} />
      <ModalReaction reaction={reaction} isReactionModalOpen={isReactionModalOpen} setIsReactionModalOpen={setIsReactionModalOpen} selectedRecord={selectedRecord} handleReactionUpdate={handleReactionUpdate} setReaction={setReaction} />
      <ModalUpdateStatus newStatus={newStatus} setNewStatus={setNewStatus} isStatusModalOpen={isStatusModalOpen} setIsStatusModalOpen={setIsStatusModalOpen} selectedRecord={selectedRecord} childData={childData} handleStatusUpdate={handleStatusUpdate} />
      <ModalChangeSchedule setDate={setDate} selectedRecord={selectedRecord} childData={childData} date={date} handleScheduleChange={handleScheduleChange} showCalendar={showCalendar} isChangeScheduleModalOpen={isChangeScheduleModalOpen} setIsChangeScheduleModalOpen={setIsChangeScheduleModalOpen} />
    </div>
  );
}

export default VaccinationTrackingDashboard;