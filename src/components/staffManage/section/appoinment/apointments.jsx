import { useEffect, useState } from "react";
import EditApointment from "./editApoinment";
import useAxios from "../../../../utils/useAxios";
import { toast } from "react-toastify";
import CreateBookingByStaff from "./createBookingByStaff";
import ModalConfirm from "./modalConfirm";
import ModalRefund from "./modalRefund";
import CardTable from "./cardTable";
import Summary from "./summary";
import SelectAppoinment from "./selectAppointment";
import DetailAppoinment from "./detailAppoinment";
import PaginationComponent from "../../Pagination";

const url = import.meta.env.VITE_BASE_URL_DB;

const BookingManagementPage = () => {
  const api = useAxios();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingBooking, setEditingBooking] = useState(null);
  const [isCreateBookingModalOpen, setIsCreateBookingModalOpen] = useState(false);
  const [trigger, setTrigger] = useState(false);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [isModalConfirmOpen, setIsModalConfirmOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [tracking, setTracking] = useState([]);
  const [modalRefund, setModalRefund] = useState(false);
  const [refundPercentage, setRefundPercentage] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [statusSuccess, setStatusSuccess] = useState([]);
  const itemsPerPage = 20;

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const [bookingRes, trackingRes] = await Promise.all([
          api.get(`${url}/Booking/get-all-booking`),
          api.get(`${url}/VaccinesTracking/get-all-staff`),
        ]);
        setAppointments(bookingRes.data);
        setTracking(trackingRes.data);
      } catch (error) {
        console.error("Error fetching bookings:", error);
        toast.error("Failed to load bookings!");
      }
    };
    fetchBookings();
  }, [trigger]);

  useEffect(() => {
    if (!searchTerm) {
      setFilteredAppointments(appointments);
    } else {
      const filtered = appointments.filter((appointment) =>
        appointment.phoneNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        appointment.parentName.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredAppointments(filtered);
    }
  }, [searchTerm, appointments]);

  const handleOpenModal = (booking) => {
    setSelectedBooking(booking);
    setIsModalOpen(true);
  };

  const filterByStatus = (status) => {
    if (status.toLowerCase() === "all") {
      setFilteredAppointments(appointments);
    } else {
      setFilteredAppointments(
        appointments.filter((appointment) => appointment.status.toLowerCase() === status.toLowerCase())
      );
    }
  };

  const handleOpenEditModal = (booking) => {
    setEditingBooking(booking);
    setIsEditModalOpen(true);
  };

  const handleSaveBookingChanges = async (updatedBooking) => {
    if (!updatedBooking) return;
    setLoading(true);
    try {
      const value = {
        bookingId: updatedBooking.id,
        vaccinesList: updatedBooking.vaccineList.map((vaccine) => vaccine.id),
        vaccinesCombo: updatedBooking.comboList.map((combo) => combo.id),
      };
      const res = await api.patch(`${url}/Booking/update-booking-details`, value);
      if (res.status === 200) {
        toast.success("Update booking successfully!");
        setIsEditModalOpen(false);
        setTrigger((prev) => !prev); // Toggle trigger để fetch lại dữ liệu
      }
    } catch (error) {
      console.error("Error updating booking:", error);
      toast.error("Update booking failed!");
    } finally {
      setLoading(false);
    }
  };

  const handleCompleteBooking = async (bookingComplete) => {
    if (!bookingComplete) {
      toast.error("No booking selected!");
      return;
    }
    setLoading(true);
    try {
      const value = {
        parentId: bookingComplete.parentId,
        advisoryDetail: bookingComplete.advisoryDetail,
        totalPrice: bookingComplete.amount,
        paymentId: 1,
        arrivedAt: bookingComplete.arrivedAt,
        childrenIds: bookingComplete.childrenList?.map((child) => child.childId) || [],
        vaccineIds: bookingComplete.vaccineList?.map((vaccine) => vaccine.id) || [],
        vaccineComboIds: bookingComplete.comboList?.map((combo) => combo.id) || [],
        bookingID: bookingComplete.id,
      };
      const response = await api.post(`${url}/Booking/add-booking-by-staff`, value);
      if (response.status === 200) {
        setAppointments((prevAppointments) =>
          prevAppointments.map((appointment) =>
            appointment.id === bookingComplete.id
              ? { ...appointment, status: "Success", paymentMethod: "Cash" }
              : appointment
          )
        );
        setIsModalOpen(false);
        setIsModalConfirmOpen(false);
        toast.success("Booking marked as completed!");
      }
    } catch (error) {
      console.error("Error completing booking:", error);
      toast.error("Error marking booking as completed!");
    } finally {
      setLoading(false);
    }
  };

  // const handleConfirmBooking = (booking) => {
  //   setSelectedBooking(booking);
   
  // };

  const handleRefundBooking = async (bookingId) => {
    if (!bookingId) {
      toast.error("No booking selected!");
      return;
    }
    setLoading(true);
    try {
      const checkFirstDose = tracking.find(
        (item) => item.bookingId === bookingId && item.previousVaccination === 0 && item.status.toLowerCase() === "success"
      );
      const refundPercentageValue = checkFirstDose ? 0 : 1;
      if (refundPercentageValue) {
        const response = await api.post(`${url}/Payment/refund`, {
          bookingID: bookingId,
          paymentStatusEnum: refundPercentageValue,
        });
        if (response.status === 200) {
          setAppointments((prevAppointments) =>
            prevAppointments.map((appointment) =>
              appointment.id === bookingId ? { ...appointment, status: "Refunded" } : appointment
            )
          );
          toast.success("Refunded successfully!");
          setModalRefund(false);
        } else {
          toast.error("Refund failed. Please try again.");
        }
      } else {
        toast.info("Refund not applicable for this booking.");
        setModalRefund(false);
      }
    } catch (error) {
      console.error("Refund error:", error);
      toast.error("Refund failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Pagination logic
  const totalPages = Math.ceil(filteredAppointments.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = filteredAppointments.slice(startIndex, endIndex);

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-6 animate-fade-in">
      <SelectAppoinment
        setSearchTerm={setSearchTerm}
        fillterbyStatus={filterByStatus}
        setIsCreateBookingModalOpen={setIsCreateBookingModalOpen}
      />
      <Summary appointments={appointments} />
      <CardTable
        paginatedData={paginatedData}
        handleOpenModal={handleOpenModal}
        handleOpenEditModal={handleOpenEditModal}
        // handleConfirm={handleConfirmBooking}
        setIsModalConfirmOpen={setIsModalConfirmOpen}
        loading={loading}
        setModalRefund={setModalRefund}
        setSelectedBooking={setSelectedBooking}
        setRefundPercentage={setRefundPercentage}
        currentPage={currentPage}
        totalPages={totalPages}
        startIndex={startIndex}
        endIndex={endIndex}
        totalItems={filteredAppointments.length}
        onPageChange={handlePageChange}
      />
      {isModalOpen && (
        <DetailAppoinment
          selectedBooking={selectedBooking}
          setIsModalOpen={setIsModalOpen}
          handleCompleteBooking={handleCompleteBooking}
          loading={loading}
        />
      )}
      {isEditModalOpen && editingBooking && (
        <EditApointment
          appointment={editingBooking}
          onSave={handleSaveBookingChanges}
          onCancel={() => setIsEditModalOpen(false)}
          loading={loading}
        />
      )}
      {isCreateBookingModalOpen && (
        <CreateBookingByStaff
          isModalOpen={isCreateBookingModalOpen}
          setIsModalOpen={setIsCreateBookingModalOpen}
          setTrigger={setTrigger}
        />
      )}
      {isModalConfirmOpen && (
        <ModalConfirm
          title="Confirm Complete Booking"
          message="Are you sure you want to complete this booking?"
          handleConfirm={()=>handleCompleteBooking(selectedBooking)}
          handleCancel={() => setIsModalConfirmOpen(false)}
          loading={loading}
        />
      )}
      {modalRefund && (
        <ModalRefund
          title="Confirm Refund Booking"
          message="Are you sure you want to refund this booking?"
          handleConfirm={async () => await handleRefundBooking(selectedBooking?.id)}
          handleCancel={() => setModalRefund(false)}
          loading={loading}
          bookingId={selectedBooking?.id}
          refundPercentage={refundPercentage}
        />
      )}
    </div>
  );
};

export default BookingManagementPage;