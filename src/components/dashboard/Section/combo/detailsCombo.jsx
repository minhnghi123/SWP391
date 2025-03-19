import React, { useState, useEffect } from "react";
import { X, Refrigerator } from "lucide-react";
import useAxios from "../../../../utils/useAxios";
const url = import.meta.env.VITE_BASE_URL_DB;

const DetailCombo = ({ vaccineId, isOpen, onClose }) => {
  const [comboDetails, setComboDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const api = useAxios();

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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl">
        <div className="sticky top-0 bg-white p-4 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-900">Combo Vaccine Details</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Close"
          >
            <X size={16} className="text-gray-500" />
          </button>
        </div>
        <div className="p-4 grid grid-cols-12 gap-4">
          {loading ? (
            <div className="col-span-12 text-center">
              <p className="text-gray-500">Loading combo details...</p>
            </div>
          ) : error ? (
            <div className="col-span-12 text-center">
              <p className="text-red-500">{error}</p>
            </div>
          ) : comboDetails ? (
            <>
              {/* Header Section */}
              <div className="col-span-12 flex items-center gap-3 mb-2">
                <div className="w-12 h-12 rounded-full bg-teal-50 flex items-center justify-center">
                  <Refrigerator className="w-6 h-6 text-teal-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{comboName}</h3>
                  <div className="flex gap-2 items-center">
                  </div>
                </div>
              </div>

              {/* Pricing and Vaccines */}
              <div className="col-span-12 grid grid-cols-12 gap-4">
                {/* Pricing Details */}
                <div className="col-span-4 bg-gray-50 p-3 rounded-xl">
                  <h4 className="text-xs font-semibold text-gray-500 mb-2">Pricing Details</h4>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="text-gray-500">Total Price:</span>
                      <p className="font-medium text-gray-900">
                        VND {totalPrice.toLocaleString("vi-VN")}
                      </p>
                    </div>
                    <div>
                      <span className="text-gray-500">Discount:</span>
                      <p className="font-medium text-gray-900">{discount}%</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Final Price:</span>
                      <p className="font-medium text-gray-900">
                        VND {finalPrice.toLocaleString("vi-VN")}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Vaccines List */}
                <div className="col-span-8 bg-gray-50 p-3 rounded-xl">
                  <h4 className="text-xs font-semibold text-gray-500 mb-2">Included Vaccines</h4>
                  {vaccines.length > 0 ? (
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      {vaccines.map((vaccineItem) => (
                        <div
                          key={vaccineItem.id}
                          className="p-2 bg-white rounded-lg border border-gray-200"
                        >
                          <h5 className="text-sm font-medium text-gray-900 mb-1">
                            {vaccineItem.name || "Unnamed Vaccine"}
                          </h5>
                          <div className="text-gray-600">
                            <p>ID: {vaccineItem.id || "N/A"}</p>
                            <p>Price: VND {vaccineItem.price?.toLocaleString("vi-VN") || "0"}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-sm">No vaccines included in this combo.</p>
                  )}
                </div>
              </div>

              {/* Footer */}
              <div className="col-span-12 flex justify-end mt-2">
                <button
                  onClick={onClose}
                  className="px-4 py-1 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors text-sm"
                >
                  Close
                </button>
              </div>
            </>
          ) : (
            <div className="col-span-12 text-center">
              <p className="text-gray-500">No data available.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DetailCombo;