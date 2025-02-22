import { useState } from "react";
import { 
  UserRound, 
  Calendar, 
  FileText, 
  TrendingUp, 
  Stethoscope,
  PenSquare,
  Clock,
  CheckCircle2,
  AlertCircle,
  Plus,
  Search,
  MoreVertical,
  X,
  Bell,
  Settings,
  User
} from "lucide-react";

const patients = [
  { 
    id: 1, 
    name: "John Doe", 
    time: "10:00 AM", 
    status: "Waiting", 
    condition: "Regular Checkup",
    avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&q=80",
    waitTime: "5 mins",
    temperature: "37.2°C",
    bloodPressure: "120/80"
  },
  { 
    id: 2, 
    name: "Jane Smith", 
    time: "10:30 AM", 
    status: "In Progress", 
    condition: "Fever",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80",
    waitTime: "15 mins",
    temperature: "38.5°C",
    bloodPressure: "125/85"
  },
  { 
    id: 3, 
    name: "Mike Johnson", 
    time: "11:00 AM", 
    status: "Scheduled", 
    condition: "Follow-up",
    avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&q=80",
    waitTime: "30 mins",
    temperature: "36.8°C",
    bloodPressure: "118/75"
  }
];

const stats = {
  totalPatients: 45,
  appointments: 12,
  pendingReports: 8,
  criticalCases: 3
};

const tasks = [
  { id: 1, title: "Review patient records", priority: "High", time: "11:00 AM", progress: 75 },
  { id: 2, title: "Follow up on test results", priority: "Medium", time: "1:30 PM", progress: 30 },
  { id: 3, title: "Prepare for surgery", priority: "High", time: "3:00 PM", progress: 50 },
  { id: 4, title: "Medical conference", priority: "Low", time: "5:00 PM", progress: 0 }
];


const BodyDoctorManage = () => {
  const [notes, setNotes] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Header */}

        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-r from-blue-500 to-blue-400 p-2 rounded-lg">
                <Stethoscope className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-500 to-blue-400 bg-clip-text text-transparent">
                Doctor Dashboard
              </h1>
            </div>
            <div className="flex items-center gap-6">
              <button className="bg-gradient-to-r from-blue-500 to-blue-400 text-white px-4 py-2 rounded-full hover:from-indigo-600 hover:to-purple-600 transition-all duration-300 flex items-center gap-2 shadow-lg shadow-indigo-500/20">
                <Plus className="w-5 h-5" />
                New Patient
              </button>
            </div>
          </div>
        </div>
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <DoctorStatsCard />
            <PatientQueue />
          </div>
          <div className="space-y-8">
            <ClinicalNotesCard notes={notes} setNotes={setNotes} />
            <TaskList />
          </div>
        </div>
      </main>
    </div>
  );
};

