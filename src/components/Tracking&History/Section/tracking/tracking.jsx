import React, { useState, useEffect } from 'react';
import ChildSelection from './ChildSelection';
import SummaryCards from './SummaryCards';
import VaccineSchedules from './VaccineSchedule';
import { Calendar } from 'lucide-react';
import useAxios from '../../../../utils/useAxios';

const url = import.meta.env.VITE_BASE_URL_DB;
const TrackingChildbyUser = ({ id }) => {

  const [trackingData, setTrackingData] = useState([]);
  const [selectedChild, setSelectedChild] = useState(null);
  const [children, setChildren] = useState([]);
  const [sortLinkList, setSortLinkList] = useState([]);
  const [trigger, setTrigger] = useState(false);
  const api = useAxios();
  const [progressData, setProgressData] = useState({
    total: 0,
    totalCancel: 0,
    completed: 0,
    percentage: 0,
  });
  // link list vaccine
  const createVaccineChains = (data) => {
    if (!data || data.length === 0) return [];
    const headers = data.filter(item => item.previousVaccination === 0);
    return headers.map(header => {
      let chain = [header];
      let currentId = header.trackingID;
      while (currentId) {
        const next = data.find(item => item.previousVaccination === currentId);
        if (!next) break;
        chain.push(next);
        currentId = next.trackingID;
      }
      return chain;
    });
  };

  //fetch data 
  const fetchTrackingData = async () => {
    try {
      const trackingRes = await api.get(`${url}/VaccinesTracking/get-by-parent-id/${id}`);
      if (trackingRes.status === 200 ) {
        setTrackingData(trackingRes.data);
        const childrenIds = [...new Set(trackingRes.data.map(item => item.childId).filter(Boolean))];
        // call api parallel to get child info
        const childrenResults = await Promise.allSettled(
          childrenIds.map(childId => api.get(`${url}/Child/get-child-by-id/${childId}`))
        );
  
        // handle result Promise.allSettled()
        const childrenData = childrenResults
          .filter(result => result.status === "fulfilled" && result.value?.status === 200) // check valid response
          .map(result => result.value.data); // get data from response
   
        setChildren(childrenData);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  
  // fetch data
  useEffect(() => {
    fetchTrackingData();
  }, [id, trigger]);

  // select child first
  useEffect(() => {
    if (children.length > 0 && !selectedChild) {
      setSelectedChild(children[0].id);
    }
  }, [children]);

  // filter data
  useEffect(() => {
    if (selectedChild) {
      const childVaccines = trackingData.filter(item => item.childId === selectedChild);
      setSortLinkList(createVaccineChains(childVaccines));
      setProgressData(calculateProgress(childVaccines));
    } else {
      setSortLinkList([]);
      setProgressData({ total: 0, totalCancel: 0, completed: 0, percentage: 0 });
    }
  }, [selectedChild, trackingData]);

  // calculate progress
  const calculateProgress = (childVaccines) => {
    if (!childVaccines || childVaccines.length === 0) {
      return { total: 0, totalCancel: 0, completed: 0, percentage: 0, overDue: 0, checkTwoStatus: 0 };
    }

    const vaccineChains = createVaccineChains(childVaccines);

    // Fully canceled chains (all doses are "cancel")
    const canceledVaccines = vaccineChains.filter((chain) =>
      chain.every((dose) => dose.status.toLowerCase() === "cancel")
    ).length;

    // Fully completed chains (all doses are "success")
    const completedVaccines = vaccineChains.filter((chain) =>
      chain.every((dose) => dose.status.toLowerCase() === "success")
    ).length;

    // Chains with mixed "success" and "cancel" doses
    const checkTwoStatus = vaccineChains.filter((chain) =>
      chain.some((dose) => dose.status.toLowerCase() === "cancel") &&
      chain.some((dose) => dose.status.toLowerCase() === "success")
    ).length;

    // Chains with at least one overdue dose (not fully "success" or "cancel")
    const overDueVaccines = vaccineChains.filter((chain) => {
      // Skip if fully canceled or fully completed
      if (
        chain.every((dose) => dose.status.toLowerCase() === "cancel") ||
        chain.every((dose) => dose.status.toLowerCase() === "success")
      ) {
        return false;
      }
      // Check for overdue doses
      return chain.some(
        (dose) =>
          dose.maximumIntervalDate && // Ensure date exists
          new Date(dose.maximumIntervalDate) < new Date() &&
          dose.status &&
          dose.status.toLowerCase() !== "cancel" &&
          dose.status.toLowerCase() !== "success"
      );
    }).length;

    const totalVaccines = vaccineChains.length;
    // Valid vaccines: exclude fully canceled chains (overdue and mixed are still "in progress")
    const validVaccines = totalVaccines - canceledVaccines - overDueVaccines - checkTwoStatus;



    return {
      total: totalVaccines,
      totalCancel: canceledVaccines,
      completed: completedVaccines,
      percentage: validVaccines > 0 ? Math.round((completedVaccines / validVaccines) * 100) : 0,
      overDue: overDueVaccines,
      checkTwoStatus: checkTwoStatus,
    };
  };



  if (trackingData.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh]">
        <div className="text-center">
          <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <Calendar size={32} className="text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-800 mb-2">No Vaccination Records</h3>
          <p className="text-gray-500">There are no vaccination records available for tracking.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto h-auto space-y-6 p-6">
      <ChildSelection children={children} setSelectedChild={setSelectedChild} selectedChild={selectedChild} />
      <SummaryCards progressData={progressData} />
      <VaccineSchedules sortLinkList={sortLinkList} setTrigger={setTrigger} />
    </div>
  );
};

export default TrackingChildbyUser;
