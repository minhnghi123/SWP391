import { useState } from "react";
import ViewAllVaccine from "./viewAllVaccine";
import ViewAllCombo from "../combo/viewAllCombo";
import { Pill, Package } from "lucide-react";

const ManageVaccine = () => {
  const [view, setView] = useState("vaccine");

  return (
    <div className="p-4 sm:p-6">
      {/* Header */}
      <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm border border-gray-100">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 text-blue-500 rounded-lg shadow-sm">
              <Pill className="w-5 h-5 text-blue-500" />
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-blue-500">
              Vaccine Inventory
            </h1>
          </div>
          <span className="text-xs sm:text-sm text-gray-500">
            {new Date().toLocaleDateString()}
          </span>
        </div>

        {/* Tabs */}
        <div className="mt-4 flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => setView("vaccine")}
            className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              view === "vaccine"
                ? "text-blue-500 shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-teal-50 hover:text-blue-600 border border-gray-200"
            }`}
          >
            <Pill className="w-4 h-4" />
            <span className="text-sm sm:text-base">Vaccines</span>
          </button>
          <button
            onClick={() => setView("combo")}
            className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              view === "combo"
                ? "text-blue-500 shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-teal-50 hover:text-blue-600 border border-gray-200"
            }`}
          >
            <Package className="w-4 h-4" />
            <span className="text-sm sm:text-base">Combos</span>
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="mt-4">
        {view === "vaccine" && <ViewAllVaccine />}
        {view === "combo" && <ViewAllCombo />}
      </div>
    </div>
  );
};

export default ManageVaccine;
