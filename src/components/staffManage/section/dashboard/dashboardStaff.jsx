import { useState, useEffect } from "react";
import FormDate from "../../../../utils/FormDate";
import useAxios from "../../../../utils/useAxios";
import {
  Calendar,
  Syringe,
  FlaskRound as Flask,
  HeartPulse,
  Refrigerator,
  Pill,
  Loader2,
  Users,
  AlertCircle,
  CheckCircle2,
  Clock,
  XCircle,
} from "lucide-react";
import Pagination from "../../Pagination" // Import Pagination from external file

const url = import.meta.env.VITE_BASE_URL_DB;

const StaffDashboard = () => {
  const [vaccines, setVaccines] = useState([]);
  const [users, setUsers] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [stats, setStats] = useState({
    newUsers: 0,
    vaccineStock: 0,
    expiringVaccines: 0,
    latestBookings: 0,
    pendingBookings: 0,
    completedBookings: 0,
  });
  const [loading, setLoading] = useState({
    main: true,
    vaccines: true,
    bookings: true,
  });
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("All Status");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1); // Pagination state
  const itemsPerPage = 10; // Number of bookings per page
  const api = useAxios();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading({ main: true, vaccines: true, bookings: true });

        const today = new Date();
        const tenDaysAgo = new Date(today);
        tenDaysAgo.setDate(today.getDate() - 10);

        // Fetch users
        const usersResponse = await api.get(`${url}/User/get-all-user`);
        const allUsers = usersResponse.data;
        const newUsers = allUsers.filter((user) => {
          const createdAt = new Date(user.createdAt);
          return createdAt >= tenDaysAgo && createdAt <= today;
        });

        // Fetch vaccines
        const vaccinesResponse = await api.get(`${url}/Vaccine/get-all-vaccines`);
        const allVaccines = vaccinesResponse.data;
        const uniqueVaccineNames = [...new Set(allVaccines.map((vaccine) => vaccine.name))].length;
        const expiringVaccines = allVaccines.filter((vaccine) => {
          const expiryDate = new Date(vaccine.timeExpired);
          const daysUntilExpiry = (expiryDate - new Date()) / (1000 * 60 * 60 * 24);
          return daysUntilExpiry <= 30 && daysUntilExpiry >= 0;
        }).length;

        // Fetch bookings
        const bookingsResponse = await api.get(`${url}/Booking/get-all-booking`);
        const allBookings = bookingsResponse.data;
        const latestBookings = allBookings.filter((booking) => {
          const arrivedAt = new Date(booking.arrivedAt);
          return arrivedAt >= tenDaysAgo && arrivedAt <= today;
        });
        const pendingBookings = allBookings.filter((booking) =>
          booking.status?.toLowerCase() === "pending"
        ).length;
        const completedBookings = allBookings.filter((booking) =>
          booking.status?.toLowerCase() === "success"
        ).length;

        setUsers(allUsers);
        setVaccines(allVaccines);
        setBookings(allBookings);
        setStats({
          newUsers: newUsers.length,
          vaccineStock: uniqueVaccineNames,
          expiringVaccines: expiringVaccines,
          latestBookings: latestBookings.length,
          pendingBookings,
          completedBookings,
        });
        setError(null);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to fetch data. Please try again later.");
      } finally {
        setLoading({ main: false, vaccines: false, bookings: false });
      }
    };
    fetchData();
  }, []);

  const filteredVaccines = vaccines.filter((vaccine) => {
    const matchesSearch = vaccine.name.toLowerCase().includes(searchTerm.toLowerCase());
    let matchesStatus = true;
    if (filter === "Available") matchesStatus = vaccine.quantity > 50;
    if (filter === "Low Stock") matchesStatus = vaccine.quantity > 0 && vaccine.quantity <= 50;
    if (filter === "Expired") matchesStatus = new Date(vaccine.timeExpired) < new Date();
    return matchesSearch && matchesStatus;
  });

  // Filter bookings for the last 10 days
  const recentBookings = bookings
    .filter((booking) => {
      const arrivedAt = new Date(booking.arrivedAt);
      const today = new Date();
      const tenDaysAgo = new Date(today);
      tenDaysAgo.setDate(today.getDate() - 10);
      return arrivedAt >= tenDaysAgo && arrivedAt <= today;
    })
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  // Pagination logic
  const totalItems = recentBookings.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedBookings = recentBookings.slice(startIndex, endIndex);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case "pending":
        return <Clock className="w-4 h-4 text-amber-500" />;
      case "success":
        return <CheckCircle2 className="w-4 h-4 text-green-500" />;
      case "cancelled":
        return <XCircle className="w-4 h-4 text-red-500" />;
      default:
        return <AlertCircle className="w-4 h-4 text-gray-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-white p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500 rounded-lg shadow-sm">
              <HeartPulse className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-blue-500">Staff Dashboard</h1>
              <p className="text-sm text-gray-500">Overview of vaccination center operations</p>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Stats and Bookings */}
          <div className="lg:col-span-2 space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <StatCard
                title="New Users"
                value={stats.newUsers}
                icon={<Users className="w-5 h-5 text-white" />}
                trend={`+${stats.newUsers} in 10 days`}
                color="bg-blue-600"
                loading={loading.main}
              />
              <StatCard
                title="Vaccine Types"
                value={stats.vaccineStock}
                icon={<Flask className="w-5 h-5 text-white" />}
                trend="In stock"
                color="bg-purple-600"
                loading={loading.main}
              />
              <StatCard
                title="Expiring Soon"
                value={stats.expiringVaccines}
                icon={<Calendar className="w-5 h-5 text-white" />}
                trend="Within 30 days"
                color="bg-amber-500"
                loading={loading.main}
              />
              <StatCard
                title="Recent Appointments"
                value={stats.latestBookings}
                icon={<Syringe className="w-5 h-5 text-white" />}
                trend={`+${stats.latestBookings} in 10 days`}
                color="bg-green-600"
                loading={loading.main}
              />
              <StatCard
                title="Pending Bookings"
                value={stats.pendingBookings}
                icon={<Clock className="w-5 h-5 text-white" />}
                trend="Needs attention"
                color="bg-amber-500"
                loading={loading.main}
              />
              <StatCard
                title="Completed"
                value={stats.completedBookings}
                icon={<CheckCircle2 className="w-5 h-5 text-white" />}
                trend="Successful"
                color="bg-green-600"
                loading={loading.main}
              />
            </div>

            {/* Recent Bookings */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-4 sm:p-6 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-blue-600" />
                  Recent Bookings (Last 10 Days)
                </h2>
              </div>
              <div className="divide-y divide-gray-200">
                {loading.bookings ? (
                  <div className="flex justify-center p-8">
                    <Loader2 className="w-6 h-6 text-blue-500 animate-spin" />
                  </div>
                ) : error ? (
                  <div className="text-center p-8 text-red-500">{error}</div>
                ) : paginatedBookings.length > 0 ? (
                  paginatedBookings.map((booking) => (
                    <div key={booking.id} className="p-4 sm:p-6 hover:bg-gray-50 transition-colors">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium text-gray-900">{booking.parentName}</h3>
                          <p className="text-sm text-gray-500 mt-1">
                            {FormDate(booking.createdAt)} • {booking.phoneNumber}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="inline-flex items-center gap-1">
                            {getStatusIcon(booking.status)}
                            <span className="text-sm font-medium capitalize">
                              {booking.status?.toLowerCase() || "unknown"}
                            </span>
                          </span>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-8 text-center text-gray-500">No recent bookings found</div>
                )}
              </div>
              {/* Pagination */}
              {recentBookings.length > 0 && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  startIndex={startIndex}
                  endIndex={endIndex}
                  totalItems={totalItems}
                  onPageChange={handlePageChange}
                />
              )}
            </div>
          </div>

          {/* Right Column - Vaccine Inventory */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-4 sm:p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                    <Refrigerator className="w-5 h-5 text-blue-600" />
                    Vaccine Inventory
                  </h2>
                  <select
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 bg-gray-50 text-gray-700 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
                  >
                    <option>All Status</option>
                    <option>Available</option>
                    <option>Low Stock</option>
                    <option>Expired</option>
                  </select>
                </div>
              </div>
              <div className="divide-y divide-gray-200 max-h-[600px] overflow-y-auto">
                {loading.vaccines ? (
                  <div className="flex justify-center p-8">
                    <Loader2 className="w-6 h-6 text-blue-500 animate-spin" />
                  </div>
                ) : error ? (
                  <div className="text-center p-8 text-red-500">{error}</div>
                ) : filteredVaccines.length > 0 ? (
                  filteredVaccines.map((vaccine) => (
                    <div
                      key={vaccine.id}
                      className="p-4 sm:p-6 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 p-2 bg-blue-50 rounded-lg">
                          <Pill className="w-5 h-5 text-blue-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-gray-900 truncate">{vaccine.name}</h3>
                          <div className="mt-2 flex flex-wrap gap-2">
                            <span className="inline-flex items-center gap-1 text-sm text-gray-600">
                              <span className="font-medium">{vaccine.quantity}</span> doses
                            </span>
                            <span className="inline-flex items-center gap-1 text-sm text-gray-600">
                              <Calendar className="w-4 h-4" />
                              {FormDate(vaccine.timeExpired || "N/A")}
                            </span>
                          </div>
                        </div>
                        <div>
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              vaccine.quantity > 50
                                ? "bg-green-100 text-green-800"
                                : vaccine.quantity > 0
                                ? "bg-amber-100 text-amber-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {vaccine.quantity > 50
                              ? "Available"
                              : vaccine.quantity > 0
                              ? "Low Stock"
                              : "Out of Stock"}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-8 text-center text-gray-500">No vaccines match your criteria</div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, icon, trend, color, loading }) => (
  <div className={`${color} rounded-xl shadow-sm text-white p-4 sm:p-6`}>
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium opacity-80">{title}</p>
        {loading ? (
          <div className="h-8 w-16 mt-2 bg-white bg-opacity-20 rounded animate-pulse"></div>
        ) : (
          <p className="text-2xl font-bold mt-1">{value}</p>
        )}
      </div>
      <div className="p-2 rounded-lg bg-white bg-opacity-20">{icon}</div>
    </div>
    {loading ? (
      <div className="h-4 w-full mt-3 bg-white bg-opacity-20 rounded animate-pulse"></div>
    ) : (
      <p className="text-xs opacity-80 mt-3">{trend}</p>
    )}
  </div>
);

export default StaffDashboard;