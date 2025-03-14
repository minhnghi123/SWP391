import React, { useState, useEffect } from "react";
import axios from "axios";
import { X, Refrigerator } from "lucide-react";
import useAxios from "../../../utils/useAxios";
const url = import.meta.env.VITE_BASE_URL_DB;


const DetailCombo = ({ vaccineId, isOpen, onClose }) => {
  const [comboDetails, setComboDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const api = useAxios();

  // Fetch combo details when modal opens
  useEffect(() => {
    if (!isOpen || !vaccineId) return;

    const fetchComboDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await api.get(
          `${url}/VaccineCombo/get-vaccine-combo-detail/${vaccineId}`
        );
        setComboDetails(response.data);
      } catch (err) {
        setError("Failed to fetch combo details. Please try again later.");
        console.error("Error fetching combo details:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchComboDetails();
  }, [isOpen, vaccineId]);

  if (!isOpen || !vaccineId) return null;

  // Destructure comboDetails with defaults if data isn’t loaded yet
  const {
    id = "N/A",
    comboName = "Unnamed Combo",
    discount = 0,
    totalPrice = 0,
    finalPrice = 0,
    status = "N/A",
    vaccines = [],
  } = comboDetails || {};

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white p-6 border-b border-gray-100 flex items-center justify-between z-10">
          <h2 className="text-xl font-bold text-gray-900">Combo Vaccine Details</h2>
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
            <p className="text-gray-500 text-center">Loading combo details...</p>
          ) : error ? (
            <p className="text-red-500 text-center">{error}</p>
          ) : comboDetails ? (
            <>
              {/* Combo Info */}
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-full bg-teal-50 flex items-center justify-center">
                  <Refrigerator className="w-8 h-8 text-teal-600" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">{comboName}</h3>
                  <p className="text-sm text-gray-500">ID: {id}</p>
                  <span
                    className={`inline-block mt-2 px-2 py-1 text-xs font-medium rounded-full ${
                      status === "AVAILABLE"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {status}
                  </span>
                </div>
              </div>

              {/* Pricing Details */}
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-gray-500 mb-3">Pricing Details</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <span className="text-sm text-gray-500">Total Price:</span>
                    <p className="font-medium text-gray-900">
                      VND {totalPrice.toLocaleString("vi-VN")}
                    </p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Discount:</span>
                    <p className="font-medium text-gray-900">{discount}%</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Final Price:</span>
                    <p className="font-medium text-gray-900">
                      VND {finalPrice.toLocaleString("vi-VN")}
                    </p>
                  </div>
                </div>
              </div>

              {/* Vaccines List */}
              {vaccines.length > 0 ? (
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-gray-500 mb-3">Included Vaccines</h4>
                  <div className="space-y-4">
                    {vaccines.map((vaccineItem) => (
                      <div
                        key={vaccineItem.id}
                        className="p-4 bg-gray-50 rounded-lg border border-gray-200"
                      >
                        <div className="flex justify-between items-center mb-2">
                          <h5 className="text-lg font-medium text-gray-900">
                            {vaccineItem.name || "Unnamed Vaccine"}
                          </h5>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
                          <p>ID: {vaccineItem.id || "N/A"}</p>
                          <p>Price: VND {vaccineItem.price?.toLocaleString("vi-VN") || "0"}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <p className="text-gray-500">No vaccines included in this combo.</p>
              )}
            </>
          ) : (
            <p className="text-gray-500 text-center">No data available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DetailCombo;