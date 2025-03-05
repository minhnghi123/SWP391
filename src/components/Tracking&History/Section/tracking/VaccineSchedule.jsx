import { Calendar, Clock, CheckCircle, ChevronDown, ChevronUp, AlertCircle, Shield } from 'lucide-react';
import formatDate from '../../../../utils/Date';
import { useState } from 'react';
import CalendarApp from './schedule';

export default function VaccineSchedule({
  input, feedbacks,
  handleOnChange, handleSubmit,
  openFeedback, toggleFeedback,
  sortedVaccines, sortStatus, setSortStatus,
  waitingVaccines, scheduledVaccines, completedVaccines,
  selectedChild
}) {
  const [expandedSections, setExpandedSections] = useState({
    waiting: true,
    scheduled: true,
    completed: true
  });
  const [isOpen, setIsOpen] = useState(false);

  const getVaccinesWithReaction = (childId) => {
    if(sortedVaccines){
      return sortedVaccines.filter(vaccine => vaccine.childId === childId && vaccine.reaction === 'Nothing' && vaccine.status === 'completed')
    }
    else {
      return completedVaccines.filter(vaccine => vaccine.childId === childId && vaccine.reaction === 'Nothing')
    }
  };

  const selectedChildVaccinesWithReaction = getVaccinesWithReaction(selectedChild);

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  if (isOpen) {
    return (
      <CalendarApp setIsOpen={setIsOpen} sortedVaccines={sortedVaccines} sortStatus={sortStatus} setSortStatus={setSortStatus} />
    )
  }

  const StatusButton = ({ status, count, isActive, onClick }) => {
    const styles = {
      waiting: {
        active: 'bg-blue-600 text-white',
        inactive: 'bg-white text-blue-600 hover:bg-blue-50 border border-blue-200'
      },
      scheduled: {
        active: 'bg-blue-600 text-white',
        inactive: 'bg-white text-blue-600 hover:bg-blue-50 border border-blue-200'
      },
      completed: {
        active: 'bg-blue-600 text-white',
        inactive: 'bg-white text-blue-600 hover:bg-blue-50 border border-blue-200'
      },
      all: {
        active: 'bg-blue-700 text-white',
        inactive: 'bg-white text-blue-700 hover:bg-blue-50 border border-blue-200'
      }
    };

    return (
      <button
        onClick={onClick}
        className={`px-4 py-2 rounded-lg transition-all duration-200 flex items-center space-x-2 font-medium ${
          isActive ? styles[status].active : styles[status].inactive
        }`}
      >
        <span>{status.charAt(0).toUpperCase() + status.slice(1)}</span>
        {count !== undefined && (
          <span className={`text-xs px-2 py-0.5 rounded-full ${
            isActive ? 'bg-white/20' : 'bg-blue-100'
          }`}>
            {count}
          </span>
        )}
      </button>
    );
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-blue-100">
      <div className="px-6 py-6 border-b border-blue-100 bg-gradient-to-r from-blue-50 to-white">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-3">
            <Shield size={28} className="text-blue-600" />
            <h2 className="text-2xl font-bold text-blue-900">Vaccination Schedule</h2>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <StatusButton 
            status="all"
            isActive={sortStatus === 'all'}
            onClick={() => setSortStatus('all')}
            count={sortedVaccines.length}
          />
          <StatusButton 
            status="waiting"
            isActive={sortStatus === 'waiting'}
            onClick={() => setSortStatus('waiting')}
            count={waitingVaccines.length}
          />
          <StatusButton 
            status="scheduled"
            isActive={sortStatus === 'scheduled'}
            onClick={() => setSortStatus('scheduled')}
            count={scheduledVaccines.length}
          />
          <StatusButton 
            status="completed"
            isActive={sortStatus === 'completed'}
            onClick={() => setSortStatus('completed')}
            count={completedVaccines.length}
          />
        </div>
      </div>

      {/* Waiting Section */}
      {waitingVaccines.length > 0 && (
        <div className="border-b border-blue-100">
          <div
            className="px-6 py-4 bg-white flex justify-between items-center cursor-pointer hover:bg-blue-50/50 transition-all duration-200"
            onClick={() => toggleSection('waiting')}
          >
            <div className="flex items-center">
              <Clock size={18} className="text-blue-600 mr-2" />
              <h3 className="text-sm font-semibold text-blue-900">Waiting for Vaccination</h3>
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-xs font-semibold text-blue-600 bg-blue-100/70 px-2.5 py-1 rounded-full">
                {waitingVaccines.length}
              </span>
              {expandedSections.waiting ? (
                <ChevronUp size={20} className="text-blue-400" />
              ) : (
                <ChevronDown size={20} className="text-blue-400" />
              )}
            </div>
          </div>
          {expandedSections.waiting && (
            <div className="divide-y divide-blue-100">
              {waitingVaccines.map(vaccine => (
                <div key={vaccine.id} className="px-6 py-5 flex items-center justify-between hover:bg-blue-50/30 transition-all duration-200">
                  <div className="flex-1">
                    <h4 className="font-semibold text-blue-900 mb-2">{vaccine.name}</h4>
                    <div className="space-y-2">
                      <div className="flex items-center text-sm text-blue-600">
                        <Calendar size={16} className="mr-2 text-blue-400" />
                        <span className="font-medium">Window:</span>
                        <span className="ml-2">{formatDate(vaccine.minimumIntervalDate)} - {formatDate(vaccine.dueDate)}</span>
                      </div>
                      {vaccine.vaccinationDate && (
                        <div className="flex items-center text-sm text-blue-600">
                          <Clock size={16} className="mr-2 text-blue-400" />
                          <span className="font-medium">Scheduled:</span>
                          <span className="ml-2">{formatDate(vaccine.vaccinationDate)}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <button 
                    onClick={() => setIsOpen(true)}
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg 
                    hover:bg-blue-700 transition-all duration-200 shadow-sm"
                  >
                    Schedule
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Scheduled Section */}
      {scheduledVaccines.length > 0 && (
        <div className="border-b border-blue-100">
          <div
            className="px-6 py-4 bg-blue-50/50 flex justify-between items-center cursor-pointer hover:bg-blue-100/50 transition-all duration-200"
            onClick={() => toggleSection('scheduled')}
          >
            <div className="flex items-center">
              <Calendar size={18} className="text-blue-600 mr-2" />
              <h3 className="text-sm font-semibold text-blue-900">Scheduled Vaccines</h3>
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-xs font-semibold text-blue-600 bg-blue-100 px-2.5 py-1 rounded-full">
                {scheduledVaccines.length}
              </span>
              {expandedSections.scheduled ? (
                <ChevronUp size={20} className="text-blue-400" />
              ) : (
                <ChevronDown size={20} className="text-blue-400" />
              )}
            </div>
          </div>
          {expandedSections.scheduled && (
            <div className="divide-y divide-blue-100">
              {scheduledVaccines.map(vaccine => (
                <div key={vaccine.id} className="px-6 py-5 flex items-center justify-between hover:bg-blue-50/30 transition-all duration-200">
                  <div className="flex-1">
                    <h4 className="font-semibold text-blue-900 mb-2">{vaccine.name}</h4>
                    <div className="space-y-2">
                      <div className="flex items-center text-sm text-blue-600">
                        <Calendar size={16} className="mr-2 text-blue-400" />
                        <span className="font-medium">Window:</span>
                        <span className="ml-2">{formatDate(vaccine.minimumIntervalDate)} - {formatDate(vaccine.dueDate)}</span>
                      </div>
                      {vaccine.vaccinationDate && (
                        <div className="flex items-center text-sm text-blue-600">
                          <Clock size={16} className="mr-2" />
                          <span className="font-medium">Scheduled for:</span>
                          <span className="ml-2">{formatDate(vaccine.vaccinationDate)}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <button 
                      className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700 border border-blue-200 
                      rounded-lg hover:bg-blue-50 transition-all duration-200"
                      onClick={() => setIsOpen(true)}
                    >
                      Reschedule
                    </button>
                    <button 
                      onClick={() => setIsOpen(true)}
                      className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg 
                      hover:bg-blue-700 transition-all duration-200 shadow-sm"
                    >
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
            className="px-6 py-4 bg-blue-50/30 flex justify-between items-center cursor-pointer hover:bg-blue-100/30 transition-all duration-200"
            onClick={() => toggleSection('completed')}
          >
            <div className="flex items-center">
              <CheckCircle size={18} className="text-blue-600 mr-2" />
              <h3 className="text-sm font-semibold text-blue-900">Completed Vaccines</h3>
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-xs font-semibold text-blue-600 bg-blue-100 px-2.5 py-1 rounded-full">
                {completedVaccines.length}
              </span>
              {expandedSections.completed ? (
                <ChevronUp size={20} className="text-blue-400" />
              ) : (
                <ChevronDown size={20} className="text-blue-400" />
              )}
            </div>
          </div>
          {expandedSections.completed && (
            <div className="divide-y divide-blue-100">
              {completedVaccines.map(vaccine => (
                <div key={vaccine.id} className={`px-6 py-5 ${openFeedback[vaccine.id] ? 'bg-blue-50/30' : ''} 
                  hover:bg-blue-50/20 transition-all duration-200`}>
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h4 className="font-semibold text-blue-900 mb-2">{vaccine.name}</h4>
                      <div className="space-y-2">
                        <div className="flex items-center text-sm text-blue-600">
                          <CheckCircle size={16} className="mr-2" />
                          <span>Completed on {formatDate(vaccine.vaccinationDate)}</span>
                        </div>
                        <div className="flex items-center text-sm text-blue-600/80">
                          <span className="font-medium">Administered by:</span>
                          <span className="ml-2">{vaccine.administeredByDoctorName}</span>
                        </div>
                        {vaccine.reaction && vaccine.reaction !== 'Nothing' && (
                          <div className="flex items-center text-sm text-blue-600">
                            <AlertCircle size={16} className="mr-2" />
                            <span className="font-medium">Reaction:</span>
                            <span className="ml-2">{vaccine.reaction}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    {selectedChildVaccinesWithReaction.some(v => v.id === vaccine.id) && (
                      <button
                        onClick={() => toggleFeedback(vaccine.id)}
                        className="text-blue-600 hover:text-blue-700 flex items-center font-medium transition-colors duration-200"
                      >
                        Add Reaction
                        {openFeedback[vaccine.id] ? (
                          <ChevronUp size={18} className="ml-1" />
                        ) : (
                          <ChevronDown size={18} className="ml-1" />
                        )}
                      </button>
                    )}
                  </div>

                  {openFeedback[vaccine.id] && selectedChildVaccinesWithReaction.some(v => v.id === vaccine.id) && (
                    <div className="mt-4 space-y-3">
                      <textarea
                        value={feedbacks[vaccine.id] || ''}
                        onChange={(e) => handleOnChange(e, vaccine.id)}
                        className="w-full p-3 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 
                        focus:border-blue-500 transition-all duration-200"
                        placeholder="Describe any reactions or side effects..."
                        rows="3"
                      />
                      <div className="flex justify-end">
                        <button
                          onClick={() => handleSubmit(vaccine.id, feedbacks[vaccine.id])}
                          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 
                          transition-all duration-200 font-medium shadow-sm"
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
          <div className="mx-auto w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mb-6">
            <Calendar size={40} className="text-blue-400" />
          </div>
          <h3 className="text-xl font-semibold text-blue-900 mb-3">No Vaccines Found</h3>
          <p className="text-blue-600/80 max-w-md mx-auto mb-8">
            There are no vaccines in this category. Select a different filter or add new vaccines to start tracking.
          </p>
          <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 
            transition-all duration-200 inline-flex items-center font-medium shadow-sm">
            Add Vaccine
          </button>
        </div>
      )}
    </div>
  );
}