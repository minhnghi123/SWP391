import React, { useState, useEffect, useLayoutEffect } from "react";
import { Plus, User, Baby, Syringe, Calendar } from "lucide-react";
import { toast } from "react-toastify";
import useAxios from "../../../../utils/useAxios";
import CalculateAge from "../../../../utils/calculateYearOld";

const url = import.meta.env.VITE_BASE_URL_DB;

const CreateBookingByStaff = ({ isModalOpen, setIsModalOpen, setTrigger }) => {
  const api = useAxios();
  const [users, setUsers] = useState([]);
  const [children, setChildren] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedUser, setSelectedUser] = useState(null);
  const [availableVaccines, setAvailableVaccines] = useState([]);
  const [availableVaccineCombos, setAvailableVaccineCombos] = useState([]);
  const [selectedVaccines, setSelectedVaccines] = useState([]);
  const [selectedCombos, setSelectedCombos] = useState([]);
  const [selectedChildren, setSelectedChildren] = useState([]);
  const [advisory, setAdvisory] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [filteredChildren, setFilteredChildren] = useState([]);
  const [error, setError] = useState(null);

  // Fetch users on modal open
  useEffect(() => {
    if (isModalOpen) {
      const fetchUsers = async () => {
        setIsLoading(true);
        try {
          const res = await api.get(`${url}/User/get-all-user-admin`);
          if (res.status === 200) {
            setUsers(res.data);
            setFilteredUsers(res.data);
          }
        } catch (error) {
          console.error("Error fetching users:", error);
          setError("Failed to fetch users.");
        } finally {
          setIsLoading(false);
        }
      };
      fetchUsers();
    }
  }, [isModalOpen]);

  // Fetch vaccines, combos, and children on Step 2
  useEffect(() => {
    if (currentStep === 2) {
      const fetchVaccinesAndCombos = async () => {
        setIsLoading(true);
        try {
          const [vaccinesRes, vaccineCombosRes, childrenRes] = await Promise.all([
            api.get(`${url}/Vaccine/get-all-vaccines-admin`),
            api.get(`${url}/VaccineCombo/get-all-vaccine-combo-admin`),
            api.get(`${url}/Child/get-all-child-admin`),
          ]);
          if (
            vaccinesRes.status === 200 &&
            vaccineCombosRes.status === 200 &&
            childrenRes.status === 200
          ) {
            setAvailableVaccines(vaccinesRes.data);
            setAvailableVaccineCombos(vaccineCombosRes.data);
            setChildren(childrenRes.data);
          }
        } catch (error) {
          console.error("Error fetching vaccines and combos:", error);
          setError("Failed to fetch booking data.");
        } finally {
          setIsLoading(false);
        }
      };
      fetchVaccinesAndCombos();
    }
  }, [currentStep]);

  // Filter users based on search term
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredUsers(users);
    } else {
      const filtered = users.filter(
        (user) =>
          user.gmail?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.phoneNumber?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredUsers(filtered);
    }
  }, [searchTerm, users]);

  // Handle user selection
  const handleUserSelect = (user) => {
    setSelectedUser(user);
    setFilteredChildren(children.filter((child) => child.parentId === user.id));
    setCurrentStep(2);
  };

  useLayoutEffect(() => {
    if (selectedUser) {
      setFilteredChildren(children.filter((child) => child.parentId === selectedUser.id));
    }
  }, [selectedUser, children]);

  // Toggle child selection
  const handleChildToggle = (child) => {
    setSelectedChildren((prev) =>
      prev.some((c) => c.id === child.id)
        ? prev.filter((c) => c.id !== child.id)
        : [...prev, child]
    );
  };

  // Check vaccine suitability based on age
  const isVaccineSuitableForAnyChild = (vaccine) => {
    if (!selectedChildren.length) return true;
    return selectedChildren.some((child) => {
      const childAge = parseInt(CalculateAge(child.dateOfBirth).split(" ")[0], 10);
      return childAge >= vaccine.suggestAgeMin && childAge <= vaccine.suggestAgeMax;
    });
  };

  // Check combo suitability based on age
  const isComboSuitableForAnyChild = (combo) => {
    if (!selectedChildren.length) return true;
    return selectedChildren.some((child) => {
      const age = parseInt(CalculateAge(child.dateOfBirth).split(" ")[0], 10);
      return combo.vaccines.every(
        (vaccine) => age >= vaccine.suggestAgeMin && age <= vaccine.suggestAgeMax
      );
    });
  };

  // Check if a vaccine is in stock based on status
  const isVaccineInStock = (vaccine) => {
    return vaccine.status?.toLowerCase() === "instock" || vaccine.status?.toLowerCase() === "available";
  };

  // Check if a combo is in stock based on status
  const isComboInStock = (combo) => {
    const comboStatusInStock =
      combo.status?.toLowerCase() === "instock";
    return comboStatusInStock;
  };

  // Get out-of-stock vaccines in a combo
  const getOutOfStockVaccinesInCombo = (combo) => {
    return combo.vaccines
      .filter((vaccine) => !isVaccineInStock(vaccine))
      .map((vaccine) => vaccine.name)
      .join(", ");
  };

  // Toggle vaccine selection with stock check
  const handleVaccineToggle = (vaccine) => {
    if (!isVaccineInStock(vaccine)) {
      toast.error(`Vaccine '${vaccine.name}' is out of stock.`);
      return;
    }

    if (!isVaccineSuitableForAnyChild(vaccine)) {
      toast.error(`Vaccine '${vaccine.name}' is not suitable for selected children.`);
      return;
    }

    setSelectedVaccines((prev) =>
      prev.some((v) => v.id === vaccine.id)
        ? prev.filter((v) => v.id !== vaccine.id)
        : [...prev, vaccine]
    );
  };

  // Toggle combo selection with stock check
  const handleComboToggle = (combo) => {
    if (!isComboInStock(combo)) {
      const outOfStockVaccines = getOutOfStockVaccinesInCombo(combo);
      if (outOfStockVaccines) {
        toast.error(
          `Combo '${combo.comboName}' cannot be selected because the following vaccines are out of stock: ${outOfStockVaccines}.`
        );
      } else {
        toast.error(`Combo '${combo.comboName}' is out of stock.`);
      }
      return;
    }

    if (!isComboSuitableForAnyChild(combo)) {
      toast.error(`Combo '${combo.comboName}' is not suitable for selected children.`);
      return;
    }

    setSelectedCombos((prev) =>
      prev.some((c) => c.id === combo.id)
        ? prev.filter((c) => c.id !== combo.id)
        : [...prev, combo]
    );
  };

  // Handle form submission
  const handleSubmit = async () => {
    if (!selectedUser) {
      setError("Please select a user.");
      return;
    }
    if (selectedChildren.length === 0) {
      setError("Please select at least one child.");
      return;
    }
    if (selectedVaccines.length === 0 && selectedCombos.length === 0) {
      setError("Please select at least one vaccine or combo.");
      return;
    }
    if (!appointmentDate) {
      setError("Please select an appointment date.");
      return;
    }
    if (!advisory.trim()) {
      setError("Please provide advisory notes.");
      return;
    }

    const outOfStockVaccines = selectedVaccines.filter((vaccine) => !isVaccineInStock(vaccine));
    const outOfStockCombos = selectedCombos.filter((combo) => !isComboInStock(combo));

    if (outOfStockVaccines.length > 0) {
      setError(
        `The following vaccines are out of stock: ${outOfStockVaccines
          .map((v) => v.name)
          .join(", ")}. Please remove them before proceeding.`
      );
      return;
    }

    if (outOfStockCombos.length > 0) {
      setError(
        `The following combos are out of stock: ${outOfStockCombos
          .map((c) => c.comboName)
          .join(", ")}. Please remove them before proceeding.`
      );
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      const totalPricePerChild =
        selectedVaccines.reduce((sum, vaccine) => sum + vaccine.price, 0) +
        selectedCombos.reduce((sum, combo) => sum + combo.finalPrice, 0);
      const finalTotalPrice = Math.round(totalPricePerChild * selectedChildren.length);

      const formattedArrivedAt = new Date(appointmentDate).toISOString();

      const bookingData = {
        parentId: selectedUser.id,
        AdvisoryDetail: advisory.trim(),
        totalPrice: finalTotalPrice,
        arrivedAt: formattedArrivedAt,
        paymentId: 2,
        childrenIds: selectedChildren.map((child) => child.id),
        vaccineIds: selectedVaccines.map((vaccine) => vaccine.id),
        vaccineComboIds: selectedCombos.map((combo) => combo.id),
        bookingID: 0,
      };

      console.log("Booking Data:", JSON.stringify(bookingData, null, 2));

      const response = await api.post(`${url}/Booking/add-booking-by-staff`, bookingData);

      if (response.status === 200 || response.status === 201) {
        toast.success("Booking created successfully!");
        setTrigger((prev) => !prev);
        handleClose();
      } else {
        toast.error(response.data?.message || "Failed to create booking.");
      }
    } catch (error) {
      console.error("Error creating booking:", error);
      if (error.response) {
        const errorMessage =
          error.response.data?.message ||
          error.response.data?.title ||
          "Failed to create booking. Please check the data and try again.";
        toast.error(errorMessage);
        console.log("Error Response Data:", error.response.data);
      } else if (error.request) {
        toast.error("No response from the server. Please check your network connection.");
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Go back to Step 1
  const goBack = () => {
    setCurrentStep(1);
    setSelectedChildren([]);
    setSelectedVaccines([]);
    setSelectedCombos([]);
    setAdvisory("");
    setAppointmentDate("");
  };

  // Close modal and reset state
  const handleClose = () => {
    setIsModalOpen(false);
    setCurrentStep(1);
    setSelectedUser(null);
    setSelectedChildren([]);
    setSelectedVaccines([]);
    setSelectedCombos([]);
    setAdvisory("");
    setAppointmentDate("");
    setSearchTerm("");
    setError(null);
  };

  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-[800px] max-w-[90%] max-h-[90vh] overflow-y-auto text-center relative">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          {currentStep === 1 ? "Select User for Booking" : "Create New Booking"}
        </h2>

        {error && <div className="mb-4 text-red-500 text-sm">{error}</div>}

        {currentStep === 1 ? (
          <div className="space-y-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Search by email or phone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-2.5 border border-gray-300 rounded-md focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors pl-10"
              />
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>
            {isLoading ? (
              <p className="text-gray-500">Loading users...</p>
            ) : filteredUsers.length > 0 ? (
              <div className="max-h-60 overflow-y-auto space-y-2">
                {filteredUsers.map((user) => (
                  <div
                    key={user.id}
                    onClick={() => handleUserSelect(user)}
                    className="flex items-center justify-between p-3 bg-gray-100 rounded-md hover:bg-blue-50 cursor-pointer transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <User className="w-5 h-5 text-blue-500" />
                      <div className="text-left">
                        <p className="font-medium text-gray-800">
                          {user.name || "Unnamed User"}
                        </p>
                        <p className="text-sm text-gray-600">
                          {user.gmail || "No email"}
                        </p>
                        <p className="text-sm text-gray-600">
                          {user.phoneNumber || "No phone"}
                        </p>
                      </div>
                    </div>
                    <Plus className="w-5 h-5 text-blue-500" />
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No users found.</p>
            )}
          </div>
        ) : (
          <div className="space-y-6">
            {/* Selected User */}
            <div>
              <h4 className="text-sm font-medium mb-2">Selected User</h4>
              <div className="flex items-center p-3 bg-gray-100 rounded-md">
                <User className="w-5 h-5 text-blue-500 mr-3" />
                <div className="text-left">
                  <p className="font-medium text-gray-800">
                    {selectedUser?.name || "No Name"}
                  </p>
                  <p className="text-sm text-gray-600">
                    {selectedUser?.gmail || "No email"}
                  </p>
                  <p className="text-sm text-gray-600">
                    {selectedUser?.phoneNumber || "No phone"}
                  </p>
                </div>
              </div>
            </div>

            {/* Children Selection */}
            <div>
              <h4 className="text-sm font-medium mb-2">Select Children</h4>
              <div className="max-h-40 overflow-y-auto space-y-2">
                {filteredChildren.map((child) => (
                  <div
                    key={child.id}
                    className="flex items-center p-3 bg-gray-100 rounded-md"
                  >
                    <input
                      type="checkbox"
                      checked={selectedChildren.some((c) => c.id === child.id)}
                      onChange={() => handleChildToggle(child)}
                      className="w-5 h-5 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 mr-3"
                    />
                    <Baby className="w-5 h-5 text-blue-500 mr-2" />
                    <div className="text-left">
                      <p className="font-medium text-gray-800">{child.name}</p>
                      <p className="text-sm text-gray-600">
                        {child.gender === 0 ? "Male" : "Female"} -{" "}
                        {CalculateAge(child.dateOfBirth)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Vaccines Selection */}
            <div>
              <h4 className="text-sm font-medium mb-2">Select Vaccines</h4>
              {isLoading ? (
                <p className="text-gray-500">Loading vaccines...</p>
              ) : (
                <div className="max-h-40 overflow-y-auto space-y-2">
                  {availableVaccines.map((vaccine) => {
                    const isSuitable = isVaccineSuitableForAnyChild(vaccine);
                    const inStock = isVaccineInStock(vaccine);
                    return (
                      <div
                        key={vaccine.id}
                        className={`flex items-center justify-between p-3 rounded-md ${
                          isSuitable && inStock
                            ? "bg-gray-100 hover:bg-blue-50"
                            : "bg-gray-100 opacity-50 cursor-not-allowed"
                        }`}
                      >
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            checked={selectedVaccines.some((v) => v.id === vaccine.id)}
                            onChange={() => handleVaccineToggle(vaccine)}
                            disabled={!isSuitable || !inStock}
                            className="w-5 h-5 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 mr-3"
                          />
                          <Syringe className="w-5 h-5 text-blue-500 mr-2" />
                          <div className="text-left">
                            <span className="text-gray-800">
                              {vaccine.name} (Ages {vaccine.suggestAgeMin}-
                              {vaccine.suggestAgeMax})
                            </span>
                            {!inStock && (
                              <span className="ml-2 text-xs text-red-500 font-medium">
                                Out of Stock
                              </span>
                            )}
                          </div>
                        </div>
                        <span className="text-blue-700">
                          {vaccine.price.toLocaleString()} VND
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Combos Selection */}
            <div>
              <h4 className="text-sm font-medium mb-2">Select Vaccine Combos</h4>
              {isLoading ? (
                <p className="text-gray-500">Loading combos...</p>
              ) : (
                <div className="max-h-40 overflow-y-auto space-y-2">
                  {availableVaccineCombos.map((combo) => {
                    const isSuitable = isComboSuitableForAnyChild(combo);
                    const inStock = isComboInStock(combo);
                    const outOfStockVaccines = getOutOfStockVaccinesInCombo(combo);
                    return (
                      <div
                        key={combo.id}
                        className={`flex items-center justify-between p-3 rounded-md ${
                          isSuitable && inStock
                            ? "bg-gray-100 hover:bg-blue-50"
                            : "bg-gray-100 opacity-50 cursor-not-allowed"
                        }`}
                      >
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            checked={selectedCombos.some((c) => c.id === combo.id)}
                            onChange={() => handleComboToggle(combo)}
                            disabled={!isSuitable || !inStock}
                            className="w-5 h-5 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 mr-3"
                          />
                          <Syringe className="w-5 h-5 text-blue-500 mr-2" />
                          <div className="text-left">
                            <span className="text-gray-800">{combo.comboName}</span>
                            <p className="text-sm text-gray-600">
                              {combo.vaccines.map((v) => v.name).join(", ")}
                            </p>
                            {!inStock && (
                              <span className="text-xs text-red-500 font-medium">
                                {outOfStockVaccines
                                  ? `Unavailable due to out-of-stock vaccines: ${outOfStockVaccines}`
                                  : "Out of Stock"}
                              </span>
                            )}
                          </div>
                        </div>
                        <span className="text-blue-700">
                          {combo.finalPrice.toLocaleString()} VND
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Appointment Date */}
            <div>
              <h4 className="text-sm font-medium mb-2">Appointment Date</h4>
              <div className="relative">
                <input
                  type="date"
                  value={appointmentDate.split("T")[0] || ""}
                  onChange={(e) => setAppointmentDate(new Date(e.target.value).toISOString())}
                  min={new Date().toISOString().split("T")[0]}
                  className="w-full p-2.5 border border-gray-300 rounded-md focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors pl-10"
                />
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              </div>
            </div>

            {/* Advisory Notes */}
            <div>
              <h4 className="text-sm font-medium mb-2">Advisory Notes (Required)</h4>
              <textarea
                placeholder="Add advisory notes (required)..."
                value={advisory}
                onChange={(e) => setAdvisory(e.target.value)}
                className="w-full p-2.5 border border-gray-300 rounded-md focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors"
                rows={4}
                required
              />
            </div>

            {/* Summary */}
            {(selectedVaccines.length > 0 || selectedCombos.length > 0) && (
              <div>
                <h4 className="text-sm font-medium mb-2">Booking Summary</h4>
                <div className="bg-blue-50 p-3 rounded-md">
                  <ul className="list-disc list-inside text-gray-700">
                    {selectedVaccines.map((v) => (
                      <li key={v.id}>
                        {v.name} - {v.price.toLocaleString()} VND
                      </li>
                    ))}
                    {selectedCombos.map((c) => (
                      <li key={c.id}>
                        {c.comboName} - {c.finalPrice.toLocaleString()} VND
                      </li>
                    ))}
                  </ul>
                  <p className="mt-2 font-bold text-right text-blue-800">
                    Total:{" "}
                    {(
                      (selectedVaccines.reduce((sum, v) => sum + v.price, 0) +
                        selectedCombos.reduce((sum, c) => sum + c.finalPrice, 0)) *
                      selectedChildren.length
                    ).toLocaleString()}{" "}
                    VND
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Buttons */}
        <div className="mt-6 flex justify-end space-x-4">
          <button
            onClick={currentStep === 1 ? handleClose : goBack}
            className="px-6 py-2.5 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
            disabled={isLoading}
          >
            {currentStep === 1 ? "Cancel" : "Back"}
          </button>
          {currentStep === 2 && (
            <button
              onClick={handleSubmit}
              disabled={
                isLoading ||
                selectedChildren.length === 0 ||
                (selectedVaccines.length === 0 && selectedCombos.length === 0) ||
                !appointmentDate ||
                !advisory.trim()
              }
              className={`bg-gradient-to-r from-blue-500 to-blue-500 text-white px-5 py-2.5 rounded-full hover:from-blue-600 hover:to-blue-600 transition-all duration-300 flex items-center gap-2 shadow-md hover:shadow-lg ${
                isLoading ||
                selectedChildren.length === 0 ||
                (selectedVaccines.length === 0 && selectedCombos.length === 0) ||
                !appointmentDate ||
                !advisory.trim()
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
            >
              {isLoading ? "Creating..." : "Create Booking"}
              <Plus className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateBookingByStaff;