import React, { useState, useEffect } from "react";
import { Line, Bar, Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, LineElement, BarElement, PointElement, CategoryScale, LinearScale, ArcElement, Tooltip, Legend } from "chart.js";
import { FiUser, FiCalendar, FiCheckCircle, FiBarChart2 } from "react-icons/fi";
import useAxios from "../../../utils/useAxios";

const url = import.meta.env.VITE_BASE_URL_DB;

ChartJS.register(LineElement, BarElement, PointElement, CategoryScale, LinearScale, ArcElement, Tooltip, Legend);

const DashboardOverview = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [newPatients, setNewPatients] = useState(0);
  const [pendingAppointments, setPendingAppointments] = useState(0);
  const [vaccinationsCompleted, setVaccinationsCompleted] = useState(0);
  const [totalIncome, setTotalIncome] = useState(0);
  const [bookingPayments, setBookingPayments] = useState([]);
  const [bookings, setBookings] = useState([]); // For Doughnut chart
  const [vaccinesTracking, setVaccinesTracking] = useState([]); // For Bar chart
  const api = useAxios()

  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      setError(null);

      const tenDaysAgo = new Date();
      tenDaysAgo.setDate(tenDaysAgo.getDate() - 10);

      try {
        // Fetch New Patients
        const usersResponse = await fetch("https://localhost:7280/api/User/get-all-user-admin");
        if (!usersResponse.ok) throw new Error("Failed to fetch users");
        const users = await usersResponse.json();
        const recentUsers = users.filter(user => new Date(user.createdAt) >= tenDaysAgo);
        setNewPatients(recentUsers.length);

        // Fetch Bookings (for Appointments and Total Income)
        const bookingsResponse = await fetch("https://localhost:7280/api/Booking");
        if (!bookingsResponse.ok) throw new Error("Failed to fetch bookings");
        const bookingsData = await bookingsResponse.json();
        const recentBookings = bookingsData.filter(booking => new Date(booking.arrivedAt) >= tenDaysAgo);
        setPendingAppointments(recentBookings.length);
        const bookingAmounts = bookingsData.map(booking => Number(booking.amount) || 0);
        setBookingPayments(bookingsData);
        setBookings(bookingsData); // Store bookings for Doughnut chart
        setTotalIncome(bookingAmounts.reduce((sum, amount) => sum + amount, 0));

        // Fetch Vaccines Tracking
        const vaccinesResponse = await fetch("https://localhost:7280/api/VaccinesTracking");
        if (!vaccinesResponse.ok) throw new Error("Failed to fetch vaccines tracking");
        const vaccinesData = await vaccinesResponse.json();
        const completedVaccines = vaccinesData.filter(
          vaccine => new Date(vaccine.vaccinationDate) >= tenDaysAgo && vaccine.status === "COMPLETED"
        );
        setVaccinationsCompleted(completedVaccines.length);
        setVaccinesTracking(vaccinesData); // Store vaccines tracking for Bar chart

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
        bookings.filter(booking => booking.status === "Completed").length,
        bookings.filter(booking => booking.status === "Pending").length,
        bookings.filter(booking => booking.status === "Scheduled").length,
      ],
      backgroundColor: ["#4CAF50", "#FF9800", "#2196F3"],
    }],
  };

  // Bar Chart Data (Daily Vaccinations - Completed)
  const getDailyVaccinations = () => {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const dailyCounts = Array(7).fill(0);

    vaccinesTracking
      .filter(vaccine => vaccine.status === "COMPLETED")
      .forEach(vaccine => {
        const date = new Date(vaccine.vaccinationDate); // Assuming vaccinationDate is the correct field
        const dayIndex = date.getDay(); // 0 = Sunday, 1 = Monday, etc.
        dailyCounts[dayIndex]++;
      });

    return {
      labels: days,
      datasets: [{
        label: "Vaccinations",
        data: dailyCounts,
        backgroundColor: "#2196F3",
      }],
    };
  };

  const lineData = {
    labels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    datasets: [
      {
        label: "Revenue",
        data: bookingPayments.map(booking => Number(booking.amount) || 0).slice(-7),
        borderColor: "#4CAF50",
        backgroundColor: "rgba(76, 175, 80, 0.2)",
        borderWidth: 2,
        tension: 0.4,
      },
    ],
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen flex flex-col items-center">
      <div className="w-full max-w-7xl bg-white p-8 rounded-3xl shadow-xl">
        <h2 className="text-4xl font-bold mb-6 text-gray-800 text-center">Vaccine Center Dashboard</h2>

        {error && <div className="mb-4 text-red-500 text-center">{error}</div>}

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          {[
            { title: "New Patients", value: loading ? "Loading..." : newPatients, icon: <FiUser className="text-blue-500" /> },
            { title: "Appointments", value: loading ? "Loading..." : pendingAppointments, icon: <FiCalendar className="text-orange-500" /> },
            { title: "Vaccinations Done", value: loading ? "Loading..." : vaccinationsCompleted, icon: <FiCheckCircle className="text-purple-500" /> },
            { title: "Total Income", value: loading ? "Loading..." : `$${totalIncome.toLocaleString()}`, icon: <FiBarChart2 className="text-green-500" /> },
          ].map((item, index) => (
            <div key={index} className="bg-gray-50 p-6 rounded-xl shadow-md flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-700">{item.title}</h3>
                <p className="text-2xl font-bold text-gray-900 mt-2">{item.value}</p>
              </div>
              <div className="text-3xl">{item.icon}</div>
            </div>
          ))}
        </div>

        {/* Charts and Reports */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-4 rounded-xl shadow-md">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Revenue Trend</h3>
            <Line data={lineData} />
          </div>
          <div className="bg-white p-4 rounded-xl shadow-md">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Appointments</h3>
            <Doughnut data={doughnutData} />
          </div>
          <div className="bg-white p-4 rounded-xl shadow-md">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Daily Vaccinations</h3>
            <Bar data={getDailyVaccinations()} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;