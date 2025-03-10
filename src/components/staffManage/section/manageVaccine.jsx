import React, { useState } from "react";
import ViewAllCombo from "../combo/viewAllCombo"; // Assuming this is VaccineCombo
import ViewAllVaccine from "../vaccine/viewAllVaccine"; // Assuming this is VaccineList

const ManageVaccine = () => {
  const [view, setView] = useState(null);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white p-6 rounded-2xl shadow-xl shadow-teal-500/5 border border-gray-100 mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Manage Vaccines</h1>
          <div className="flex flex-col sm:flex-row gap-4">
          <button
              onClick={() => setView("vaccine")}
              className={`px-6 py-2.5 rounded-lg font-medium transition-colors ${
                view === "vaccine"
                  ? "bg-teal-500 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-teal-100"
              }`}
            >
              View Vaccines
            </button>
            <button
              onClick={() => setView("combo")}
              className={`px-6 py-2.5 rounded-lg font-medium transition-colors ${
                view === "combo"
                  ? "bg-teal-500 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-teal-100"
              }`}
            >
              View Combos
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="transition-opacity duration-300">
          {view === "combo" && <ViewAllCombo />}
          {view === "vaccine" && <ViewAllVaccine />}
          {!view && (
            <div className="bg-white p-6 rounded-2xl shadow-xl shadow-teal-500/5 border border-gray-100 text-center">
              <p className="text-gray-500 text-lg">
                Select an option above to view vaccines or combos.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageVaccine;