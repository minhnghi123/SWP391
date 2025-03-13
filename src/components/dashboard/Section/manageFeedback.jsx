import React, { useState, useEffect } from "react";
import axios from "axios";

const Feedback = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDataAsync = async () => {
      try {
        setLoading(true);
        const feedbackRes = await axios.get("https://localhost:7280/api/Feedback/get-all-feedback-admin");
        setFeedbacks(feedbackRes.data);
        setError(null);
      } catch (error) {
        console.error("Error fetching API:", error);
        setError("Failed to fetch feedback. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchDataAsync();
  }, []);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const filteredFeedbacks = feedbacks.filter((feedback) =>
    feedback.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Feedback Management</h1>
      </div>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by description..."
          value={search}
          onChange={handleSearch}
          className="w-full p-3 rounded-lg border border-gray-300 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {loading && <p className="text-center text-gray-500">Loading feedback...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {!loading && !error && (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full table-auto">
            <thead className="bg-gray-100 border-b">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">User ID</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Rating Score</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Description</th>
              </tr>
            </thead>
            <tbody>
              {filteredFeedbacks.length > 0 ? (
                filteredFeedbacks.map((feedback) => (
                  <tr key={feedback.userId} className="border-b hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-800">{feedback.userId}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{feedback.ratingScore} ⭐</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{feedback.description}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="px-6 py-4 text-center text-gray-500">
                    No feedback found.
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

export default Feedback;