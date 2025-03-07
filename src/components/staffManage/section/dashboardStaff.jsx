import { useState, useEffect } from "react";
import FormDate from "../../../utils/FormDate";
import axios from "axios"
import {
  Calendar,
  Syringe,
  FlaskRound as Flask,
  Clock,
  CheckCircle2,
  MoreVertical,
  X,
  Bell,
  Settings,
  HeartPulse,
  Refrigerator,
  Pill,
  ShieldAlert,
  BadgeCheck,
} from "lucide-react";

const stats = {
  vaccinesAdministered: 145,
  scheduledToday: 28,
  vaccineStock: 450,
  adverseReactions: 0,
};

const tasks = [
  {
    id: 1,
    title: "Check vaccine storage temperature",
    priority: "High",
    time: "11:00 AM",
    progress: 75,
  },
  {
    id: 2,
    title: "Restock vaccination supplies",
    priority: "Medium",
    time: "1:30 PM",
    progress: 30,
  },
  {
    id: 3,
    title: "Update immunization records",
    priority: "High",
    time: "3:00 PM",
    progress: 50,
  },
  {
    id: 4,
    title: "Vaccine inventory count",
    priority: "Low",
    time: "5:00 PM",
    progress: 0,
  },
];

const recentActivities = [
  {
    id: 1,
    type: "Temperature Alert",
    description: "Freezer 2 temperature deviation detected",
    time: "10 mins ago",
    severity: "high",
  },
  {
    id: 2,
    type: "Stock Update",
    description: "New Pfizer vaccine batch received",
    time: "1 hour ago",
    severity: "info",
  },
  {
    id: 3,
    type: "Certification",
    description: "Staff training certificates updated",
    time: "2 hours ago",
    severity: "success",
  },
];

const BodyDoctorManage = () => {
  const [notes, setNotes] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [vaccines, setVaccines] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [loading, setLoading] = useState(false); // Added loading state
  const [error, setError] = useState(null); // Added error state

  useEffect(() => {
    const fetchVaccines = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "https://localhost:7280/api/Vaccine/get-all-vaccines"
        );
        setVaccines(response.data);
        setError(null);
      } catch (error) {
        console.error("Error fetching vaccines:", error);
        setError("Failed to fetch vaccines. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchVaccines(); // Call the function immediately
  }, []); // Empty dependency array means it runs once on mount

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-white to-emerald-50">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-r from-teal-500 to-emerald-500 p-2 rounded-lg">
              <Flask className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-500 to-blue-400 bg-clip-text text-transparent">
              Staff Dashboard
            </h1>
          </div>

          <div className="flex items-center gap-6">
            <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-full">
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <VaccinationStatsCard />
            <VaccineInventoryManager vaccines={vaccines} />{" "}
            {/* Pass vaccines as prop */}
            <RecentActivities />
          </div>
          <div className="space-y-8">
            <VaccinationNotesCard notes={notes} setNotes={setNotes} />
            <TaskList />
          </div>
        </div>
      </main>
    </div>
  );
};

const VaccineInventoryManager = (
  { vaccines } // Accept vaccines prop
) => (
  <Card>
    <div className="flex items-center justify-between mb-6">
      <h2 className="text-xl font-bold text-gray-900">Vaccine Inventory</h2>
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-500">Filter by:</span>
        <select className="text-sm border border-gray-200 rounded-full px-4 py-1.5 bg-gray-50 focus:ring-2 focus:ring-teal-500">
          <option>All Status</option>
          <option>Available</option>
          <option>Low Stock</option>
          <option>Expired</option>
        </select>
      </div>
    </div>
    <div className="space-y-4">
      {vaccines.map((vaccine) => (
        <div
          key={vaccine.id}
          className="group relative overflow-hidden flex items-center gap-4 p-6 bg-white rounded-2xl border border-gray-100 hover:border-teal-200 hover:shadow-xl hover:shadow-teal-500/5 transition-all duration-300"
        >
          <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-teal-500 to-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div className="w-14 h-14 rounded-full bg-teal-50 flex items-center justify-center">
            <Refrigerator className="w-8 h-8 text-teal-600" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-3">
              <h3 className="font-bold text-gray-900">{vaccine.name}</h3>
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  vaccine.quantity > 50 // Added dynamic status based on quantity
                    ? "bg-emerald-100 text-emerald-700"
                    : vaccine.quantity > 0
                    ? "bg-amber-100 text-amber-700"
                    : "bg-rose-100 text-rose-700"
                }`}
              >
                {vaccine.quantity > 50
                  ? "Available"
                  : vaccine.quantity > 0
                  ? "Low Stock"
                  : "Out of Stock"}
              </span>
            </div>
            <div className="grid grid-cols-3 gap-4 mt-2">
              <div className="text-sm font-medium text-teal-600 flex items-center gap-1.5">
                <Pill className="w-4 h-4" />
                {vaccine.quantity} doses left{" "}
                {/* Fixed typo from quatity to quantity */}
              </div>
            </div>
            <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                Expires: {FormDate(vaccine.timeExpired || "N/A")} {/* Added fallback */}
              </span>
            </div>
          </div>
          <button className="opacity-0 group-hover:opacity-100 transition-opacity p-2 hover:bg-gray-100 rounded-full">
            <MoreVertical className="w-5 h-5 text-gray-400" />
          </button>
        </div>
      ))}
    </div>
  </Card>
);

console.log(VaccineInventoryManager)

const RecentActivities = () => (
  <Card>
    <div className="flex items-center justify-between mb-6">
      <h2 className="text-xl font-bold text-gray-900">Recent Activities</h2>
      <button className="text-sm text-teal-600 hover:text-teal-700 font-medium">
        View All
      </button>
    </div>
    <div className="space-y-4">
      {recentActivities.map((activity) => (
        <div
          key={activity.id}
          className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
        >
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center ${
              activity.severity === "high"
                ? "bg-rose-100"
                : activity.severity === "info"
                ? "bg-blue-100"
                : "bg-emerald-100"
            }`}
          >
            {activity.severity === "high" ? (
              <ShieldAlert className={`w-5 h-5 text-rose-600`} />
            ) : activity.severity === "info" ? (
              <Bell className={`w-5 h-5 text-blue-600`} />
            ) : (
              <BadgeCheck className={`w-5 h-5 text-emerald-600`} />
            )}
          </div>
          <div className="flex-1">
            <h3 className="font-medium text-gray-900">{activity.type}</h3>
            <p className="text-sm text-gray-500">{activity.description}</p>
          </div>
          <span className="text-xs text-gray-400">{activity.time}</span>
        </div>
      ))}
    </div>
  </Card>
);

