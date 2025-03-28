import React, { useState, useEffect } from "react";
import {
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import useAxios from "../../../../utils/useAxios";
const url = import.meta.env.VITE_BASE_URL_DB;

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];

const formatCurrency = (value) => `$${value.toLocaleString()}`;

const formatDateWithDay = (dateStr, weekday) => {
  const date = new Date(dateStr);
  const dayFormatted = date.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
  return `${weekday}, ${dayFormatted}`;
};

const DashboardChart = ({ chartType, title }) => {
  const [selectedDate, setSelectedDate] = useState("");
  const [bookingData, setBookingData] = useState([]); // Initialized as empty array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const api = useAxios();

  // Fetch booking data from API
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true);
        const { data } = await api.get(`${url}/Booking/get-all-booking`);
        setBookingData(Array.isArray(data) ? data : []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  // Process and filter data based on selected date
  const processData = () => {
    if (!Array.isArray(bookingData) || bookingData.length === 0) return [];

    const today = new Date();
    const past30Days = new Date();
    past30Days.setDate(today.getDate() - 30);

    const filteredBookings = bookingData.filter((booking) => {
      const bookingDate = new Date(booking.createdAt);
      return selectedDate
        ? bookingDate.toISOString().split("T")[0] === selectedDate
        : bookingDate >= past30Days && bookingDate <= today;
    });

    return chartType === "bookingStatus"
      ? processBookingStatusData(filteredBookings)
      : processRevenueTrendData(filteredBookings);
  };
  // Process data for booking status pie chart
  const processBookingStatusData = (bookings) => {
    const statusCount = bookings.reduce((acc, booking) => {
      acc[booking.status] = (acc[booking.status] || 0) + 1;
      return acc;
    }, {});

    return Object.entries(statusCount).map(([status, value]) => ({
      name: status,
      value,
    }));
  };

  // Process data for revenue trend
  const processRevenueTrendData = (bookings) => {
    const revenueByDate = bookings.reduce((acc, booking) => {
      const date = new Date(booking.createdAt).toISOString().split("T")[0];
      const weekday = new Date(booking.createdAt).toLocaleDateString("en-US", {
        weekday: "short",
      });
      if (!acc[date]) {
        acc[date] = { date, revenue: 0, weekday };
      }
      acc[date].revenue += booking.amount || 0; // Assuming booking has an amount field
      return acc;
    }, {});

    return Object.values(revenueByDate);
  };

  const filteredData = processData() || []; // Fallback to empty array if undefined

  const renderChart = () => {
    if (loading) return <div className="text-center">Loading...</div>;
    if (error)
      return <div className="text-center text-red-500">Error: {error}</div>;
    if (!filteredData || filteredData.length === 0) {
      return <div className="text-center text-gray-500">No data available</div>;
    }

    return (
      <ResponsiveContainer width="100%" height={400}>
        {chartType === "bookingStatus" ? (
          <PieChart>
            <Pie
              data={filteredData}
              cx="50%"
              cy="50%"
              innerRadius="40%"
              outerRadius="80%"
              paddingAngle={5}
              dataKey="value"
              label
            >
              {filteredData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        ) : (
          <AreaChart data={filteredData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis
              dataKey="date"
              tickFormatter={(date) => {
                const item = filteredData.find((d) => d.date === date);
                return formatDateWithDay(date, item?.weekday || "Unknown");
              }}
              angle={-45}
              textAnchor="end"
              height={70}
              interval="preserveStartEnd"
              fontSize={10}
            />
            <YAxis tickFormatter={formatCurrency} />
            <Tooltip
              formatter={(value) => formatCurrency(value)}
              labelFormatter={(label) => {
                const item = filteredData.find((d) => d.date === label);
                return `Date: ${formatDateWithDay(
                  label,
                  item?.weekday || "Unknown"
                )}`;
              }}
            />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#3b82f6"
              fill="#93c5fd"
              strokeWidth={2}
              activeDot={{ r: 8 }}
            />
          </AreaChart>
        )}
      </ResponsiveContainer>
    );
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm mb-6">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>

      {/* Date selection and clear button */}
      <div className="mb-4 flex gap-2">
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="border p-2 rounded flex-1"
        />
        <button
          onClick={() => setSelectedDate("")}
          className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
        >
          Clear Date
        </button>
      </div>

      <div className="h-auto w-full overflow-x-auto">{renderChart()}</div>
    </div>
  );
};

export default DashboardChart;
