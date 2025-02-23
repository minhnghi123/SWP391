import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { RefreshCcw } from "lucide-react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { arriveActions } from "../../../redux/reducers/arriveDate";
import { format } from "date-fns";

const ChooseDateVaccination = ({ arriveDate }) => {
    const [showCalendar, setShowCalendar] = useState(false);
    const dispatch = useDispatch();

    return (
        <div className="h-[100px] flex flex-row justify-between items-center p-4 bg-gradient-to-r from-blue-50 via-white to-blue-100 shadow-md rounded-lg">
            <h3 className="text-xl font-bold text-gray-900">Danh sách trẻ được chích</h3>
            <div className="relative">
                {/* Nếu chưa chọn ngày, hiển thị nút "Chọn ngày chích" */}
                {!arriveDate && (
                    <button
                        aria-label="Chọn ngày chích"
                        onClick={() => setShowCalendar(!showCalendar)}
                        className="px-4 py-2 bg-gradient-to-r from-blue-300 via-blue-400 to-blue-500 text-white rounded-lg text-sm font-medium 
transition-all duration-300 ease-in-out shadow-md hover:shadow-lg 
hover:from-blue-400 hover:to-blue-600"
                    >
                        📅 Chọn ngày chích
                    </button>
                )}

                {/* Hiển thị lịch khi click nút */}
                {showCalendar && (
                    <div
                        className="absolute top-full mt-2 bg-white p-3 border rounded-lg shadow-lg z-10"
                        role="dialog"
                        aria-label="Calendar picker"
                    >
                        <DatePicker
                            selected={arriveDate ? new Date(arriveDate) : null}
                            onChange={(date) => {
                                dispatch(arriveActions.setArriveDate(format(date, "yyyy/MM/dd")));
                                setShowCalendar(false);
                            }}
                            inline
                            minDate={new Date()}
                        />
                    </div>
                )}

                {/* Khi đã chọn ngày, hiển thị ngày đã chọn + nút reset */}
                {arriveDate && (
                    <div className="mt-3 flex items-center gap-4 bg-green-50 p-3 rounded-lg">
                        <p className="text-sm text-green-700 font-medium flex items-center">
                            <svg
                                className="w-5 h-5 mr-2 text-green-600"
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
                            Ngày đã chọn: {arriveDate}
                        </p>
                        <button
                            aria-label="Xóa ngày đã chọn"
                            onClick={() => dispatch(arriveActions.resetArriveDate())} // Bọc trong arrow function
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
