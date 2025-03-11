import React, { useState, useEffect } from "react";
import axios from "axios";
import { Eye, Trash2, Search } from "lucide-react";
import Pagination from "../../../utils/pagination";
import AddBooking from "../CRUD/AddBooking";

const BookingList = () => {
  const [bookings, setBookings] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true);
        const response = await axios.get("https://localhost:7280/api/Booking");
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

  const handleBookingAdded = (newBooking) => {
    setBookings([...bookings, newBooking]);
    setShowAddModal(false);
  };

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Manage Bookings</h1>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Add New Booking
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <div className="relative flex-1">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
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
            {/* Table headers remain the same */}
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">
                  Advisory Detail
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">
                  Arrived At
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">
                  Payment Method
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">
                  Amount
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">
                  Vaccines
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">
                  Combos
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {bookings.map((booking) => (
                <tr key={booking.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-gray-900 font-medium">
                    {booking.advisoryDetail}
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    {booking.arrivedAt?.split("T")[0] || "N/A"}
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    {booking.paymentName}
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    ${booking.amount.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 text-gray-600">{booking.status}</td>
                  <td className="px-6 py-4 text-gray-600">
                    {booking.vaccineList.map((vaccine) => (
                      <p key={vaccine.id}>
                        {vaccine.name} (${vaccine.price.toFixed(2)})
                      </p>
                    ))}
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    {booking.comboList.map((combo) => (
                      <div key={combo.id} className="mb-2">
                        <p className="font-medium">
                          {combo.name} (${combo.finalPrice.toFixed(2)})
                        </p>
                        {combo.vaccineResponeBooking.map((vaccine) => (
                          <p key={vaccine.id} className="text-sm">
                            {vaccine.name} (${vaccine.price.toFixed(2)})
                          </p>
                        ))}
                      </div>
                    ))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <Pagination />

      {showAddModal && (
        <AddBooking
          onBookingAdded={handleBookingAdded}
          onClose={() => setShowAddModal(false)}
        />
      )}
    </div>
  );
};

export default BookingList;