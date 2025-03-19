import { useState } from "react";
import { CheckCircle2, Clock, XCircle, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

export function AppointmentsTable({ bookings }) {
  const [sortBy, setSortBy] = useState("time");
  const [sortOrder, setSortOrder] = useState("asc");

  // Handle sorting
  const handleSort = (column) => {
    setSortOrder(sortBy === column ? (sortOrder === "asc" ? "desc" : "asc") : "asc");
    setSortBy(column);
  };

  // Map status to icons and colors
  const getStatusStyle = (status) => {
    const styles = {
      Completed: { icon: <CheckCircle2 className="h-4 w-4 text-green-500" />, bg: "bg-green-50 text-green-700" },
      "In Progress": { icon: <Clock className="h-4 w-4 text-yellow-500" />, bg: "bg-yellow-50 text-yellow-700" },
      Scheduled: { icon: <Clock className="h-4 w-4 text-blue-500" />, bg: "bg-blue-50 text-blue-700" },
      Cancelled: { icon: <XCircle className="h-4 w-4 text-red-500" />, bg: "bg-red-50 text-red-700" },
    };
    return styles[status] || { icon: <Clock className="h-4 w-4 text-gray-500" />, bg: "bg-gray-50 text-gray-700" };
  };

  // Sort bookings
  const sortedBookings = [...bookings].sort((a, b) => {
    let aValue, bValue;
    switch (sortBy) {
      case "id":
        aValue = a.id || "";
        bValue = b.id || "";
        break;
      case "name":
        aValue = a.name || "";
        bValue = b.name || "";
        break;
      case "time":
        aValue = new Date(a.arrivedAt).getTime();
        bValue = new Date(b.arrivedAt).getTime();
        break;
      case "vaccine":
        aValue = a.vaccineName || "";
        bValue = b.vaccineName || "";
        break;
      case "status":
        aValue = a.status || "";
        bValue = b.status || "";
        break;
      default:
        aValue = a.arrivedAt;
        bValue = b.arrivedAt;
    }
    return sortOrder === "asc" ? (aValue > bValue ? 1 : -1) : (aValue < bValue ? 1 : -1);
  });

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100">
      {/* Header */}
      <div className="px-4 py-3 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800">Today's Appointments</h3>
        <p className="text-sm text-gray-500">Track and manage today's vaccination schedule</p>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-700">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              {["ID", "Name", "Time", "Vaccine", "Status"].map((column) => (
                <th
                  key={column}
                  className="px-4 py-2 font-medium text-gray-600 cursor-pointer hover:text-gray-800"
                  onClick={() => handleSort(column.toLowerCase())}
                >
                  <div className="flex items-center gap-1">
                    {column}
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                    </svg>
                  </div>
                </th>
              ))}
              <th className="px-4 py-2 font-medium text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedBookings.length > 0 ? (
              sortedBookings.map((booking) => {
                const statusStyle = getStatusStyle(booking.status);
                return (
                  <tr key={booking.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 font-medium">{booking.id || "N/A"}</td>
                    <td className="px-4 py-3">{booking.name || "Unknown"}</td>
                    <td className="px-4 py-3">
                      {new Date(booking.arrivedAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${statusStyle.bg}`}>
                        {statusStyle.icon}
                        {booking.advisory_detail || "Unknown"}
                      </span>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="6" className="px-4 py-4 text-center text-gray-500">
                  No appointments scheduled for today.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AppointmentsTable;