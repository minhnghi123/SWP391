import React, { useState, useEffect } from "react";
import { Calendar, Syringe } from "lucide-react";
import useAxios from "../../../../utils/useAxios";
import SummaryCard from "./SummaryCard";
import AnalyticsOverview from "./AnalyticsOverview";
import VaccineInventory from "./VaccineInventory";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
  ArcElement 
} from "chart.js";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);
const url = import.meta.env.VITE_BASE_URL_DB
const Dashboard = () => {
  const api = useAxios();
  const [summaryData, setSummaryData] = useState({
    totalVaccinations: { value: 0, change: "Has been injected" },
    todayAppointments: { value: 0, remaining: "0 remaining" },
    availableVaccines: { value: 0, description: "Doses in inventory" },
    totalIncome: { value: 0, description: "Total Revenue" },
  });
  const [vaccines, setVaccines] = useState([]);
  const [displayedVaccines, setDisplayedVaccines] = useState([]);
  const [bookingPayments, setBookingPayments] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data functions...
  const fetchTotalVaccinations = async () => {
    try {
      const response = await api.get(`${url}/VaccinesTracking/get-all-admin`);
      const completedVaccinations = response.data.filter((v) => v.status.toLowerCase() === "completed").length;
      setSummaryData((prev) => ({
        ...prev,
        totalVaccinations: { value: completedVaccinations, change: "Has been injected" },
      }));
    } catch (err) {
      console.error("Error fetching total vaccinations:", err);
      setError("Failed to fetch total vaccinations.");
    }
  };

  const fetchAppointments = async () => {
    try {
      const response = await api.get(`${url}/Booking/get-all-booking`);
      const today = new Date().toISOString().split("T")[0];
      const todayBookings = response.data.filter((booking) => {
        const arrivedAt = new Date(booking.arrivedAt).toISOString().split("T")[0];
        return arrivedAt === today;
      });
      setBookings(response.data);
      setSummaryData((prev) => ({
        ...prev,
        todayAppointments: {
          value: todayBookings.length,
          remaining: `${todayBookings.length} remaining`,
        },
      }));
    } catch (err) {
      console.error("Error fetching appointments:", err);
      setError("Failed to fetch appointments.");
    }
  };

  const fetchVaccines = async () => {
    try {
      const response = await api.get(`${url}/Vaccine/get-all-vaccines-admin`);
      if (response.status !== 200) throw new Error("Failed to fetch vaccines");
      const totalDoses = response.data.reduce((sum, vaccine) => sum + (vaccine.quantity || 0), 0);
      setVaccines(response.data);
      setSummaryData((prev) => ({
        ...prev,
        availableVaccines: { value: totalDoses, description: "Doses in inventory" },
      }));
      setDisplayedVaccines(getRandomVaccines(response.data, 5));
    } catch (err) {
      console.error("Error fetching vaccines:", err);
      setError("Failed to fetch vaccines.");
    }
  };

  const fetchFinancialData = async () => {
    try {
      const bookingsResponse = await api.get(`${url}/Booking/get-all-booking`);
      if (bookingsResponse.status !== 200) throw new Error("Failed to fetch bookings");
      const bookingsData = bookingsResponse.data;
      const bookingAmounts = bookingsData.map((booking) => Number(booking.amount) || 0);
      setBookingPayments(bookingsData);
      setSummaryData((prev) => ({
        ...prev,
        totalIncome: { value: bookingAmounts.reduce((sum, amount) => sum + amount, 0), description: "Total Revenue" },
      }));
    } catch (err) {
      console.error("Error fetching financial data:", err);
      setError("Failed to fetch financial data.");
    } finally {
      setLoading(false);
    }
  };

  const getRandomVaccines = (array, count) => {
    if (!array || array.length === 0) return [];
    const shuffled = [...array].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, Math.min(count, array.length));
  };

  useEffect(() => {
    const fetchData = async () => {
      await Promise.all([fetchTotalVaccinations(), fetchAppointments(), fetchVaccines(), fetchFinancialData()]);
    };
    fetchData();
    const interval = setInterval(() => {
      if (vaccines.length > 0) setDisplayedVaccines(getRandomVaccines(vaccines, 5));
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const doughnutData = {
    labels: ["Completed", "Pending", "Scheduled"],
    datasets: [{
      data: [
        bookings.filter((booking) => booking.status === "Completed").length,
        bookings.filter((booking) => booking.status === "Pending").length,
        bookings.filter((booking) => booking.status === "Scheduled").length,
      ],
      backgroundColor: ["#4CAF50", "#FF9800", "#2196F3"],
      borderWidth: 0,
    }],
  };

  const lineData = {
    labels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    datasets: [{
      label: "Revenue ($)",
      data: bookingPayments.map((booking) => Number(booking.amount) || 0).slice(-7),
      borderColor: "#4CAF50",
      backgroundColor: "transparent",
      borderWidth: 2,
      pointRadius: 5,
      pointBackgroundColor: "#4CAF50",
      pointBorderColor: "#fff",
      pointBorderWidth: 2,
    }],
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Vaccination Center Dashboard</h1>
          <p className="text-sm text-gray-500">Monitor vaccinations, appointments, and inventory in real-time</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Calendar className="h-4 w-4" />
          <span>March 18th, 2025</span>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <SummaryCard
          title="Total Vaccinations"
          value={summaryData.totalVaccinations.value.toLocaleString()}
          description={summaryData.totalVaccinations.change}
          icon={Syringe}
        />
        <SummaryCard
          title="Today's Appointments"
          value={summaryData.todayAppointments.value}
          description={summaryData.todayAppointments.remaining}
          icon={Syringe}
        />
        <SummaryCard
          title="Available Vaccines"
          value={summaryData.availableVaccines.value.toLocaleString()}
          description={summaryData.availableVaccines.description}
          icon={Syringe}
        />
        <SummaryCard
          title="Total Income"
          value={`$${summaryData.totalIncome.value.toLocaleString()}`}
          description={summaryData.totalIncome.description}
          icon={Syringe}
        />
      </div>

      {/* Main Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AnalyticsOverview lineData={lineData} doughnutData={doughnutData} error={error} />
        <VaccineInventory displayedVaccines={displayedVaccines} loading={loading} error={error} />
      </div>
    </div>
  );
};

export default Dashboard;