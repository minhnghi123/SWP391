import React, { useState, useEffect } from "react";
import { FiSun, FiMoon, FiBell, FiUser, FiTrendingUp, FiBox, FiActivity, FiBarChart2 } from "react-icons/fi";
import { format } from "date-fns";

const dashboard = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const summaryCards = [
    {
      title: "Total Items",
      value: "1,234",
      icon: <FiBox className="w-6 h-6" />,
      trend: "+12%",
      backgroundColor: "bg-blue-100 dark:bg-blue-900"
    },
    {
      title: "Recent Activities",
      value: "856",
      icon: <FiActivity className="w-6 h-6" />,
      trend: "+5%",
      backgroundColor: "bg-green-100 dark:bg-green-900"
    },
    {
      title: "Performance",
      value: "92%",
      icon: <FiTrendingUp className="w-6 h-6" />,
      trend: "+3%",
      backgroundColor: "bg-purple-100 dark:bg-purple-900"
    },
    {
      title: "Statistics",
      value: "45.2k",
      icon: <FiBarChart2 className="w-6 h-6" />,
      trend: "+8%",
      backgroundColor: "bg-orange-100 dark:bg-orange-900"
    }
  ];

  const recentUpdates = [
    { id: 1, text: "New product added to inventory", time: "2 hours ago" },
    { id: 2, text: "Customer feedback received", time: "4 hours ago" },
    { id: 3, text: "System maintenance completed", time: "6 hours ago" }
  ];

  return (
    <div className={`min-h-screen p-4 transition-colors duration-200 ${isDarkMode ? "dark bg-gray-900" : "bg-gray-50"}`}>
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-black">
              Welcome back, John!
            </h1>
            <p className="text-black">
              {format(currentTime, "EEEE, MMMM do yyyy | h:mm a")}
            </p>
          </div>
          
        </header>

        {/* Summary Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {summaryCards.map((card, index) => (
            <div
              key={index}
              className={`${card.backgroundColor} p-6 rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-200`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-gray-600 dark:text-gray-300 font-medium">{card.title}</p>
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-white mt-2">{card.value}</h3>
                  <span className="text-green-600 dark:text-green-400 text-sm font-medium">{card.trend}</span>
                </div>
                <div className="text-gray-600 dark:text-gray-300">{card.icon}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Recent Updates Panel */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Recent Updates</h2>
          <div className="space-y-4">
            {recentUpdates.map((update) => (
              <div key={update.id} className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 pb-4">
                <p className="text-gray-600 dark:text-gray-300">{update.text}</p>
                <span className="text-sm text-gray-500 dark:text-gray-400">{update.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Action Buttons */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          {["Add Item", "Generate Report", "View Analytics", "Settings"].map((action, index) => (
            <button
              key={index}
              className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow text-gray-700 dark:text-gray-300 font-medium"
            >
              {action}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default dashboard;