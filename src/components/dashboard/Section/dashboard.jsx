import React, { useState, useEffect } from "react";
import { Line, Bar, Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, LineElement, BarElement, PointElement, CategoryScale, LinearScale, ArcElement, Tooltip, Legend } from "chart.js";
import { FiUser, FiCalendar, FiCheckCircle, FiBarChart2 } from "react-icons/fi";

ChartJS.register(LineElement, BarElement, PointElement, CategoryScale, LinearScale, ArcElement, Tooltip, Legend);

const DashboardOverview = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalIncome, setTotalIncome] = useState([]); // Thêm state mới để cập nhật tổng thu nhập

  const newPatients = 35;
  const pendingAppointments = 12;
  const vaccinationsCompleted = 120;

  useEffect(() => {
    const fetchDataAsync = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:3000/payments");
  
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
  
        const paymentsRes = await response.json();
  
        // Kiểm tra nếu API trả về một mảng, nếu không thì gán []
        const paymentList = Array.isArray(paymentsRes) ? paymentsRes : [];
  
        // Lấy danh sách `amount`, chuyển đổi về số để tránh lỗi
        const paymentAmounts = paymentList.map(payment => Number(payment.amount) || 0);
  
        setPayments(paymentList); // Lưu toàn bộ dữ liệu để hiển thị'
        setTotalIncome(paymentAmounts.reduce((sum, amount) => sum + amount, 0)); // Tính tổng       
  
        setError(null);
      } catch (error) {
        console.error("Error fetching API:", error);
        setError("Failed to fetch payments. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
  
    fetchDataAsync();
  }, []);
  


  const lineData = {
    labels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    datasets: [
      {
        label: "Revenue",
        data : payments.map(payment => Number(payment.amount) || 0), // Thay đổi dữ liệu để hiển thị
        borderColor: "#4CAF50",
        backgroundColor: "rgba(76, 175, 80, 0.2)",
        borderWidth: 2,
        tension: 0.4,       
      },
    ],
  };

  console.log(payments);
  

  return (
    <div className="p-8 bg-gray-100 min-h-screen flex flex-col items-center">
      <div className="w-full max-w-7xl bg-white p-8 rounded-3xl shadow-xl">
        <h2 className="text-4xl font-bold mb-6 text-gray-800 text-center">Vaccine Center Dashboard</h2>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          {[
            { title: "New Patients", value: newPatients, icon: <FiUser className="text-blue-500" /> },
            { title: "Appointments", value: pendingAppointments, icon: <FiCalendar className="text-orange-500" /> },
            { title: "Vaccinations Done", value: vaccinationsCompleted, icon: <FiCheckCircle className="text-purple-500" /> },
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
            <Doughnut data={{ labels: ["Completed", "Pending", "Cancelled"], datasets: [{ data: [65, 25, 10], backgroundColor: ["#4CAF50", "#FF9800", "#F44336"] }] }} />
          </div>
          <div className="bg-white p-4 rounded-xl shadow-md">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Daily Vaccinations</h3>
            <Bar data={{ labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"], datasets: [{ label: "Vaccinations", data: [50, 60, 80, 75, 90, 100, 110], backgroundColor: "#2196F3" }] }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
