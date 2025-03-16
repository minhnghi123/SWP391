import React, { createContext, useState, useEffect } from "react";
import { addData } from "../../Api/axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useAxios from "@/utils/useAxios";

export const FeedbackContext = createContext();
const url = import.meta.env.VITE_BASE_URL_DB;

export const FeedbackProvider = ({ children }) => {
  const [username, setUsername] = useState(() => {
    return JSON.parse(localStorage.getItem("Account")) || {};
  });
  const [isOpenModal, setOpenModal] = useState(false);
  const [feedback, setFeedback] = useState([]);
  const [currentValue, setCurrentValue] = useState(0);
  const [hoverValue, setHoverValue] = useState(undefined);
  const [isSubmit, setSubmit] = useState(false);
  const [hasNewFeedback, setHasNewFeedback] = useState(false);
  const [inputData, setData] = useState({
    // username: username.name || username.user || 'Unknown',
    userId: username.id,
    description: "",
    // image: username.picture,
    ratingScore: 0,
  });

  const api = useAxios();

  // Fetch feedback data when component mounts or after submission
  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const response = await api.get(`${url}/Feedback/get-all-feedback`);
        if (response.status === 200) {
          setFeedback(response.data);
        }
      } catch (error) {
        console.error("Failed to fetch feedback data:", error);
      }
    };

    fetchFeedback();
    setSubmit(false);
    setHasNewFeedback(false);
  }, [isSubmit]);

  const handleOpenFeedback = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleClick = (value) => {
    let newValue = value;

    if (value === currentValue) {
      newValue = value === 1 ? 0 : value - 1;
    }

    setCurrentValue(newValue);
    setData((prev) => ({ ...prev, ratingScore: newValue }));
  };

  const handleMouseOver = (value) => setHoverValue(value);
  const handleMouseLeave = () => setHoverValue(undefined);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Changed from 'patients' to 'Feedback' to match endpoint structure
      await api.post(`${url}/Feedback/create-feedback`, inputData);
      toast.success("Successfully posted!");
      setData({
        // username: username.name || username.user || 'Unknown',
        // description: '',
        // image: username.picture,
        // starRating: 0,
        // username: username.name || username.user || 'Unknown',
        userId: username.id,
        description: "",
        // image: username.picture,
        ratingScore: 0,
      });
      setCurrentValue(0);
      setSubmit(true);
      setHasNewFeedback(true);
      setOpenModal(false);
    } catch (err) {
      console.error("Error submitting feedback:", err);
      toast.error("Failed to submit feedback.");
    }
  };

  const value = {
    username,
    isOpenModal,
    setOpenModal,
    feedback,
    setFeedback,
    inputData,
    setData,
    currentValue,
    setCurrentValue,
    hoverValue,
    setHoverValue,
    isSubmit,
    setSubmit,
    hasNewFeedback,
    setHasNewFeedback,

    handleSubmit,
    handleOnChange,
    handleClick,
    handleMouseLeave,
    handleMouseOver,
    handleOpenFeedback,
    handleCloseModal,
  };

  return <FeedbackContext.Provider value={value}>{children}</FeedbackContext.Provider>;
};
