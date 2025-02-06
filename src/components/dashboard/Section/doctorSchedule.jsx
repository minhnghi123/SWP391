import React, { useState } from "react";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

const doctorSchedule = () => {
  const [search, setSearch] = useState("");

  // Danh sách lịch làm việc của bác sĩ
  const schedules = [
    { id: 1, doctor: "Dr. John Doe", specialty: "Cardiologist", date: "2025-02-10", time: "09:00 AM - 12:00 PM" },
    { id: 2, doctor: "Dr. Emily Smith", specialty: "Pediatrician", date: "2025-02-10", time: "01:00 PM - 04:00 PM" },
    { id: 3, doctor: "Dr. Michael Brown", specialty: "Dermatologist", date: "2025-02-11", time: "10:00 AM - 01:00 PM" },
    { id: 4, doctor: "Dr. Sarah Lee", specialty: "Neurologist", date: "2025-02-12", time: "02:00 PM - 05:00 PM" },
  ];

  // Lọc danh sách theo tên bác sĩ
  const filteredSchedules = schedules.filter((schedule) =>
    schedule.doctor.toLowerCase().includes(search.toLowerCase())
  );

  // Convert dữ liệu lịch sang dạng sự kiện của FullCalendar
  const events = filteredSchedules.map((schedule) => ({
    title: `${schedule.doctor} - ${schedule.time}`,
    start: schedule.date, 
    allDay: true, 
  }));

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Doctor Schedule</h1>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition duration-200">
          + Add Schedule
        </button>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by doctor's name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-3 rounded-lg border border-gray-300 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {/* Calendar Section */}
      <div className="bg-white rounded-lg shadow p-4">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          events={events}
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay",
          }}
          height="auto"
        />
      </div>
    </div>
  );
};

export default doctorSchedule;
