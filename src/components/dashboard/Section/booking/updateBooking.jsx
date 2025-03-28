import React, { useState, useEffect, useMemo } from "react";
import useAxios from "../../../../utils/useAxios";
import { X, Save, User, Users, Syringe, Package, SquarePen } from "lucide-react";
import { toast } from "react-toastify";

const url = import.meta.env.VITE_BASE_URL_DB;

const UpdateBooking = ({ isModalOpen, setIsModalOpen, onSave, selectedBooking, onClose, loading }) => {
  const api = useAxios();
  const [formData, setFormData] = useState({
    bookingId: 0,
    parentId: "",
    parentName: "",
    phoneNumber: "",
    amount: 0,
    paymentMethod: "",
    status: "",
    vaccineList: [],
    comboList: [],
    childrenList: [],
  });
  const [availableVaccines, setAvailableVaccines] = useState([]);
  const [availableVaccineCombos, setAvailableVaccineCombos] = useState([]);
  const [error, setError] = useState(null);

  // Pre-fill form with selected booking data
  useEffect(() => {
    if (selectedBooking) {
      console.log("Selected Booking:", JSON.stringify(selectedBooking, null, 2));
      setFormData({
        bookingId: selectedBooking.id || 0,
        parentId: selectedBooking.parentId || "",
        parentName: selectedBooking.parentName || "",
        phoneNumber: selectedBooking.phoneNumber || "",
        amount: selectedBooking.amount || 0,
        paymentMethod: selectedBooking.paymentMethod || "",
        status: selectedBooking.status || "",
        vaccineList: (selectedBooking.vaccineList || []).map(vaccine => vaccine.id),
        comboList: (selectedBooking.comboList || []).map(combo => combo.id),
        childrenList: selectedBooking.childrenList || [],
      });
    }
  }, [selectedBooking]);

  // Fetch available vaccines and combos
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [vaccinesRes, combosRes] = await Promise.all([
          api.get(`${url}/Vaccine/get-all-vaccines`),
          api.get(`${url}/VaccineCombo/get-all-vaccine-combo`),
        ]);
        setAvailableVaccines(vaccinesRes.data || []);
        setAvailableVaccineCombos(combosRes.data || []);
      } catch (error) {
        setError("Failed to fetch vaccines or combos: " + error.message);
      }
    };
    fetchData();
  }, [api]);

  // Calculate total amount
  const totalAmount = useMemo(() => {
    const vaccineTotal = formData.vaccineList.reduce((total, vaccineId) => {
      const vaccine = availableVaccines.find(v => v.id === vaccineId);
      return total + (vaccine ? vaccine.price || 0 : 0);
    }, 0);

    const comboTotal = formData.comboList.reduce((total, comboId) => {
      const combo = availableVaccineCombos.find(c => c.id === comboId);
      return total + (combo ? combo.finalPrice || 0 : 0);
    }, 0);

    return vaccineTotal + comboTotal;
  }, [formData.vaccineList, formData.comboList, availableVaccines, availableVaccineCombos]);

  // Handle checkbox changes
  const handleCheckboxChange = (listType, itemId) => {
    setFormData(prev => {
      const currentList = prev[listType] || [];
      const updatedList = currentList.includes(itemId)
        ? currentList.filter(id => id !== itemId)
        : [...currentList, itemId];
      return { ...prev, [listType]: updatedList };
    });
  };

  // Check vaccine suitability
  const isVaccineSuitableForAnyChild = (vaccine) => {
    const minAge = vaccine.suggestAgeMin || 0;
    const maxAge = vaccine.suggestAgeMax || Infinity;
    return !formData.childrenList?.length || formData.childrenList.some(child => child.age >= minAge && child.age <= maxAge);
  };

  // Check combo suitability
  const isComboSuitableForAnyChild = (combo) => {
    const minAge = Math.max(...(combo.vaccines?.map(v => v.suggestAgeMin || 0) || [0]));
    const maxAge = Math.min(...(combo.vaccines?.map(v => v.suggestAgeMax || Infinity) || [Infinity]));
    return !formData.childrenList?.length || formData.childrenList.some(child => child.age >= minAge && child.age <= maxAge);
  };

  // Check for changes
  const hasChanges = useMemo(() => {
    if (!selectedBooking) return false;
    return (
      JSON.stringify(formData.vaccineList) !== JSON.stringify((selectedBooking.vaccineList || []).map(v => v.id)) ||
      JSON.stringify(formData.comboList) !== JSON.stringify((selectedBooking.comboList || []).map(c => c.id)) ||
      totalAmount !== selectedBooking.amount
    );
  }, [formData.vaccineList, formData.comboList, totalAmount, selectedBooking]);

  // Handle save
  const handleSaveChanges = () => {
    if (hasChanges) {
      const payload = {
        bookingId: formData.bookingId.toString(), // Ensure bookingId is a string if backend expects it
        vaccinesList: formData.vaccineList, // Send IDs directly
        vaccinesCombo: formData.comboList, // Send IDs directly
        amount: totalAmount, // Include calculated amount
      };
      console.log("Payload to save:", JSON.stringify(payload, null, 2));
      onSave(payload);
    } else {
      toast.info("No changes detected.");
    }
  };

  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-gradient-to-r from-teal-500 to-teal-600 p-6 rounded-t-2xl flex items-center justify-between z-10">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <SquarePen className="w-6 h-6" /> Update Booking
          </h2>
          <button onClick={onClose} className="p-2 bg-white/20 rounded-full hover:bg-white/30">
            <X size={20} className="text-white" />
          </button>
        </div>
        <div className="p-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-1/3 space-y-6">
              <div className="border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md">
                <h3 className="text-lg font-semibold flex items-center gap-2 text-teal-600 mb-3">
                  <User className="w-5 h-5" /> Appointment Information
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between"><span>Booking ID:</span><span>#{formData.bookingId}</span></div>
                  <div className="flex justify-between"><span>Parent Name:</span><span>{formData.parentName}</span></div>
                  <div className="flex justify-between"><span>Phone:</span><span>{formData.phoneNumber}</span></div>
                  <div className="flex justify-between"><span>Amount:</span><span>{totalAmount.toLocaleString()} VND</span></div>
                  <div className="flex justify-between"><span>Payment Method:</span><span>{formData.paymentMethod}</span></div>
                  <div className="flex justify-between"><span>Status:</span><span className={`px-2 py-1 rounded-full ${formData.status?.toLowerCase() === "success" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}`}>{formData.status}</span></div>
                </div>
              </div>
              <div className="border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md">
                <h3 className="text-lg font-semibold flex items-center gap-2 text-teal-600 mb-3">
                  <Users className="w-5 h-5" /> Children
                </h3>
                {formData.childrenList?.map(child => (
                  <div key={child.childId} className="p-3 bg-gray-50 rounded-lg border">
                    <div className="flex justify-between">
                      <span>{child.name}</span>
                      <div><span className="px-2 py-1 text-xs rounded-full bg-teal-100">{child.gender === 0 ? "Male" : "Female"}</span> <span className="px-2 py-1 text-xs rounded-full border">Age: {child.age}</span></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="w-full md:w-2/3 max-h-[60vh] overflow-y-auto pr-4">
              <div className="space-y-6">
                <div className="border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md">
                  <h3 className="text-lg font-semibold flex items-center gap-2 text-teal-600 mb-3">
                    <Syringe className="w-5 h-5" /> Vaccines
                  </h3>
                  {availableVaccines.map(vaccine => {
                    const isSuitable = isVaccineSuitableForAnyChild(vaccine);
                    return (
                      <div key={vaccine.id} className={`flex items-center justify-between p-3 rounded-lg border ${isSuitable ? "hover:bg-teal-50" : "opacity-50"}`}>
                        <div className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            id={`vaccine-${vaccine.id}`}
                            checked={formData.vaccineList.includes(vaccine.id)}
                            onChange={() => handleCheckboxChange("vaccineList", vaccine.id)}
                            disabled={!isSuitable}
                            className="w-4 h-4 text-teal-600"
                          />
                          <label htmlFor={`vaccine-${vaccine.id}`} className="text-sm">
                            <p>{vaccine.name}</p>
                            <p className="text-xs">Ages {vaccine.suggestAgeMin || 0}-{vaccine.suggestAgeMax || "∞"}</p>
                          </label>
                        </div>
                        <span>{vaccine.price?.toLocaleString() || 0} VND</span>
                      </div>
                    );
                  })}
                </div>
                <div className="border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md">
                  <h3 className="text-lg font-semibold flex items-center gap-2 text-teal-600 mb-3">
                    <Package className="w-5 h-5" /> Vaccine Combos
                  </h3>
                  {availableVaccineCombos.map(combo => {
                    const isSuitable = isComboSuitableForAnyChild(combo);
                    return (
                      <div key={combo.id} className={`flex items-center justify-between p-3 rounded-lg border ${isSuitable ? "hover:bg-teal-50" : "opacity-50"}`}>
                        <div className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            id={`combo-${combo.id}`}
                            checked={formData.comboList.includes(combo.id)}
                            onChange={() => handleCheckboxChange("comboList", combo.id)}
                            disabled={!isSuitable}
                            className="w-4 h-4 text-teal-600"
                          />
                          <label htmlFor={`combo-${combo.id}`} className="text-sm">
                            <p>{combo.comboName}</p>
                            <p className="text-xs">{combo.vaccines?.map(v => v.name).join(", ") || "N/A"}</p>
                          </label>
                        </div>
                        <span>{combo.finalPrice?.toLocaleString() || 0} VND</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
          {error && <p className="text-red-500 mt-4">{error}</p>}
          <div className="flex justify-end gap-3 mt-8">
            <button onClick={onClose} className="px-6 py-2.5 bg-gray-200 rounded-lg">Cancel</button>
            <button
              onClick={handleSaveChanges}
              className="px-6 py-2.5 bg-teal-500 text-white rounded-lg disabled:bg-gray-400"
              disabled={!hasChanges || loading}
            >
              {loading ? "Saving..." : hasChanges ? "Save Changes" : "No Changes"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateBooking;