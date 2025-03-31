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

// Format currency to VNĐ
const formatCurrency = (value) => `${Number(value).toLocaleString("en-US")} VNĐ`;

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
  const [filterType, setFilterType] = useState("all"); // "all", "month", "year", "day"
  const [selectedMonth, setSelectedMonth] = useState("03"); // Default: March
  const [selectedYear, setSelectedYear] = useState("2025"); // Default: 2025
  const [selectedDay, setSelectedDay] = useState(
    new Date().toISOString().split("T")[0]
  ); // Default: today
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

  // Process and filter data based on filter type
  const processData = () => {
    if (!Array.isArray(bookingData) || bookingData.length === 0) return [];

    const filteredBookings = bookingData.filter((booking) => {
      const bookingDate = new Date(booking.createdAt);
      const bookingMonth = (bookingDate.getMonth() + 1)
        .toString()
        .padStart(2, "0");
      const bookingYear = bookingDate.getFullYear().toString();
      const bookingDay = bookingDate.toISOString().split("T")[0];

      if (filterType === "day") {
        return bookingDay === selectedDay;
      } else if (filterType === "month") {
        return bookingMonth === selectedMonth && bookingYear === selectedYear;
      } else if (filterType === "year") {
        return bookingYear === selectedYear;
      }
      // Default: last 30 days if filterType is "all"
      const today = new Date();
      const past30Days = new Date();
      past30Days.setDate(today.getDate() - 30);
      return bookingDate >= past30Days && bookingDate <= today;
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
    if (filterType === "day") {
      // Filter by specific day
      const revenue = bookings.reduce(
        (sum, booking) => sum + (booking.amount || 0),
        0
      );
      const weekday = new Date(selectedDay).toLocaleDateString("en-US", {
        weekday: "short",
      });
      return [{ date: selectedDay, weekday, revenue }];
    } else if (filterType === "month") {
      // Filter by days in the month
      const daysInMonth = new Date(selectedYear, selectedMonth, 0).getDate();
      const revenueByDate = Array.from({ length: daysInMonth }, (_, i) => {
        const day = (i + 1).toString().padStart(2, "0");
        const dateStr = `${selectedYear}-${selectedMonth}-${day}`;
        const weekday = new Date(dateStr).toLocaleDateString("en-US", {
          weekday: "short",
        });
        const revenue = bookings
          .filter(
            (booking) =>
              new Date(booking.createdAt).toISOString().split("T")[0] ===
              dateStr
          )
          .reduce((sum, booking) => sum + (booking.amount || 0), 0);
        return { date: dateStr, weekday, revenue };
      });
      return revenueByDate.filter((item) => item.revenue > 0); // Only show days with revenue
    } else if (filterType === "year") {
      // Filter by months in the year
      const revenueByMonth = Array.from({ length: 12 }, (_, i) => {
        const month = (i + 1).toString().padStart(2, "0");
        const dateStr = `${selectedYear}-${month}`;
        const revenue = bookings
          .filter((booking) => {
            const date = new Date(booking.createdAt);
            return (
              date.getFullYear().toString() === selectedYear &&
              (date.getMonth() + 1).toString().padStart(2, "0") === month
            );
          })
          .reduce((sum, booking) => sum + (booking.amount || 0), 0);
        return {
          date: dateStr,
          weekday: new Date(selectedYear, i, 1).toLocaleString("en-US", {
            month: "short",
          }),
          revenue,
        };
      });
      return revenueByMonth.filter((item) => item.revenue > 0); // Only show months with revenue
    } else {
      // Default: last 30 days
      const revenueByDate = bookings.reduce((acc, booking) => {
        const date = new Date(booking.createdAt).toISOString().split("T")[0];
        const weekday = new Date(booking.createdAt).toLocaleDateString(
          "en-US",
          {
            weekday: "short",
          }
        );
        if (!acc[date]) {
          acc[date] = { date, revenue: 0, weekday };
        }
        acc[date].revenue += booking.amount || 0;
        return acc;
      }, {});
      return Object.values(revenueByDate);
    }
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
      <ResponsiveContainer width="100%" height={500}>
        {" "}
        {/* Increased height from 400 to 500 */}
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
          <AreaChart
            data={filteredData}
            margin={{ top: 20, right: 30, left: 20, bottom: 20 }} // Added padding
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis
              dataKey="date"
              tickFormatter={(date) => {
                const item = filteredData.find((d) => d.date === date);
                return filterType === "year"
                  ? item?.weekday || "Unknown" // Show month if filtering by year
                  : formatDateWithDay(date, item?.weekday || "Unknown");
              }}
              angle={-30} // Reduced angle from -45 to -30 for better readability
              textAnchor="end"
              height={100} // Increased height from 70 to 100 for more space
              interval="preserveStartEnd" // Ensures ticks are not overcrowded
              fontSize={12} // Slightly increased font size from 10 to 12
              tickMargin={10} // Added margin to separate ticks from axis
            />
            <YAxis
              tickFormatter={formatCurrency}
              width={100} // Increased width to accommodate longer currency values
              fontSize={12} // Consistent font size with XAxis
              tickMargin={10} // Added margin for better spacing
            />
            <Tooltip
              formatter={(value) => formatCurrency(value)}
              labelFormatter={(label) => {
                const item = filteredData.find((d) => d.date === label);
                return filterType === "year"
                  ? `Month: ${item?.weekday || "Unknown"}`
                  : `Date: ${formatDateWithDay(
                      label,
                      item?.weekday || "Unknown"
                    )}`;
              }}
              contentStyle={{ fontSize: 14 }} // Increased tooltip font size for clarity
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

      {/* Filter controls */}
      <div className="mb-4 flex gap-2 items-center flex-wrap">
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="border p-2 rounded flex-1 min-w-[150px]"
        >
          <option value="all">Last 30 Days</option>
          <option value="day">By Day</option>
          <option value="month">By Month</option>
          <option value="year">By Year</option>
        </select>
        {filterType === "day" && (
          <input
            type="date"
            value={selectedDay}
            onChange={(e) => setSelectedDay(e.target.value)}
            className="border p-2 rounded flex-1 min-w-[150px]"
          />
        )}
        {filterType === "month" && (
          <>
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="border p-2 rounded flex-1 min-w-[150px]"
            >
              {Array.from({ length: 12 }, (_, i) => (
                <option key={i} value={(i + 1).toString().padStart(2, "0")}>
                  {new Date(0, i).toLocaleString("en-US", { month: "long" })}
                </option>
              ))}
            </select>
            <input
              type="number"
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="border p-2 rounded w-20"
              min="2000"
              max="2099"
            />
          </>
        )}
        {filterType === "year" && (
          <input
            type="number"
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="border p-2 rounded w-20"
            min="2000"
            max="2099"
          />
        )}
      </div>

      <div className="h-auto w-full overflow-x-auto">{renderChart()}</div>
    </div>
  );
};

export default DashboardChart;
