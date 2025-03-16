import React, { useState, useEffect } from "react";
import { Line, Doughnut, Pie } from "react-chartjs-2";
import { Chart as ChartJS, LineElement, PointElement, CategoryScale, LinearScale, ArcElement, Tooltip, Legend, Filler } from "chart.js";
import { FiUser, FiCalendar, FiCheckCircle, FiBarChart2, FiClock } from "react-icons/fi";

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, ArcElement, Tooltip, Legend, Filler);


const DashboardOverview = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [newPatients, setNewPatients] = useState(0);
  const [pendingAppointments, setPendingAppointments] = useState(0);
  const [vaccinationsCompleted, setVaccinationsCompleted] = useState(0);
  const [totalIncome, setTotalIncome] = useState(0);
  const [bookingPayments, setBookingPayments] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [vaccinesTracking, setVaccinesTracking] = useState([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      setError(null);

      const tenDaysAgo = new Date();
      tenDaysAgo.setDate(tenDaysAgo.getDate() - 10);

      try {
        const usersResponse = await fetch("https://localhost:7280/api/User/get-all-user-admin");
        if (!usersResponse.ok) throw new Error("Failed to fetch users");
        const users = await usersResponse.json();
        const recentUsers = users.filter(user => new Date(user.createdAt) >= tenDaysAgo);
        setNewPatients(recentUsers.length);

        const bookingsResponse = await fetch("https://localhost:7280/api/Booking/get-all-booking");
        if (!bookingsResponse.ok) throw new Error("Failed to fetch bookings");
        const bookingsData = await bookingsResponse.json();
        const recentBookings = bookingsData.filter(booking => new Date(booking.arrivedAt) >= tenDaysAgo);
        setPendingAppointments(recentBookings.length);
        const bookingAmounts = bookingsData.map(booking => Number(booking.amount) || 0);
        setBookingPayments(bookingsData);
        setBookings(bookingsData);
        setTotalIncome(bookingAmounts.reduce((sum, amount) => sum + amount, 0));

        const vaccinesResponse = await fetch("https://localhost:7280/api/VaccinesTracking/get-all-admin");
        if (!vaccinesResponse.ok) throw new Error("Failed to fetch vaccines tracking");
        const vaccinesData = await vaccinesResponse.json();
        console.log("Vaccines Tracking Data:", vaccinesData);
        const completedVaccines = vaccinesData.filter(vaccine => vaccine.status.toUpperCase() === "COMPLETED");
        setVaccinationsCompleted(completedVaccines.length);
        setVaccinesTracking(vaccinesData);

      } catch (err) {
        console.error("Error fetching dashboard data:", err);
        setError("Failed to load dashboard data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // Doughnut Chart Data (Booking Status)
  const doughnutData = {
    labels: ["Completed", "Pending", "Scheduled"],
    datasets: [{
      data: [
        bookings.filter(booking => booking.status.toUpperCase() === "COMPLETED").length,
        bookings.filter(booking => booking.status.toUpperCase() === "PENDING").length,
        bookings.filter(booking => booking.status.toUpperCase() === "SCHEDULED").length,
      ],
      backgroundColor: ["#39FF14", "#FF073A", "#00DDEB"],
      borderWidth: 1,
      hoverOffset: 10,
    }],
  };

  // Pie Chart Data (Vaccination Status: COMPLETED, SCHEDULED, WAITING)
  const pieData = {
    labels: ["Completed", "Schedule", "Waiting"],
    datasets: [{
      data: [
        vaccinesTracking.filter(vaccine => vaccine.status.toUpperCase() === "COMPLETED").length,
        vaccinesTracking.filter(vaccine => vaccine.status.toUpperCase() === "SCHEDULE").length,
        vaccinesTracking.filter(vaccine => vaccine.status.toUpperCase() === "WAITING").length,
      ],
      backgroundColor: ["#39FF14", "#00DDEB", "#FF073A"],
      borderWidth: 1,
      hoverOffset: 10,
    }],
  };

  // Area Chart Data (Revenue Over Time)
  const areaData = {
    labels: Array(bookingPayments.length).fill().map((_, i) => `Booking ${i + 1}`),
    datasets: [{
      label: "Revenue",
      data: bookingPayments.map(booking => Number(booking.amount) || 0),
      borderColor: "#39FF14",
      backgroundColor: "rgba(57, 255, 20, 0.4)",
      fill: true,
      borderWidth: 2,
      tension: 0.3,
      pointRadius: 2,
      pointBackgroundColor: "#39FF14",
    }],
  };

  return (
    <div className="p-4 sm:p-6 bg-gradient-to-br from-gray-50 to-gray-200 min-h-screen flex items-center justify-center">
      <div className="w-full max-w-6xl bg-white p-6 sm:p-8 rounded-3xl shadow-2xl border border-gray-200">
        <h2 className="text-2xl sm:text-3xl font-extrabold mb-6 text-gray-900 text-center tracking-tight">
          Vaccine Center Dashboard
        </h2>

        {error && <div className="mb-4 text-red-600 text-center font-medium">{error}</div>}

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {[
            {
              title: "New Patients",
              subtitle: "Added in last 10 days",
              value: loading ? "Loading..." : newPatients,
              icon: <FiUser className="text-cyan-400" />,
              secondaryIcon: <FiClock className="text-cyan-400" />,
              color: "bg-gradient-to-br from-teal-900 to-teal-700",
            },
            {
              title: "Appointments",
              subtitle: "Scheduled in last 10 days",
              value: loading ? "Loading..." : pendingAppointments,
              icon: <FiCalendar className="text-pink-500" />,
              secondaryIcon: <FiClock className="text-pink-500" />,
              color: "bg-gradient-to-br from-pink-900 to-pink-700",
            },
            {
              title: "Vaccinations Done",
              value: loading ? "Loading..." : vaccinationsCompleted,
              icon: <FiCheckCircle className="text-green-400" />,
              secondaryIcon: null,
              color: "bg-gradient-to-br from-green-900 to-green-700",
            },
            {
              title: "Total Income",
              value: loading ? "Loading..." : `$${totalIncome.toLocaleString()}`,
              icon: <FiBarChart2 className="text-purple-400" />,
              secondaryIcon: null,
              color: "bg-gradient-to-br from-purple-900 to-purple-700",
            },
          ].map((item, index) => (
            <div
              key={index}
              className={`${item.color} p-4 sm:p-5 rounded-xl shadow-md flex items-center justify-between text-white transition-all duration-300 hover:shadow-lg`}
            >
              <div className="flex flex-col">
                <h3 className="text-sm sm:text-base font-semibold">{item.title}</h3>
                {item.subtitle && (
                  <div className="flex items-center mt-1 text-xs font-medium bg-opacity-50 bg-gray-800 px-2 py-1 rounded-full">
                    <span className="mr-1">{item.secondaryIcon}</span>
                    {item.subtitle}
                  </div>
                )}
                <p className="text-xl sm:text-2xl font-bold mt-2">{item.value}</p>
              </div>
              <div className="text-2xl sm:text-3xl">{item.icon}</div>
            </div>
          ))}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-white p-4 sm:p-5 rounded-xl shadow-md border border-gray-200">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3">Revenue Over Time</h3>
            <div className="h-40 sm:h-48">
              <Line
                data={areaData}
                options={{
                  maintainAspectRatio: false,
                  scales: {
                    x: { display: false },
                    y: { beginAtZero: true, ticks: { color: "#4B5563" } },
                  },
                  plugins: {
                    legend: { position: "top", labels: { font: { size: 12 }, color: "#4B5563" } },
                  },
                }}
              />
            </div>
          </div>
          <div className="bg-white p-4 sm:p-5 rounded-xl shadow-md border border-gray-200">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3">Appointments Status</h3>
            <div className="h-40 sm:h-48">
              <Doughnut
                data={doughnutData}
                options={{
                  maintainAspectRatio: false,
                  plugins: { legend: { position: "top", labels: { font: { size: 12 }, color: "#4B5563" } } },
                }}
              />
            </div>
          </div>
          <div className="bg-white p-4 sm:p-5 rounded-xl shadow-md border border-gray-200">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3">Vaccination Status</h3>
            <div className="h-40 sm:h-48">
              {vaccinesTracking.length > 0 ? (
                <Pie
                  data={pieData}
                  options={{
                    maintainAspectRatio: false,
                    plugins: { legend: { position: "top", labels: { font: { size: 12 }, color: "#4B5563" } } },
                  }}
                />
              ) : (
                <p className="text-gray-600 text-center">No vaccination data available</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;