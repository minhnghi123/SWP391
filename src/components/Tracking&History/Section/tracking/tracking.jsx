import React, { useState, useEffect, useContext } from 'react';
import ChildSelection from './ChildSelection';
import SummaryCards from './SummaryCards';
import VaccineSchedules from './VaccineSchedule';
import { addData, fetchData } from '../../../../Api/axios';
import { Calendar } from 'lucide-react';
import ModalFeedback from '../../../feedback/formFeedback'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FeedbackContext } from '../../../Context/FeedbackContext';
import useAxios from '../../../../utils/useAxios'

const url = import.meta.env.VITE_BASE_URL_DB
const TrackingChildbyUser = ({ id }) => {

  // const { inputData,
  //   handleSubmit,
  //   handleOnChange,
  //   handleClick,
  //   handleMouseLeave,
  //   handleMouseOver,
  //   currentValue,
  //   hoverValue } = useContext(FeedbackContext)
  const [trackingData, setTrackingData] = useState([]);
  const [selectedChild, setSelectedChild] = useState(null);
  const [children, setChildren] = useState([]);
  const [sortLinkList, setSortLinkList] = useState([]);
  const [err, setErr] = useState(null);
  const [trigger, setTrigger] = useState(false);
  const api = useAxios()
  const [showModal, setShowModal] = useState(false);
  const [historyData, setHistoryData] = useState([])


  const createVaccineChains = (data) => {
    if (!data || data.length === 0) return [];

    //find vaccine has previousVaccination is 0
    const headers = data.filter(item => item.previousVaccination === 0);

    // create subarray with each previousVaccination =0
    const vaccineChains = headers.map(header => {
      let chain = [header];
      let currentId = header.trackingID;

      // Find all vaccines that have this vaccine as their previous
      while (currentId) {
        // Find the next vaccine in the chain
        const next = data.find(item => item.previousVaccination === currentId);
        if (!next) break;

        chain.push(next);
        currentId = next.trackingID;
      }

      return chain;
    });

    return vaccineChains;
  };


  // Fetch initial data
  useEffect(() => {
    const fetchTrackingData = async () => {
      try {
        // Gọi API lấy thông tin tracking và lịch sử booking đồng thời
        const [trackingRes, historyRes] = await Promise.all([
          api.get(`${url}/VaccinesTracking/get-by-parent-id/${id}`),
          api.get(`${url}/Booking/booking-history/${id}`)
        ]);

        if (trackingRes.status === 200 && historyRes.status === 200) {
          setHistoryData(historyRes.data);
          setTrackingData(trackingRes.data);

          // Lấy danh sách ID của các child từ trackingRes
          const childrenIds = [...new Set(trackingRes.data.map(item => item.childId).filter(Boolean))];

          // Gọi API lấy thông tin tất cả children song song
          const childrenResults = await Promise.allSettled(
            childrenIds.map(childId => api.get(`${url}/Child/get-child-by-id/${childId}`))
          );

          // Lọc kết quả thành công và cập nhật state
          const childrenData = childrenResults
            .filter(result => result.status === "fulfilled" && result.value.status === 200)
            .map(result => result.value.data);

          setChildren(childrenData);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchTrackingData();
  }, [id, trigger]);


  // console.log(sortLinkList)
  // Set initial selected child
  useEffect(() => {
    if (children.length > 0 && !selectedChild) {
      setSelectedChild(children[0].id);
    }
  }, [children]);
  useEffect(() => {
    if (selectedChild) {
      const childVaccines = trackingData.filter(item => item.childId === selectedChild);

      const vaccineChains = createVaccineChains(childVaccines);
      setSortLinkList(vaccineChains);
    } else {
      setSortLinkList([]);
    }
  }, [selectedChild, trackingData]);


  const calculateProgress = () => {
    if (!selectedChild || sortLinkList.length === 0) {
      return { total: 0, completed: 0, percentage: 0 };
    }

    // fillter each emlement in sortLinkList
    const completedVaccines = sortLinkList.filter(chain =>
      chain.every(dose => dose.status.toLowerCase() === "success")
    ).length;
    const totalVaccines = sortLinkList.length;
    return {
      total: totalVaccines,
      completed: completedVaccines,
      percentage: totalVaccines > 0 ? Math.round((completedVaccines / totalVaccines) * 100) : 0
    };
  };
  const progressData = calculateProgress();

  const handleSortChange = (status) => {
    const vaccineChains = createVaccineChains(trackingData);
    if (status.toLowerCase() === 'all') {
      setSortLinkList(vaccineChains.filter(chain => chain.some(dose => dose.childId === selectedChild)));
    }
    else {
      const filteredVaccines = vaccineChains.filter(chain =>
        chain.some(dose => dose.status.toLowerCase() === status && dose.childId === selectedChild)
      );
      setSortLinkList(filteredVaccines);
    }
  }


  if (trackingData.length === 0) {
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
    <div className="max-w-7xl mx-auto h-auto space-y-6 p-6">


      {/* Total Progress Card */}
      <ChildSelection children={children} setSelectedChild={setSelectedChild} selectedChild={selectedChild} />
      {/* summary */}
      <SummaryCards progressData={progressData} ProgressBar={ProgressBar} />

      {/* Individual Vaccine Progress */}
      <VaccineSchedules sortLinkList={sortLinkList} ProgressBar={ProgressBar} setTrigger={setTrigger} handleSortChange={handleSortChange} />

    </div>
  );
};
export default TrackingChildbyUser;





const ProgressBar = ({ percentage, vaccineName, current, total }) => {
  return (
    <div className="mb-6">
      <div className="flex justify-between mb-2">
        <span className="text-sm font-medium text-gray-700">
          {vaccineName} ({current}/{total})
        </span>
        <span className="text-sm text-gray-500">
          {percentage}%
        </span>
      </div>

      {/* Progress Bar Container */}
      <div className="relative h-4 bg-gray-200 rounded-full">
        {/* Filled Progress Bar */}
        <div
          className="h-full bg-blue-500 rounded-full transition-all duration-300"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};





