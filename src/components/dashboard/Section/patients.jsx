import React, { useState } from "react";

const patients = () => {
  const [patients, setPatients] = useState([
    { id: 1, name: "John Doe", age: 30, vaccine: "Pfizer", date: "2025-01-15", status: "Vaccinated" },
    { id: 2, name: "Jane Smith", age: 25, vaccine: "Moderna", date: "2025-01-18", status: "Pending" },
    { id: 3, name: "Alice Johnson", age: 35, vaccine: "AstraZeneca", date: "2025-01-20", status: "Vaccinated" },
  ]);

  const [search, setSearch] = useState("");

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const filteredPatients = patients.filter((patient) =>
    patient.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Patient Management</h1>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition duration-200">
          + Add Patient
        </button>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by name..."
          value={search}
          onChange={handleSearch}
          className="w-full p-3 rounded-lg border border-gray-300 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {/* Patients Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Name</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Age</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Vaccine</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Date</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Status</th>
              <th className="px-6 py-3 text-right text-sm font-medium text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredPatients.map((patient) => (
              <tr key={patient.id} className="border-b hover:bg-gray-50">
                <td className="px-6 py-4 text-sm text-gray-800">{patient.name}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{patient.age}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{patient.vaccine}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{patient.date}</td>
                <td
                  className={`px-6 py-4 text-sm font-medium ${
                    patient.status === "Vaccinated"
                      ? "text-green-600"
                      : "text-yellow-600"
                  }`}
                >
                  {patient.status}
                </td>
                <td className="px-6 py-4 text-right space-x-2">
                  <button className="px-3 py-1 text-sm text-white bg-blue-500 rounded-lg hover:bg-blue-600">
                    Edit
                  </button>
                  <button className="px-3 py-1 text-sm text-white bg-red-500 rounded-lg hover:bg-red-600">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {filteredPatients.length === 0 && (
              <tr>
                <td
                  colSpan="6"
                  className="px-6 py-4 text-center text-gray-500 text-sm"
                >
                  No patients found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default patients ;