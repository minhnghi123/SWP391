import React, { useState, useEffect } from "react";
import { fetchData } from "../../../Api/axios";

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDataAsync = async () => {
      try {
        setLoading(true);
        const appointmentsRes = await fetchData("appointments"); // Lấy dữ liệu từ API
        setAppointments(appointmentsRes.data);
        setError(null);
      } catch (error) {
        console.error("Error fetching API:", error);
        setError("Failed to fetch patients. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchDataAsync();
  }, []);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const filteredAppointments = appointments.filter((appointments) =>
    appointments.username.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Appointments Management</h1>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition duration-200">
          + Add Appointments
        </button>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by username..."
          value={search}
          onChange={handleSearch}
          className="w-full p-3 rounded-lg border border-gray-300 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {/* Loading & Error Handling */}
      {loading && <p className="text-center text-gray-500">Loading Appointments...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {/* Patients Table */}
      {!loading && !error && (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full table-auto">
            <thead className="bg-gray-100 border-b">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Username</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Date</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Time</th>
              </tr>
            </thead>
            <tbody>
              {filteredAppointments.map((appointments) => (
                <tr key={appointments.id} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-800">{appointments.username}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{appointments.date}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{appointments.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Appointments;
