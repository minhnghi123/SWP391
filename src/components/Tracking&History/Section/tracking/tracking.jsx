import React, { useState, useRef } from 'react';
import { Calendar, Clock, AlertCircle, CheckCircle, Plus, User, Shield, ChevronRight } from 'lucide-react';
import ChildSelection from './ChildSelection';
import SummaryCards from './SummaryCards';
import VaccineSchedule from './VaccineSchedule';
import { addData, fetchData } from '../../../../Api/axios';
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
  const [selectedChild, setSelectedChild] = useState(1);
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


  // useEffect(() => {
  //   const hadnleFetchChildrenTracking = async () => {
  //     try {
  //       const res = await fetchData(`/${id}`)
  //       if (res.status === 200) {
  //         setChildren(res.data)
  //       }
  //     } catch (error) {
  //       setError(error)
  //     }
  //   }
  //   hadnleFetchChildrenTracking()
  // }, [triger,id]);

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

  const handleSubmit = async (vaccineId, feedback) => {
    try {
      const response = await addData(`/feedback`, { vaccineId, feedback });

      if (response.status === 200) {
        setNotification('Thank you for your feedback!');
        setFeedbacks(prev => ({
          ...prev,
          [vaccineId]: feedback
        }));
        setTriger(!triger);
        console.log(feedbacks)
      }
    } catch (error) {
      setNotification('Something went wrong!');
    }
  };


  const filteredVaccines = vaccines.filter(vaccine => vaccine.childId === selectedChild);
  const sortedVaccines = filteredVaccines.filter(vaccine =>
    sortStatus === 'all' || vaccine.status === sortStatus
  );

  const upcomingVaccines = sortedVaccines.filter(vaccine => vaccine.status === 'upcoming');
  const overdueVaccines = sortedVaccines.filter(vaccine => vaccine.status === 'overdue');
  const completedVaccines = sortedVaccines.filter(vaccine => vaccine.status === 'completed');
  return (
    <div className="max-w-7xl mx-auto h-auto">
      {/* Child Selection */}
      <ChildSelection
        children={ListChildren}
        selectedChild={selectedChild}
        setSelectedChild={setSelectedChild}
      />


      {/* Summary Cards */}
      <SummaryCards
        upcomingVaccines={upcomingVaccines}
        overdueVaccines={overdueVaccines}
        completedVaccines={completedVaccines}
      />

      {/* Vaccine Schedule */}
      <VaccineSchedule
        sortStatus={sortStatus}
        setSortStatus={setSortStatus}
        overdueVaccines={overdueVaccines}
        upcomingVaccines={upcomingVaccines}
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