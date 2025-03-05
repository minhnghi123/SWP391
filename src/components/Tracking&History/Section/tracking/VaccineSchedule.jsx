import { Calendar, Clock, CheckCircle, ChevronDown, ChevronUp } from 'lucide-react';
import formatDate from '../../../../utils/Date';
import { useState } from 'react';
import CalendarApp from './schedule';
export default function VaccineSchedule({
  input, feedbacks,
  handleOnChange, handleSubmit,
  openFeedback, toggleFeedback,
  sortedVaccines, sortStatus, setSortStatus,
  waitingVaccines, scheduledVaccines, completedVaccines
}) {
  const [expandedSections, setExpandedSections] = useState({
    waiting: true,
    scheduled: true,
    completed: true
  });
  const [isOpen, setIsOpen] = useState(false)

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };
  console.log(isOpen)
  if (isOpen) {
    return (
      <CalendarApp setIsOpen={setIsOpen} sortedVaccines={sortedVaccines} sortStatus={sortStatus} setSortStatus={setSortStatus} />
    )
  }
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
      <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800">Vaccination Schedule</h2>
        <div className="flex flex-row items-center space-x-3">
          <button
            onClick={() => setSortStatus('all')}
            className={`px-4 py-2 rounded-lg transition-all ${sortStatus === 'all'
              ? 'bg-orange-500 text-white'
              : 'bg-orange-50 text-orange-600 hover:bg-orange-100'
              }`}
          >
            All
          </button>
          <button
            onClick={() => setSortStatus('waiting')}
            className={`px-4 py-2 rounded-lg transition-all ${sortStatus === 'waiting'
              ? 'bg-gray-600 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
          >
            Waiting
          </button>
          <button
            onClick={() => setSortStatus('scheduled')}
            className={`px-4 py-2 rounded-lg transition-all ${sortStatus === 'scheduled'
              ? 'bg-blue-600 text-white'
              : 'bg-blue-50 text-blue-600 hover:bg-blue-100'
              }`}
          >
            Scheduled
          </button>
          <button
            onClick={() => setSortStatus('completed')}
            className={`px-4 py-2 rounded-lg transition-all ${sortStatus === 'completed'
              ? 'bg-green-600 text-white'
              : 'bg-green-50 text-green-600 hover:bg-green-100'
              }`}
          >
            Completed
          </button>
        </div>
      </div>

      {/* Waiting Section */}
      {waitingVaccines.length > 0 && (
        <div className="border-b border-gray-100">
          <div
            className="px-6 py-3 bg-gray-50 flex justify-between items-center cursor-pointer hover:bg-gray-100 transition-colors"
            onClick={() => toggleSection('waiting')}
          >
            <div className="flex items-center">
              <Clock size={16} className="text-gray-500 mr-2" />
              <h3 className="text-sm font-medium text-gray-700">Waiting for Vaccination</h3>
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-xs font-medium text-gray-600 bg-gray-100 px-2 py-1 rounded-full">
                {waitingVaccines.length} vaccines
              </span>
              {expandedSections.waiting ? (
                <ChevronUp size={18} className="text-gray-400" />
              ) : (
                <ChevronDown size={18} className="text-gray-400" />
              )}
            </div>
          </div>
          {expandedSections.waiting && (
            <div className="divide-y divide-gray-100">
              {waitingVaccines.map(vaccine => (
                <div key={vaccine.id} className="px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-800">{vaccine.name}</h4>
                    <div className="flex flex-col mt-1 space-y-1">
                      <div className="text-sm text-gray-600">
                        <span className="font-medium">Vaccination Window:</span>
                        <div className="flex items-center text-gray-500">
                          <Calendar size={14} className="mr-1.5 flex-shrink-0" />
                          <span>{formatDate(vaccine.minimumIntervalDate)} - {formatDate(vaccine.dueDate)}</span>
                        </div>
                      </div>
                      {vaccine.vaccinationDate && (
                        <div className="text-sm text-gray-600">
                          <span className="font-medium">Scheduled for:</span> {formatDate(vaccine.vaccinationDate)}
                        </div>
                      )}
                    </div>
                  </div>
                  <div onClick={() => setIsOpen(true)} className="flex items-center space-x-3">
                    <button className="px-4 py-2 border border-gray-300 text-gray-600 text-sm rounded-lg
                     hover:bg-blue-500 hover:text-white">
                      Schedule
                    </button>
                    {/* <button className="px-4 py-2 bg-gray-600 text-white text-sm rounded-lg hover:bg-gray-700 transition-colors">
                      Complete
                    </button> */}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Scheduled Section */}
      {scheduledVaccines.length > 0 && (
        <div className="border-b border-gray-100">
          <div
            className="px-6 py-3 bg-blue-50 flex justify-between items-center cursor-pointer hover:bg-blue-100/50 transition-colors"
            onClick={() => toggleSection('scheduled')}
          >
            <div className="flex items-center">
              <Calendar size={16} className="text-blue-500 mr-2" />
              <h3 className="text-sm font-medium text-blue-700">Scheduled Vaccines</h3>
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-xs font-medium text-blue-600 bg-blue-100 px-2 py-1 rounded-full">
                {scheduledVaccines.length} vaccines
              </span>
              {expandedSections.scheduled ? (
                <ChevronUp size={18} className="text-blue-400" />
              ) : (
                <ChevronDown size={18} className="text-blue-400" />
              )}
            </div>
          </div>
          {expandedSections.scheduled && (
            <div className="divide-y divide-gray-100">
              {scheduledVaccines.map(vaccine => (
                <div key={vaccine.id} className="px-6 py-4 flex items-center justify-between hover:bg-blue-50/50">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-800">{vaccine.name}</h4>
                    <div className="flex flex-col mt-1 space-y-1">
                      <div className="text-sm text-gray-600">
                        <span className="font-medium">Vaccination Window:</span>
                        <div className="flex items-center text-blue-600">
                          <Calendar size={14} className="mr-1.5 flex-shrink-0" />
                          <span>{formatDate(vaccine.minimumIntervalDate)} - {formatDate(vaccine.dueDate)}</span>
                        </div>
                      </div>
                      {vaccine.vaccinationDate && (
                        <div className="text-sm text-blue-600">
                          <span className="font-medium">Scheduled for:</span> {formatDate(vaccine.vaccinationDate)}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <button className="px-4 py-2 border border-blue-300 text-blue-600 text-sm rounded-lg hover:bg-blue-50">
                      Reschedule
                    </button>
                    <button className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors">
                      Complete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Completed Section */}
      {completedVaccines.length > 0 && (
        <div>
          <div
            className="px-6 py-3 bg-green-50 flex justify-between items-center cursor-pointer hover:bg-green-100/50 transition-colors"
            onClick={() => toggleSection('completed')}
          >
            <div className="flex items-center">
              <CheckCircle size={16} className="text-green-500 mr-2" />
              <h3 className="text-sm font-medium text-green-700">Completed Vaccines</h3>
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-xs font-medium text-green-600 bg-green-100 px-2 py-1 rounded-full">
                {completedVaccines.length} vaccines
              </span>
              {expandedSections.completed ? (
                <ChevronUp size={18} className="text-green-400" />
              ) : (
                <ChevronDown size={18} className="text-green-400" />
              )}
            </div>
          </div>
          {expandedSections.completed && (
            <div className="divide-y divide-gray-100">
              {completedVaccines.map(vaccine => (
                <div key={vaccine.id} className={`px-6 py-4 ${openFeedback[vaccine.id] ? 'bg-green-50/50' : ''} hover:bg-green-50/30`}>
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-800">{vaccine.name}</h4>
                      <div className="flex flex-col mt-1 space-y-1">
                        <div className="text-sm text-green-600">
                          <CheckCircle size={14} className="mr-1 inline" />
                          Completed on {formatDate(vaccine.vaccinationDate)}
                        </div>
                        <div className="text-sm text-gray-600">
                          <span className="font-medium">Administered by:</span> {vaccine.administeredByDoctorName}
                        </div>
                        {vaccine.reaction && (
                          <div className="text-sm text-gray-600">
                            <span className="font-medium">Reaction:</span> {vaccine.reaction}
                          </div>
                        )}
                      </div>
                    </div>
                    {!vaccine.reaction && (
                      <button
                        onClick={() => toggleFeedback(vaccine.id)}
                        className="text-green-600 hover:text-green-700 flex items-center"
                      >
                        Add Reaction
                        {openFeedback[vaccine.id] ? (
                          <ChevronUp size={16} className="ml-1" />
                        ) : (
                          <ChevronDown size={16} className="ml-1" />
                        )}
                      </button>
                    )}
                  </div>

                  {openFeedback[vaccine.id] && (
                    <div className="mt-4">
                      <textarea
                        value={feedbacks[vaccine.id] || ''}
                        onChange={(e) => handleOnChange(e, vaccine.id)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        placeholder="Describe any reactions or side effects..."
                        rows="3"
                      />
                      <div className="mt-2 flex justify-end">
                        <button
                          onClick={() => handleSubmit(vaccine.id, feedbacks[vaccine.id])}
                          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                        >
                          Submit Reaction
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {sortedVaccines.length === 0 && (
        <div className="px-6 py-16 text-center">
          <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <Calendar size={32} className="text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-800 mb-2">No Vaccines Found</h3>
          <p className="text-gray-500 max-w-md mx-auto mb-6">
            There are no vaccines in this category. Select a different filter or add new vaccines to start tracking.
          </p>
          <button className="px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors inline-flex items-center">
            Add Vaccine
          </button>
        </div>
      )}
    </div>
  );
}