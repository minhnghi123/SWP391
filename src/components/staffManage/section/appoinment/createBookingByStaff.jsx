import { useState, useEffect, useLayoutEffect } from "react";
import useAxios from "../../../../utils/useAxios";
import CalculateAge from "../../../../utils/calculateYearOld";
import { toast } from "react-toastify";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

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

    // Fetch users on modal open
    useEffect(() => {
        if (isModalOpen) {
            const fetchUsers = async () => {
                setIsLoading(true);
                try {
                    const res = await api.get(`${url}/User/get-all-user`);
                    if (res.status === 200) {
                        setUsers(res.data);
                        setFilteredUsers(res.data);
                    }
                } catch (error) {
                    console.error("Error fetching users:", error);
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
                        api.get(`${url}/Vaccine/get-all-vaccines`),
                        api.get(`${url}/VaccineCombo/get-all-vaccine-combo`),
                        api.get(`${url}/Child/get-all-child`),
                    ]);
                    if (vaccinesRes.status === 200 && vaccineCombosRes.status === 200 && childrenRes.status === 200) {
                        setAvailableVaccines(vaccinesRes.data);
                        setAvailableVaccineCombos(vaccineCombosRes.data);
                        setChildren(childrenRes.data);

                    }
                } catch (error) {
                    console.error("Error fetching vaccines and combos:", error);
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

    // Check vaccine suitability
    const isVaccineSuitableForAnyChild = (vaccine) => {
        if (!selectedChildren.length) return true;
        return selectedChildren.some((child) => {
            const childAge = parseInt(CalculateAge(child.dateOfBirth).split(" ")[0], 10);
            return childAge >= vaccine.suggestAgeMin && childAge <= vaccine.suggestAgeMax;
        });
    };


    // Check combo suitability
    const isComboSuitableForAnyChild = (combo) => {
        if (!selectedChildren.length) return true;
        return selectedChildren.some((child) => {
            const Age = parseInt(CalculateAge(child.dateOfBirth).split(" ")[0], 10);
            return combo.vaccines.every(
                (vaccine) => Age >= vaccine.suggestAgeMin && Age <= vaccine.suggestAgeMax
            );
        });
    };

    // Toggle vaccine selection
    const handleVaccineToggle = (vaccine) => {
        if (!isVaccineSuitableForAnyChild(vaccine)) return;
        setSelectedVaccines((prev) =>
            prev.some((v) => v.id === vaccine.id)
                ? prev.filter((v) => v.id !== vaccine.id)
                : [...prev, vaccine]
        );
    };

    // Toggle combo selection
    const handleComboToggle = (combo) => {
        setSelectedCombos((prev) =>
            prev.some((c) => c.id === combo.id)
                ? prev.filter((c) => c.id !== combo.id)
                : [...prev, combo]
        );
    };

    // Handle form submission
    const handleSubmit = async () => {
        if (selectedChildren.length === 0) {
            alert("Please select at least one child");
            return;
        }
        if (selectedVaccines.length === 0 && selectedCombos.length === 0) {
            alert("Please select at least one vaccine or combo");
            return;
        }
        if (!appointmentDate) {
            alert("Please select an appointment date");
            return;
        }

        setIsLoading(true);
        try {

            const totalPrice =
                selectedVaccines.reduce((sum, vaccine) => sum + vaccine.price, 0) +
                selectedCombos.reduce((sum, combo) => sum + combo.finalPrice, 0);
            const finalTotalPrice = totalPrice * selectedChildren.length;

            const bookingData = {
                parentId: selectedUser?.id || null, // Kiểm tra xem selectedUser có null không
                childrenIds: selectedChildren.map((child) => child.id),
                vaccineIds: selectedVaccines.map((vaccine) => vaccine.id),
                vaccineComboIds: selectedCombos.map((combo) => combo.id),
                arrivedAt: appointmentDate,
                advisoryDetail: advisory || "no",
                totalPrice: finalTotalPrice,
                paymentId: 1,
            };



            const response = await api.post(`${url}/Booking/add-booking-by-staff`, bookingData);
            if (response.status === 200 && response.data.toLowerCase() === 'success') {
                toasttruengointments((prevAppointments) => [...prevAppointments, response.data]);
                handleClose();
            } else {
                console.warn("API response error:", response.data);
                toast.error(response.data?.message || "Failed to create booking.");
            }
        } catch (error) {
            console.error("Error creating booking:", error);
            toast.error("Failed to create booking. Please try again.");
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
    };

    if (!isModalOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-60">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col transform transition-all duration-300">
                {/* Header */}
                <div className="p-6 bg-gradient-to-r from-indigo-50 to-blue-50 border-b border-gray-200 flex items-center justify-between">
                    <h3 className="text-2xl font-semibold text-indigo-800">
                        {currentStep === 1 ? "Select User" : "Create Booking"}
                    </h3>
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                            <div
                                className={`w-8 h-8 rounded-full flex items-center justify-center font-medium transition-all ${currentStep === 1 ? "bg-indigo-600 text-white" : "bg-gray-200 text-gray-600"
                                    }`}
                            >
                                1
                            </div>
                            <div className="w-12 h-1 bg-gray-200 rounded-full">
                                <div
                                    className={`h-full bg-indigo-600 rounded-full transition-all duration-300`}
                                    style={{ width: currentStep === 2 ? "100%" : "0%" }}
                                />
                            </div>
                            <div
                                className={`w-8 h-8 rounded-full flex items-center justify-center font-medium transition-all ${currentStep === 2 ? "bg-indigo-600 text-white" : "bg-gray-200 text-gray-600"
                                    }`}
                            >
                                2
                            </div>
                        </div>
                        <button
                            onClick={handleClose}
                            className="p-1 rounded-full hover:bg-gray-200 transition-colors"
                            aria-label="Close"
                        >
                            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Body */}
                <div className="flex-1 overflow-y-auto bg-gray-50">
                    {currentStep === 1 ? (
                        <div className="p-6">
                            <div className="relative mb-6">
                                <input
                                    type="text"
                                    placeholder="Search by email or phone..."
                                    className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                                <svg
                                    className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                            {isLoading ? (
                                <div className="flex justify-center items-center h-64">
                                    <div className="animate-spin rounded-full h-12 w-12 border-t-3 border-indigo-600" />
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {filteredUsers.length > 0 ? (
                                        filteredUsers.map((user) => (
                                            <div
                                                key={user.id}
                                                className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md border border-gray-200 cursor-pointer transition-all"
                                                onClick={() => handleUserSelect(user)}
                                            >
                                                <div className="flex justify-between items-center">
                                                    <div className="space-y-1">
                                                        <h4 className="font-semibold text-gray-800">{user.name || "Unnamed User"}</h4>
                                                        <p className="text-sm text-gray-600">{user.gmail || "No email"}</p>
                                                        <p className="text-sm text-gray-600">{user.phoneNumber || "No phone"}</p>
                                                    </div>
                                                    <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                    </svg>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="text-center py-12 text-gray-500">No users found</div>
                                    )}
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="flex flex-col md:flex-row h-full">
                            {/* Left Column */}
                            <div className="w-full md:w-1/3 p-6 border-r border-gray-200 bg-white overflow-y-auto">
                                <div className="mb-6">
                                    <h4 className="text-lg font-semibold text-gray-800 mb-3">Selected User</h4>
                                    <div className="p-4 bg-indigo-50 rounded-lg">
                                        <p className="font-medium text-indigo-800">{selectedUser.name || "No Name"}</p>
                                        <p className="text-sm text-gray-600">{selectedUser.email}</p>
                                        <p className="text-sm text-gray-600">{selectedUser.phoneNumber}</p>
                                    </div>
                                </div>
                                <div className="mb-6">
                                    <h4 className="text-lg font-semibold text-gray-800 mb-3">Select Children</h4>
                                    <div className="space-y-3">
                                        {filteredChildren.map((child) => (
                                            <label
                                                key={child.id}
                                                className="flex items-center p-3 bg-white rounded-lg border border-gray-200 hover:border-indigo-300 cursor-pointer"
                                            >
                                                <input
                                                    type="checkbox"
                                                    className="h-5 w-5 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500"
                                                    checked={selectedChildren.some((c) => c.id === child.id)}
                                                    onChange={() => handleChildToggle(child)}
                                                />
                                                <div className="ml-3">
                                                    <p className="font-medium text-gray-800">{child.name}</p>
                                                    <p className="text-sm text-gray-600">
                                                        {child.gender === 0 ? "Male" : "Female"} - {CalculateAge(child.dateOfBirth)}
                                                    </p>
                                                </div>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Right Column */}
                            <div className="w-full md:w-2/3 p-6 overflow-y-auto">
                                {isLoading ? (
                                    <div className="flex justify-center items-center h-64">
                                        <div className="animate-spin rounded-full h-12 w-12 border-t-3 border-indigo-600" />
                                    </div>
                                ) : (
                                    <>
                                        <div className="mb-6">
                                            <h4 className="text-lg font-semibold text-gray-800 mb-3">Vaccines</h4>
                                            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                                                {availableVaccines.map((vaccine) => {
                                                    const isSuitable = isVaccineSuitableForAnyChild(vaccine);
                                                    return (
                                                        <label
                                                            key={vaccine.id}
                                                            className={`flex items-center justify-between p-3 mb-2 rounded-lg ${isSuitable ? "hover:bg-indigo-50" : "opacity-50 cursor-not-allowed"
                                                                }`}
                                                        >
                                                            <div className="flex items-center">
                                                                <input
                                                                    type="checkbox"
                                                                    className="h-5 w-5 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500"
                                                                    checked={selectedVaccines.some((v) => v.id === vaccine.id)}
                                                                    onChange={() => handleVaccineToggle(vaccine)}
                                                                    disabled={!isSuitable}
                                                                />
                                                                <span className="ml-3 text-gray-800">
                                                                    {vaccine.name} (Ages {vaccine.suggestAgeMin}-{vaccine.suggestAgeMax})
                                                                </span>
                                                            </div>
                                                            <span className="text-indigo-700">{vaccine.price.toLocaleString()} VND</span>
                                                        </label>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                        <div className="mb-6">
                                            <h4 className="text-lg font-semibold text-gray-800 mb-3">Vaccine Combos</h4>
                                            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                                                {availableVaccineCombos.map((combo) => {
                                                    const isSuitable = isComboSuitableForAnyChild(combo);
                                                    return (
                                                        <label
                                                            key={combo.id}
                                                            className={`flex items-center justify-between p-3 mb-2 rounded-lg ${isSuitable ? "hover:bg-indigo-50" : "opacity-50 cursor-not-allowed"
                                                                }`}
                                                        >
                                                            <div className="flex items-center">
                                                                <input
                                                                    type="checkbox"
                                                                    className="h-5 w-5 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500"
                                                                    checked={selectedCombos.some((c) => c.id === combo.id)}
                                                                    onChange={() => handleComboToggle(combo)}
                                                                    disabled={!isSuitable}
                                                                />
                                                                <div className="ml-3">
                                                                    <span className="text-gray-800">{combo.comboName}</span>
                                                                    <p className="text-sm text-gray-600">
                                                                        {combo.vaccines.map((v) => v.name).join(", ")}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                            <span className="text-indigo-700">{combo.finalPrice.toLocaleString()} VND</span>
                                                        </label>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                        {(selectedVaccines.length > 0 || selectedCombos.length > 0) && (
                                            <div className="mb-6">
                                                <h4 className="text-lg font-semibold text-gray-800 mb-3">Summary</h4>
                                                <div className="bg-indigo-50 p-4 rounded-lg">
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
                                                    <p className="mt-3 font-bold text-right text-indigo-800">
                                                        Total:{" "}
                                                        {(
                                                            selectedVaccines.reduce((sum, v) => sum + v.price, 0) +
                                                            selectedCombos.reduce((sum, c) => sum + c.finalPrice, 0)
                                                        ).toLocaleString()}{" "}
                                                        VND
                                                    </p>
                                                </div>
                                            </div>
                                        )}
                                    </>
                                )}
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-gray-200 bg-white flex justify-between">
                    <button
                        onClick={currentStep === 1 ? handleClose : goBack}
                        className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-all"
                    >
                        {currentStep === 1 ? "Cancel" : "Back"}
                    </button>
                    {currentStep === 2 && (
                        <button
                            onClick={handleSubmit}
                            disabled={isLoading || selectedChildren.length === 0 || (selectedVaccines.length === 0 && selectedCombos.length === 0) || !appointmentDate}
                            className={`px-6 py-2 rounded-lg text-white transition-all ${isLoading || selectedChildren.length === 0 || (selectedVaccines.length === 0 && selectedCombos.length === 0) || !appointmentDate
                                    ? "bg-gray-400 cursor-not-allowed"
                                    : "bg-indigo-600 hover:bg-indigo-700"
                                }`}
                        >
                            {isLoading ? "Processing..." : "Create Booking"}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CreateBookingByStaff;