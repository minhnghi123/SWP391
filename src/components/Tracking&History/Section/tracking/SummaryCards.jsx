import { Calendar, Clock, CheckCircle } from 'lucide-react';
import formatDate from '../../../../utils/Date';

export default function SummaryCards({ waitingVaccines, scheduledVaccines, completedVaccines }) {
  const getNextVaccination = () => {
    const allUpcoming = [...waitingVaccines, ...scheduledVaccines]
      .sort((a, b) => new Date(a.vaccinationDate) - new Date(b.vaccinationDate));
    return allUpcoming[0];
  };

  const nextVaccine = getNextVaccination();
  const totalVaccines = waitingVaccines.length + scheduledVaccines.length + completedVaccines.length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Next Vaccination Card */}
      <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg p-4 text-white">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-sm font-medium opacity-90">Next Vaccination</h3>
          <Calendar size={18} className="opacity-75" />
        </div>
        {nextVaccine ? (
          <>
            <p className="text-lg font-semibold mb-2 line-clamp-1">{nextVaccine.name}</p>
            <div className="flex items-center text-sm text-blue-100">
              <Clock size={14} className="mr-1.5" />
              <span>{formatDate(nextVaccine.vaccinationDate)}</span>
            </div>
          </>
        ) : (
          <p className="text-sm text-blue-100">No upcoming vaccinations</p>
        )}
      </div>

      {/* Waiting Card */}
      <div className="bg-white rounded-lg p-4 border border-gray-200">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center space-x-2">
            <Clock size={18} className="text-gray-500" />
            <h3 className="text-sm font-medium text-gray-700">Waiting</h3>
          </div>
          <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-600">
            {Math.round((waitingVaccines.length / totalVaccines) * 100 || 0)}%
          </span>
        </div>
        <p className="text-2xl font-bold text-gray-700 mb-1">{waitingVaccines.length}</p>
        <div className="w-full bg-gray-100 rounded-full h-1.5">
          <div 
            className="bg-gray-500 h-1.5 rounded-full transition-all duration-500"
            style={{ width: `${(waitingVaccines.length / totalVaccines) * 100 || 0}%` }}
          />
        </div>
      </div>

      {/* Scheduled Card */}
      <div className="bg-white rounded-lg p-4 border border-blue-200">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center space-x-2">
            <Calendar size={18} className="text-blue-500" />
            <h3 className="text-sm font-medium text-blue-700">Scheduled</h3>
          </div>
          <span className="text-xs px-2 py-1 rounded-full bg-blue-50 text-blue-600">
            {Math.round((scheduledVaccines.length / totalVaccines) * 100) || 0}%
          </span>
        </div>
        <p className="text-2xl font-bold text-gray-700 mb-1">{scheduledVaccines.length}</p>
        <div className="w-full bg-blue-50 rounded-full h-1.5">
          <div 
            className="bg-blue-500 h-1.5 rounded-full transition-all duration-500"
            style={{ width: `${(scheduledVaccines.length / totalVaccines) * 100 || 0}%` }}
          />
        </div>
      </div>

      {/* Completed Card */}
      <div className="bg-white rounded-lg p-4 border border-green-200">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center space-x-2">
            <CheckCircle size={18} className="text-green-500" />
            <h3 className="text-sm font-medium text-green-700">Completed</h3>
          </div>
          <span className="text-xs px-2 py-1 rounded-full bg-green-50 text-green-600">
            {Math.round((completedVaccines.length / totalVaccines) * 100 || 0)}%
          </span>
        </div>
        <p className="text-2xl font-bold text-gray-700 mb-1">{completedVaccines.length}</p>
        <div className="w-full bg-green-50 rounded-full h-1.5">
          <div 
            className="bg-green-500 h-1.5 rounded-full transition-all duration-500"
            style={{ width: `${(completedVaccines.length / totalVaccines) * 100 || 0}%` }}
          />
        </div>
      </div>
    </div>
  );
}