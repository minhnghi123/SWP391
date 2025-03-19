import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Line, Doughnut } from "react-chartjs-2";
import RevenueChart from "./RevenueChart";

const AnalyticsOverview = ({ lineData, doughnutData, error, bookings }) => {
  return (
    <Card className="border-blue-100 bg-white shadow-sm">
      <CardHeader className="border-b border-blue-50">
        <CardTitle className="text-blue-700 text-xl font-semibold">
          Analytics Overview
        </CardTitle>
        <p className="text-sm text-gray-600">
          Key metrics on revenue and appointment status
        </p>
      </CardHeader>
      <CardContent className="p-4 sm:p-6">
        {error && <div className="mb-4 text-red-500 text-center">{error}</div>}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8">
          {/* Revenue Trend (Line Chart) */}
          <div className="bg-white p-4 rounded-lg">
            <h3 className="text-base font-semibold text-gray-800 mb-2">
              Revenue Trend (Last 7 Days)
            </h3>
            <div className="w-full h-64 sm:h-72 md:h-80">
              <Line
                data={lineData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: "top",
                      labels: {
                        font: { size: 12, family: "'Inter', sans-serif" },
                        boxWidth: 20,
                        padding: 10,
                      },
                    },
                    tooltip: { enabled: true },
                  },
                  scales: {
                    x: {
                      ticks: { font: { size: 12 } },
                      grid: { display: false },
                    },
                    y: {
                      ticks: { font: { size: 12 }, beginAtZero: true },
                      grid: { color: "rgba(0, 0, 0, 0.05)" },
                      suggestedMax: 350,
                    },
                  },
                }}
              />
            </div>
          </div>

          {/* Appointment Status (Doughnut Chart) */}
          <div className="bg-white p-4 rounded-lg flex items-center justify-center">
            <div className="w-full max-w-[300px] h-64 sm:h-72 md:h-80">
              <Doughnut
                data={doughnutData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: "right",
                      labels: {
                        font: { size: 12, family: "'Inter', sans-serif" },
                        boxWidth: 15,
                        padding: 10,
                      },
                    },
                    tooltip: { enabled: true },
                  },
                  cutout: "70%",
                }}
              />
            </div>
          </div>

          {/* Revenue Chart (Monthly) */}
          <div className="md:col-span-2">
            <RevenueChart bookings={bookings} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AnalyticsOverview;