import { useState, useEffect } from "react";
import useAxios from "../../../utils/useAxios";

const url = import.meta.env.VITE_BASE_URL_DB;

const EditAppointment = ({ appointment, onSave, onCancel }) => {
  const api = useAxios();
  const [editedBooking, setEditedBooking] = useState(null);
  const [availableVaccines, setAvailableVaccines] = useState([]);
  const [availableVaccineCombos, setAvailableVaccineCombos] = useState([]);
  const [selectedChildren, setSelectedChildren] = useState([]);

  // Initialize data when appointment prop changes
  useEffect(() => {
    if (appointment) {
      setEditedBooking({
        ...appointment,
        vaccineList: appointment.vaccineList || [],
        vaccineComboList: appointment.vaccineComboList || []
      });

      setSelectedChildren(
        appointment.childrenList?.map((child) => ({
          ...child,
          age: child.age || 15 // Fallback age if not provided
        })) || []
      );
    }
  }, [appointment]);

  // Fetch vaccines and combos data
  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const [vaccinesRes, vaccineCombosRes] = await Promise.all([
          api.get(`${url}/Vaccine/get-all-vaccines`),
          api.get(`${url}/VaccineCombo/get-all-vaccine-combo`),
        ]);

        if (isMounted) {
          if (vaccinesRes.status === 200 && vaccineCombosRes.status === 200) {
            setAvailableVaccines(vaccinesRes.data);
            setAvailableVaccineCombos(vaccineCombosRes.data);
          } else {
            console.error("API error:", vaccinesRes.status, vaccineCombosRes.status);
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error.response?.data || error.message);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [api]);

  // Handle checkbox changes for vaccines and combos
  const handleCheckboxChange = (listType, itemId, sourceList) => {
    if (!editedBooking) return;

    setEditedBooking((prev) => {
      const currentList = prev[listType] || [];
      const updatedList = currentList.some((item) => item.id === itemId)
        ? currentList.filter((item) => item.id !== itemId)
        : [...currentList, sourceList.find((item) => item.id === itemId)];
      return { ...prev, [listType]: updatedList };
    });
  };

  const handleSaveChanges = () => {
    if (editedBooking) {
      onSave(editedBooking);
    }
  };

  // Check vaccine suitability
  const isVaccineSuitableForAnyChild = (vaccine) => {
    if (!selectedChildren.length) return true;
    return selectedChildren.some((child) => 
      child.age >= (vaccine.suggestAgeMin || 0) && 
      child.age <= (vaccine.suggestAgeMax || Infinity)
    );
  };

  // Check combo suitability
  const isComboSuitableForAnyChild = (combo) => {
    if (!selectedChildren.length) return true;
    return selectedChildren.some((child) =>
      combo.vaccines.every((vaccine) => 
        child.age >= (vaccine.suggestAgeMin || 0) && 
        child.age <= (vaccine.suggestAgeMax || Infinity)
      )
    );
  };

  if (!editedBooking) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-white rounded-lg p-6">Loading...</div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-60">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-indigo-50 to-blue-50 border-b border-gray-200 flex items-center justify-between">
          <h3 className="text-2xl font-semibold text-indigo-800">Edit Vaccination Appointment</h3>
          <button
            onClick={onCancel}
            className="p-1 rounded-full hover:bg-gray-200 transition-colors"
            aria-label="Close"
          >
            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto bg-gray-50 flex flex-col md:flex-row">
          {/* Left Column - Information */}
          <div className="w-full md:w-1/3 p-6 border-r border-gray-200 bg-white overflow-y-auto">
            <div className="mb-6">
              <h4 className="text-xl font-semibold text-gray-800 mb-4 border-b border-gray-200 pb-2">
                Appointment Information
              </h4>
              <div className="space-y-3">
                {editedBooking.id && (
                  <p className="text-gray-700">
                    <span className="font-medium text-gray-500">Booking ID:</span> #{editedBooking.id}
                  </p>
                )}
                {editedBooking.parentName && (
                  <p className="text-gray-700">
                    <span className="font-medium text-gray-500">Parent Name:</span> {editedBooking.parentName}
                  </p>
                )}
                {editedBooking.phoneNumber && (
                  <p className="text-gray-700">
                    <span className="font-medium text-gray-500">Phone Number:</span> {editedBooking.phoneNumber}
                  </p>
                )}
              </div>
            </div>

            <div className="mb-6">
              <h4 className="text-xl font-semibold text-gray-800 mb-4 border-b border-gray-200 pb-2">Children</h4>
              <div className="space-y-3">
                {selectedChildren?.map((child) => (
                  <div
                    key={child.childId}
                    className="p-3 bg-gray-50 rounded-lg border border-gray-200 shadow-sm"
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-gray-800">{child.name}</span>
                      <span className="text-sm px-2 py-1 rounded-full bg-indigo-100 text-indigo-800">
                        {child.gender === 0 ? "Male" : "Female"}
                      </span>
                      <span>Age: {child.age}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Vaccines and Combos */}
          <div className="w-full md:w-2/3 p-6 overflow-y-auto">
            <div className="mb-6">
              <h4 className="text-xl font-semibold text-gray-800 mb-4 border-b border-gray-200 pb-2">Vaccines</h4>
              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                {availableVaccines.map((vaccine) => {
                  const isSuitable = isVaccineSuitableForAnyChild(vaccine);
                  return (
                    <label
                      key={vaccine.id}
                      className={`flex items-center justify-between p-3 mb-2 rounded-lg ${
                        isSuitable ? "hover:bg-indigo-50" : "opacity-50 cursor-not-allowed"
                      }`}
                    >
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          className="h-5 w-5 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500"
                          checked={editedBooking.vaccineList?.some((v) => v.id === vaccine.id) || false}
                          onChange={() => handleCheckboxChange("vaccineList", vaccine.id, availableVaccines)}
                          disabled={!isSuitable}
                        />
                        <span className="ml-3 text-gray-800">
                          {vaccine.name} (Ages {vaccine.suggestAgeMin || 0}-{vaccine.suggestAgeMax || "∞"})
                        </span>
                      </div>
                      <span className="text-indigo-700">{vaccine.price?.toLocaleString() || 0} VND</span>
                    </label>
                  );
                })}
              </div>
            </div>

            <div className="mb-6">
              <h4 className="text-xl font-semibold text-gray-800 mb-4 border-b border-gray-200 pb-2">
                Vaccine Combos
              </h4>
              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                {availableVaccineCombos.map((combo) => {
                  const isSuitable = isComboSuitableForAnyChild(combo);
                  return (
                    <label
                      key={combo.id}
                      className={`flex items-center justify-between p-3 mb-2 rounded-lg ${
                        isSuitable ? "hover:bg-indigo-50" : "opacity-50 cursor-not-allowed"
                      }`}
                    >
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          className="h-5 w-5 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500"
                          checked={editedBooking.vaccineComboList?.some((c) => c.id === combo.id) || false}
                          onChange={() => handleCheckboxChange("vaccineComboList", combo.id, availableVaccineCombos)}
                          disabled={!isSuitable}
                        />
                        <div className="ml-3">
                          <span className="text-gray-800">{combo.comboName}</span>
                          <p className="text-sm text-gray-600">
                            {combo.vaccines?.map((v) => v.name).join(", ") || ""}
                          </p>
                        </div>
                      </div>
                      <span className="text-indigo-700">{combo.finalPrice?.toLocaleString() || 0} VND</span>
                    </label>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 bg-white flex justify-end gap-4">
          <button
            onClick={onCancel}
            className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-all shadow-md"
          >
            Cancel
          </button>
          <button
            onClick={handleSaveChanges}
            className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all shadow-md"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditAppointment;