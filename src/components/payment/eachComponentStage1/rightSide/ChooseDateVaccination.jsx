import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { RefreshCcw } from "lucide-react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { arriveActions } from "../../../redux/reducers/arriveDate";
import formatDate from "../../../../utils/Date";

const ChooseDateVaccination = ({ arriveDate }) => {
    const [showCalendar, setShowCalendar] = useState(false);
    const dispatch = useDispatch();

    return (
        <div className="h-[100px] flex flex-row justify-between items-center p-4 bg-gradient-to-r from-[#E8F5F6] via-white to-[#F0F9FA] shadow-md rounded-lg">
            <h3 className="text-xl font-bold text-gray-900">Children Vaccination List</h3>
            <div className="relative">
                {/* If date not selected, show "Choose vaccination date" button */}
                {!arriveDate && (
                    <button
                        aria-label="Choose vaccination date"
                        onClick={() => setShowCalendar(!showCalendar)}
                        className="px-4 py-2 bg-gradient-to-r from-[#00a0aa] to-[#3AC5C9] text-white rounded-lg text-sm font-medium 
                            transition-all duration-300 ease-in-out shadow-md hover:opacity-90"
                    >
                        📅 Choose vaccination date
                    </button>
                )}

                {/* Show calendar when clicked */}
                {showCalendar && (
                    <div
                        className="absolute top-full mt-2 bg-white p-3 border rounded-lg shadow-lg z-10"
                        role="dialog"
                        aria-label="Calendar picker"
                    >
                        <DatePicker
                            selected={arriveDate ? new Date(arriveDate) : null}
                            onChange={(date) => {
                                dispatch(arriveActions.setArriveDate(date.toISOString()));
                                setShowCalendar(false);
                            }}
                            inline
                            minDate={new Date()}
                        />
                    </div>
                )}

                {/* When date is selected, show selected date + reset button */}
                {arriveDate && (
                    <div className="mt-3 flex items-center gap-4 bg-[#E8F5F6] p-3 rounded-lg">
                        <p className="text-sm text-[#00a0aa] font-medium flex items-center">
                            <svg
                                className="w-5 h-5 mr-2 text-[#00a0aa]"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                aria-hidden="true"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            Selected date: {formatDate(arriveDate)}
                        </p>
                        <button
                            aria-label="Reset selected date"
                            onClick={() => dispatch(arriveActions.resetArriveDate())}
                            className="p-2 bg-gray-200 text-gray-700 rounded-full transition duration-300 hover:bg-gray-300"
                        >
                            <RefreshCcw className="w-5 h-5" />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ChooseDateVaccination;
