import React, { useState, useEffect } from "react";
import useAxios from "../../../../utils/useAxios";
import Pagination from "../../../../utils/pagination";
import AddBooking from "../booking/addBooking";
import UpdateBooking from "../booking/updateBooking";
import DetailAppoinment from "../booking/detailBooking";
import {
  Search,
  ArrowUpDown,
  Calendar,
  Plus,
  CreditCard,
  Eye,
  SquarePen,
  DollarSign,
} from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import Refund from "./modalRefund";
import formatDate from "@/utils/Date";
import DeleteBooking from "./deleteBooking";

const url = import.meta.env.VITE_BASE_URL_DB;

const Booking = () => {
  const api = useAxios();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("id");
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isRefundModalOpen, setIsRefundModalOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [trigger, setTrigger] = useState(false);
  const [completeLoading, setCompleteLoading] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [refundLoading, setRefundLoading] = useState(false);

  const [availableVaccines, setAvailableVaccines] = useState([]);
  const [availableVaccineCombos, setAvailableVaccineCombos] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      setLoading(true);
      try {
        const response = await api.get(`${url}/Booking/get-all-booking-admin`);
        console.log(
          "Fetched Bookings:",
          JSON.stringify(response.data, null, 2)
        );
        setBookings(response.data || []);
        setError(null);
      } catch (error) {
        setError(error.message);
        toast.error("Failed to fetch bookings: " + error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, [trigger]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [vaccinesRes, combosRes] = await Promise.all([
          api.get(`${url}/Vaccine/get-all-vaccines`),
          api.get(`${url}/VaccineCombo/get-all-vaccine-combo`),
        ]);
        setAvailableVaccines(vaccinesRes.data || []);
        setAvailableVaccineCombos(combosRes.data || []);
      } catch (error) {
        console.error("Failed to fetch vaccines or combos:", error);
      }
    };
    fetchData();
  }, [api]);

  const filteredBookings = bookings.filter((booking) =>
    (booking.parentName?.toLowerCase() || "").includes(searchTerm.toLowerCase())
  );

  const sortedBookings = [...filteredBookings].sort((a, b) => {
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
  const currentBookings = sortedBookings.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const formatStatus = (status) => {
    switch (status?.toLowerCase()) {
      case "pending":
        return "Pending";
      case "confirmed":
        return "Confirmed";
      case "cancelled":
        return "Cancelled";
      case "success":
        return "Success";
      case "scheduled":
        return "Scheduled";
      case "refund":
        return "Refunded";
      default:
        return status || "Unknown";
    }
  };

  const handleViewDetails = (booking) => {
    setSelectedBooking(booking);
    setIsDetailModalOpen(true);
  };

  const handleCloseDetailModal = () => {
    setIsDetailModalOpen(false);
    setSelectedBooking(null);
  };

  const handleEditBooking = (booking) => {
    setSelectedBooking(booking);
    setIsUpdateModalOpen(true);
  };

  const handleCloseUpdateModal = () => {
    setIsUpdateModalOpen(false);
    setSelectedBooking(null);
  };

  const handleCompleteBooking = async (bookingComplete) => {
    if (!bookingComplete || !bookingComplete.id || !bookingComplete.parentId) {
      toast.error("No valid booking selected or missing required data!");
      return;
    }

    setCompleteLoading(true);
    try {
      const payload = {
        parentId: bookingComplete.parentId,
        advisoryDetail: bookingComplete.advisoryDetail || "",
        totalPrice: bookingComplete.amount || 0,
        paymentId: 1,
        arrivedAt: bookingComplete.arrivedAt || new Date().toISOString(),
        childrenIds:
          bookingComplete.childrenList?.map((child) => child.childId) || [],
        vaccineIds:
          bookingComplete.vaccineList?.map((vaccine) => vaccine.id) || [],
        vaccineComboIds:
          bookingComplete.comboList?.map((combo) => combo.id) || [],
        bookingID: bookingComplete.id,
      };

      const response = await api.post(
        `${url}/Booking/add-booking-by-staff`,
        payload
      );

      if (response.status === 200 || response.status === 201) {
        setBookings((prevBookings) =>
          prevBookings.map((booking) =>
            booking.id === bookingComplete.id
              ? { ...booking, status: "Success", paymentMethod: "Cash" }
              : booking
          )
        );
        setIsDetailModalOpen(false);
        setSelectedBooking(null);
        toast.success("Booking marked as completed!");
        setTrigger((prev) => !prev);
      } else {
        toast.error(`Unexpected response status: ${response.status}`);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to complete booking!"
      );
    } finally {
      setCompleteLoading(false);
    }
  };

  // Sửa hàm handleSaveBookingChanges để giống BookingManagementPage
  const handleSaveBookingChanges = async (updatedBooking) => {
    if (!updatedBooking) return;

    setUpdateLoading(true);
    try {
      const payload = {
        bookingId: updatedBooking.bookingId,
        vaccinesList: updatedBooking.vaccinesList,
        vaccinesCombo: updatedBooking.vaccinesCombo,
      };
      console.log("Sending update payload:", JSON.stringify(payload, null, 2));

      const res = await api.patch(
        `${url}/Booking/update-booking-details`,
        payload
      );

      if (res.status === 200) {
        // Cập nhật tạm thời danh sách bookings trước khi fetch lại
        setBookings((prevBookings) =>
          prevBookings.map((booking) =>
            booking.id === parseInt(updatedBooking.bookingId)
              ? {
                  ...booking,
                  vaccineList: availableVaccines.filter((v) =>
                    updatedBooking.vaccinesList.includes(v.id)
                  ),
                  comboList: availableVaccineCombos.filter((c) =>
                    updatedBooking.vaccinesCombo.includes(c.id)
                  ),
                }
              : booking
          )
        );
        // Đóng modal và reset selectedBooking
        setIsUpdateModalOpen(false);
        setSelectedBooking(null);
        // Toggle trigger để fetch lại dữ liệu từ server
        setTrigger((prev) => !prev);
      } else {
        toast.error(`Failed to update booking: Status ${res.status}`);
      }
    } catch (error) {
      console.error("Error updating booking:", error);
      toast.error(error.response?.data?.message || "Failed to update booking!");
    } finally {
      setUpdateLoading(false);
    }
  };

  const canRefundBooking = (booking) => {
    const currentDate = new Date();
    const createdDate = new Date(booking.createdAt);
    const timeDifference = currentDate - createdDate;
    const daysDifference = timeDifference / (1000 * 60 * 60 * 24);
    return booking.status?.toLowerCase() === "pending" && daysDifference <= 2;
  };

  const handleRefundBooking = async (bookingId) => {
    if (!bookingId) {
      toast.error("No booking selected!");
      return;
    }

    const booking = bookings.find((item) => item.id === bookingId);
    if (!booking) {
      toast.error("Booking not found!");
      return;
    }

    if (!canRefundBooking(booking)) {
      toast.error("This booking cannot be refunded.");
      setIsRefundModalOpen(false);
      return;
    }

    setRefundLoading(true);
    try {
      const paymentMethod = booking.paymentMethod?.toLowerCase();
      const isCashOrMoMo = paymentMethod === "momo" || paymentMethod === "cash";
      const refundEndpoint = isCashOrMoMo
        ? `${url}/Payment/refund-by-staff`
        : `${url}/Payment/refund`;

      const hasFirstInjection =
        (booking.vaccineList && booking.vaccineList.length > 0) ||
        (booking.comboList && booking.comboList.length > 0);
      const refundPercentage = hasFirstInjection ? 50 : 100;

      const payload = {
        bookingID: bookingId,
        paymentStatusEnum: 1,
        refundPercentage,
      };

      const response = await api.post(refundEndpoint, payload);

      if (response.status === 200) {
        setBookings((prevBookings) =>
          prevBookings.map((booking) =>
            booking.id === bookingId
              ? { ...booking, status: "Refund" }
              : booking
          )
        );
        setIsRefundModalOpen(false);
        toast.success(`Refunded successfully (${refundPercentage}%)!`);
        setTrigger((prev) => !prev);
      } else {
        throw new Error("Refund request failed");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Refund failed.");
    } finally {
      setRefundLoading(false);
    }
  };

  const handleOpenRefundModal = (booking) => {
    if (!canRefundBooking(booking)) {
      toast.error("This booking cannot be refunded.");
      return;
    }
    const hasFirstInjection =
      (booking.vaccineList && booking.vaccineList.length > 0) ||
      (booking.comboList && booking.comboList.length > 0);
    const refundPercentage = hasFirstInjection ? 50 : 100;
    setSelectedBooking({ ...booking, refundPercentage });
    setIsRefundModalOpen(true);
  };

  return (
    <>
      <div className="bg-white p-6 rounded-2xl shadow-xl shadow-teal-500/5 border border-gray-100">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
          <h1 className="text-2xl font-bold text-gray-900">Bookings</h1>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="bg-gradient-to-r from-blue-500 to-blue-500 text-white px-5 py-2.5 rounded-full hover:from-blue-600 hover:to-blue-600 transition-all duration-300 flex items-center gap-2 shadow-md hover:shadow-lg"
          >
            <Plus className="w-5 h-5" />{" "}
            <span className="font-medium">Add Booking</span>
          </button>
        </div>

        <div className="flex grid-cols-1 md:grid-cols-3 gap-4 mb-6 justify-between">
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Search by parent name..."
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
              }}
              className="flex-1 p-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 bg-gray-50"
            >
              <option value="amount-asc">Amount (Low to High)</option>
              <option value="amount-desc">Amount (High to Low)</option>
              <option value="createdAt-asc">Created At (Old to New)</option>
              <option value="createdAt-desc">Created At (New to Old)</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          {loading ? (
            <p>Loading bookings...</p>
          ) : error ? (
            <p className="text-red-500">Error: {error}</p>
          ) : (
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                    ID
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                    Parent
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                    Phone
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                    Amount
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                    Payment Method
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                    Created At
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                    Delete
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentBookings.length > 0 ? (
                  currentBookings.map((booking) => (
                    <tr
                      key={booking.id}
                      className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-4 py-4 text-sm text-gray-600">
                        {booking.id}
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-teal-50 flex items-center justify-center">
                            <Calendar className="w-5 h-5 text-blue-600" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">
                              {booking.parentName}
                            </p>
                            <p className="text-sm text-gray-500">
                              ID: {booking.parentId}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-600">
                        {booking.phoneNumber}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-600">
                        {booking.amount.toLocaleString()} VND
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <CreditCard className="w-4 h-4" />{" "}
                          {booking.paymentMethod}
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <span
                          className={`inline-block px-2 py-1 text-sm font-medium rounded-full ${
                            booking.status?.toLowerCase() === "success"
                              ? "bg-green-100 text-green-800"
                              : booking.status?.toLowerCase() === "scheduled"
                              ? "bg-yellow-500 text-yellow-800"
                              : booking.status?.toLowerCase() === "refund"
                              ? "bg-red-100 text-red-800"
                              : booking.status?.toLowerCase() === "pending"
                              ? "bg-orange-100 text-yellow-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {formatStatus(booking.status)}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-600">
                        {formatDate(booking.createdAt)}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-600">
                        {booking.isDeleted ? "Deleted" : "Not Deleted"}
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleViewDetails(booking)}
                            className="flex items-center gap-1 text-teal-600 hover:text-teal-800 transition-colors"
                            title="View Details"
                          >
                            <Eye size={16} />
                          </button>
                          {booking.status?.toLowerCase() !== "refund" && booking.status?.toLowerCase() !== "success" && (
                            <button
                              onClick={() => handleEditBooking(booking)}
                              className="flex items-center gap-1 text-teal-600 hover:text-teal-800 transition-colors"
                              title="Edit Booking"
                            >
                              <SquarePen size={16} />
                            </button>
                          )}
                          {canRefundBooking(booking) && (
                            <button
                              onClick={() => handleOpenRefundModal(booking)}
                              className="flex items-center gap-1 text-orange-600 hover:text-orange-800 transition-colors"
                              title="Refund Booking"
                            >
                              <DollarSign size={16} />
                            </button>
                          )}
                          {booking.isDeleted !== true && booking.status.toLowerCase() !== "success" && (
                          <DeleteBooking
                            bookingId={booking.id}
                            onDeleteSuccess={() => setTrigger((prev) => !prev)}
                          />
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={9}
                      className="px-4 py-8 text-center text-gray-500"
                    >
                      No bookings found matching your search criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(sortedBookings.length / itemsPerPage)}
          itemsPerPage={itemsPerPage}
          setCurrentPage={setCurrentPage}
          setItemsPerPage={setItemsPerPage}
          totalItems={sortedBookings.length}
        />

        <AddBooking
          isModalOpen={isAddModalOpen}
          setIsModalOpen={setIsAddModalOpen}
          setTrigger={setTrigger}
        />
        {isUpdateModalOpen && (
          <UpdateBooking
            isModalOpen={isUpdateModalOpen}
            setIsModalOpen={setIsUpdateModalOpen}
            onSave={handleSaveBookingChanges}
            selectedBooking={selectedBooking}
            onClose={handleCloseUpdateModal}
            loading={updateLoading}
          />
        )}
        {isDetailModalOpen && (
          <DetailAppoinment
            selectedBooking={selectedBooking}
            setIsModalOpen={setIsDetailModalOpen}
            handleCompleteBooking={handleCompleteBooking}
            loading={completeLoading}
          />
        )}
        {isRefundModalOpen && (
          <Refund
            title="Confirm Refund Booking"
            message="Are you sure you want to refund this booking?"
            handleConfirm={() => handleRefundBooking(selectedBooking?.id)}
            handleCancel={() => setIsRefundModalOpen(false)}
            loading={refundLoading}
            refundPercentage={selectedBooking?.refundPercentage || 100}
            bookingId={selectedBooking?.id}
          />
        )}
      </div>
      <ToastContainer position="bottom-right" />
    </>
  );
};

export default Booking;
