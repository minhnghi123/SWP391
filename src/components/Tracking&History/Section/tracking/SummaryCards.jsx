import { Calendar, Clock, CheckCircle, Shield } from 'lucide-react';
import formatDate from '../../../../utils/Date';

export default function SummaryCards({waitingVaccines, scheduledVaccines, completedVaccines}) {
  const getNextVaccination = () => {
    const allUpcoming = [...waitingVaccines, ...scheduledVaccines]
      .sort((a, b) => new Date(a.vaccinationDate) - new Date(b.vaccinationDate));
    return allUpcoming[0];
  };

  const nextVaccine = getNextVaccination();
  const totalVaccines = waitingVaccines.length + scheduledVaccines.length + completedVaccines.length;
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* Next Vaccination Card */}
      <div className="relative bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl p-6 text-white shadow-lg overflow-hidden group">
        <div className="absolute top-0 right-0 w-32 h-32 -mr-8 -mt-8 bg-blue-500/30 rounded-full blur-2xl transform transition-transform duration-500 group-hover:scale-110" />
        <div className="relative">
          <div className="flex items-start justify-between mb-4">
            <h3 className="text-sm font-medium text-blue-100">Next Vaccination</h3>
            <Calendar size={20} className="text-blue-200" />
          </div>
          {nextVaccine ? (
            <>
              <p className="text-xl font-bold mb-3 line-clamp-1">{nextVaccine.name}</p>
              <div className="flex items-center text-sm text-blue-100 bg-blue-500/20 px-3 py-2 rounded-lg">
                <Clock size={16} className="mr-2" />
                <span>{formatDate(nextVaccine.vaccinationDate)}</span>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-start space-y-3">
              <p className="text-sm text-blue-100">No upcoming vaccinations</p>
              <button className="text-xs font-medium px-3 py-1.5 bg-white/10 hover:bg-white/20 rounded-lg transition-colors duration-200">
                Schedule Now
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Waiting Card */}
      <div className="bg-white rounded-xl p-6 border border-blue-100 shadow-sm hover:shadow-md transition-shadow duration-200">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-50 rounded-lg">
              <Clock size={20} className="text-blue-600" />
            </div>
            <h3 className="text-sm font-medium text-blue-900">Waiting</h3>
          </div>
          <span className="text-xs font-medium px-2.5 py-1.5 rounded-lg bg-blue-50 text-blue-700">
            {Math.round((waitingVaccines.length / totalVaccines) * 100 || 0)}%
          </span>
        </div>
        <p className="text-3xl font-bold text-blue-900 mb-3">{waitingVaccines.length}</p>
        <div className="w-full bg-blue-50 rounded-full h-2">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-500 relative"
            style={{ width: `${(waitingVaccines.length / totalVaccines) * 100 || 0}%` }}
          >
            <div className="absolute -right-1 -top-1 w-4 h-4 bg-blue-600 rounded-full border-2 border-white" />
          </div>
        </div>
      </div>

      {/* Scheduled Card */}
      <div className="bg-white rounded-xl p-6 border border-blue-100 shadow-sm hover:shadow-md transition-shadow duration-200">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-50 rounded-lg">
              <Calendar size={20} className="text-blue-600" />
            </div>
            <h3 className="text-sm font-medium text-blue-900">Scheduled</h3>
          </div>
          <span className="text-xs font-medium px-2.5 py-1.5 rounded-lg bg-blue-50 text-blue-700">
            {Math.round((scheduledVaccines.length / totalVaccines) * 100 || 0)}%
          </span>
        </div>
        <p className="text-3xl font-bold text-blue-900 mb-3">{scheduledVaccines.length}</p>
        <div className="w-full bg-blue-50 rounded-full h-2">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-500 relative"
            style={{ width: `${(scheduledVaccines.length / totalVaccines) * 100 || 0}%` }}
          >
            <div className="absolute -right-1 -top-1 w-4 h-4 bg-blue-600 rounded-full border-2 border-white" />
          </div>
        </div>
      </div>

      {/* Completed Card */}
      <div className="bg-white rounded-xl p-6 border border-blue-100 shadow-sm hover:shadow-md transition-shadow duration-200">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-50 rounded-lg">
              <CheckCircle size={20} className="text-blue-600" />
            </div>
            <h3 className="text-sm font-medium text-blue-900">Completed</h3>
          </div>
          <span className="text-xs font-medium px-2.5 py-1.5 rounded-lg bg-blue-50 text-blue-700">
            {Math.round((completedVaccines.length / totalVaccines) * 100 || 0)}%
          </span>
        </div>
        <p className="text-3xl font-bold text-blue-900 mb-3">{completedVaccines.length}</p>
        <div className="w-full bg-blue-50 rounded-full h-2">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-500 relative"
            style={{ width: `${(completedVaccines.length / totalVaccines) * 100 || 0}%` }}
          >
            <div className="absolute -right-1 -top-1 w-4 h-4 bg-blue-600 rounded-full border-2 border-white" />
          </div>
        </div>
      </div>
    </div>
  );
}