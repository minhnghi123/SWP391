import { Calendar, Clock, CheckCircle, ChevronDown, ChevronUp, AlertCircle, Shield, User } from 'lucide-react';
import formatDate from '../../../../utils/Date';
import { useState } from 'react';
import CalendarApp from './schedule';

export default function VaccineSchedules({ sortLinkList, ProgressBar }) {
  const [expandedVaccines, setExpandedVaccines] = useState({});
  const [hoveredCard, setHoveredCard] = useState(null);

  const toggleVaccine = (index) => {
    setExpandedVaccines(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'completed': return 'text-emerald-500 bg-emerald-50 ring-1 ring-emerald-100';
      case 'schedule': return 'text-violet-500 bg-violet-50 ring-1 ring-violet-100';
      case 'waiting': return 'text-amber-500 bg-amber-50 ring-1 ring-amber-100';
      default: return 'text-slate-500 bg-slate-50 ring-1 ring-slate-100';
    }
  };

  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case 'completed': return <CheckCircle className="w-5 h-5" />;
      case 'schedule': return <Calendar className="w-5 h-5" />;
      case 'waiting': return <Clock className="w-5 h-5" />;
      default: return <AlertCircle className="w-5 h-5" />;
    }
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
      <div className="flex items-center gap-4 mb-8">
        <div className="p-3 bg-indigo-50 rounded-xl">
          <Shield className="w-6 h-6 text-indigo-500" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Vaccination Schedule</h2>
          <p className="text-gray-500 text-sm mt-1">Track and manage your vaccination progress</p>
        </div>
      </div>

      <div className="space-y-6">
        {sortLinkList.map((chain, index) => {
          const vaccineName = chain[0]?.vaccineName || 'Unknown Vaccine';
          const completed = chain.filter(item =>
            item.status.toLowerCase() === 'completed' ||
            (item.vaccinationDate && new Date(item.vaccinationDate) < new Date())
          ).length;
          const total = chain.length;
          const percentage = Math.round((completed / total) * 100) || 0;

          return (
            <div 
              key={index} 
              className="transform transition-all duration-300 ease-in-out"
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="flex flex-row-reverse items-center gap-4 mb-2">
                <button
                  onClick={() => toggleVaccine(index)}
                  className={`p-3 rounded-xl transition-all duration-300 ${
                    hoveredCard === index ? 'bg-indigo-100 text-indigo-600' : 'hover:bg-indigo-50 text-gray-400'
                  }`}
                >
                  {expandedVaccines[index] ? (
                    <ChevronUp className="w-5 h-5" />
                  ) : (
                    <ChevronDown className="w-5 h-5" />
                  )}
                </button>
                <div className="flex-1 bg-white p-5 rounded-xl border border-gray-100 hover:border-indigo-200 transition-all duration-300 hover:shadow-md">
                  <ProgressBar
                    vaccineName={vaccineName}
                    percentage={percentage}
                    current={completed}
                    total={total}
                  />
                </div>
              </div>

              {expandedVaccines[index] && (
                <div className="ml-12 mt-6 space-y-6 border-l-2 border-indigo-100 pl-8 relative animate-fadeIn">
                  {chain.map((dose, doseIndex) => (
                    <div
                      key={doseIndex}
                      className="relative group transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                    >
                      <div className="absolute w-4 h-4 bg-indigo-500 rounded-full -left-[35px] top-8 ring-4 ring-white">
                        <div className="absolute w-4 h-4 bg-indigo-500 rounded-full animate-ping opacity-20"></div>
                      </div>

                      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:border-indigo-200 transition-all duration-300">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex items-center gap-4">
                            <span className={`${getStatusColor(dose.status)} p-3 rounded-xl transition-colors duration-300`}>
                              {getStatusIcon(dose.status)}
                            </span>
                            <div>
                              <h4 className="font-semibold text-gray-800 text-lg">
                                Dose {doseIndex + 1}
                              </h4>
                              <span className="text-sm text-gray-500">
                                {dose.vaccineName}
                              </span>
                            </div>
                          </div>
                          <span className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                            dose.status.toLowerCase() === 'completed' ? 'bg-emerald-100 text-emerald-800' :
                            dose.status.toLowerCase() === 'schedule' ? 'bg-violet-100 text-violet-800' :
                            'bg-amber-100 text-amber-800'
                          }`}>
                            {dose.status}
                          </span>
                        </div>

                        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-3">
                            {dose.vaccinationDate && (
                              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all duration-300">
                                <Calendar className="w-5 h-5 text-indigo-500" />
                                <div>
                                  <span className="font-medium block text-gray-700">Vaccination Date</span>
                                  <span className="text-gray-600 text-sm">{formatDate(dose.vaccinationDate)}</span>
                                </div>
                              </div>
                            )}

                            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all duration-300">
                              <User className="w-5 h-5 text-indigo-500" />
                              <div>
                                <span className="font-medium block text-gray-700">Parent</span>
                                <span className="text-gray-600 text-sm">{dose.administeredByDoctorName}</span>
                              </div>
                            </div>
                          </div>

                          <div className="space-y-3">
                            {dose.minimumIntervalDate && dose.maximumIntervalDate && (
                              <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all duration-300">
                                <Clock className="w-5 h-5 text-indigo-500 mt-1" />
                                <div>
                                  <span className="font-medium block text-gray-700">Vaccination Window</span>
                                  <span className="text-gray-600 text-sm block">{formatDate(dose.minimumIntervalDate)}</span>
                                  <span className="text-gray-600 text-sm block">{formatDate(dose.maximumIntervalDate)}</span>
                                </div>
                              </div>
                            )}

                            {dose.reaction && (
                              <div className="flex items-center gap-3 p-4 bg-amber-50 rounded-xl transition-all duration-300">
                                <AlertCircle className="w-5 h-5 text-amber-500" />
                                <div>
                                  <span className="font-medium block text-amber-700">Reaction</span>
                                  <span className="text-amber-600 text-sm">{dose.reaction}</span>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}