const PatientQueue = () => (
  <Card>
    <div className="flex items-center justify-between mb-6">
      <h2 className="text-xl font-bold text-gray-900">Patient Queue</h2>
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-500">Sort by:</span>
        <select className="text-sm border border-gray-200 rounded-full px-4 py-1.5 bg-gray-50 focus:ring-2 focus:ring-indigo-500">
          <option>Wait Time</option>
          <option>Priority</option>
          <option>Name</option>
        </select>
      </div>
    </div>
    <div className="space-y-4">
      {patients.map((patient) => (
        <div key={patient.id} 
          className="group relative overflow-hidden flex items-center gap-4 p-6 bg-white rounded-2xl border border-gray-100 hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-500/5 transition-all duration-300">
          <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-indigo-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <img
            src={patient.avatar}
            alt={patient.name}
            className="w-14 h-14 rounded-full object-cover border-2 border-white ring-4 ring-indigo-50"
          />
          <div className="flex-1">
            <div className="flex items-center gap-3">
              <h3 className="font-bold text-gray-900">{patient.name}</h3>
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                patient.status === "In Progress" 
                  ? "bg-indigo-100 text-indigo-700" 
                  : patient.status === "Waiting" 
                    ? "bg-amber-100 text-amber-700" 
                    : "bg-gray-100 text-gray-700"
              }`}>
                {patient.status}
              </span>
            </div>
            <div className="grid grid-cols-3 gap-4 mt-2">
              <div className="flex items-center gap-1.5 text-sm text-gray-500">
                <Calendar className="w-4 h-4" />
                {patient.time}
              </div>
              <div className="flex items-center gap-1.5 text-sm text-gray-500">
                <Clock className="w-4 h-4" />
                {patient.waitTime}
              </div>
              <div className="text-sm font-medium text-indigo-600">
                {patient.condition}
              </div>
            </div>
            <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
              <span>Temp: {patient.temperature}</span>
              <span>BP: {patient.bloodPressure}</span>
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

const DoctorStatsCard = () => (
  <Card>
    <h2 className="text-xl font-bold text-gray-900 mb-6">Today's Overview</h2>
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
      <StatBox 
        icon={<UserRound className="w-6 h-6 text-indigo-600" />} 
        value={stats.totalPatients} 
        label="Total Patients"
        trend="+5% from yesterday"
      />
      <StatBox 
        icon={<Calendar className="w-6 h-6 text-purple-600" />} 
        value={stats.appointments} 
        label="Appointments"
        trend="+2 upcoming"
      />
      <StatBox 
        icon={<FileText className="w-6 h-6 text-pink-600" />} 
        value={stats.pendingReports} 
        label="Pending Reports"
        trend="3 urgent"
      />
      <StatBox 
        icon={<AlertCircle className="w-6 h-6 text-red-600" />} 
        value={stats.criticalCases} 
        label="Critical Cases"
        trend="Needs attention"
      />
    </div>
  </Card>
);

const ClinicalNotesCard = ({ notes, setNotes }) => (
  <Card>
    <div className="flex items-center justify-between mb-6">
      <h2 className="text-xl font-bold text-gray-900">Clinical Notes</h2>
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
      placeholder="Enter your clinical notes here..."
      className="w-full h-48 p-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-none text-gray-700 placeholder-gray-400 bg-gray-50"
    />
    <div className="flex justify-between items-center mt-4">
      <p className="text-sm text-gray-500">{notes.length} characters</p>
      <button className="bg-gradient-to-r from-blue-500 to-blue-400 text-white px-4 py-2 rounded-full hover:from-indigo-600 hover:to-purple-600 transition-all duration-300 text-sm shadow-lg shadow-indigo-500/20">
        Save Notes
      </button>
    </div>
  </Card>
);

const TaskList = () => (
  <Card>
    <div className="flex items-center justify-between mb-6">
      <h2 className="text-xl font-bold text-gray-900">Today's Tasks</h2>
      <button className="text-sm text-indigo-600 hover:text-indigo-700 font-medium">View All</button>
    </div>
    <div className="space-y-4">
      {tasks.map((task) => (
        <div key={task.id} className="group relative overflow-hidden flex items-start gap-3 p-4 rounded-xl hover:bg-gray-50 transition-all duration-300">
          <div className="mt-1">
            <div className="relative">
              <CheckCircle2 className="w-5 h-5 text-gray-400 group-hover:text-indigo-500 transition-colors" />
              <div 
                className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-indigo-500 transition-all duration-300"
                style={{ width: `${task.progress}%` }}
              ></div>
            </div>
          </div>
          <div className="flex-1">
            <h3 className="text-gray-900 font-medium group-hover:text-indigo-600 transition-colors">
              {task.title}
            </h3>
            <div className="flex items-center gap-3 mt-2">
              <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                task.priority === "High" 
                  ? "bg-red-100 text-red-700"
                  : task.priority === "Medium"
                    ? "bg-amber-100 text-amber-700"
                    : "bg-green-100 text-green-700"
              }`}>
                {task.priority}
              </span>
              <span className="text-sm text-gray-500 flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {task.time}
              </span>
              <span className="text-xs text-gray-500">{task.progress}% complete</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  </Card>
);

const Card = ({ children }) => (
  <div className="bg-white p-6 rounded-2xl shadow-xl shadow-indigo-500/5 border border-gray-100">
    {children}
  </div>
);

const StatBox = ({ 
  icon, 
  value, 
  label,
  trend 
}) => (
  <div className="relative overflow-hidden p-6 rounded-2xl bg-gradient-to-br from-gray-50 to-white border border-gray-100 hover:border-indigo-200 transition-all duration-300 group">
    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 rounded-full transform translate-x-16 -translate-y-8"></div>
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