import React, { useState, useEffect } from "react";
import { Calendar, Syringe, CircleDollarSign } from "lucide-react";
import useAxios from "../../../../utils/useAxios";
import SummaryCard from "./SummaryCard";
import VaccineInventory from "./VaccineInventory";
import DashboardChart from "./appointmentChart";

const url = import.meta.env.VITE_BASE_URL_DB;

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

  // Fetch data functions (unchanged)
  const fetchTotalVaccinations = async () => {
    try {
      const response = await api.get(`${url}/VaccinesTracking/get-all-admin`);
      const completedVaccinations = response.data.filter(
        (v) => v.status.toLowerCase() === "completed"
      ).length;
      setSummaryData((prev) => ({
        ...prev,
        totalVaccinations: {
          value: completedVaccinations,
          change: "Has been injected",
        },
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
        const arrivedAt = new Date(booking.arrivedAt)
          .toISOString()
          .split("T")[0];
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
      const totalDoses = response.data.reduce(
        (sum, vaccine) => sum + (vaccine.quantity || 0),
        0
      );
      setVaccines(response.data);
      setSummaryData((prev) => ({
        ...prev,
        availableVaccines: {
          value: totalDoses,
          description: "Doses in inventory",
        },
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
      if (bookingsResponse.status !== 200)
        throw new Error("Failed to fetch bookings");
      const bookingsData = bookingsResponse.data;
      const bookingAmounts = bookingsData.map(
        (booking) => Number(booking.amount) || 0
      );
      setBookingPayments(bookingsData);
      setSummaryData((prev) => ({
        ...prev,
        totalIncome: {
          value: bookingAmounts.reduce((sum, amount) => sum + amount, 0),
          description: "Total Revenue",
        },
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
      await Promise.all([
        fetchTotalVaccinations(),
        fetchAppointments(),
        fetchVaccines(),
        fetchFinancialData(),
      ]);
    };
    fetchData();
    const interval = setInterval(() => {
      if (vaccines.length > 0)
        setDisplayedVaccines(getRandomVaccines(vaccines, 5));
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  // Transform data for charts (unchanged)
  const bookingStatusData = [
    {
      name: "Success",
      value: bookings.filter((b) => b.status === "Success").length,
    },
    {
      name: "Pending",
      value: bookings.filter((b) => b.status === "Pending").length,
    },
    {
      name: "Refund",
      value: bookings.filter((b) => b.status === "Refund").length,
    },
  ];

  const revenueData = bookingPayments.slice(-7).map((booking, index) => {
    const date = new Date();
    date.setDate(date.getDate() - (6 - index));
    const weekday = date.toLocaleDateString("en-US", { weekday: "short" });
    return {
      date: date.toISOString().split("T")[0],
      weekday: weekday,
      revenue: Number(booking.amount) || 0,
    };
  });

  const vaccineStockData = vaccines.map((vaccine) => ({
    name: vaccine.name || "Unknown",
    current: vaccine.quantity || 0,
    minimum: vaccine.minimumThreshold || 100,
    maximum: vaccine.maximumThreshold || 1000,
  }));

  return (
    <div className="bg-white p-6 rounded-2xl shadow-xl shadow-teal-500/5 border border-gray-100">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
        <h1 className="text-2xl font-bold text-gray-900">
          Dashboard Management
        </h1>
      </div>
      {/* Main Content Area */}
      <main className="flex-1 p-4 md:p-6 overflow-y-auto">
        <div className="max-w-7xl mx-auto h-full">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-4 md:mb-6">
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
              icon={Calendar}
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
              icon={CircleDollarSign}
            />
          </div>

          {/* Charts and Vaccine Inventory */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 flex-1 min-h-0">
            {/* Charts */}
            {["bookingStatus", "revenueTrend"].map((type, index) => (
              <div
                key={index}
                className="bg-white shadow-lg rounded-lg p-4 flex flex-col h-full"
              >
                <DashboardChart
                  chartType={type}
                  data={
                    type === "bookingStatus"
                      ? bookingStatusData
                      : type === "revenueTrend"
                      ? revenueData
                      : vaccineStockData
                  }
                  title={
                    type === "bookingStatus"
                      ? "Booking Status"
                      : type === "revenueTrend"
                      ? "Revenue Trend"
                      : "Vaccine Stock Levels"
                  }
                />
              </div>
            ))}
          </div>
          <div className="p-4 h-full flex-grow">
            <VaccineInventory
              displayedVaccines={displayedVaccines}
              loading={loading}
              error={error}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
