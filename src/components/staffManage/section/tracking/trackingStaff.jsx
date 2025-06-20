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
import ModalDetailAllDoes from './modaAllDoes'
import HeaderTracking from "./headerTracking";

const url = import.meta.env.VITE_BASE_URL_DB;

export function VaccinationTrackingDashboard() {
  useEffect(() => {
    const styleElement = document.createElement("style");
    styleElement.textContent = datePickerStyles;
    document.head.appendChild(styleElement);
    return () => document.head.removeChild(styleElement);
  }, [])
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
  const [loading, setLoading] = useState(false);
  const [statusSuccess, setStatusSuccess] = useState([]);
  const [modalAllDoes, setModalAllDoes] = useState(false)
  const [selectAllDoes, setSelectAllDoes] = useState([])
  const [isExpand, setIsExpand] = useState(null);
  const [array, setArray] = useState([]);

  // Add isOverdue function definition
  const isOverdue = (maximumIntervalDate, status) => {
    if (!maximumIntervalDate) return false;
    if (status?.toLowerCase() !== "schedule" && status?.toLowerCase() !== "waiting") return false;
    return new Date() > new Date(maximumIntervalDate);
  };

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

    if (data.length === 0 || childData.length === 0) {
      fetchData();
    }
  }, []);


  useEffect(() => {
    setStatusSuccess(linkList(data));
  }, [data, linkList]);

  // Combined filter, search, and sort logic
  useEffect(() => {
    let newFilteredData = [...data];

    // Apply status filter
    if (status !== "all") {
      newFilteredData = newFilteredData.filter((item) => {
        const findTrackingList = linkList(data);
        const findArry = findTrackingList.find(subArray => subArray[0]?.trackingID === item.trackingID);
        
        switch (status) {
          case "success":
            return findArry && findArry.every(item => item.status.toLowerCase() === "success");
          case "cancel":
            return findArry && findArry.some(item => item.status.toLowerCase() === "cancel");
          case "inprogress":
            return findArry && findArry.some(item => 
              item.status.toLowerCase() === "schedule" || 
              item.status.toLowerCase() === "waiting"
            );
          case "overdue":
            return findArry && findArry.some(item => 
              isOverdue(item.maximumIntervalDate, item.status)
            );
          default:
            return true;
        }
      });
    }

    // Apply search filter
    if (searchQuery) {
      setCurrentPage(1);
      newFilteredData = newFilteredData.filter((item) => {
        const childName = childData.find((child) => child.id === item.childId)?.name || "";
        return (
          item.userName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          childName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.vaccineName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.bookingId?.toString().includes(searchQuery) ||
          item.trackingID?.toString().includes(searchQuery) ||
          item.childId?.toString().includes(searchQuery.toLowerCase())
        );
      });
      setCurrentPage(1);
      setCurrentPage(1); // Reset current page when filters change
    }

    // Sort data
    const sortedData = sortData(newFilteredData);
    setFilteredData(sortedData);
    // Reset current page when filters change
    
  }, [data, childData, status, searchQuery, sortField, sortOrder, linkList]);

  const sortData = (dataToSort) => {
    return [...dataToSort].sort((a, b) => {
      if (!sortField) return 0;

      if (sortField === "status") {
        const statusOrder = { 
          success: 1, 
          schedule: 2, 
          waiting: 3, 
          overdue: 4, 
          cancel: 5 
        };
        const findTrackingList = linkList(data);
        const aArray = findTrackingList.find(subArray => subArray[0]?.trackingID === a.trackingID);
        const bArray = findTrackingList.find(subArray => subArray[0]?.trackingID === b.trackingID);
        
        const aStatus = aArray?.some(item => item.status.toLowerCase() === "cancel") ? "cancel" :
                       aArray?.every(item => item.status.toLowerCase() === "success") ? "success" :
                       aArray?.some(item => isOverdue(item.maximumIntervalDate, item.status)) ? "overdue" :
                       aArray?.some(item => item.status.toLowerCase() === "schedule" || item.status.toLowerCase() === "waiting") ? "schedule" : "waiting";
        
        const bStatus = bArray?.some(item => item.status.toLowerCase() === "cancel") ? "cancel" :
                       bArray?.every(item => item.status.toLowerCase() === "success") ? "success" :
                       bArray?.some(item => isOverdue(item.maximumIntervalDate, item.status)) ? "overdue" :
                       bArray?.some(item => item.status.toLowerCase() === "schedule" || item.status.toLowerCase() === "waiting") ? "schedule" : "waiting";

        const aValue = statusOrder[aStatus] || 999;
        const bValue = statusOrder[bStatus] || 999;
        return sortOrder === "asc" ? aValue - bValue : bValue - aValue;
      }

      if (sortField === "vaccinationDate") {
        const aDate = a.vaccinationDate ? new Date(a.vaccinationDate) : new Date(0);
        const bDate = b.vaccinationDate ? new Date(b.vaccinationDate) : new Date(0);
        if (isNaN(aDate) || isNaN(bDate)) return 0;
        return sortOrder === "asc" ? aDate - bDate : bDate - aDate;
      }

      const aValue = (a[sortField] || "").toString().toLowerCase();
      const bValue = (b[sortField] || "").toString().toLowerCase();
      return sortOrder === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
    });
  };

  const handleFilter = (newStatus) => {
    setStatus(newStatus);
    setCurrentPage(1);
  };

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
      // window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };



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

  const handleViewDetails = (record, type) => {
    if (type === 'each') {
      setSelectedRecord(record);
      setIsDetailModalOpen(true);
    }
    else {
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
      setModalAllDoes(true)
      setSelectAllDoes(trackingChain)
    }
  };


  const handleUpdateStatus = (record) => {
    setSelectedRecord(record);
    setNewStatus(record.status);
    setIsStatusModalOpen(true);
  };

  const handleStatusUpdate = async () => {
    let nextStatus;
    const statusLower = newStatus?.toLowerCase() || "";

    // Determine nextStatus
    switch (statusLower) {
      case "success":
        nextStatus = "schedule";
        break;
      case "schedule":
        nextStatus = "waiting";
        break;
      case "cancel":
        nextStatus = "cancel";
        break;
      default:
        nextStatus = "unknown";
        break;
    }

    try {
      const value = { status: newStatus, reaction: "Nothing" };
      const res = await api.put(
        `${url}/VaccinesTracking/update-vaccine-staff/${selectedRecord.trackingID}`,
        value
      );

      if (res.status === 200) {
        // Find the current record's vaccinationDate
        const currentRecord = data.find(item => item.trackingID === selectedRecord.trackingID);
        const currentVaccinationDate = currentRecord?.vaccinationDate
          ? new Date(currentRecord.vaccinationDate)
          : new Date(); // Fallback to current date if not available

        const newVaccinationDate = new Date(currentVaccinationDate.setMonth(currentVaccinationDate.getMonth() + 1));
        // Update statuses in data
        const updatedData = data.map((item) => {
          if (item.trackingID === selectedRecord.trackingID) {
            return { ...item, status: newStatus }; // Update current record
          } else if (statusLower !== "cancel" && item.trackingID === selectedRecord.trackingID + 1) {
            // Update the next record with current record's vaccinationDate + 1 month
            return {
              ...item,
              status: nextStatus,
              vaccinationDate: newVaccinationDate
            };
          } else if (statusLower === "cancel" && item.trackingID > selectedRecord.trackingID) {
            // Update all subsequent records to "cancel" if status is "cancel"
            return { ...item, status: "cancel" };
          }
          return item; // No change for other records
        });

        // Update statuses in array (matching the logic of updatedData)
        let updatedArray = array.map((item) => {
          if (item.trackingID === selectedRecord.trackingID) {
            return { ...item, status: newStatus }; // Update current record
          } else if (statusLower !== "cancel" && item.trackingID === selectedRecord.trackingID + 1) {
            // Update the next record with current record's vaccinationDate + 1 month
            return {
              ...item,
              status: nextStatus,
              vaccinationDate: newVaccinationDate
            };
          } else if (statusLower === "cancel" && item.trackingID > selectedRecord.trackingID) {
            // Update all subsequent records to "cancel" if status is "cancel"
            return { ...item, status: "cancel" };
          }
          return item; // No change for other records
        });

        // Update state
        setData(updatedData);
        setArray(updatedArray);
        setSelectedRecord(null);
        setNewStatus("");
        setIsStatusModalOpen(false);
        toast.success("Status updated successfully");
        // dispatch(trigerAction.setTriggerVaccine());
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
          item.trackingID === selectedRecord.trackingID ? { ...item, reaction: reaction} : item
        );
        const updatedArray = array.map((item) =>
          item.trackingID === selectedRecord.trackingID ? { ...item, reaction: reaction} : item
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



  return (
    <div className="container mx-auto p-4 space-y-6">
      <HeaderTracking
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleFilter={handleFilter}
        sortData={sortData}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
        sortField={sortField}
        setSortField={setSortField}
        filteredData={filteredData}
        setFilteredData={setFilteredData}
      />

      {/* Summary */}
      <SummaryCard
        data={data}
      />

      {/* Table */}
      <CartTable
        data={data}
        setSelectedRecord={setSelectedRecord}
        setIsReactionModalOpen={setIsReactionModalOpen}
        setIsChangeScheduleModalOpen={setIsChangeScheduleModalOpen}
        handleViewDetails={handleViewDetails}
        handleUpdateStatus={handleUpdateStatus}
        currentPage={currentPage}
        totalPages={totalPages}
        paginatedData={paginatedData}
        childData={childData}
        startIndex={startIndex}
        endIndex={endIndex}
        totalItems={totalItems}
        onPageChange={handlePageChange}
        statusSuccess={statusSuccess}
        handleExpand={handleExpand}
        isExpand={isExpand}
        array={array}
        linkList={linkList}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {/* Modal Detail */}
      <ModalDetail
        isDetailModalOpen={isDetailModalOpen}
        setIsDetailModalOpen={setIsDetailModalOpen}
        selectedRecord={selectedRecord}
        childData={childData}
      />
      <ModalDetailAllDoes
        isDetailModalOpen={modalAllDoes}
        setIsDetailModalOpen={setModalAllDoes}
        selectedRecords={selectAllDoes}
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