const VaccinationStatsCard = () => (
  <Card>
    <h2 className="text-xl font-bold text-gray-900 mb-6">Today's Overview</h2>
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
      <StatBox
        icon={<Syringe className="w-6 h-6 text-teal-600" />}
        value={stats.vaccinesAdministered}
        label="Vaccines Administered"
        trend="+12% this week"
      />
      <StatBox
        icon={<Calendar className="w-6 h-6 text-emerald-600" />}
        value={stats.scheduledToday}
        label="Scheduled Today"
        trend="4 pending"
      />
      <StatBox
        icon={<Flask className="w-6 h-6 text-cyan-600" />}
        value={stats.vaccineStock}
        label="Vaccine Stock"
        trend="Stock sufficient"
      />
      <StatBox
        icon={<HeartPulse className="w-6 h-6 text-rose-600" />}
        value={stats.adverseReactions}
        label="Adverse Reactions"
        trend="All clear today"
      />
    </div>
  </Card>
);

const VaccinationNotesCard = ({ notes, setNotes }) => (
  <Card>
    <div className="flex items-center justify-between mb-6">
      <h2 className="text-xl font-bold text-gray-900">Staff Notes</h2>
      <button
        onClick={() => setNotes("")}
        className="text-gray-400 hover:text-gray-600 p-1 hover:bg-gray-100 rounded-full transition-colors"
      >
        <X className="w-5 h-5" />
      </button>
    </div>
    <textarea
      value={notes}
      onChange={(e) => setNotes(e.target.value)}
      placeholder="Enter staff notes, observations, or reactions..."
      className="w-full h-48 p-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 resize-none text-gray-700 placeholder-gray-400 bg-gray-50"
    />
    <div className="flex justify-between items-center mt-4">
      <p className="text-sm text-gray-500">{notes.length} characters</p>
      <button className="bg-gradient-to-r from-teal-500 to-emerald-500 text-white px-4 py-2 rounded-full hover:from-teal-600 hover:to-emerald-600 transition-all duration-300 text-sm shadow-lg shadow-teal-500/20">
        Save Notes
      </button>
    </div>
  </Card>
);

const TaskList = () => (
  <Card>
    <div className="flex items-center justify-between mb-6">
      <h2 className="text-xl font-bold text-gray-900">Today's Tasks</h2>
      <button className="text-sm text-teal-600 hover:text-teal-700 font-medium">
        View All
      </button>
    </div>
    <div className="space-y-4">
      {tasks.map((task) => (
        <div
          key={task.id}
          className="group relative overflow-hidden flex items-start gap-3 p-4 rounded-xl hover:bg-gray-50 transition-all duration-300"
        >
          <div className="mt-1">
            <div className="relative">
              <CheckCircle2 className="w-5 h-5 text-gray-400 group-hover:text-teal-500 transition-colors" />
              <div
                className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-teal-500 transition-all duration-300"
                style={{ width: `${task.progress}%` }}
              ></div>
            </div>
          </div>
          <div className="flex-1">
            <h3 className="text-gray-900 font-medium group-hover:text-teal-600 transition-colors">
              {task.title}
            </h3>
            <div className="flex items-center gap-3 mt-2">
              <span
                className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                  task.priority === "High"
                    ? "bg-rose-100 text-rose-700"
                    : task.priority === "Medium"
                    ? "bg-amber-100 text-amber-700"
                    : "bg-emerald-100 text-emerald-700"
                }`}
              >
                {task.priority}
              </span>
              <span className="text-sm text-gray-500 flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {task.time}
              </span>
              <span className="text-xs text-gray-500">
                {task.progress}% complete
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  </Card>
);

const Card = ({ children }) => (
  <div className="bg-white p-6 rounded-2xl shadow-xl shadow-teal-500/5 border border-gray-100">
    {children}
  </div>
);

const StatBox = ({ icon, value, label, trend }) => (
  <div className="relative overflow-hidden p-6 rounded-2xl bg-gradient-to-br from-gray-50 to-white border border-gray-100 hover:border-teal-200 transition-all duration-300 group">
    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-teal-500/5 to-emerald-500/5 rounded-full transform translate-x-16 -translate-y-8"></div>
    <div className="relative">
      <div className="flex items-center justify-between">
        {icon}
        <span className="text-xs text-gray-500">{trend}</span>
      </div>
      <p className="text-3xl font-bold text-gray-900 mt-4 group-hover:scale-110 transition-transform duration-300">
        {value}
      </p>
      <p className="text-sm text-gray-600 mt-1">{label}</p>
    </div>
  </div>
);

export default BodyDoctorManage;
