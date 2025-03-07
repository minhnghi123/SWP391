import React, { useState, useEffect } from "react";
import axios from "axios";
import { Eye, Trash2, Search } from "lucide-react";
import Pagination from "../../../utils/pagination";
import DetailsAppointments from "../components/detailsAppointments";

const BookingList = () => {
  const [bookings, setBookings] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);
  
  

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true);
        const response = await axios.get("https://localhost:7280/api/Booking/get-all");
        setBookings(response.data);
        setError(null);
      } catch (error) {
        console.error("Error fetching bookings:", error);
        setError("Failed to fetch bookings. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const handleViewDetails = (booking) => {
    setSelectedBooking(booking);
  };

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Manage Bookings</h1>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search bookings..."
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {loading ? (
          <p className="p-6 text-center">Loading...</p>
        ) : error ? (
          <p className="p-6 text-center text-red-600">{error}</p>
        ) : (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Parent Name</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Date of Birth</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Gender</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Created At</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {bookings.map((booking) => (
                <tr key={booking.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-gray-900 font-medium">{booking.parent?.name}</td>
                  <td className="px-6 py-4 text-gray-600">{booking.parent?.dateOfBirth?.split("T")[0] || "N/A"}</td>
                  <td className="px-6 py-4 text-gray-600">{booking.parent?.gender === 1 ? "Male" : "Female"}</td>
                  <td className="px-6 py-4 text-gray-600">{booking.parent?.status || "N/A"}</td>
                  <td className="px-6 py-4 text-gray-600">{booking.createdAt?.split("T")[0] || "N/A"}</td>
                  <td className="px-6 py-4 flex gap-3">
                    <DetailsAppointments booking={selectedBooking} />
                    <button className="text-gray-400 hover:text-red-600 transition-colors">
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <Pagination
      
      />
    </div>
  );
};

export default BookingList;
