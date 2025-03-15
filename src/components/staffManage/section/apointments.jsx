import { useEffect, useState } from "react";
import EditApointment from "./editApoinment";
import useAxios from "../../../utils/useAxios";
import { toast } from "react-toastify";
import CreateBookingByStaff from "./createBookingByStaff";
import ModalConfirm from "../section/modalConfirm";
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import formatCurrency from "../../../utils/calculateMoney";
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

  const [tracking, setTracking] = useState([]);
  useEffect(() => {
    const fetchBookings = async () => {
      const [bookingRes, trackingRes] = await Promise.all([
        api.get(`${url}/Booking/get-all-booking`),
        api.get(`${url}/VaccinesTracking`)
      ]);
      setAppointments(bookingRes.data);
      setTracking(trackingRes.data);
    };
    fetchBookings();
    return () => {
      setTrigger(false);
    }
  }, [trigger]);
  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };
  useEffect(() => {
    if (!searchTerm) {
      setFilteredAppointments(appointments);
    } else {
      const filtered = appointments.filter(appointment => {
        return (
          appointment.phoneNumber.toLowerCase().includes(searchTerm) ||
          appointment.parentName.toLowerCase().includes(searchTerm)
        );
      });
      setFilteredAppointments(filtered);
    }
  }, [searchTerm, appointments]);

  const handleOpenModal = (booking) => {
    setSelectedBooking(booking);
    setIsModalOpen(true);
  };

  const fillterbyStatus = (status) => {
    if (status === "All") {
      setFilteredAppointments(appointments);
    } else {
      setFilteredAppointments(appointments.filter(appointment => appointment.status === status));
    }

  }

  const handleOpenEditModal = (booking) => {
    setEditingBooking(booking);
    setIsEditModalOpen(true);
  };

  const handleSaveBookingChanges = async (updatedBooking) => {
    try {
      const response = await api.put(`${url}/Booking/${updatedBooking.id}`, updatedBooking);

      if (response.status === 200) {
        toast.success("Update booking successfully!");

        // Nếu bạn có state bookings, cập nhật lại dữ liệu
        setBookings((prev) =>
          prev.map((booking) =>
            booking.id === updatedBooking.id ? { ...booking, ...updatedBooking } : booking
          )
        );


      }
    } catch (error) {
      toast.error("Update booking failed!");
    }
  };


  const handleCompleteBooking = async (bookingId) => {
    try {
      const value = {
        status: "Success"
      }
      const response = await api.put(`${url}/Booking/${bookingId}`, value);
      if (response.status === 200) {
      setAppointments(prevAppointments =>
        prevAppointments.map(appointment =>
          appointment.id === bookingId
            ? { ...appointment, status: "Success" }
            : appointment
        )
      );
      setIsModalConfirmOpen(false)
      toast.success("Booking marked as completed!");
      }



    } catch (error) {
      setIsModalConfirmOpen(false)
      toast.error("Error marking booking as completed!");
    }

  };
  const handleConfirm = (bookingId) => {
    setSelectedBooking(bookingId)
    setIsModalConfirmOpen(true)
  }







  const handleRefundBooking = async (bookingId) => {
    try {
      const checkFirstDose = tracking.find(item => item.bookingId === bookingId && item.previousVaccination === 0 && item.status.toLowerCase() === "success")
      const refundPercentage = checkFirstDose ? 0 : 1;
      if (refundPercentage) {
        const response = await api.post(`${url}/Payment/refund`, {
          bookingID: bookingId,
          paymentStatusEnum: refundPercentage
        });

        if (response.status === 200) {
          // Cập nhật trạng thái booking sau khi hoàn tiền thành công
          setAppointments(prevAppointments =>
            prevAppointments.map(appointment =>
              appointment.id === bookingId ? { ...appointment, status: "refunded" } : appointment
            )
          );
          toast.success(`Refunded successfully!`);
        } else {
          toast.error("Refund failed. Please try again.");
        }
      }
    } catch (error) {
      console.error("Refund error:", error);
      toast.error("Refund failed. Please try again.");
    }
  };






  const getStatusBadge = (status) => {
    switch (status) {
      case "Pending":
        return <span className="px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">Pending</span>;
      case "Success":
        return <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">Success</span>;
      case "Refund":
        return <span className="px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">Refunded</span>;
      default:
        return <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">{status}</span>;
    }
  };
  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Booking Management</h2>
        <div className="flex space-x-2 items-center">
          <div className="relative">
            <input
              type="text"
              placeholder="Search bookings..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              onChange={handleSearch}
            />
            <svg className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <select
            onChange={(e) => fillterbyStatus(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="All">All Statuses</option>
            <option value="Pending">Pending</option>
            <option value="Success">Success</option>
            <option value="Refund">Refund</option>
          </select>


          <button
            onClick={() => setIsCreateBookingModalOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition duration-200 flex items-center"
          >
            <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            New Booking
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider sticky top-0 z-10">
              <tr>
                <th className="px-6 py-3">Booking ID</th>
                <th className="px-6 py-3">Parent Name</th>
                <th className="px-6 py-3">Phone Number</th>
                <th className="px-8 py-3 ">Amount</th>
                <th className="px-6 py-3">Payment Method</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Detail</th>
                <th className="px-6 py-3">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredAppointments.map((appointment, index) => (
                <tr
                  key={appointment.id}
                  className={`transition duration-150 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-gray-100`}
                >
                  <td className="px-8 py-4 whitespace-nowrap text-sm font-medium text-gray-900">#{appointment.id}</td>
                  <td className="px-8 py-4 whitespace-nowrap text-sm text-gray-700">{appointment.parentName}</td>
                  <td className="px-8 py-4 whitespace-nowrap text-sm text-gray-700">{appointment.phoneNumber}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 text-right">{formatCurrency(appointment.amount)} VND</td>
                  <td className="px-14 py-4 whitespace-nowrap text-sm text-gray-700">{appointment.paymentMethod}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{getStatusBadge(appointment.status)}</td>
                  <td className="px-8 py-4 whitespace-nowrap text-sm text-gray-700">
                    <VisibilityOutlinedIcon onClick={() => handleOpenModal(appointment)} className="text-blue-600 hover:text-blue-800 font-medium transition duration-150" />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {appointment.status === "Pending" ? (
                      <div className="flex space-x-2 sm:space-x-3">
                        <button
                          onClick={() => handleOpenEditModal(appointment)}
                          className="flex items-center px-3 py-1 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition duration-150"
                        >
                          <svg
                            className="w-4 h-4 mr-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                            ></path>
                          </svg>
                          Edit
                        </button>
                        <button
                          onClick={() => handleConfirm(appointment)}
                          className="flex items-center px-3 py-1 bg-green-100 text-green-700 rounded-md hover:bg-green-200 transition duration-150"
                        >
                          <svg
                            className="w-4 h-4 mr-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M5 13l4 4L19 7"
                            ></path>
                          </svg>
                          Complete
                        </button>
                      </div>
                    ) : (
                      appointment?.status.toLowerCase() === "success" &&
                     ( 
                        <button
                          onClick={() => handleRefundBooking(appointment.id)}
                          className="flex items-center px-3 py-1 bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition duration-150"
                        >
                          <svg
                            className="w-4 h-4 mr-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M15 19l-7-7 7-7"
                            ></path>
                          </svg>
                          Refund
                        </button>
                      )
                    )}
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
          <div className="flex-1 flex justify-between sm:hidden">
            <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
              Previous
            </button>
            <button className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
              Next
            </button>
          </div>
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Showing <span className="font-medium">1</span> to <span className="font-medium">2</span> of{" "}
                <span className="font-medium">2</span> results
              </p>
            </div>
            <div>
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                  <span className="sr-only">Previous</span>
                  <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </button>
                <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                  1
                </button>
                <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                  <span className="sr-only">Next</span>
                  <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>


      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-60 transition-opacity duration-300">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] flex flex-col">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-4 rounded-t-lg flex items-center justify-between">
              <div className="flex items-center">
                <svg className="h-6 w-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                <h3 className="text-xl font-bold">Booking Details #{selectedBooking?.id}</h3>
              </div>
              <button
                className="text-white hover:bg-blue-700 p-1 rounded-full transition duration-150 focus:outline-none focus:ring-2 focus:ring-white"
                onClick={() => setIsModalOpen(false)}
                aria-label="Close modal"
              >
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Content */}
            <div className="flex-1 overflow-y-auto px-6 py-4 bg-gray-50">
              {selectedBooking && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Left Column */}
                  <div className="space-y-6">
                    {/* Booking Information */}
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300">
                      <div className="flex items-center mb-4">
                        <svg className="h-5 w-5 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <h4 className="text-lg font-semibold text-gray-800">Booking Information</h4>
                      </div>
                      <div className="space-y-3 text-gray-700">
                        <div className="flex justify-between items-center py-2 border-b border-gray-100">
                          <span className="font-medium text-gray-500">Booking ID:</span>
                          <span className="font-medium text-blue-600">#{selectedBooking.id}</span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-gray-100">
                          <span className="font-medium text-gray-500">Status:</span>
                          <span
                            className={`px-3 py-1 rounded-full text-sm font-medium ${selectedBooking.status === "Pending"
                              ? "bg-yellow-100 text-yellow-800"
                              : selectedBooking.status === "Success"
                                ? "bg-green-100 text-green-800"
                                : selectedBooking.status === "Refund"
                                  ? "bg-red-100 text-red-800"
                                  : "bg-gray-100 text-gray-800"
                              }`}
                          >
                            {selectedBooking.status}
                          </span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-gray-100">
                          <span className="font-medium text-gray-500">Payment Method:</span>
                          <div className="flex items-center">
                            {selectedBooking.paymentMethod === "Cash" ? (
                              <svg className="h-5 w-5 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                              </svg>
                            ) : (
                              <svg className="h-5 w-5 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                              </svg>
                            )}
                            <span className="font-medium">{selectedBooking.paymentMethod}</span>
                          </div>
                        </div>
                        <div className="flex justify-between items-center py-2">
                          <span className="font-medium text-gray-500">Amount:</span>
                          <span className="font-medium text-lg text-green-700">{selectedBooking.amount.toLocaleString()} VND</span>
                        </div>
                      </div>
                    </div>

                    {/* Parent Information */}
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300">
                      <div className="flex items-center mb-4">
                        <svg className="h-5 w-5 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        <h4 className="text-lg font-semibold text-gray-800">Parent Information</h4>
                      </div>
                      <div className="space-y-3 text-gray-700">
                        <div className="flex justify-between items-center py-2 border-b border-gray-100">
                          <span className="font-medium text-gray-500">Name:</span>
                          <span className="font-medium">{selectedBooking.parentName}</span>
                        </div>
                        <div className="flex justify-between items-center py-2">
                          <span className="font-medium text-gray-500">Phone Number:</span>
                          <span className="font-medium">{selectedBooking.phoneNumber}</span>
                        </div>
                      </div>
                    </div>

                    {/* Children */}
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300">
                      <div className="flex items-center mb-4">
                        <svg className="h-5 w-5 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                        <h4 className="text-lg font-semibold text-gray-800">Children</h4>
                      </div>
                      <div className="space-y-3">
                        {selectedBooking.childrenList.map((child) => (
                          <div
                            key={child.childId}
                            className="p-4 bg-gray-50 rounded-md border border-gray-200 hover:bg-blue-50 hover:border-blue-200 transition-colors duration-200"
                          >
                            <div className="flex justify-between items-center">
                              <div className="flex items-center">
                                <svg className="h-5 w-5 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                                <span className="font-medium text-gray-800">{child.name}</span>
                              </div>
                              <span className="text-sm px-3 py-1 rounded-full bg-blue-100 text-blue-800 border border-blue-200">
                                {child.gender === 1 ? "Male" : "Female"}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="space-y-6">
                    {/* Vaccines */}
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300">
                      <div className="flex items-center mb-4">
                        <svg className="h-5 w-5 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                        </svg>
                        <h4 className="text-lg font-semibold text-gray-800">Vaccines</h4>
                      </div>
                      {selectedBooking.vaccineList.length > 0 ? (
                        <div className="space-y-3">
                          {selectedBooking.vaccineList.map((vaccine) => (
                            <div
                              key={vaccine.id}
                              className="flex justify-between items-center p-4 bg-gray-50 rounded-md border border-gray-200 hover:bg-blue-50 hover:border-blue-200 transition-colors duration-200"
                            >
                              <div className="flex items-center">
                                <svg className="h-5 w-5 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span className="font-medium text-gray-800">{vaccine.name}</span>
                              </div>
                              <span className="text-blue-700 font-medium">{vaccine.price.toLocaleString()} VND</span>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-4 text-gray-500">No individual vaccines selected</div>
                      )}
                    </div>

                    {/* Combos */}
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300">
                      <div className="flex items-center mb-4">
                        <svg className="h-5 w-5 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                        </svg>
                        <h4 className="text-lg font-semibold text-gray-800">Vaccine Combos</h4>
                      </div>
                      {selectedBooking.comboList.length > 0 ? (
                        <div className="space-y-4">
                          {selectedBooking.comboList.map((combo) => (
                            <div
                              key={combo.id}
                              className="p-4 bg-gray-50 rounded-md border border-gray-200 hover:bg-blue-50 hover:border-blue-200 transition-colors duration-200"
                            >
                              <div className="flex justify-between items-center mb-3">
                                <div className="flex items-center">
                                  <svg className="h-5 w-5 text-purple-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                                  </svg>
                                  <span className="font-medium text-gray-800">{combo.name}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <span className="text-sm px-3 py-1 bg-green-100 text-green-800 rounded-full border border-green-200">
                                    {combo.discount}% off
                                  </span>
                                </div>
                              </div>
                              <div className="flex justify-between items-center mb-3 px-2">
                                <span className="text-sm text-gray-500 line-through">{combo.totalPrice.toLocaleString()} VND</span>
                                <span className="text-lg text-green-700 font-medium">{combo.finalPrice.toLocaleString()} VND</span>
                              </div>
                              <div className="mt-3 bg-white p-3 rounded-md border border-gray-200">
                                <div className="flex items-center mb-2">
                                  <svg className="h-4 w-4 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                  </svg>
                                  <span className="font-medium text-gray-700">Included Vaccines:</span>
                                </div>
                                <ul className="space-y-2 mt-2">
                                  {combo.vaccineResponseBooking.map((vaccine) => (
                                    <li key={vaccine.id} className="flex justify-between items-center px-3 py-2 bg-gray-50 rounded-md">
                                      <span className="text-gray-800">{vaccine.name}</span>
                                      <span className="text-blue-700">{vaccine.price.toLocaleString()} VND</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-4 text-gray-500">No vaccine combos selected</div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-gray-200 bg-white flex justify-between rounded-b-lg">
              <button
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition duration-150 focus:ring-2 focus:ring-gray-400"
                onClick={() => setIsModalOpen(false)}
              >
                Close
              </button>
              <div>
                {selectedBooking && selectedBooking.status === "Pending" && (
                  <button
                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition duration-150 focus:ring-2 focus:ring-green-400 mr-3"
                    onClick={() => {
                      handleCompleteBooking(selectedBooking.id)
                      setIsModalOpen(false)
                    }}
                  >
                    <div className="flex items-center">
                      <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      Complete Booking
                    </div>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {isEditModalOpen && editingBooking && (
        <EditApointment
          appointment={editingBooking}
          onSave={handleSaveBookingChanges}
          onCancel={() => setIsEditModalOpen(false)}
          
        />
      )}
      {
        isCreateBookingModalOpen && (
          <CreateBookingByStaff
            isModalOpen={isCreateBookingModalOpen}
            setIsModalOpen={setIsCreateBookingModalOpen}
            setTrigger={setTrigger}
          />
        )
      }
      {
        isModalConfirmOpen && (
          <ModalConfirm
            title="Confirm Complete Booking"
            message="Are you sure you want to complete this booking?"
            handleConfirm={() => handleCompleteBooking(selectedBooking.id)}
            handleCancel={() => setIsModalConfirmOpen(false)}
          />
        )
      }



    </>
  );
};

export default BookingManagementPage;