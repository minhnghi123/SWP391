import { Calendar, Clock, AlertCircle, CheckCircle, Plus, ChevronDown } from 'lucide-react';
import getTimeRemaining from '../../../../utils/getTimeRemaining';
import formatDate from '../../../../utils/Date';


export default function VaccineSchedule({ input, feedbacks, handleOnChange, handleSubmit, openFeedback, toggleFeedback, sortedVaccines, sortStatus, setSortStatus, overdueVaccines, upcomingVaccines, completedVaccines }) {

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
      <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800">Vaccination Schedule</h2>
        <div className="flex flex-row items-center space-x-4">
          <button
            onClick={() => setSortStatus('all')}
            className={`px-4 py-2 rounded-lg text-white transition-all ${sortStatus === 'all' ? 'bg-gray-500' : 'bg-gray-600 hover:bg-red-600'
              }`}
          >
            All
          </button>
          <button
            onClick={() => setSortStatus('overdue')}
            className={`px-4 py-2 rounded-lg text-white transition-all ${sortStatus === 'overdue' ? 'bg-red-600' : 'bg-red-500 hover:bg-red-600'
              }`}
          >
            Overdue
          </button>
          <button
            onClick={() => setSortStatus('upcoming')}
            className={`px-4 py-2 rounded-lg text-white transition-all ${sortStatus === 'upcoming' ? 'bg-blue-600' : 'bg-blue-500 hover:bg-blue-600'
              }`}
          >
            Upcoming
          </button>
          <button
            onClick={() => setSortStatus('completed')}
            className={`px-4 py-2 rounded-lg text-white transition-all ${sortStatus === 'completed' ? 'bg-green-600' : 'bg-green-500 hover:bg-green-600'
              }`}
          >
            Complete
          </button>
          <button className="flex items-center px-3 py-2 text-sm font-medium text-indigo-600 hover:text-indigo-800 hover:bg-indigo-100 focus:ring-2 focus:ring-indigo-300 rounded-lg transition-all">
            <Calendar size={16} className="mr-1" />
            View Calendar
          </button>
        </div>

      </div>

      {/* Overdue Section */}
      {overdueVaccines.length > 0 && (
        <div className="border-b border-gray-100">
          <div className="px-6 py-3 bg-red-50 flex justify-between items-center">
            <h3 className="text-sm font-medium text-red-800 flex items-center">
              <AlertCircle size={16} className="mr-2" />
              Overdue Vaccines
            </h3>
            <span className="text-xs font-medium text-red-600 bg-red-100 px-2 py-1 rounded-full">
              {overdueVaccines.length} vaccines
            </span>
          </div>
          <div className="divide-y divide-gray-100">
            {overdueVaccines.map(vaccine => (
              <div key={vaccine.id} className="px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                <div className="flex-1">
                  <h4 className="font-medium text-gray-800">{vaccine.name}</h4>
                  <div className="flex items-center mt-1 text-sm text-red-600">
                    <Clock size={14} className="mr-1 flex-shrink-0" />
                    <span>{getTimeRemaining(vaccine.dueDate)}</span>
                  </div>
                </div>
                <button className="ml-4 px-4 py-2 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700 transition-colors flex items-center">
                  <CheckCircle size={16} className="mr-1" />
                  Mark Complete
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Upcoming Section */}
      {upcomingVaccines.length > 0 && (
        <div className="border-b border-gray-100">
          <div className="px-6 py-3 bg-blue-50 flex justify-between items-center">
            <h3 className="text-sm font-medium text-blue-800 flex items-center">
              <Calendar size={16} className="mr-2" />
              Upcoming Vaccines
            </h3>
            <span className="text-xs font-medium text-blue-600 bg-blue-100 px-2 py-1 rounded-full">
              {upcomingVaccines.length} vaccines
            </span>
          </div>
          <div className="divide-y divide-gray-100">
            {upcomingVaccines.map(vaccine => (
              <div key={vaccine.id} className="px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                <div className="flex-1">
                  <h4 className="font-medium text-gray-800">{vaccine.name}</h4>
                  <div className="flex items-center mt-1 text-sm text-blue-600">
                    <Calendar size={14} className="mr-1 flex-shrink-0" />
                    <span>Due {formatDate(vaccine.dueDate)} ({getTimeRemaining(vaccine.dueDate)})</span>
                  </div>
                </div>
                <div className="flex items-center ml-4 space-x-2">
                  <button className="px-3 py-1 border border-blue-300 text-blue-600 text-sm rounded-lg hover:bg-blue-50 transition-colors">
                    Reschedule
                  </button>
                  <button className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors flex items-center">
                    <CheckCircle size={16} className="mr-1" />
                    Complete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Completed Section */}
      {completedVaccines.length > 0 && (
        <div className="border-b border-gray-100">
          <div className="px-6 py-3 bg-green-50 flex justify-between items-center">
            <h3 className="text-sm font-medium text-green-800 flex items-center">
              <CheckCircle size={16} className="mr-2" />
              Completed Vaccines
            </h3>
            <span className="text-xs font-medium text-green-600 bg-green-100 px-2 py-1 rounded-full">
              {completedVaccines.length} vaccines
            </span>
          </div>
          <div className="divide-y divide-gray-100">
            {completedVaccines.map(vaccine => (
              <div
                key={vaccine.id}
                className={`px-6 py-4 transition-all ${openFeedback[vaccine.id] ? "bg-gray-100" : "bg-white"}`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-800">{vaccine.name}</h4>
                    <div className="flex items-center mt-1 text-sm text-green-600">
                      <CheckCircle size={14} className="mr-1 flex-shrink-0" />
                      <span>Completed on {formatDate(vaccine.dueDate)}</span>
                    </div>
                    {vaccine.feedback && (
                      <p className="text-sm text-gray-500 mt-2">
                        Feedback: {vaccine.feedback}
                      </p>
                    )}
                  </div>

                  {!vaccine.feedback && (
                    <div className="flex items-center space-x-2">
                      <p className="text-gray-400">Can you provide your feedback? </p>
                      <button
                        onClick={() => toggleFeedback(vaccine.id)}
                        className="text-gray-400 hover:text-blue-600 p-2 rounded-full hover:bg-blue-50 transition-all"
                      >
                        <ChevronDown size={20} className={`${openFeedback[vaccine.id] ? "rotate-180" : "rotate-0"} transition-transform`} />
                      </button>
                    </div>

                  )}
                </div>
                {openFeedback[vaccine.id] && (
                  <div className="mt-2 w-full">
                    <textarea
                      onChange={(e) => handleOnChange(e, vaccine.id)}
                      value={feedbacks[vaccine.id] || ''} // Hiển thị nội dung đã nhập trước đó
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter your feedback here..."
                    />

                    <button
                      type="submit"
                      onClick={() => handleSubmit(vaccine.id, input)}
                      className="mt-2 px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors flex items-center"
                    >
                      Submit Feedback
                    </button>

                  </div>
                )}
              </div>
            ))}

          </div>


          {sortedVaccines.length === 0 && (
            <div className="px-6 py-16 text-center">
              <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <Calendar size={32} className="text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-800 mb-2">No Vaccines Scheduled</h3>
              <p className="text-gray-500 max-w-md mx-auto mb-6">
                There are no vaccines scheduled for this child. Add a vaccine to start tracking their immunization progress.
              </p>
              <button className="px-5 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center mx-auto">
                <Plus size={18} className="mr-2" />
                Add Vaccine
              </button>
            </div>
          )}
        </div>
      )
      }
    </div>
  )
}