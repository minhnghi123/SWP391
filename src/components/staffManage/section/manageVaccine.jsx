import { useState } from "react";
import ViewAllVaccine from "../vaccine/viewAllVaccine";
import ViewAllCombo from "../combo/viewAllCombo";
import { Pill, Package } from "lucide-react";

const ManageVaccine = () => {
  const [view, setView] = useState("vaccine");

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-emerald-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 mb-8 animate-fade-in">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-teal-500 rounded-xl shadow-md">
                <Pill className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-3xl font-extrabold bg-gradient-to-r from-teal-600 to-emerald-500 bg-clip-text text-transparent">
                Vaccine Management
              </h1>
            </div>
            <span className="text-sm text-gray-500">
              {new Date().toLocaleDateString()}
            </span>
          </div>

          {/* Tabs */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => setView("vaccine")}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-300 shadow-md ${
                view === "vaccine"
                  ? "bg-teal-500 text-white shadow-teal-500/20"
                  : "bg-white text-gray-700 border border-gray-200 hover:bg-teal-50 hover:border-teal-300"
              }`}
            >
              <Pill className="w-5 h-5" />
              Vaccines
            </button>
            <button
              onClick={() => setView("combo")}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-300 shadow-md ${
                view === "combo"
                  ? "bg-teal-500 text-white shadow-teal-500/20"
                  : "bg-white text-gray-700 border border-gray-200 hover:bg-teal-50 hover:border-teal-300"
              }`}
            >
              <Package className="w-5 h-5" />
              Combos
            </button>
          </div>
        </header>

        {/* Content Area */}
        <main className="transition-all duration-500 ease-in-out">
          <div
            className={`bg-white rounded-2xl shadow-lg border border-gray-100 p-6 ${
              view === "vaccine" ? "animate-slide-in" : "hidden"
            }`}
          >
            <ViewAllVaccine />
          </div>
          <div
            className={`bg-white rounded-2xl shadow-lg border border-gray-100 p-6 ${
              view === "combo" ? "animate-slide-in" : "hidden"
            }`}
          >
            <ViewAllCombo />
          </div>
        </main>
      </div>
    </div>
  );
};

export default ManageVaccine;