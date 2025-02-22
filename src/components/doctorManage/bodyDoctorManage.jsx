import { useState } from "react";
import { FaUserInjured, FaCalendar, FaFileAlt, FaChartLine, FaPrescription, FaClipboardList } from "react-icons/fa";

const patients = [
  { id: 1, name: "John Doe", time: "10:00 AM", status: "Waiting", condition: "Regular Checkup" },
  { id: 2, name: "Jane Smith", time: "10:30 AM", status: "In Progress", condition: "Fever" },
  { id: 3, name: "Mike Johnson", time: "11:00 AM", status: "Scheduled", condition: "Follow-up" }
];

const stats = {
  totalPatients: 45,
  appointments: 12,
  pendingReports: 8,
  criticalCases: 3
};

const tasks = [
  "Review patient records",
  "Follow up on test results",
  "Prepare for surgery at 3 PM",
  "Attend medical conference at 5 PM"
];

const BodyDoctorManage = () => {
  const [notes, setNotes] = useState("");

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <PatientQueue />
          <DoctorStatsCard />
        </div>
        <div className="space-y-6">
          <ClinicalNotesCard notes={notes} setNotes={setNotes} />
          <TaskList />
        </div>
      </div>
    </div>
  );
};

const PatientQueue = () => (
  <Card title="Patient Queue">
    {patients.map((patient) => (
      <div key={patient.id} className="flex items-center gap-4 p-3 bg-gray-100 rounded-lg shadow-sm">
        <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white text-xl font-bold">
          {patient.name[0]}
        </div>
        <div className="flex-1">
          <p className="font-semibold">{patient.name}</p>
          <p className="text-sm text-gray-500">{patient.time}</p>
          <p className="text-sm text-blue-500">{patient.condition}</p>
        </div>
        <span className={`px-3 py-1 rounded-full text-white text-xs ${patient.status === "In Progress" ? "bg-blue-500" : patient.status === "Waiting" ? "bg-yellow-500" : "bg-gray-400"}`}>
          {patient.status}
        </span>
      </div>
    ))}
  </Card>
);

const DoctorStatsCard = () => (
  <Card title="Today's Overview">
    <div className="grid grid-cols-2 gap-4">
      <StatBox icon={<FaUserInjured className="text-blue-500" />} value={stats.totalPatients} label="Total Patients" />
      <StatBox icon={<FaCalendar className="text-blue-400" />} value={stats.appointments} label="Appointments" />
      <StatBox icon={<FaFileAlt className="text-yellow-500" />} value={stats.pendingReports} label="Pending Reports" />
      <StatBox icon={<FaChartLine className="text-red-500" />} value={stats.criticalCases} label="Critical Cases" />
    </div>
    <button className="w-full bg-blue-500 text-white p-3 rounded-lg mt-4 flex items-center justify-center hover:bg-blue-600">
      <FaPrescription className="mr-2" /> Write Prescription
    </button>
  </Card>
);

const ClinicalNotesCard = ({ notes, setNotes }) => (
  <Card title="Clinical Notes">
    <textarea
      value={notes}
      onChange={(e) => setNotes(e.target.value)}
      placeholder="Enter clinical notes..."
      className="w-full h-32 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
    />
    <p className="text-sm text-gray-500 mt-2">{notes.length} characters</p>
  </Card>
);

const TaskList = () => (
  <Card title="To-Do List">
    <ul className="list-disc pl-5 space-y-2 text-gray-700">
      {tasks.map((task, index) => (
        <li key={index} className="flex items-center gap-2">
          <FaClipboardList className="text-blue-500" /> {task}
        </li>
      ))}
    </ul>
  </Card>
);

const Card = ({ title, children }) => (
  <div className="bg-white p-5 rounded-lg shadow">
    <h2 className="text-lg font-semibold mb-4">{title}</h2>
    {children}
  </div>
);

const StatBox = ({ icon, value, label }) => (
  <div className="flex flex-col items-center">
    {icon}
    <p className="text-xl font-bold mt-1">{value}</p>
    <p className="text-sm text-gray-500">{label}</p>
  </div>
);

export default BodyDoctorManage;