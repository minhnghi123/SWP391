import React, { useState } from "react";
import { format, addMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, isSameMonth, isToday, parseISO } from "date-fns";
import { FaChevronLeft, FaChevronRight, FaPlus, FaEdit, FaTrash, FaClock } from "react-icons/fa";

const CalendarAppointmentTracker = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showAppointmentForm, setShowAppointmentForm] = useState(false);
  const [appointments, setAppointments] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    time: "",
    duration: 30
  });

  const dummyAppointments = [
    {
      id: 1,
      title: "Doctor Appointment",
      date: new Date().toISOString(),
      time: "10:00",
      duration: 30
    },
    {
      id: 2,
      title: "Dentist",
      date: new Date().toISOString(),
      time: "14:30",
      duration: 60
    }
  ];

  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));
  const prevMonth = () => setCurrentDate(addMonths(currentDate, -1));

  const days = eachDayOfInterval({
    start: startOfMonth(currentDate),
    end: endOfMonth(currentDate)
  });

  const handleDateClick = (date) => {
    setSelectedDate(date);
  };

  const handleAppointmentSubmit = (e) => {
    e.preventDefault();
    const newAppointment = {
      id: Date.now(),
      ...formData,
      date: selectedDate.toISOString()
    };
    setAppointments([...appointments, newAppointment]);
    setShowAppointmentForm(false);
    setFormData({ title: "", time: "", duration: 30 });
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Calendar Section */}
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-800">
              {format(currentDate, "MMMM yyyy")}
            </h2>
            <div className="flex space-x-2">
              <button
                onClick={prevMonth}
                className="p-1 rounded hover:bg-gray-100"
              >
                <FaChevronLeft className="text-gray-600" />
              </button>
              <button
                onClick={nextMonth}
                className="p-1 rounded hover:bg-gray-100"
              >
                <FaChevronRight className="text-gray-600" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-1 mb-2">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div
                key={day}
                className="text-center text-sm font-medium text-gray-600 py-1"
              >
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1">
            {days.map((day) => (
              <button
                key={day.toString()}
                onClick={() => handleDateClick(day)}
                className={`
                  p-2 rounded transition-colors text-center
                  ${isSameMonth(day, currentDate) ? "" : "text-gray-400"}
                  ${isSameDay(day, selectedDate) ? "bg-blue-500 text-white" : ""}
                  ${isToday(day) ? "border border-blue-500" : ""}
                  hover:bg-blue-100
                `}
              >
                <span className="text-sm">{format(day, "d")}</span>
                {dummyAppointments.some((apt) =>
                  isSameDay(parseISO(apt.date), day)
                ) && (
                  <div className="w-1 h-1 bg-green-500 rounded-full mx-auto mt-1" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Appointments Section */}
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">
              {format(selectedDate, "MMMM d, yyyy")}
            </h3>
            <button
              onClick={() => setShowAppointmentForm(true)}
              className="flex items-center px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600"
            >
              <FaPlus className="mr-1" /> Add
            </button>
          </div>

          {showAppointmentForm ? (
            <form onSubmit={handleAppointmentSubmit} className="space-y-3">
              <div>
                <input
                  type="text"
                  placeholder="Appointment Title"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className="w-full p-2 border rounded text-sm"
                  required
                />
              </div>
              <div>
                <input
                  type="time"
                  value={formData.time}
                  onChange={(e) =>
                    setFormData({ ...formData, time: e.target.value })
                  }
                  className="w-full p-2 border rounded text-sm"
                  required
                />
              </div>
              <div>
                <select
                  value={formData.duration}
                  onChange={(e) =>
                    setFormData({ ...formData, duration: Number(e.target.value) })
                  }
                  className="w-full p-2 border rounded text-sm"
                >
                  <option value="30">30 min</option>
                  <option value="60">1 hr</option>
                  <option value="90">1.5 hrs</option>
                  <option value="120">2 hrs</option>
                </select>
              </div>
              <div className="flex space-x-2">
                <button
                  type="submit"
                  className="flex-1 bg-blue-500 text-white py-2 rounded text-sm hover:bg-blue-600"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => setShowAppointmentForm(false)}
                  className="flex-1 bg-gray-200 text-gray-800 py-2 rounded text-sm hover:bg-gray-300"
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-2">
              {dummyAppointments
                .filter((apt) => isSameDay(parseISO(apt.date), selectedDate))
                .map((appointment) => (
                  <div
                    key={appointment.id}
                    className="p-3 border rounded hover:shadow-sm"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-medium text-gray-800 text-sm">
                        {appointment.title}
                      </h4>
                      <div className="flex space-x-1">
                        <button className="p-1 hover:text-blue-500">
                          <FaEdit size={12} />
                        </button>
                        <button className="p-1 hover:text-red-500">
                          <FaTrash size={12} />
                        </button>
                      </div>
                    </div>
                    <div className="flex items-center text-gray-500 text-xs">
                      <FaClock className="mr-1" size={10} />
                      {appointment.time} ({appointment.duration} min)
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CalendarAppointmentTracker;
