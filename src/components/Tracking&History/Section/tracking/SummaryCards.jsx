import { Calendar, Clock, CheckCircle, Shield, ChartBar } from 'lucide-react';
import ProgressBar from './processBar';

export default function SummaryCards({ progressData }) {
  if (!progressData) {
    return <p>Loading...</p>;
  }

  return (
    <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
      <div className="flex items-center gap-3 mb-8">
        <Shield className="w-6 h-6 text-indigo-500" />
        <h2 className="text-2xl font-semibold text-gray-800">Vaccination Overview</h2>
      </div>

      <div className="relative mb-12">
        <div className="absolute -top-2 right-0 bg-indigo-50 text-indigo-700 px-4 py-1 rounded-full text-sm font-medium">
          {(progressData?.percentage || 0) + "% Complete"}
        </div>
        <ProgressBar
          percentage={progressData?.percentage || 0}
          vaccineName="All Vaccines"
          current={progressData?.completed || 0}
          total={(progressData?.total || 0) - (progressData?.totalCancel || 0) - (progressData?.overDue || 0) - (progressData?.checkTwoStatus || 0)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-indigo-50 to-white p-6 rounded-xl border border-indigo-100 transform transition-all duration-200 hover:scale-[1.02] hover:shadow-md">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-indigo-100 rounded-lg">
              <CheckCircle className="w-5 h-5 text-indigo-500" />
            </div>
            <h3 className="text-indigo-900 font-medium text-lg">Completed Vaccines</h3>
          </div>
          <div className="ml-8">
            <div className="flex items-baseline gap-2">
              <p className="text-4xl font-bold text-indigo-600">{progressData?.completed || 0}</p>
              <p className="text-indigo-600 opacity-75 font-medium">/ {(progressData?.total || 0) - (progressData?.totalCancel || 0) - (progressData?.overDue || 0) - (progressData?.checkTwoStatus || 0)}</p>
            </div>
            <p className="text-sm text-indigo-600 opacity-75 mt-1">vaccines completed</p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-xl border border-gray-100 transform transition-all duration-200 hover:scale-[1.02] hover:shadow-md">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-gray-100 rounded-lg">
              <ChartBar className="w-5 h-5 text-gray-500" />
            </div>
            <h3 className="text-gray-900 font-medium text-lg">Remaining Vaccines</h3>
          </div>
          <div className="ml-8">
            <div className="flex items-baseline gap-2">
              <p className="text-4xl font-bold text-gray-700">
                {(progressData?.total || 0) - (progressData?.completed || 0) - (progressData?.totalCancel || 0) - (progressData?.overDue || 0) - (progressData?.checkTwoStatus || 0)}
              </p>
              <p className="text-gray-600 opacity-75 font-medium">remaining</p>
            </div>
            <p className="text-sm text-gray-500 mt-1">vaccines to complete</p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-xl border border-gray-100 transform transition-all duration-200 hover:scale-[1.02] hover:shadow-md">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-gray-100 rounded-lg">
              <Clock className="w-5 h-5 text-gray-500" />
            </div>
            <h3 className="text-gray-900 font-medium text-lg">Overdue Vaccines</h3>
          </div>
          <div className="ml-8">
            <div className="flex items-baseline gap-2">
              <p className="text-4xl font-bold text-gray-700">{progressData?.overDue || 0}</p>
              <p className="text-gray-600 opacity-75 font-medium">overdue</p>
            </div>
            <p className="text-sm text-gray-500 mt-1">vaccines overdue</p>
          </div>
        </div>
      </div>
    </div>
  );
}
