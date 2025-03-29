import React, { createContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useAxios from "@/utils/useAxios";
import { useSelector } from "react-redux";

export const FeedbackContext = createContext();
const url = import.meta.env.VITE_BASE_URL_DB;

export const FeedbackProvider = ({ children }) => {
  const username = useSelector((state) => state.account.user);

  const [feedback, setFeedback] = useState([]);

  
  const [currentValue, setCurrentValue] = useState(0);
  const [hoverValue, setHoverValue] = useState(undefined);



 

  const handleClick = (value) => {
    let newValue = value === currentValue ? Math.max(value - 1, 0) : value;
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

    if (!inputData?.ratingScore) {
      toast.error("Invalid feedback data.");
      return;
    }

    if (inputData.ratingScore <= 3) {
      toast.success("Thank you for your feedback!");
      setFeedback((prevFeedback) => [
        ...prevFeedback,
        {
          id: username?.id || "unknown",
          description: inputData.description,
          ratingScore: inputData.ratingScore,
        },
      ]);
      setCurrentValue(0);
      setSubmit(true);
      setHasNewFeedback(true);
      setOpenModal(false);
      return;
    }

    try {
      await api.post(`${url}/Feedback/create-feedback`, inputData);
      toast.success("Successfully posted!");

      setData({
        userId: username?.id || "",
        description: "",
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

  return (
    <FeedbackContext.Provider
      value={{
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
      }}
    >
      {children}
    </FeedbackContext.Provider>
  );
};
