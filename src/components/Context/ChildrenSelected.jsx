import React, { createContext, useState, useMemo } from 'react';

// Create the context
export const VaccineContext = createContext();

// Provider component
export const VaccineProvider = ({ children }) => {
  const [selectedVaccines, setSelectedVaccines] = useState([]);
  const [isBooking, setBooking] = useState([]);

  const handleBookVaccine = (vaccine) => {
    setSelectedVaccines((prev) => {
      // some => true/false
      const exists = prev.some((item) => item.id === vaccine.id);
      const updatedVaccines = exists
        ? prev.filter((item) => item.id !== vaccine.id) 
        : [...prev, vaccine]; 

      setBooking((prevBooking) =>
        exists ? prevBooking.filter((id) => id !== vaccine.id) : [...prevBooking, vaccine.id]
      );

      updatedVaccines.length
        ? localStorage.setItem("AddItems", JSON.stringify(updatedVaccines))
        : localStorage.removeItem("AddItems");

      return updatedVaccines;
    });
  };

  const handleRemoveVaccine = (id) => {
    setSelectedVaccines((prev) => {
      const updatedVaccines = prev.filter((vaccine) => vaccine.id !== id);

      setBooking((prevBooking) => prevBooking.filter((vaccineId) => vaccineId !== id));

      updatedVaccines.length
        ? localStorage.setItem("AddItems", JSON.stringify(updatedVaccines))
        : localStorage.removeItem("AddItems");

      return updatedVaccines;
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