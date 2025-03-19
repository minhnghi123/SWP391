"use client";

import { useEffect, useState } from "react";
import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import useAxios from "../../../../utils/useAxios"; // Giả sử bạn có hook này để gọi API

const chartConfig = {
  amount: {
    label: "Revenue",
    color: "hsl(var(--chart-1))",
  },
};

const RevenueChart = ({ bookings }) => {
  const api = useAxios();
  const [chartData, setChartData] = useState([]);
  const currentYear = new Date().getFullYear(); // Lấy năm hiện tại (2025)

  // Hàm xử lý dữ liệu bookings thành dữ liệu biểu đồ theo tháng
  const processBookingsData = (bookingsData) => {
    const months = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];

    // Khởi tạo dữ liệu cho tất cả các tháng trong năm
    const monthlyData = months.map((month) => ({
      month,
      amount: 0,
    }));

    // Gom nhóm bookings theo tháng dựa trên arrivedAt
    bookingsData.forEach((booking) => {
      const bookingDate = new Date(booking.arrivedAt);
      const year = bookingDate.getFullYear();
      const monthIndex = bookingDate.getMonth(); // 0 = January, 11 = December

      // Chỉ tính bookings trong năm nay (2025)
      if (year === currentYear) {
        const amount = Number(booking.amount) || 0;
        monthlyData[monthIndex].amount += amount;
      }
    });

    setChartData(monthlyData);
  };

  useEffect(() => {
    if (bookings && bookings.length > 0) {
      processBookingsData(bookings);
    } else {
      // Nếu không có bookings truyền vào, gọi API để lấy dữ liệu
      const fetchBookings = async () => {
        try {
          const response = await api.get("https://localhost:7280/api/Booking/get-all-booking");
          processBookingsData(response.data);
          console.log(response.data);

        } catch (err) {
          console.error("Error fetching bookings:", err);
        }
      };
      fetchBookings();
    }
  }, [bookings]);

  // Tùy chỉnh tooltip để hiển thị thông tin revenue
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-2 border rounded shadow-sm">
          <p className="font-semibold">{label}</p>
          <p>Revenue: ${data.amount.toLocaleString()}</p>
        </div>
      );
    }
    return null;
  };

  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Monthly Revenue - {currentYear}</CardTitle>
        <CardDescription>
          Total revenue from bookings in {currentYear}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)} // Hiển thị 3 chữ cái đầu của tháng
            />
            <ChartTooltip content={<CustomTooltip />} />
            <Bar
              dataKey="amount"
              fill="var(--color-amount)"
              radius={4}
              name="Revenue"
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Revenue Trend <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total revenue from bookings in {currentYear}
        </div>
      </CardFooter>
    </Card>
  );
};

export default RevenueChart;