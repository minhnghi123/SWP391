import { Calendar, AlertCircle,Shield } from 'lucide-react';
import  getTimeRemaining  from '../../../../utils/getTimeRemaining';
import formatDate from '../../../../utils/Date';
export default function SummaryCards({upcomingVaccines, overdueVaccines, completedVaccines}) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl shadow-sm p-6 border border-blue-200">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-500 bg-opacity-10 text-blue-600">
              <Calendar size={24} />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-800">Upcoming</h3>
              <p className="text-3xl font-bold text-blue-600">{upcomingVaccines.length}</p>
            </div>
          </div>
          {upcomingVaccines.length > 0 && (
            <div className="mt-4 pt-4 border-t border-blue-200 border-opacity-50">
              <p className="text-sm text-blue-700">Next: {upcomingVaccines[0].name}</p>
              <p className="text-xs text-blue-600 mt-1">{getTimeRemaining(upcomingVaccines[0].dueDate)}</p>
            </div>
          )}
        </div>

        <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl shadow-sm p-6 border border-red-200">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-red-500 bg-opacity-10 text-red-600">
              <AlertCircle size={24} />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-800">Overdue</h3>
              <p className="text-3xl font-bold text-red-600">{overdueVaccines.length}</p>
            </div>
          </div>
          {overdueVaccines.length > 0 && (
            <div className="mt-4 pt-4 border-t border-red-200 border-opacity-50">
              <p className="text-sm text-red-700">Urgent: {overdueVaccines[0].name}</p>
              <p className="text-xs text-red-600 mt-1">{getTimeRemaining(overdueVaccines[0].dueDate)}</p>
            </div>
          )}
        </div>

        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl shadow-sm p-6 border border-green-200">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-500 bg-opacity-10 text-green-600">
              <Shield size={24} />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-800">Completed</h3>
              <p className="text-3xl font-bold text-green-600">{completedVaccines.length}</p>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-green-200 border-opacity-50">
            <p className="text-sm text-green-700">
              {completedVaccines.length > 0
                ? `Last: ${completedVaccines[0].name}`
                : ""}
            </p>
            {completedVaccines.length > 0 && (
              <p className="text-xs text-green-600 mt-1">On {formatDate(completedVaccines[0].dueDate)}</p>
            )}
          </div>
        </div>
      </div>
    )
}