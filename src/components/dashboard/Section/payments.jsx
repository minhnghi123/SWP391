import React, { useState } from "react";

const PaymentSummary = () => {
  const [payments, setPayments] = useState([
    { id: 1, name: "Nguyen Van A", amount: 500000, method: "Credit Card", date: "2025-02-07", phone: "0123456789", email: "a@example.com", notes: "Paid in full" },
    { id: 2, name: "Tran Thi B", amount: 300000, method: "Cash", date: "2025-02-06", phone: "0987654321", email: "b@example.com", notes: "Pending confirmation" },
    { id: 3, name: "Le Van C", amount: 700000, method: "Bank Transfer", date: "2025-02-05", phone: "0112233445", email: "c@example.com", notes: "Partial payment" },
    { id: 4, name: "Pham Thi D", amount: 400000, method: "Cash", date: "2025-02-04", phone: "0998877665", email: "d@example.com", notes: "Paid in full" },
    { id: 5, name: "Hoang Van E", amount: 600000, method: "Credit Card", date: "2025-02-03", phone: "0123456789", email: "t@example.com", notes: "Pending confirmation" },
    ]);

  const [search, setSearch] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  const handleEdit = (index) => {
    setEditIndex(editIndex === index ? null : index);
  };

  const handleChange = (index, field, value) => {
    const updatedPayments = [...payments];
    updatedPayments[index][field] = value;
    setPayments(updatedPayments);
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const filteredPayments = payments.filter((payment) =>
    payment.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 bg-gray-50 min-h-screen justify-center items-center">
      <div className="w-full bg-white p-6 rounded-2xl shadow-lg overflow-x-auto">
        <h2 className="text-3xl font-bold mb-4 text-gray-800 text-center">Payments</h2>
        
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search by name..."
            value={search}
            onChange={handleSearch}
            className="w-full p-3 rounded-lg border border-gray-300 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-100 border-b">
              <tr>
                <th className="p-3 text-sm font-medium text-gray-600">ID</th>
                <th className="p-3 text-sm font-medium text-gray-600">Name</th>
                <th className="p-3 text-sm font-medium text-gray-600">Amount (VND)</th>
                <th className="p-3 text-sm font-medium text-gray-600">Method</th>
                <th className="p-3 text-sm font-medium text-gray-600">Date</th>
                <th className="p-3 text-sm font-medium text-gray-600">Phone</th>
                <th className="p-3 text-sm font-medium text-gray-600">Email</th>
                <th className="p-3 text-sm font-medium text-gray-600">Notes</th>
                <th className="p-3 text-right text-sm font-medium text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPayments.map((payment, index) => (
                <tr key={payment.id} className="border-b hover:bg-gray-50">
                  <td className="p-3 text-sm text-gray-800">{payment.id}</td>
                  <td className="p-3 text-sm text-gray-800">
                    {editIndex === index ? (
                      <input 
                        value={payment.name} 
                        onChange={(e) => handleChange(index, "name", e.target.value)}
                        className="border p-1 rounded w-full"
                      />
                    ) : (
                      payment.name
                    )}
                  </td>
                  <td className="p-3 text-sm text-gray-600">
                    {editIndex === index ? (
                      <input 
                        type="number" 
                        value={payment.amount} 
                        onChange={(e) => handleChange(index, "amount", e.target.value)}
                        className="border p-1 rounded w-full"
                      />
                    ) : (
                      payment.amount.toLocaleString()
                    )}
                  </td>
                  <td className="p-3 text-sm text-gray-600">
                    {editIndex === index ? (
                      <input 
                        value={payment.method} 
                        onChange={(e) => handleChange(index, "method", e.target.value)}
                        className="border p-1 rounded w-full"
                      />
                    ) : (
                      payment.method
                    )}
                  </td>
                  <td className="p-3 text-sm text-gray-600">
                    {editIndex === index ? (
                      <input 
                        type="date" 
                        value={payment.date} 
                        onChange={(e) => handleChange(index, "date", e.target.value)}
                        className="border p-1 rounded w-full"
                      />
                    ) : (
                      payment.date
                    )}
                  </td>
                  <td className="p-3 text-sm text-gray-600">{payment.phone}</td>
                  <td className="p-3 text-sm text-gray-600">{payment.email}</td>
                  <td className="p-3 text-sm text-gray-600">{payment.notes}</td>
                  <td className="p-3 text-right space-x-2">
                    <button 
                      onClick={() => handleEdit(index)} 
                      className="px-3 py-1 text-sm text-white bg-blue-500 rounded-lg hover:bg-blue-600">
                      {editIndex === index ? "Save" : "Edit"}
                    </button>
                    <button 
                      className="px-3 py-1 text-sm text-white bg-red-500 rounded-lg hover:bg-red-600">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {filteredPayments.length === 0 && (
                <tr>
                  <td colSpan="9" className="p-3 text-center text-gray-500 text-sm">
                    No payments found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PaymentSummary;