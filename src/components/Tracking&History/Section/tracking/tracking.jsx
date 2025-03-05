import React, { useState, useEffect } from 'react';
import ChildSelection from './ChildSelection';
import SummaryCards from './SummaryCards';
import VaccineSchedule from './VaccineSchedule';
import { addData, fetchData } from '../../../../Api/axios';
import { Calendar } from 'lucide-react';
const vaccines = [
  { id: 1, name: 'DTaP (Diphtheria, Tetanus, Pertussis)', dueDate: '2023-06-15', status: 'completed', childId: 1, feedback: '' },
  { id: 2, name: 'MMR (Measles, Mumps, Rubella)', dueDate: '2023-07-20', status: 'upcoming', childId: 1 },
  { id: 3, name: 'Hepatitis B', dueDate: '2023-05-10', status: 'completed', childId: 1, feedback: '' },
  { id: 4, name: 'Polio (IPV)', dueDate: '2023-08-05', status: 'completed', childId: 1, feedback: 'Good job!' },
  { id: 5, name: 'Chickenpox (Varicella)', dueDate: '2023-09-12', status: 'upcoming', childId: 1, feedback: '' },
  { id: 6, name: 'Pneumococcal (PCV13)', dueDate: '2023-06-30', status: 'upcoming', childId: 1, feedback: '' },
  { id: 7, name: 'DTaP (Diphtheria, Tetanus, Pertussis)', dueDate: '2023-04-15', status: 'completed', childId: 2, feedback: 'Good job!' },
  { id: 8, name: 'Hepatitis A', dueDate: '2023-07-10', status: 'upcoming', childId: 2, feedback: '' },
  { id: 9, name: 'Influenza (Flu)', dueDate: '2023-05-05', status: 'overdue', childId: 2, feedback: '' },
  { id: 10, name: 'Hepatitis B', dueDate: '2023-06-20', status: 'upcoming', childId: 3, feedback: '' },
  { id: 11, name: 'Rotavirus', dueDate: '2023-07-15', status: 'upcoming', childId: 3, feedback: '' },
];
const ListChildren = [
  { id: 1, name: 'Emma Johnson', age: '2 years', photo: 'https://images.unsplash.com/photo-1602030638412-bb8dcc0bc8b0?ixlib=rb-1.2.1&auto=format&fit=crop&w=64&q=80', gender: 'Male' },
  { id: 2, name: 'Noah Johnson', age: '4 years', photo: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?ixlib=rb-1.2.1&auto=format&fit=crop&w=64&q=80', gender: 'Female' },
  { id: 3, name: 'Olivia Johnson', age: '6 months', photo: 'https://images.unsplash.com/photo-1588871282622-2c4b8d3d8f3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=64&q=80', gender: 'Male' },
  { id: 4, name: 'Olivia Johnson', age: '6 months', photo: 'https://images.unsplash.com/photo-1588871282622-2c4b8d3d8f3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=64&q=80', gender: 'Male' },
  { id: 5, name: 'Olivia Johnson', age: '6 months', photo: 'https://images.unsplash.com/photo-1588871282622-2c4b8d3d8f3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=64&q=80', gender: 'Male' },
  { id: 6, name: 'Olivia Johnson', age: '6 months', photo: 'https://images.unsplash.com/photo-1588871282622-2c4b8d3d8f3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=64&q=80', gender: 'Male' },
];
// Helper function to capitalize first letter of each word
const TrackingChildbyUser = ({ id }) => {

  const [children, setChildren] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [sortStatus, setSortStatus] = useState('all');
  const [input, setInput] = useState('');
  const [showCalendar, setShowCalendar] = useState(false);
  const [triger, setTriger] = useState(false)
  const [notification, setNotification] = useState('null')
  const [openFeedback, setOpenFeedback] = useState({});
  const [feedbacks, setFeedbacks] = useState({});
  const [vaccine, setVaccines] = useState([])
  const [selectedChild, setSelectedChild] = useState(null);


  useEffect(() => {
    const hadnleFetchChildrenTracking = async () => {
      try {
        const res = await fetchData(`VaccinesTracking/get-by-parent-id/${id}`)
        if (res.status === 200) {
          const uniqueChildren = Array.from(new Set(res.data.map(item => item.childName)))
            .map((childName, index) => ({
              id: index + 1,
              name: childName
            }));
          const vaccineData = res.data.map((item, index) => ({
            id: index + 1,
            name: item.vaccineName,
            dueDate: item.maximumIntervalDate,
            status: item.status.toLowerCase(),
            childId: uniqueChildren.find(child => child.name === item.childName)?.id,
            reaction: item.reaction || '',
            minimumIntervalDate: item.minimumIntervalDate,
            vaccinationDate: item.vaccinationDate,
            administeredByDoctorName: id
          }));

          setChildren(uniqueChildren);
          setVaccines(vaccineData);
        }
      } catch (error) {
        setError('No data tracking')
      }
    }
    hadnleFetchChildrenTracking()
  }, [triger, id]);
  useEffect(() => {
    if (children.length > 0) {
      setSelectedChild(children[0].id);
    }
  }, [children]);



  const handleOnChange = (e, vaccineId) => {
    setFeedbacks(prev => ({
      ...prev,
      [vaccineId]: e.target.value
    }));
  };

  const toggleFeedback = (vaccineId) => {
    setOpenFeedback(prev => ({
      ...prev,
      [vaccineId]: !prev[vaccineId]
    }));
  };

  const handleSubmit = async (vaccineId, reaction) => {
    try {
      const response = await addData(`/feedback`, { vaccineId, reaction });

      if (response.status === 200) {
        setNotification('Thank you for your feedback!');
        setFeedbacks(prev => ({
          ...prev,
          [vaccineId]: reaction
        }));
        setTriger(!triger);
      }
    } catch (error) {
      setNotification('Something went wrong!');
    }
  };

  const filteredVaccines = vaccine.filter(vaccine => vaccine.childId === selectedChild);
  const sortedVaccines = filteredVaccines.filter(vaccine =>
    sortStatus === 'all' || vaccine.status === sortStatus
  );

  const waitingVaccines = sortedVaccines.filter(vaccine => vaccine.status.toLowerCase() === 'waiting');
  const scheduledVaccines = sortedVaccines.filter(vaccine => vaccine.status.toLowerCase() === 'scheduled');
  const completedVaccines = sortedVaccines.filter(vaccine => vaccine.status.toLowerCase() === 'completed');

  console.log(sortedVaccines)

  if (!children || children.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh]">
        <div className="text-center">
          <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <Calendar size={32} className="text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-800 mb-2">No Vaccination Records</h3>
          <p className="text-gray-500">
            There are no vaccination records available for tracking.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto h-auto space-y-6">
      {/* Child Selection */}
      <ChildSelection
        children={children}
        selectedChild={selectedChild}
        setSelectedChild={setSelectedChild}
      />

      {/* Summary Cards */}
      <SummaryCards
        waitingVaccines={waitingVaccines}
        scheduledVaccines={scheduledVaccines}
        completedVaccines={completedVaccines}
      />

      {/* Vaccine Schedule */}
      <VaccineSchedule
        sortStatus={sortStatus}
        setSortStatus={setSortStatus}
        waitingVaccines={waitingVaccines}
        scheduledVaccines={scheduledVaccines}
        completedVaccines={completedVaccines}
        sortedVaccines={sortedVaccines}
        openFeedback={openFeedback}
        toggleFeedback={toggleFeedback}
        handleOnChange={handleOnChange}
        handleSubmit={handleSubmit}
        feedbacks={feedbacks}
        input={input}
      />
    </div>
  );
};

export default TrackingChildbyUser;