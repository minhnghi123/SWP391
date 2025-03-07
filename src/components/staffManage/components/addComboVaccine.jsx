import React, { useState } from "react";
import axios from "axios";
import { Plus } from "lucide-react";

const AddVaccineComboComponent = () => {
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [newVaccineCombo, setNewVaccineCombo] = useState({
   comboName:"",
   discount:"",
   totalPrice:"",
   status:"",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewVaccineCombo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };


  const handleAddVaccine = async () => {
    setLoading(true);
    setError(null);

    // Transform data to match the provided JSON field names and types
    const vaccineComnboData = {
        comboName: newVaccineCombo.comboName,
        discount: parseInt(newVaccineCombo.discount),
        totalPrice: parseFloat(newVaccineCombo.totalPrice),
        status: newVaccineCombo.status,
    };
    console.log("Sending vaccine data:", vaccineComnboData);

    try {
      const response = await axios.post(
        "https://localhost:7280/api/VaccineCombo/createVaccineCombo",
        vaccineComnboData
      );
  
      if (response.status === 201 || response.status === 200) {
        alert("Vaccine added successfully!");
        setShowForm(false);
        window.location.reload(); // Reload page after successful addition
      } else {
        alert("Failed to add vaccine.");
      }
    } catch (error) {
      console.error("Error adding vaccine:", error.response?.data || error);
      setError(
        error.response?.data?.message || "Unknown error occurred while adding vaccine."
      );
    } finally {
      setLoading(false);
    }
  } 


  return (
    <>
      <button
        onClick={() => setShowForm(!showForm)}
        className="bg-gradient-to-r from-teal-500 to-emerald-500 text-white px-4 py-2 rounded-full hover:from-teal-600 hover:to-emerald-600 transition-all duration-300 flex items-center gap-2 shadow-lg shadow-teal-500/20"
      >
        <Plus className="w-5 h-5" />
        Add Combo Vaccine Stock
      </button>

      {showForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-2xl shadow-2xl w-[600px] max-w-[90%] text-center relative">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">
              Add Combo Vaccines
            </h2>

            {error && <div className="mb-4 text-red-500 text-sm">{error}</div>}

            <div className="grid grid-cols-2 gap-4 mb-6">
              {[
                { name: "comboName", placeholder: "Combo Vaccine Name", type: "text" },
                { name: "discount", placeholder: "Discount", type: "number" },
                { name: "totalPrice", placeholder: "Total Price", type: "number" },
                { name: "status", placeholder: "Status", type: "text" },
            
              ].map((field, index) => (
                <input
                  key={index}
                  type={field.type}
                  name={field.name}
                  placeholder={field.placeholder}
                  value={setNewVaccineCombo[field.name]}
                  onChange={handleInputChange}
                  className="w-full p-2.5 border border-gray-300 rounded-md focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors"
                  min={field.type === "number" ? "0" : undefined}
                />
              ))}
            </div>
            <div className="mt-6 flex justify-end space-x-4">
              <button
                onClick={() => setShowForm(false)}
                className="px-6 py-2.5 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAddVaccine}
                disabled={loading}
                className="px-6 py-2.5 bg-gradient-to-r from-teal-500 to-emerald-500 text-white rounded-lg hover:from-teal-600 hover:to-emerald-600 transition-all duration-300 shadow-lg shadow-teal-500/20"
              >
                {loading ? "Adding..." : "Add Vaccine"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AddVaccineComboComponent;