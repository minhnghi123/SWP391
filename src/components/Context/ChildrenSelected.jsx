import React, { createContext, useState, useMemo } from 'react';

// Create the context
export const VaccineContext = createContext();

// Provider component
export const VaccineProvider = ({ children }) => {
  const [selectedVaccines, setSelectedVaccines] = useState([]);
  const [isBooking, setBooking] = useState([]);

  const handleBookVaccine = (vaccine) => {
    setSelectedVaccines((prev) => {
      const checkExist = prev.find((item) => item.id === vaccine.id);

      if (checkExist) {
        // Remove item when clicked again
        const updatedVaccines = prev.filter((item) => item.id !== vaccine.id);
        setBooking((prevBooking) => prevBooking.filter((item) => item !== vaccine.id));
        return updatedVaccines;
      } else {
        // Add new item
        const updatedVaccines = [...prev, vaccine];
        setBooking((prevBooking) => [...prevBooking, vaccine.id]);
        return updatedVaccines;
      }
    });
  };

  const handleRemoveVaccine = (id) => {
    setSelectedVaccines((prev) => {
      const newArray = prev.filter(vaccine => vaccine.id !== id);
      setBooking((prevBooking) => prevBooking.filter((item) => item !== id));
      return newArray;
    });
  };

  const calculatedTotal = useMemo(() => {
    return selectedVaccines.reduce((total, vaccine) => {
      if (vaccine.discount)
        return total + vaccine.price * (1 - vaccine.discount / 100);
      else
        return total + vaccine.price;
    }, 0);
  }, [selectedVaccines]);

  
  const contextValue = {
    selectedVaccines,
    isBooking,
    handleBookVaccine,
    handleRemoveVaccine,
    calculatedTotal
  }

  

  return (
    <VaccineContext.Provider value={contextValue}>
      {children}
    </VaccineContext.Provider>
  );
};