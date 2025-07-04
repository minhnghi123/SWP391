import {
  Calendar,
  Clock,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  AlertCircle,
  Shield,
  User,
  PlusCircle,
  Filter,
  XCircle,
  History,
  AudioLines,
  ArrowUp,
  ArrowDown,
} from "lucide-react";
import formatDate from "../../../../utils/Date";
import { useState, useEffect } from "react";
import ToUpperCase from "../../../../utils/upperCaseFirstLetter";
import { updateData } from "../../../../Api/axios";
import { toast } from "react-toastify";
import VaccineRescheduleModal from "./VaccineRescheduleModal";
import { useNavigate } from "react-router-dom";
import { Syringe } from "lucide-react";
import ProgressBar from "@/components/Tracking&History/Section/tracking/processBarvaccineSchedule";
import HistoryTracking from "./historyTracking";

export default function VaccineSchedules({ sortLinkList, setTrigger }) {
  const [isInput, setIsInput] = useState({});
  const [reaction, setReaction] = useState({});
  const [expandedVaccines, setExpandedVaccines] = useState({});
  const [hoveredCard, setHoveredCard] = useState(null);
  const [showModalReSchedule, setShowModalReSchedule] = useState(false);
  const [showSortOptions, setShowSortOptions] = useState(false);
  const [activeSortOption, setActiveSortOption] = useState("all");
  const [historyTracking, setHistoryTracking] = useState(false);
  const [sortedLinkList, setSortedLinkList] = useState([]);
  const navigate = useNavigate();
  const [vaccinationDate, setVaccinationDate] = useState({
    trackingID: "",
    vaccineName: "",
    vaccinationDate: "",
  });

  const findSchedule = (sortLinkList || [])
    .flat()
    .filter(
      (dose) =>
        dose.status?.toLowerCase() === "schedule" &&
        dose.previousVaccination === 0
    );

  const findCompleted = sortLinkList
    .flat()
    .filter((dose) => dose.status.toLowerCase() === "success");
  const checkReaction = findCompleted
    .flat()
    .filter((item) => item.reaction.toLowerCase() === "nothing");

  const handleOpenModalReSchedule = (
    trackingID,
    vaccinationDate,
    vaccineName
  ) => {
    setShowModalReSchedule(true);
    setVaccinationDate({
      trackingID,
      vaccineName: vaccineName || "Unknown Vaccine",
      vaccinationDate,
    });
  };
  const filteredList = (sortLinkList || []).filter((chain) =>
    chain.some(
      (item) =>
        item.status.toLowerCase() !== "success" &&
        item.status.toLowerCase() !== "cancel"
    )
  );

  useEffect(() => {
    handleSortChange(activeSortOption);
  }, [sortLinkList]);

  const handleSortChange = (option) => {
    let sortedList = [...filteredList];

    // Hàm chuyển đổi ngày an toàn
    const safeDate = (date) => {
      const parsedDate = date ? new Date(date) : new Date(0); // Mặc định là 1970-01-01 nếu không có ngày
      return isNaN(parsedDate) ? new Date(0) : parsedDate;
    };

    // Hàm so sánh ngày tiêm
    const compareDates = (a, b, order = "asc") => {
      const aDate = safeDate(a?.[0]?.vaccinationDate);
      const bDate = safeDate(b?.[0]?.vaccinationDate);
      return order === "asc" ? aDate - bDate : bDate - aDate;
    };

    // Hàm so sánh tên vaccine
    const compareNames = (a, b, order = "asc") => {
      const aName = a?.[0]?.vaccineName || "Unknown"; // Mặc định là 'Unknown' nếu không có tên
      const bName = b?.[0]?.vaccineName || "Unknown";
      return order === "asc"
        ? aName.localeCompare(bName)
        : bName.localeCompare(aName);
    };

    // Xử lý sắp xếp theo tùy chọn
    switch (option) {
      case "date_asc":
      case "date": // Hợp nhất với date_asc
        sortedList.sort((a, b) => compareDates(a, b, "asc"));
        break;

      case "date_desc":
        sortedList.sort((a, b) => compareDates(a, b, "desc"));
        break;

      case "name_asc":
        sortedList.sort((a, b) => compareNames(a, b, "asc"));
        break;

      case "name_desc":
        sortedList.sort((a, b) => compareNames(a, b, "desc"));
        break;

      case "all":
        sortedList = [...filteredList]; // Giữ nguyên danh sách đã lọc
        break;

      default:
        break;
    }
    setSortedLinkList(sortedList);
  };

  const handleSort = (option) => {
    setActiveSortOption(option);
    handleSortChange(option);
    setShowSortOptions(false);
  };

  const toggleVaccine = (index) => {
    setExpandedVaccines((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const handleSubmit = async (trackingID) => {
    const data = { reaction: reaction[trackingID] || "" };
    try {
      const res = await updateData(
        "VaccinesTracking/update-vaccine-user",
        trackingID,
        data
      );
      if (res.status === 200) {
        toast.success("Update Reaction Success");
        setTrigger((prev) => !prev);
      }
    } catch (error) {
      console.error("Error submitting reaction:", error);
      toast.error("Update Reaction Failed");
    }
    setIsInput((prev) => ({ ...prev, [trackingID]: false }));
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "success":
        return "text-emerald-500 bg-emerald-50 ring-1 ring-emerald-100";
      case "schedule":
        return "text-violet-500 bg-violet-50 ring-1 ring-violet-100";
      case "waiting":
        return "text-gray-500 bg-gray-50 ring-1 ring-gray-100";
      case "cancel":
        return "text-red-500 bg-red-50 ring-1 ring-red-100";
      case "overdue":
        return "text-amber-500 bg-amber-50 ring-1 ring-amber-100";
      default:
        return "text-slate-500 bg-slate-50 ring-1 ring-slate-100";
    }
  };

  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case "success":
        return <CheckCircle className="w-5 h-5" />;
      case "schedule":
        return <Calendar className="w-5 h-5" />;
      case "waiting":
        return <Clock className="w-5 h-5" />;
      case "cancel":
        return <XCircle className="w-5 h-5" />;
      case "overdue":
        return <AlertCircle className="w-5 h-5" />;
      default:
        return <AlertCircle className="w-5 h-5" />;
    }
  };

  const isOverdue = (maximumIntervalDate, status) => {
    if (!maximumIntervalDate) return false;
    if (status.toLowerCase() === "success" || status.toLowerCase() === "cancel")
      return false;
    return new Date() > new Date(maximumIntervalDate);
  };

  const sortOptions = [
    { id: "all", label: "All Tracking", icon: <Shield className="w-4 h-4" /> },
    {
      id: "date_asc",
      label: "Date (Oldest First)",
      icon: <ArrowUp className="w-4 h-4" />,
    },
    {
      id: "date_desc",
      label: "Date (Newest First)",
      icon: <ArrowDown className="w-4 h-4" />,
    },
    {
      id: "name_asc",
      label: "Name (A-Z)",
      icon: <ArrowUp className="w-4 h-4" />,
    },
    {
      id: "name_desc",
      label: "Name (Z-A)",
      icon: <ArrowDown className="w-4 h-4" />,
    },
  ];

  if (historyTracking) {
    return (
      <HistoryTracking
        sortLinkList={sortLinkList}
        setTrigger={setTrigger}
        setHistoryTracking={setHistoryTracking}
        historyTracking={historyTracking}
      />
    );
  }
  return (
    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 min-h-[50vh]">
      <div className="flex items-center gap-4 mb-8 justify-between">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-indigo-50 rounded-xl">
            <Shield className="w-6 h-6 text-indigo-500" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              Vaccination Schedule
            </h2>
            <p className="text-gray-500 text-sm mt-1">
              Track and manage your vaccination progress
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <button
              onClick={() => setShowSortOptions(!showSortOptions)}
              className="flex items-center gap-2 bg-indigo-100 hover:bg-indigo-200 text-indigo-700 px-4 py-2 rounded-xl transition-all duration-300 font-medium"
            >
              <Filter className="w-4 h-4" />
              {sortOptions.find((option) => option.id === activeSortOption)
                ?.label || "Filter"}
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-300 ${
                  showSortOptions ? "rotate-180" : ""
                }`}
              />
            </button>

            {showSortOptions && (
              <div className="absolute right-0 top-full mt-2 bg-white rounded-xl shadow-lg border border-gray-100 z-10 w-56 overflow-hidden">
                <div className="py-1">
                  {sortOptions.map((option) => (
                    <button
                      key={option.id}
                      onClick={() => handleSort(option.id)}
                      className={`w-full text-left px-4 py-3 flex items-center gap-3 hover:bg-indigo-50 transition-colors duration-200 ${
                        activeSortOption === option.id
                          ? "bg-indigo-50 text-indigo-700 font-medium"
                          : "text-gray-700"
                      }`}
                    >
                      <span
                        className={`p-1.5 rounded-lg ${
                          activeSortOption === option.id
                            ? "bg-indigo-100 text-indigo-600"
                            : "bg-gray-100 text-gray-500"
                        }`}
                      >
                        {option.icon}
                      </span>
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <button
            onClick={() => setHistoryTracking(!historyTracking)}
            className="bg-indigo-100 hover:bg-indigo-200 text-indigo-700 px-4 py-3 rounded-xl transition-all duration-300 font-medium"
          >
            {historyTracking ? (
              <AudioLines className="w-4 h-4" />
            ) : (
              <History className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>

      {sortedLinkList.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-[60vh] text-center px-4 animate-fadeIn">
          <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mb-6 shadow-md">
            <Syringe className="text-blue-600 w-12 h-12" />
          </div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            No Vaccination Records
          </h2>
          <p className="text-gray-500 text-base max-w-md mb-4">
            It looks like there are no vaccination records available for
            tracking at the moment. Check back later or schedule a new
            appointment.
          </p>
          <button
            onClick={() => navigate("/variantsPage")}
            className="bg-blue-600 text-white py-2 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-sm hover:shadow-md"
          >
            Booking Now
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {sortedLinkList.map((chain, index) => {
            const vaccineName = chain[0]?.vaccineName || "Unknown Vaccine";
            const completed = chain.filter(
              (item) => item.status.toLowerCase() === "success"
            ).length;
            const total = chain.length;
            const percentage = Math.round((completed / total) * 100) || 0;

            return (
              <div
                key={index}
                className="transform transition-all duration-300 ease-in-out"
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div className="flex flex-row-reverse items-center gap-4 mb-2">
                  <button
                    onClick={() => toggleVaccine(index)}
                    className={`p-3 rounded-xl transition-all duration-300 ${
                      hoveredCard === index
                        ? "bg-indigo-100 text-indigo-600"
                        : "hover:bg-indigo-50 text-gray-400"
                    }`}
                  >
                    {expandedVaccines[index] ? (
                      <ChevronUp className="w-5 h-5" />
                    ) : (
                      <ChevronDown className="w-5 h-5" />
                    )}
                  </button>
                  <div className="flex-1 bg-white p-5 rounded-xl border border-gray-100 hover:border-indigo-200 transition-all duration-300 hover:shadow-md">
                    <ProgressBar
                      vaccineName={vaccineName}
                      current={completed}
                      total={total}
                      percentage={percentage}
                      doses={chain}
                    />
                  </div>
                </div>

                {expandedVaccines[index] && (
                  <div className="ml-12 mt-6 space-y-6 border-l-2 border-indigo-100 pl-8 relative animate-fadeIn">
                    {chain.map((dose, doseIndex) => {
                      const isOverdueVaccine = isOverdue(
                        dose.maximumIntervalDate,
                        dose.status
                      );

                      return (
                        <div
                          key={dose.trackingID || doseIndex}
                          className="relative group transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                        >
                          <div className="absolute w-4 h-4 bg-indigo-500 rounded-full -left-[40px] top-10 ring-4 ring-white">
                            <div className="absolute w-4 h-4 bg-indigo-500 rounded-full animate-ping opacity-20" />
                          </div>
                          <div
                            className={`bg-white p-6 rounded-2xl shadow-sm border transition-all duration-300 ${
                              dose.status.toLowerCase() === "cancel"
                                ? "border-red-200 hover:border-red-300"
                                : isOverdueVaccine
                                ? "border-amber-200 hover:border-amber-300"
                                : "border-gray-100 hover:border-indigo-200"
                            }`}
                          >
                            <div className="flex items-start justify-between gap-4">
                              <div className="flex items-center gap-4">
                                <span
                                  className={`${getStatusColor(
                                    dose.status
                                  )} p-3 rounded-xl transition-colors duration-300`}
                                >
                                  {getStatusIcon(dose.status)}
                                </span>
                                <div>
                                  <h4 className="font-semibold text-gray-800 text-lg">
                                    Dose {doseIndex + 1}
                                  </h4>
                                  <span className="text-sm text-gray-500">
                                    {dose.vaccineName || "Unknown Vaccine"}
                                  </span>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                {findSchedule.some(
                                  (item) => item.trackingID === dose.trackingID
                                ) && (
                                  <button
                                    onClick={() =>
                                      handleOpenModalReSchedule(
                                        dose.trackingID,
                                        dose.vaccinationDate,
                                        dose.vaccineName
                                      )
                                    }
                                    className="bg-indigo-500 text-white px-4 py-2 rounded-xl hover:bg-indigo-600 transition-colors"
                                  >
                                    ReSchedule
                                  </button>
                                )}
                                <span
                                  className={`${
                                    isOverdueVaccine
                                      ? getStatusColor("overdue")
                                      : getStatusColor(dose.status)
                                  } px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300`}
                                >
                                  {isOverdueVaccine
                                    ? "Overdue"
                                    : ToUpperCase(dose.status)}
                                </span>
                              </div>
                            </div>

                            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="space-y-3">
                                {dose.vaccinationDate && (
                                  <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all duration-300">
                                    <Calendar className="w-5 h-5 text-indigo-500" />
                                    <div>
                                      <span className="font-medium block text-gray-700">
                                        Vaccination Date
                                      </span>
                                      <span className="text-gray-600 text-sm">
                                        {formatDate(dose.vaccinationDate)}
                                      </span>
                                    </div>
                                  </div>
                                )}
                                {dose.userName && (
                                  <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all duration-300">
                                    <User className="w-5 h-5 text-indigo-500" />
                                    <div>
                                      <span className="font-medium block text-gray-700">
                                        Parent
                                      </span>
                                      <span className="text-gray-600 text-sm">
                                        {ToUpperCase(dose.userName)}
                                      </span>
                                    </div>
                                  </div>
                                )}
                              </div>
                              <div className="space-y-3">
                                {dose.minimumIntervalDate &&
                                  dose.maximumIntervalDate && (
                                    <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all duration-300">
                                      <Clock className="w-5 h-5 text-indigo-500 mt-1" />
                                      <div>
                                        <span className="flex flex-col gap-2 font-medium text-gray-700">
                                          Maximum Vaccination Date
                                        </span>
                                        <span className="text-gray-600 text-sm block">
                                          {formatDate(dose.maximumIntervalDate)}
                                        </span>
                                      </div>
                                    </div>
                                  )}
                                {dose.reaction && (
                                  <div
                                    className={`flex items-center gap-3 p-4 ${
                                      dose.reaction === "Nothing"
                                        ? "bg-amber-50"
                                        : "bg-green-50"
                                    } rounded-xl transition-all duration-300`}
                                  >
                                    {dose.reaction === "Nothing" ? (
                                      <AlertCircle className="w-5 h-5 text-amber-500" />
                                    ) : (
                                      <CheckCircle className="w-5 h-5 text-green-500" />
                                    )}

                                    <div className="flex-1">
                                      <span
                                        className={`font-medium block ${
                                          dose.reaction === "Nothing"
                                            ? "text-amber-700"
                                            : "text-green-700"
                                        }`}
                                      >
                                        Reaction
                                      </span>

                                      {checkReaction.some(
                                        (item) =>
                                          item.trackingID === dose.trackingID
                                      ) ? (
                                        <button
                                          onClick={() =>
                                            setIsInput((prev) => ({
                                              ...prev,
                                              [dose.trackingID]: true,
                                            }))
                                          }
                                          className={`mt-2 flex items-center gap-2 ${
                                            dose.reaction === "Nothing"
                                              ? "text-amber-600 hover:text-amber-700"
                                              : "text-green-600 hover:text-green-700"
                                          } transition-colors text-sm`}
                                        >
                                          <PlusCircle className="w-4 h-4" />
                                          Add Reaction
                                        </button>
                                      ) : (
                                        <span
                                          className={
                                            dose.reaction === "Nothing"
                                              ? "text-amber-600"
                                              : "text-green-600"
                                          }
                                        >
                                          {dose.status.toLowerCase() !==
                                          "success"
                                            ? "After completed vaccination, you can add your reaction"
                                            : dose.reaction}
                                        </span>
                                      )}

                                      {isInput[dose.trackingID] && (
                                        <div className="mt-2 space-y-2">
                                          <textarea
                                            type="text"
                                            placeholder="Describe any reactions..."
                                            value={
                                              reaction[dose.trackingID] || ""
                                            }
                                            onChange={(e) =>
                                              setReaction((prev) => ({
                                                ...prev,
                                                [dose.trackingID]:
                                                  e.target.value,
                                              }))
                                            }
                                            className={`w-full p-2 text-sm border ${
                                              dose.reaction === "Nothing"
                                                ? "border-amber-200 focus:ring-amber-300 focus:border-amber-300"
                                                : "border-green-200 focus:ring-green-300 focus:border-green-300"
                                            } rounded-lg focus:ring-2 outline-none resize-none`}
                                            rows="2"
                                          />
                                          <div className="flex justify-end gap-2">
                                            <button
                                              onClick={() =>
                                                setIsInput((prev) => ({
                                                  ...prev,
                                                  [dose.trackingID]: false,
                                                }))
                                              }
                                              className={`px-3 py-1 text-sm ${
                                                dose.reaction === "Nothing"
                                                  ? "text-amber-700 bg-amber-50 hover:bg-amber-100"
                                                  : "text-green-700 bg-green-50 hover:bg-green-100"
                                              } rounded-lg transition-colors`}
                                            >
                                              Cancel
                                            </button>
                                            <button
                                              onClick={() =>
                                                handleSubmit(dose.trackingID)
                                              }
                                              className={`px-3 py-1 text-sm text-white ${
                                                dose.reaction === "Nothing"
                                                  ? "bg-amber-500 hover:bg-amber-600"
                                                  : "bg-green-500 hover:bg-green-600"
                                              } rounded-lg transition-colors`}
                                            >
                                              Save
                                            </button>
                                          </div>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {showModalReSchedule && (
        <VaccineRescheduleModal
          currentAppointment={vaccinationDate}
          onClose={() => setShowModalReSchedule(false)}
          isOpen={showModalReSchedule}
          setTrigger={setTrigger}
        />
      )}
    </div>
  );
}
