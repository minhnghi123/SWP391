import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import useAxios from "../../../utils/useAxios";
const url = import.meta.env.VITE_BASE_URL_DB;

const DetailUser = ({ parentId, isOpen, onClose }) => {
  const [children, setChildren] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const api = useAxios();

  // Fetch children details when modal opens
  useEffect(() => {
    if (!isOpen || !parentId) return;

    const fetchChildren = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await api.get(
          `${url}/Child/get-child-by-parents-id/${parentId}`
        );
        // Nếu API trả về object đơn thì convert sang array
        const data = Array.isArray(response.data) ? response.data : [response.data];
        setChildren(data);
      } catch (err) {
        setError("Failed to fetch children details. Please try again later.");
        console.error("Error fetching children details:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchChildren();
  }, [isOpen, parentId]);

  if (!isOpen || !parentId) return null;

  // Hàm chuyển đổi gender number thành text
  const getGenderText = (gender) => {
    switch (gender) {
      case 1:
        return "Male";
      case 2:
        return "Female";
      case 3:
        return "Other";
      default:
        return "N/A";
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white p-6 border-b border-gray-100 flex items-center justify-between z-10">
          <h2 className="text-xl font-bold text-gray-900">Children Details</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Close"
          >
            <X size={20} className="text-gray-500" />
          </button>
        </div>
        <div className="p-6">
          {loading ? (
            <p className="text-gray-500 text-center">Loading children details...</p>
          ) : error ? (
            <p className="text-red-500 text-center">{error}</p>
          ) : children.length > 0 ? (
            <div className="space-y-6">
              {children.map((child) => (
                <div
                  key={child.id}
                  className="p-4 bg-gray-50 rounded-lg border border-gray-200"
                >
                  <h3 className="text-lg font-medium text-gray-900 mb-3">
                    {child.name || "Unnamed Child"}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">Date of Birth:</span>
                      <p className="font-medium text-gray-900">
                        {new Date(child.dateOfBirth).toLocaleDateString("vi-VN") || "N/A"}
                      </p>
                    </div>
                    <div>
                      <span className="text-gray-500">Gender:</span>
                      <p className="font-medium text-gray-900">
                        {getGenderText(child.gender)}
                      </p>
                    </div>
                    <div>
                      <span className="text-gray-500">ID:</span>
                      <p className="font-medium text-gray-900">{child.id || "N/A"}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center">No children found for this parent.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DetailUser;