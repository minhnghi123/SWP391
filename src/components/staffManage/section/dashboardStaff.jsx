import { useState, useEffect } from "react";
import FormDate from "../../../utils/FormDate";
import useAxios from "../../../utils/useAxios";

const url = import.meta.env.VITE_BASE_URL_DB;
import {
  Calendar,
  Syringe,
  FlaskRound as Flask,
  MoreVertical,
  HeartPulse,
  Refrigerator,
  Pill,
  Loader2,
  Users,
} from "lucide-react";

const StaffDashboard = () => {
  const [vaccines, setVaccines] = useState([]);
  const [users, setUsers] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [stats, setStats] = useState({
    newUsers: 0,
    vaccineStock: 0,
    expiringVaccines: 0,
    latestBookings: 0,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("All Status");
  const api = useAxios();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const today = new Date();
        const tenDaysAgo = new Date(today);
        tenDaysAgo.setDate(today.getDate() - 10);

        const usersResponse = await api.get(`${url}/User/get-all-user`);
        const allUsers = usersResponse.data;
        const newUsers = allUsers.filter((user) => {
          const createdAt = new Date(user.createdAt);
          return createdAt >= tenDaysAgo && createdAt <= today;
        });

        const vaccinesResponse = await api.get(`${url}/Vaccine/get-all-vaccines`);
        const allVaccines = vaccinesResponse.data;
        const uniqueVaccineNames = [...new Set(allVaccines.map((vaccine) => vaccine.name))].length;
        const expiringVaccines = allVaccines.filter((vaccine) => {
          const expiryDate = new Date(vaccine.timeExpired);
          const daysUntilExpiry = (expiryDate - new Date()) / (1000 * 60 * 60 * 24);
          return daysUntilExpiry <= 30 && daysUntilExpiry >= 0;
        }).length;

        const bookingsResponse = await api.get(`${url}/Booking/get-all-booking`);
        const allBookings = bookingsResponse.data;
        const latestBookings = allBookings.filter((booking) => {
          const arrivedAt = new Date(booking.arrivedAt);
          return arrivedAt >= tenDaysAgo && arrivedAt <= today;
        }).length;

        setUsers(allUsers);
        setVaccines(allVaccines);
        setBookings(allBookings);
        setStats({
          newUsers: newUsers.length,
          vaccineStock: uniqueVaccineNames,
          expiringVaccines: expiringVaccines,
          latestBookings: latestBookings,
        });
        setError(null);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to fetch data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredVaccines = vaccines.filter((vaccine) => {
    if (filter === "All Status") return true;
    if (filter === "Available") return vaccine.quantity > 50;
    if (filter === "Low Stock") return vaccine.quantity > 0 && vaccine.quantity <= 50;
    if (filter === "Expired") return new Date(vaccine.timeExpired) < new Date();
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="flex items-center justify-between mb-6 animate-fade-in">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500 rounded-lg shadow-sm">
              <Flask className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-blue-500">Staff Dashboard</h1>
          </div>
        </header>

        {/* Main Content */}
        <main className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3 space-y-6">
            <VaccinationStatsCard stats={stats} />
            <VaccineInventoryManager
              vaccines={filteredVaccines}
              filter={filter}
              setFilter={setFilter}
              loading={loading}
              error={error}
            />
          </div>
          <div className="space-y-6"></div>
        </main>
      </div>
    </div>
  );
};

const VaccineInventoryManager = ({ vaccines, filter, setFilter, loading, error }) => (
  <Card>
    <div className="flex items-center justify-between mb-4 sm:mb-6">
      <h2 className="text-xl sm:text-2xl font-bold text-blue-500">Vaccine Inventory</h2>
      <select
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="text-sm border border-gray-200 rounded-full px-3 py-1.5 bg-gray-100 text-gray-700 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
      >
        <option>All Status</option>
        <option>Available</option>
        <option>Low Stock</option>
        <option>Expired</option>
      </select>
    </div>
    {loading ? (
      <div className="flex justify-center py-8">
        <Loader2 className="w-6 h-6 text-blue-500 animate-spin" />
      </div>
    ) : error ? (
      <div className="text-center py-8 text-red-500">{error}</div>
    ) : (
      <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
        {vaccines.map((vaccine) => (
          <div
            key={vaccine.id}
            className="group relative flex items-center gap-3 sm:gap-4 p-4 bg-white rounded-lg border border-gray-100 hover:border-blue-300 hover:shadow-md transition-all duration-300"
          >
            <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
              <Refrigerator className="w-5 h-5 text-blue-500" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 sm:gap-3">
                <h3 className="font-semibold text-gray-900 text-sm sm:text-base">
                  {vaccine.name}
                </h3>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    vaccine.quantity > 50
                      ? "bg-blue-100 text-blue-700"
                      : vaccine.quantity > 0
                      ? "bg-amber-100 text-amber-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {vaccine.quantity > 50
                    ? "Available"
                    : vaccine.quantity > 0
                    ? "Low Stock"
                    : "Out of Stock"}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2 mt-1 sm:mt-2 text-xs sm:text-sm">
                <span className="flex items-center gap-1 text-blue-500">
                  <Pill className="w-4 h-4" /> {vaccine.quantity} doses
                </span>
                <span className="flex items-center gap-1 text-gray-500">
                  <Calendar className="w-4 h-4" /> {FormDate(vaccine.timeExpired || "N/A")}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    )}
  </Card>
);

const VaccinationStatsCard = ({ stats }) => (
  <Card>
    <h2 className="text-xl sm:text-2xl font-bold text-blue-500 mb-4 sm:mb-6">
      Recent Activity (10 Days)
    </h2>
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <StatBox
        icon={<Users className="w-5 h-5 text-blue-500" />}
        value={stats.newUsers}
        label="New Users"
        trend={stats.newUsers > 0 ? `+${stats.newUsers} in 10 days` : "No new users"}
        trendColor={stats.newUsers > 0 ? "text-blue-500" : "text-gray-500"}
      />
      <StatBox
        icon={<Flask className="w-5 h-5 text-blue-500" />}
        value={stats.vaccineStock}
        label="Vaccine Types in Stock"
        trend={stats.vaccineStock > 0 ? "Variety" : "None"}
        trendColor={stats.vaccineStock > 0 ? "text-blue-500" : "text-red-500"}
      />
      <StatBox
        icon={<Calendar className="w-5 h-5 text-blue-500" />}
        value={stats.expiringVaccines}
        label="Expiring Vaccines"
        trend={stats.expiringVaccines > 0 ? "Within 30 days" : "None"}
        trendColor={stats.expiringVaccines > 0 ? "text-amber-500" : "text-blue-500"}
      />
      <StatBox
        icon={<Syringe className="w-5 h-5 text-blue-500" />}
        value={stats.latestBookings}
        label="Recent Appointments"
        trend={stats.latestBookings > 0 ? `+${stats.latestBookings} in 10 days` : "No appointments"}
        trendColor={stats.latestBookings > 0 ? "text-blue-500" : "text-gray-500"}
      />
    </div>
  </Card>
);

const Card = ({ children }) => (
  <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300">
    {children}
  </div>
);

const StatBox = ({ icon, value, label, trend, trendColor }) => (
  <div className="p-4 rounded-lg bg-white border border-gray-100 hover:shadow-md transition-all duration-300 group">
    <div className="flex items-center justify-between">
      {icon}
      <span className={`text-xs ${trendColor}`}>{trend}</span>
    </div>
    <p className="text-2xl sm:text-3xl font-extrabold text-gray-900 mt-2 sm:mt-3 group-hover:scale-105 transition-transform duration-300">
      {value}
    </p>
    <p className="text-xs sm:text-sm text-gray-600 mt-1">{label}</p>
  </div>
);

export default StaffDashboard;