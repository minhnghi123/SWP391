import React, { useState, useEffect } from "react";
import { X, Refrigerator, Pill, Calendar } from "lucide-react";
import useAxios from "../../../../utils/useAxios";

const url = import.meta.env.VITE_BASE_URL_DB;
const VaccineDetails = ({ id, isOpen, onClose }) => {
  const [vaccine, setVaccine] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const api = useAxios();

  useEffect(() => {
    if (!isOpen || !id) return;

    const fetchVaccine = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await api.get(`${url}/Vaccine/get-vaccine-by-id/${id}`);
        if (response.status === 200) {
          setVaccine(response.data);
        }
      } catch (err) {
        setError(err.message);
        console.error("Error fetching vaccine:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchVaccine();
  }, [id, isOpen]);

  if (!isOpen || !id) return null;

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-4">
          <p className="text-gray-600">Loading vaccine details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-4">
          <p className="text-red-600">Error: {error}</p>
          <button
            onClick={onClose}
            className="mt-2 px-4 py-1 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  if (!vaccine) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-20 flex items-center justify-center z-50 p-2">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl">
        <div className="sticky top-0 bg-white p-4 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-900">Vaccine Details</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={16} className="text-gray-500" />
          </button>
        </div>
        <div className="p-4 grid grid-cols-12 gap-4">
          {/* Header Section */}
          <div className="col-span-12 flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-full bg-teal-50 flex items-center justify-center">
              <Refrigerator className="w-6 h-6 text-teal-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">{vaccine.name}</h3>
          </div>

          {/* Left Column - Inventory and Dates */}
          <div className="col-span-4 space-y-4">
            <div className="bg-gray-50 p-3 rounded-xl">
              <h4 className="text-xs font-semibold text-gray-500 mb-2">
                Inventory Information
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-gray-600">
                    <Pill className="w-3 h-3" />
                    Quantity
                  </div>
                  <span className="font-medium text-teal-600">
                    {vaccine.quantity || 0}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-gray-600">
                    <Pill className="w-3 h-3" />
                    Dose Times
                  </div>
                  <span className="font-medium text-teal-600">
                    {vaccine.doesTimes || 0}
                  </span>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 p-3 rounded-xl">
              <h4 className="text-xs font-semibold text-gray-500 mb-2">
                Vaccine Dates
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-gray-600">
                    <Calendar className="w-3 h-3" />
                    Entry Date
                  </div>
                  <span className="font-medium">
                    {vaccine.entryDate
                      ? new Date(vaccine.entryDate).toLocaleDateString()
                      : "N/A"}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-gray-600">
                    <Calendar className="w-3 h-3" />
                    Expiry Date
                  </div>
                  <span className="font-medium">
                    {vaccine.timeExpired
                      ? new Date(vaccine.timeExpired).toLocaleDateString()
                      : "N/A"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Vaccine Details */}
          <div className="col-span-8">
            <div className="bg-gray-50 p-3 rounded-xl h-full">
              <h4 className="text-xs font-semibold text-gray-500 mb-2">
                Vaccine Details
              </h4>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <span className="text-gray-500">Description:</span>
                  <p className="font-medium text-gray-900">
                    {vaccine.description || "No description available"}
                  </p>
                </div>
                <div>
                  <span className="text-gray-500">Price:</span>
                  <p className="font-medium text-gray-900">
                    {vaccine.price
                      ? `$${vaccine.price.toLocaleString()}`
                      : "N/A"}{" "}
                    per dose
                  </p>
                </div>
                <div>
                  <span className="text-gray-500">Age Range:</span>
                  <p className="font-medium text-gray-900">
                    {vaccine.suggestAgeMin || vaccine.suggestAgeMax
                      ? `${vaccine.suggestAgeMin || 0} - ${
                          vaccine.suggestAgeMax || "N/A"
                        }`
                      : "Not specified"}
                  </p>
                </div>
                <div>
                  <span className="text-gray-500">Country of Origin:</span>
                  <p className="font-medium text-gray-900">
                    {vaccine.fromCountry || "Not specified"}
                  </p>
                </div>
                <div>
                  <span className="text-gray-500">Dose Interval:</span>
                  <p className="font-medium text-gray-900">
                    {vaccine.minimumIntervalDate || vaccine.maximumIntervalDate
                      ? `${vaccine.minimumIntervalDate || 0} to ${
                          vaccine.maximumIntervalDate || "N/A"
                        } days`
                      : "Not specified"}
                  </p>
                </div>
                <div>
                  <span className="text-gray-500">Address ID:</span>
                  <p className="font-medium text-gray-900">
                    {vaccine.addressId || "N/A"}
                  </p>
                </div>
                <div>
                  <span className="text-gray-500">Status:</span>
                  <p className="font-medium text-gray-900">
                    {vaccine.status || "N/A"}
                  </p>
                </div>
              </div>
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
        </div>
      </div>
    </div>
  );
};

export default VaccineDetails;