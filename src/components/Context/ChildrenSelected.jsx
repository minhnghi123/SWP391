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
      let updatedVaccines;
      if (checkExist) {
        // Remove item when clicked again
        updatedVaccines = prev.filter((item) => item.id !== vaccine.id);
        setBooking((prevBooking) => prevBooking.filter((item) => item !== vaccine.id));
      } else {
        // Add new item
        updatedVaccines = [...prev, vaccine];
        setBooking((prevBooking) => [...prevBooking, vaccine.id]);

      }
      // localStorage.setItem('AddItems', JSON.stringify(updatedVaccines))
      return updatedVaccines;
    });
  };

  const handleRemoveVaccine = (id) => {
    setSelectedVaccines((prev) => {
      const newArray = prev.filter(vaccine => vaccine.id !== id);
      setBooking((prevBooking) => prevBooking.filter((item) => item !== id));
      // localStorage.setItem('AddItems', JSON.stringify(newArray))
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