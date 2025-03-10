import React, { useState, useEffect } from "react";
import axios from "axios";

const VaccinesTracking = () => {
  const [trackingData, setTrackingData] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDataAsync = async () => {
      try {
        setLoading(true);
        const response = await axios.get("https://localhost:7280/api/VaccinesTracking");
        setTrackingData(response.data || []);
        setError(null);
      } catch (error) {
        console.error("Error fetching API:", error);
        setError("Failed to fetch vaccines tracking data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchDataAsync();
  }, []);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const filteredTracking = trackingData.filter(
    (item) => item.vaccineName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Vaccines Tracking Management</h1>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition duration-200">
          + Add Vaccine Tracking
        </button>
      </div>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by vaccine name..."
          value={search}
          onChange={handleSearch}
          className="w-full p-3 rounded-lg border border-gray-300 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {loading && <p className="text-center text-gray-500">Loading vaccines tracking data...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {!loading && !error && (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full table-auto">
            <thead className="bg-gray-100 border-b">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Tracking ID</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Vaccine Name</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">User Name</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Vaccination Date</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Min Interval Date</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Max Interval Date</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Status</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Doctor</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Reaction</th>
              </tr>
            </thead>
            <tbody>
              {filteredTracking.length > 0 ? (
                filteredTracking.map((item) => (
                  <tr key={item.trackingID} className="border-b hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-800">{item.trackingID}</td>
                    <td className="px-6 py-4 text-sm text-gray-800">{item.vaccineName}</td>
                    <td className="px-6 py-4 text-sm text-gray-800">{item.userName}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{new Date(item.vaccinationDate).toLocaleDateString()}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{new Date(item.minimumIntervalDate).toLocaleDateString()}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{new Date(item.maximumIntervalDate).toLocaleDateString()}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{item.status}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{item.administeredByDoctorName}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{item.reaction}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9" className="px-6 py-4 text-center text-gray-500">
                    No tracking data found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default VaccinesTracking;
