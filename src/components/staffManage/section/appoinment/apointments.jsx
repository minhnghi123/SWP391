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
  const itemsPerPage = 20;

  //fetch data
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


  //search
  useEffect(() => {
    if (!searchTerm) {
      setFilteredAppointments(appointments);
    } else {
      setCurrentPage(1);
      const filtered = appointments.filter((appointment) =>
        appointment.phoneNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        appointment.parentName.toLowerCase().includes(searchTerm.toLowerCase())
        || appointment.id.toString().includes(searchTerm)
        || appointment.childrenList.some(child => child.name.toLowerCase().includes(searchTerm.toLowerCase()))
      );
      setFilteredAppointments(filtered);
    }
  }, [searchTerm, appointments]);

  //handle open modal
  const handleOpenModal = (booking) => {
    setSelectedBooking(booking);
    setIsModalOpen(true);
  };

  //filter by status
  const filterByStatus = (status) => {
    setCurrentPage(1);
    if (status.toLowerCase() === "all") {
      setFilteredAppointments(appointments);
    } else {
      setFilteredAppointments(
        appointments.filter((appointment) => appointment.status.toLowerCase() === status.toLowerCase())
      );
    }
  };

  //handle open edit modal
  const handleOpenEditModal = (booking) => {
    setEditingBooking(booking);
    setIsEditModalOpen(true);
  };

  //handle save booking changes
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
        setAppointments((prevAppointments) =>
          prevAppointments.map((appointment) =>
            appointment.id === updatedBooking.id
              ? { ...appointment, ...updatedBooking }
              : appointment
          )
        );
       
      }
    } catch (error) {
      console.error("Error updating booking:", error);
      toast.error("Update booking failed!");
    } finally {
      setLoading(false);
    }
  };

  //handle complete
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

  //handle refund
  const handleRefundBooking = async (bookingId) => {
    if (!bookingId) {
      toast.error("No booking selected!");
      return;
    }
    if (refundPercentage === 0) {
      toast.error("No refund");
      return;
    }
    setLoading(true);
    try {
      // Get booking details
      const booking = appointments.find((item) => item.id === bookingId);
      if (!booking) {
        throw new Error("Booking not found");
      }
      // Determine refund endpoint based on payment method
      const paymentMethod = booking.paymentMethod.toLowerCase();
      const isCashOrVNPay = paymentMethod === 'vnpay' || paymentMethod === 'cash';
      const refundEndpoint = isCashOrVNPay
        ? `${url}/Payment/refund-by-staff`
        : `${url}/Payment/refund`;

      // Execute refund
      const value = {
        bookingID: bookingId,
        paymentStatusEnum: refundPercentage === 50 ? 0 : 1,
      }

      const response = await api.post(refundEndpoint, value);

      if (response.status === 200) {
        setAppointments((prevAppointments) =>
          prevAppointments.map((appointment) =>
            appointment.id === bookingId
              ? { ...appointment, status: "Refund" }
              : appointment
          )
        );
        toast.success("Refunded successfully!");
        setModalRefund(false);
      }
      else {
        throw new Error("Refund request failed");
      }

    } catch (error) {
      console.error("Refund error:", error);
      toast.error(error.message || "Refund failed. Please try again.");
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
      // window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="container mx-auto p-2 ">
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
        tracking={tracking}
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
          // setAppointments={setAppointments}
          // appointments={appointments}
          setIsModalOpen={setIsCreateBookingModalOpen}
          setTrigger={setTrigger}
        />
      )}
      {isModalConfirmOpen && (
        <ModalConfirm
          title="Confirm Complete Booking"
          message="Are you sure you want to complete this booking?"
          handleConfirm={() => handleCompleteBooking(selectedBooking)}
          handleCancel={() => setIsModalConfirmOpen(false)}
          loading={loading}
        />
      )}
      {modalRefund && (
        <ModalRefund
          title="Confirm Refund Booking"
          message="Are you sure you want to refund this booking?"
          handleConfirm={handleRefundBooking}
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