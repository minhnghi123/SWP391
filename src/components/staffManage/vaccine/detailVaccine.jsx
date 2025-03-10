import React from "react";
import { X, Refrigerator, Pill, Calendar } from "lucide-react";

const DetailVaccine = ({ vaccine, isOpen, onClose }) => {
  if (!isOpen || !vaccine) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white p-6 border-b border-gray-100 flex items-center justify-between z-10">
          <h2 className="text-xl font-bold text-gray-900">Vaccine Details</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={20} className="text-gray-500" />
          </button>
        </div>
        <div className="p-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-full bg-teal-50 flex items-center justify-center">
              <Refrigerator className="w-8 h-8 text-teal-600" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900">{vaccine.name}</h3>
              <p className="text-sm text-gray-500">{vaccine.description}</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-gray-50 p-4 rounded-xl">
              <h4 className="text-sm font-semibold text-gray-500 mb-3">
                Inventory Information
              </h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Pill className="w-4 h-4" />
                    <span>Quantity</span>
                  </div>
                  <span className="font-medium text-teal-600">{vaccine.quantity}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Pill className="w-4 h-4" />
                    <span>Does Times</span>
                  </div>
                  <span className="font-medium text-teal-600">{vaccine.doesTimes}</span>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 p-4 rounded-xl">
              <h4 className="text-sm font-semibold text-gray-500 mb-3">
                Vaccine Details
              </h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <span>Entry Date</span>
                  </div>
                  <span className="font-medium">
                    {vaccine.entryDate
                      ? new Date(vaccine.entryDate).toLocaleDateString()
                      : "N/A"}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <span>Expiry Date</span>
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h4 className="text-sm font-semibold text-gray-500 mb-3">
                Administration Details
              </h4>
              <div className="space-y-3">
                <div>
                  <span className="text-sm text-gray-500">Price:</span>
                  <p className="font-medium text-gray-900">
                    VND {vaccine.price?.toLocaleString()} per dose
                  </p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Age Range:</span>
                  <p className="font-medium text-gray-900">
                    {vaccine.suggestAgeMin} - {vaccine.suggestAgeMax}
                  </p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Country of Origin:</span>
                  <p className="font-medium text-gray-900">{vaccine.fromCountry}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Interval Age:</span>
                  <p className="font-medium text-gray-900">
                    {vaccine.minimumIntervalDate} To {vaccine.maximumIntervalDate}
                  </p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Address ID:</span>
                  <p className="font-medium text-gray-900">{vaccine.addressId}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Status:</span>
                  <p className="font-medium text-gray-900">{vaccine.status}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-8">
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailVaccine;