import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import {
  Search,
  ArrowUpDown,
  ArchiveRestore,
  Trash2,
  MessageSquare,
} from "lucide-react";
import Pagination from "../../../../utils/pagination";
import useAxios from "../../../../utils/useAxios";

const url = import.meta.env.VITE_BASE_URL_DB;

const Feedback = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("description"); // Mặc định sắp xếp theo mô tả
  const [sortOrder, setSortOrder] = useState("asc"); // Mặc định tăng dần
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const api = useAxios();

  useEffect(() => {
    const fetchDataAsync = async () => {
      try {
        setLoading(true);
        const feedbackRes = await api.get(
          `${url}/Feedback/get-all-feedback-admin`
        );
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

  const handleSoftDelete = async (id) => {
    try {
      const rs = await api.patch(`${url}/Feedback/soft-delete-feedback/${id}`);
      if (rs.status === 200) {
        setFeedbacks(
          feedbacks.map((feedback) =>
            feedback.id === id ? { ...feedback, isDeleted: true } : feedback
          )
        );
        toast.success("Delete Feedback successfully");
      } else {
        toast.error("Delete Feedback failed");
      }
    } catch (error) {
      console.error("Error deleting feedback:", error);
      toast.error("An error occurred while deleting feedback");
    }
  };

  const handleRestore = async (id) => {
    try {
      const rs = await api.patch(`${url}/Feedback/restore-feedback/${id}`);
      if (rs.status === 200) {
        setFeedbacks(
          feedbacks.map((feedback) =>
            feedback.id === id ? { ...feedback, isDeleted: false } : feedback
          )
        );
        toast.success("Restore Feedback successfully");
      } else {
        toast.error("Restore Feedback failed");
      }
    } catch (error) {
      console.error("Error restoring feedback:", error);
      toast.error("An error occurred while restoring feedback");
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const filteredFeedbacks = feedbacks.filter((feedback) =>
    (feedback.description?.toLowerCase() || "").includes(
      searchTerm.toLowerCase()
    )
  );

  const sortedFeedbacks = [...filteredFeedbacks].sort((a, b) => {
    const valueA =
      sortBy === "ratingScore" ? a[sortBy] : (a[sortBy] || "").toLowerCase();
    const valueB =
      sortBy === "ratingScore" ? b[sortBy] : (b[sortBy] || "").toLowerCase();
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
  const currentItems = sortedFeedbacks.slice(indexOfFirstItem, indexOfLastItem);

  const formatStatus = (isDeleted) => {
    return isDeleted ? "Deleted" : "Not Deleted";
  };

  return (
    <>
      <ToastContainer position="bottom-right" />
      <div className="bg-white p-6 rounded-2xl shadow-xl shadow-teal-500/5 border border-gray-100">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
          <h1 className="text-2xl font-bold text-gray-900">
            Feedback Management
          </h1>
        </div>

        <div className="flex grid-cols-1 md:grid-cols-3 gap-4 mb-6 justify-between">
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Search feedback by description..."
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
              <option value="ratingScore-asc">Rating (Low to High)</option>
              <option value="ratingScore-desc">Rating (High to Low)</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          {loading ? (
            <p className="text-gray-500 text-center">Loading feedback...</p>
          ) : error ? (
            <p className="text-red-500 text-center">{error}</p>
          ) : (
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                    User ID
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                    Rating Score
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                    Description
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentItems.length > 0 ? (
                  currentItems.map((feedback) => (
                    <tr
                      key={feedback.id}
                      className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-4 py-4 text-sm text-gray-600">
                        {feedback.userId}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-600">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-teal-50 flex items-center justify-center">
                            <MessageSquare className="w-5 h-5 text-blue-600" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">
                              {feedback.ratingScore} ⭐
                            </p>
                          </div>
                        </div>
                      </td>
                      <td
                        className="px-4 py-4 text-sm text-gray-600 max-w-[300px] overflow-hidden whitespace-nowrap text-ellipsis"
                        title={feedback.description}
                      >
                        {feedback.description}
                      </td>

                      <td className="px-4 py-4">
                        <span
                          className={`inline-block px-2 py-1 text-sm font-medium rounded-full ${
                            feedback.isDeleted
                              ? "bg-red-100 text-red-800"
                              : "bg-green-100 text-green-800"
                          }`}
                        >
                          {formatStatus(feedback.isDeleted)}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleSoftDelete(feedback.id)}
                            className="p-1.5 bg-red-50 text-red-600 rounded-md hover:bg-red-100 transition-colors"
                            title="Delete feedback"
                          >
                            <Trash2 size={16} />
                          </button>
                          <button
                            onClick={() => handleRestore(feedback.id)}
                            className="p-1.5 bg-green-50 text-blue-600 rounded-md hover:bg-green-100 transition-colors"
                            title="Restore feedback"
                          >
                            <ArchiveRestore size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="5"
                      className="px-4 py-8 text-center text-gray-500"
                    >
                      No feedback found matching your search criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(sortedFeedbacks.length / itemsPerPage)}
          itemsPerPage={itemsPerPage}
          setCurrentPage={setCurrentPage}
          setItemsPerPage={setItemsPerPage}
          totalItems={sortedFeedbacks.length}
        />
      </div>
    </>
  );
};

export default Feedback;
