import React, { useState, useEffect } from "react";
import axios from "axios";
import { Plus, Search, X } from "lucide-react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Booking = () => {
  const [bookings, setBookings] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newBooking, setNewBooking] = useState({
    parentId: 0,
    advisoryDetail: "",
    totalPrice: 0,
    arrivedAt: "",
    paymentId: 0,
    childrenIds: [],
    vaccineIds: [],
    vaccineComboIds: [],
    bookingID: 0,
  });

  useEffect(() => {
    fetchDataAsync();
  }, []);

  const fetchDataAsync = async () => {
    try {
      setLoading(true);
      const response = await axios.get("https://localhost:7280/api/Booking/get-all");
      setBookings(response.data || []);
      setError(null);
    } catch (error) {
      console.error("Error fetching API:", error);
      setError("Failed to fetch bookings. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => setSearch(e.target.value);

  const handleAddBooking = async () => {
    try {
      setLoading(true);
      const response = await axios.post("https://localhost:7280/api/Booking/add-booking", newBooking);
      if (response.status === 200) {
        setBookings((prev) => [...prev, response.data]);
        setIsModalOpen(false);
        resetForm();
        toast.success("Booking added successfully!", { autoClose: 2000 });
      }
    } catch (error) {
      console.error("Error adding booking:", error);
      toast.error("Failed to add booking.", { autoClose: 2000 });
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setNewBooking({
      parentId: 0,
      advisoryDetail: "",
      totalPrice: 0,
      arrivedAt: "",
      paymentId: 0,
      childrenIds: [],
      vaccineIds: [],
      vaccineComboIds: [],
      bookingID: 0,
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewBooking((prev) => ({
      ...prev,
      [name]: name === "parentId" || name === "paymentId" || name === "bookingID" 
        ? parseInt(value) || 0 
        : name === "totalPrice" 
        ? parseFloat(value) || 0 
        : value,
    }));
  };

  const handleArrayInputChange = (e, field) => {
    const { value } = e.target;
    setNewBooking((prev) => ({
      ...prev,
      [field]: value ? value.split(",").map((item) => parseInt(item.trim(), 10)).filter(id => !isNaN(id)) : [],
    }));
  };

  const filteredBookings = bookings.filter(
    (booking) => booking?.advisoryDetails?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold text-gray-800">Booking Management</h1>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors shadow-md"
          >
            <Plus size={18} />
            Add Booking
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search by advisory details..."
            value={search}
            onChange={handleSearch}
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
          />
        </div>

        {/* Loading/Error States */}
        {loading && (
          <div className="text-center py-10">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto"></div>
            <p className="mt-2 text-gray-600">Loading bookings...</p>
          </div>
        )}
        {error && <p className="text-center text-red-600 bg-red-50 p-3 rounded-md">{error}</p>}

        {/* Bookings Table */}
        {!loading && !error && (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-indigo-50">
                  <tr>
                    {["Booking ID", "Parent Name", "Advisory Details", "Created At", "Arrived At", "Status", "Phone", "Email"].map((header) => (
                      <th key={header} className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredBookings.length > 0 ? (
                    filteredBookings.map((booking) => (
                      <tr key={booking.id} className="border-b hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 text-sm text-gray-800">{booking.id}</td>
                        <td className="px-6 py-4 text-sm text-gray-800">{booking.parent?.name || "N/A"}</td>
                        <td className="px-6 py-4 text-sm text-gray-600 max-w-xs truncate">{booking.advisoryDetails}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">{new Date(booking.createdAt).toLocaleString()}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">{new Date(booking.arrivedAt).toLocaleString()}</td>
                        <td className="px-6 py-4 text-sm">
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            booking.status === "Confirmed" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                          }`}>
                            {booking.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-800">{booking.parent?.phoneNumber || "N/A"}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">{booking.parent?.gmail || "N/A"}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="8" className="px-6 py-4 text-center text-gray-500">
                        No bookings found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Add Booking Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 relative">
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
              <h2 className="text-xl font-semibold text-gray-800 mb-6">Add New Booking</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { label: "Parent ID", name: "parentId", type: "number" },
                  { label: "Advisory Detail", name: "advisoryDetail", type: "text" },
                  { label: "Total Price", name: "totalPrice", type: "number" },
                  { label: "Arrived At", name: "arrivedAt", type: "datetime-local" },
                  { label: "Payment ID", name: "paymentId", type: "number" },
                  { label: "Children IDs (comma separated)", name: "childrenIds", type: "text", array: true },
                  { label: "Vaccine IDs (comma separated)", name: "vaccineIds", type: "text", array: true },
                  { label: "Vaccine Combo IDs (comma separated)", name: "vaccineComboIds", type: "text", array: true },
                  { label: "Booking ID", name: "bookingID", type: "number" },
                ].map((field) => (
                  <div key={field.name}>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{field.label}</label>
                    <input
                      type={field.type}
                      name={field.name}
                      value={field.array ? newBooking[field.name].join(",") : newBooking[field.name]}
                      onChange={field.array ? (e) => handleArrayInputChange(e, field.name) : handleInputChange}
                      className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                      disabled={loading}
                    />
                  </div>
                ))}
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                  disabled={loading}
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddBooking}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:bg-indigo-400"
                  disabled={loading}
                >
                  {loading ? "Adding..." : "Add Booking"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Booking;