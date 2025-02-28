import React, { useState } from 'react';
import { Calendar, Clock, AlertCircle, CheckCircle, ChevronRight, Plus, User } from 'lucide-react';
import ToUpperCaseWords from '../../../utils/upperCaseFirstLetter';

const Dashboard = () => {
  const [selectedChild, setSelectedChild] = useState(1);

  const children = [
    { id: 1, name: 'Emma Johnson', age: '2 years', photo: 'https://images.unsplash.com/photo-1602030638412-bb8dcc0bc8b0?ixlib=rb-1.2.1&auto=format&fit=crop&w=64&q=80', gender: 'Male' },
    { id: 2, name: 'Noah Johnson', age: '4 years', photo: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?ixlib=rb-1.2.1&auto=format&fit=crop&w=64&q=80', gender: 'Female' },
    { id: 3, name: 'Olivia Johnson', age: '6 months', photo: 'https://images.unsplash.com/photo-1588871282622-2c4b8d3d8f3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=64&q=80', gender: 'Male' },
  ];

  const vaccines = [
    { id: 1, name: 'DTaP (Diphtheria, Tetanus, Pertussis)', dueDate: '2023-06-15', status: 'completed', childId: 1 },
    { id: 2, name: 'MMR (Measles, Mumps, Rubella)', dueDate: '2023-07-20', status: 'upcoming', childId: 1 },
    { id: 3, name: 'Hepatitis B', dueDate: '2023-05-10', status: 'overdue', childId: 1 },
    { id: 4, name: 'Polio (IPV)', dueDate: '2023-08-05', status: 'upcoming', childId: 1 },
    { id: 5, name: 'Chickenpox (Varicella)', dueDate: '2023-09-12', status: 'upcoming', childId: 1 },
    { id: 6, name: 'Pneumococcal (PCV13)', dueDate: '2023-06-30', status: 'upcoming', childId: 1 },
    { id: 7, name: 'DTaP (Diphtheria, Tetanus, Pertussis)', dueDate: '2023-04-15', status: 'completed', childId: 2 },
    { id: 8, name: 'Hepatitis A', dueDate: '2023-07-10', status: 'upcoming', childId: 2 },
    { id: 9, name: 'Influenza (Flu)', dueDate: '2023-05-05', status: 'overdue', childId: 2 },
    { id: 10, name: 'Hepatitis B', dueDate: '2023-06-20', status: 'upcoming', childId: 3 },
    { id: 11, name: 'Rotavirus', dueDate: '2023-07-15', status: 'upcoming', childId: 3 },
  ];

  const filteredVaccines = vaccines.filter(vaccine => vaccine.childId === selectedChild);

  const upcomingVaccines = filteredVaccines.filter(vaccine => vaccine.status === 'upcoming');
  const overdueVaccines = filteredVaccines.filter(vaccine => vaccine.status === 'overdue');
  const completedVaccines = filteredVaccines.filter(vaccine => vaccine.status === 'completed');

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className="p-6 md:p-8">
      <div className="flex overflow-x-auto pb-4 space-x-4 mb-8">
        {children.map(child => (
          <button
            key={child.id}
            onClick={() => setSelectedChild(child.id)}
            className={`px-5 py-4 rounded-lg flex items-center transition-all ${selectedChild === child.id
              ? 'bg-white shadow-md border-l-4 border-indigo-500'
              : 'bg-white shadow-sm hover:shadow'
              }`}
          >
            <div className={`w-10 h-10 rounded-full flex object-cover items-center justify-center ${selectedChild === child.id ? 'bg-indigo-100 text-indigo-600' : 'bg-gray-100 text-gray-600'
              }`}>
              <User size={24} />

              {/* {ToUpperCaseWords(child?.gender) === 'Male' ? '👦' : '👧'} */}
            </div>
            <div className="ml-3 text-left">
              <p className={`font-medium ${selectedChild === child.id ? 'text-indigo-700' : 'text-gray-700'}`}>
                {child.name}
              </p>

              <p className={`text-sm ${child.gender === 'Male' ? 'text-blue-500' : 'text-pink-500'}    `}>
                {child.gender}
              </p>
            </div>
          </button>
        ))}

      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-50 text-blue-500">
              <Calendar size={24} />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-800">Upcoming</h3>
              <p className="text-2xl font-bold text-blue-600">{upcomingVaccines.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-red-50 text-red-500">
              <AlertCircle size={24} />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-800">Overdue</h3>
              <p className="text-2xl font-bold text-red-600">{overdueVaccines.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-50 text-green-500">
              <CheckCircle size={24} />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-800">Completed</h3>
              <p className="text-2xl font-bold text-green-600">{completedVaccines.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Vaccine Schedule */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">Vaccination Schedule</h2>
        </div>

        {/* Overdue Section */}
        {overdueVaccines.length > 0 && (
          <div className="border-b border-gray-100">
            <div className="px-6 py-3 bg-red-50">
              <h3 className="text-sm font-medium text-red-800 flex items-center">
                <AlertCircle size={16} className="mr-2" />
                Overdue
              </h3>
            </div>
            <div className="divide-y divide-gray-100">
              {overdueVaccines.map(vaccine => (
                <div key={vaccine.id} className="px-6 py-4 flex items-center justify-between hover:bg-gray-50">
                  <div>
                    <h4 className="font-medium text-gray-800">{vaccine.name}</h4>
                    <div className="flex items-center mt-1 text-sm text-red-600">
                      <Clock size={14} className="mr-1" />
                      <span>Due {formatDate(vaccine.dueDate)} (Overdue)</span>
                    </div>
                  </div>
                  <button className="px-4 py-2 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700 transition-colors">
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
            <div className="px-6 py-3 bg-blue-50">
              <h3 className="text-sm font-medium text-blue-800 flex items-center">
                <Calendar size={16} className="mr-2" />
                Upcoming
              </h3>
            </div>
            <div className="divide-y divide-gray-100">
              {upcomingVaccines.map(vaccine => (
                <div key={vaccine.id} className="px-6 py-4 flex items-center justify-between hover:bg-gray-50">
                  <div>
                    <h4 className="font-medium text-gray-800">{vaccine.name}</h4>
                    <div className="flex items-center mt-1 text-sm text-blue-600">
                      <Calendar size={14} className="mr-1" />
                      <span>Due {formatDate(vaccine.dueDate)}</span>
                    </div>
                  </div>
                  <button className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors">
                    Mark Complete
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Completed Section */}
        {completedVaccines.length > 0 && (
          <div>
            <div className="px-6 py-3 bg-green-50">
              <h3 className="text-sm font-medium text-green-800 flex items-center">
                <CheckCircle size={16} className="mr-2" />
                Completed
              </h3>
            </div>
            <div className="divide-y divide-gray-100">
              {completedVaccines.map(vaccine => (
                <div key={vaccine.id} className="px-6 py-4 flex items-center justify-between hover:bg-gray-50">
                  <div>
                    <h4 className="font-medium text-gray-800">{vaccine.name}</h4>
                    <div className="flex items-center mt-1 text-sm text-green-600">
                      <CheckCircle size={14} className="mr-1" />
                      <span>Completed on {formatDate(vaccine.dueDate)}</span>
                    </div>
                  </div>
                  <ChevronRight size={20} className="text-gray-400" />
                </div>
              ))}
            </div>
          </div>
        )}

        {filteredVaccines.length === 0 && (
          <div className="px-6 py-12 text-center">
            <p className="text-gray-500">No vaccines scheduled for this child.</p>
            <button className="mt-4 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
              Add Vaccine
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;