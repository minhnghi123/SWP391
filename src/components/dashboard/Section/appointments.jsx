import React, { useState } from "react";

const appointments = () => {
  const [appointments, setAppointments] = useState([
    { id: 1, name: "John Doe", date: "2025-01-30", time: "10:00 AM", status: "Confirmed" },
    { id: 2, name: "Jane Smith", date: "2025-02-01", time: "2:00 PM", status: "Pending" },
    { id: 3, name: "Michael Brown", date: "2025-02-05", time: "11:30 AM", status: "Cancelled" },
  ]);
  const [search, setSearch] = useState("");
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({ name: "", date: "", time: "" });

  const [showInputs, setShowInputs] = useState(false);
  const [formData, setFormData] = useState({ name: "", date: "", time: "" });

  const handleToggle = () => setShowInputs(!showInputs);
  const handleSearch = (e) => setSearch(e.target.value);

  // Xử lý thêm cuộc hẹn mới
  const handleAddAppointment = () => {
    if (formData.name && formData.date && formData.time) {
      setAppointments([
        ...appointments,
        { id: Date.now(), ...formData, status: "Pending" },
      ]);
      setFormData({ name: "", date: "", time: "" });
      setShowInputs(false);
    }
  };

  // Xử lý chỉnh sửa
  const handleEdit = (appointment) => {
    setEditId(appointment.id);
    setEditData({ name: appointment.name, date: appointment.date, time: appointment.time });
  };

  const handleEditChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleSave = (id) => {
    setAppointments((prev) =>
      prev.map((appt) => (appt.id === id ? { ...appt, ...editData } : appt))
    );
    setEditId(null);
  };

  // Xóa cuộc hẹn
  const handleDelete = (id) => {
    setAppointments((prev) => prev.filter((appt) => appt.id !== id));
  };

  const filteredAppointments = appointments.filter((appointment) =>
    appointment.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex flex-col items-center">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">📅 Manage Appointments</h1>

      {/* Nút thêm cuộc hẹn */}
      <div className="mb-6">
        <button
          onClick={handleToggle}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition duration-200"
        >
          {showInputs ? "Close" : "+ Add Appointment"}
        </button>
      </div>

      {/* Form thêm cuộc hẹn */}
      {showInputs && (
        <div className="mb-6 flex flex-wrap gap-4">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="p-3 rounded-lg border border-gray-300 text-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full md:w-auto flex-1"
          />
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            className="p-3 rounded-lg border border-gray-300 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full md:w-auto flex-1"
          />
          <input
            type="time"
            name="time"
            value={formData.time}
            onChange={(e) => setFormData({ ...formData, time: e.target.value })}
            className="p-3 rounded-lg border border-gray-300 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full md:w-auto flex-1"
          />
          <button
            onClick={handleAddAppointment}
            className="px-4 py-2 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition duration-200"
          >
            Save
          </button>
        </div>
      )}

      {/* Thanh tìm kiếm */}
      <div className="mb-6 w-full max-w-lg">
        <input
          type="text"
          placeholder="🔍 Search by name..."
          value={search}
          onChange={handleSearch}
          className="w-full p-3 rounded-lg border border-gray-300 text-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {/* Bảng danh sách cuộc hẹn */}
      <div className="bg-white shadow-lg rounded-xl overflow-hidden w-full max-w-4xl">
        <table className="w-full border-collapse">
          <thead className="bg-gray-200 text-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold">Name</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Date</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Time</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Status</th>
              <th className="px-6 py-3 text-right text-sm font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredAppointments.map((appointment) => (
              <tr key={appointment.id} className="border-b hover:bg-gray-100 transition">
                <td className="px-6 py-4 text-sm text-gray-800">
                  {editId === appointment.id ? (
                    <input
                      type="text"
                      name="name"
                      value={editData.name}
                      onChange={handleEditChange}
                      className="p-1 border border-gray-300 rounded"
                    />
                  ) : (
                    appointment.name
                  )}
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {editId === appointment.id ? (
                    <input
                      type="date"
                      name="date"
                      value={editData.date}
                      onChange={handleEditChange}
                      className="p-1 border border-gray-300 rounded"
                    />
                  ) : (
                    appointment.date
                  )}
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {editId === appointment.id ? (
                    <input
                      type="time"
                      name="time"
                      value={editData.time}
                      onChange={handleEditChange}
                      className="p-1 border border-gray-300 rounded"
                    />
                  ) : (
                    appointment.time
                  )}
                </td>
                <td className="px-6 py-4 text-sm font-medium">{appointment.status}</td>
                <td className="px-6 py-4 text-right space-x-2">
                  {editId === appointment.id ? (
                    <button onClick={() => handleSave(appointment.id)} className="px-3 py-1 text-white bg-green-500 rounded-lg hover:bg-green-600">
                      Save
                    </button>
                  ) : (
                    <button onClick={() => handleEdit(appointment)} className="px-3 py-1 text-white bg-blue-500 rounded-lg hover:bg-blue-600">
                      Edit
                    </button>
                  )}
                  <button onClick={() => handleDelete(appointment.id)} className="px-3 py-1 text-white bg-red-500 rounded-lg hover:bg-red-600">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default appointments;