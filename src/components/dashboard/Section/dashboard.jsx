import React from "react";
import { Line, Bar, Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, LineElement, BarElement, PointElement, CategoryScale, LinearScale, ArcElement, Tooltip, Legend } from "chart.js";
import { FiUser, FiCalendar, FiCheckCircle, FiAlertCircle, FiBarChart2 } from "react-icons/fi";

ChartJS.register(LineElement, BarElement, PointElement, CategoryScale, LinearScale, ArcElement, Tooltip, Legend);

const DashboardOverview = () => {
  const totalIncome = 2500000;
  const newPatients = 35;
  const pendingAppointments = 12;
  const remainingStock = 95;
  const vaccinationsCompleted = 120;
  const staffOnDuty = 15;
  const activeDoctors = 8;
  const dailyVaccinations = 50;
  const weeklyNewPatients = 200;
  const doctorToStaffRatio = (activeDoctors / staffOnDuty).toFixed(2);
  const canceledAppointments = 5;

  const lineData = {
    labels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    datasets: [
      {
        label: "Revenue",
        data: [1200, 1900, 800, 1700, 2200, 2800, 3100],
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
        
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          {[{title: "Total Income", value: `$${totalIncome.toLocaleString()}`, icon: <FiBarChart2 className='text-green-500' />},
            {title: "New Patients", value: newPatients, icon: <FiUser className='text-blue-500' />},
            {title: "Appointments", value: pendingAppointments, icon: <FiCalendar className='text-orange-500' />},
            {title: "Vaccinations Done", value: vaccinationsCompleted, icon: <FiCheckCircle className='text-purple-500' />}].map((item, index) => (
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
            <Doughnut data={{labels: ["Completed", "Pending", "Cancelled"], datasets: [{data: [65, 25, 10], backgroundColor: ["#4CAF50", "#FF9800", "#F44336"]}]}} />
          </div>
          <div className="bg-white p-4 rounded-xl shadow-md">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Daily Vaccinations</h3>
            <Bar data={{labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"], datasets: [{label: "Vaccinations", data: [50, 60, 80, 75, 90, 100, 110], backgroundColor: "#2196F3"}]}} />
          </div>
        </div>
        
        {/* Doctor Schedule and Reports */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Doctor Schedule</h3>
            <ul>
              {["Dr. Olivia Martinez (Available)", "Dr. Damian Sanchez (Unavailable)", "Dr. Chloe Harrington (Available)"].map((doc, idx) => (
                <li key={idx} className="border-b last:border-b-0 py-2 text-gray-600">{doc}</li>
              ))}
            </ul>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Recent Activities</h3>
            <ul>
              {["Patient admitted to Room 206", "New inventory restocked", "MRI machine maintenance completed"].map((activity, idx) => (
                <li key={idx} className="border-b last:border-b-0 py-2 text-gray-600">{activity}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;